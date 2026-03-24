from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional, List
from app.database import get_db
from app.models.models import User, OfficerRegistration, Lake, Complaint, Observation, ScanResult, SystemSetting
from app.auth import require_admin, get_current_user
from pydantic import BaseModel
import uuid
from datetime import date

router = APIRouter(prefix="/admin", tags=["Admin"])

# ── Metrics ──────────────────────────────────────────────────────────
@router.get("/metrics")
def get_metrics(db: Session = Depends(get_db), _=Depends(require_admin)):
    return {
        "total_users": db.query(User).count(),
        "active_officers": db.query(User).filter(User.role == "officer", User.status == "Active").count(),
        "pending_approvals": db.query(OfficerRegistration).filter(OfficerRegistration.status == "Pending").count(),
        "lakes_monitored": db.query(Lake).count(),
        "active_alerts": db.query(Lake).filter(Lake.alert_level != "Stable").count(),
        "system_health_pct": 98,
    }

# ── Analytics ─────────────────────────────────────────────────────────
@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db), _=Depends(require_admin)):
    return {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
        "daily_active_users": [45, 62, 78, 95],
        "complaints_filed": [
            db.query(Complaint).count(), 0, 0, 0
        ],
        "alert_sources": {
            "auto_detected": db.query(ScanResult).filter(ScanResult.alert_level != "Stable").count(),
            "user_reported": db.query(Observation).count(),
            "officer_verified": db.query(Complaint).filter(Complaint.status == "Resolved").count(),
        },
        "region_performance": [
            {"region": "Hyderabad", "efficiency_pct": 95},
            {"region": "Nalgonda", "efficiency_pct": 88},
            {"region": "Warangal", "efficiency_pct": 72},
        ],
        "avg_response_days": 2.5,
        "resolution_rate_pct": 87,
    }

# ── User Management ───────────────────────────────────────────────────
@router.get("/users")
def list_users(search: Optional[str] = None, db: Session = Depends(get_db), _=Depends(require_admin)):
    query = db.query(User)
    if search:
        query = query.filter((User.name.ilike(f"%{search}%")) | (User.email.ilike(f"%{search}%")))
    users = query.all()
    return [
        {"id": u.id, "name": u.name, "email": u.email, "role": u.role,
         "region": None, "status": u.status, "created_at": str(u.created_at)}
        for u in users
    ]

class UserUpdate(BaseModel):
    role: Optional[str] = None
    status: Optional[str] = None

@router.put("/users/{user_id}")
def update_user(user_id: str, req: UserUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if req.role:
        user.role = req.role
    if req.status:
        user.status = req.status
    db.commit()
    return {"message": "User updated"}

# ── Officer Approvals ─────────────────────────────────────────────────
@router.get("/officer-approvals")
def list_pending_approvals(db: Session = Depends(get_db), _=Depends(require_admin)):
    regs = db.query(OfficerRegistration).filter(OfficerRegistration.status == "Pending").all()
    return {
        "pending_count": len(regs),
        "registrations": [
            {
                "id": r.id, "name": r.name, "email": r.email,
                "department": r.department, "designation": r.designation,
                "region": r.region, "applied_date": r.applied_date, "documents": r.documents,
            }
            for r in regs
        ]
    }

@router.post("/officer-approvals/{reg_id}/approve")
def approve_officer(reg_id: str, db: Session = Depends(get_db), _=Depends(require_admin)):
    reg = db.query(OfficerRegistration).filter(OfficerRegistration.id == reg_id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    reg.status = "Approved"
    # Create officer user account
    existing = db.query(User).filter(User.email == reg.email).first()
    if not existing:
        from app.auth import hash_password
        user = User(
            id=str(uuid.uuid4()),
            name=reg.name,
            email=reg.email,
            password=hash_password("officer123"),  # temp password — should be emailed
            role="officer",
        )
        db.add(user)
    db.commit()
    return {"message": f"Officer approved. Account created for {reg.email}. Temp password: officer123"}

@router.post("/officer-approvals/{reg_id}/reject")
def reject_officer(reg_id: str, reason: Optional[str] = None, db: Session = Depends(get_db), _=Depends(require_admin)):
    reg = db.query(OfficerRegistration).filter(OfficerRegistration.id == reg_id).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    reg.status = "Rejected"
    reg.admin_notes = reason
    db.commit()
    return {"message": "Registration rejected"}

# ── System Settings ───────────────────────────────────────────────────
DEFAULT_SETTINGS = {
    "sms_alerts": "true",
    "email_alerts": "true",
    "weekly_reports": "false",
    "auto_assign": "true",
    "data_refresh_rate_days": "5",
    "threshold_critical_pct": "30",
    "threshold_high_pct": "15",
    "threshold_medium_pct": "5",
}

@router.get("/settings")
def get_settings_api(db: Session = Depends(get_db), _=Depends(require_admin)):
    rows = db.query(SystemSetting).all()
    data = {r.key: r.value for r in rows}
    for k, v in DEFAULT_SETTINGS.items():
        data.setdefault(k, v)
    # Convert booleans
    return {k: (v.lower() == "true" if v in ("true","false") else v) for k, v in data.items()}

@router.put("/settings")
def update_settings_api(payload: dict, db: Session = Depends(get_db), _=Depends(require_admin)):
    for key, val in payload.items():
        row = db.query(SystemSetting).filter(SystemSetting.key == key).first()
        if row:
            row.value = str(val)
        else:
            db.add(SystemSetting(key=key, value=str(val)))
    db.commit()
    return {"message": "Settings saved"}

# ── Report Generation ─────────────────────────────────────────────────
@router.post("/reports/generate")
def generate_report(payload: dict, db: Session = Depends(get_db), _=Depends(require_admin)):
    # Returns a mock download URL for now
    report_id = str(uuid.uuid4())[:8].upper()
    return {
        "report_id": report_id,
        "download_url": f"https://res.cloudinary.com/demo/raw/upload/report_{report_id}.pdf",
        "message": "Report generated (PDF). Connect Cloudinary + WeasyPrint to enable real generation."
    }
