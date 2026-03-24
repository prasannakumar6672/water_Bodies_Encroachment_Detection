from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.models import Complaint, ComplaintResponse, User, FieldVerification
from app.auth import require_officer, get_current_user
from pydantic import BaseModel
import uuid

router = APIRouter(prefix="/complaints", tags=["Complaints"])

class RespondRequest(BaseModel):
    template: str
    message_body: str
    send_sms: bool = True
    update_status_to: str = "Under Review"

class VerificationCreate(BaseModel):
    complaint_id: Optional[str] = None
    lake_id: Optional[str] = None
    scheduled_date: str
    team_name: str
    description: str

@router.get("")
def list_complaints(
    priority: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    query = db.query(Complaint)
    if priority:
        query = query.filter(Complaint.priority == priority.upper())
    if status:
        query = query.filter(Complaint.status == status)
    complaints = query.order_by(Complaint.created_at.desc()).all()
    return [
        {
            "id": c.id,
            "lake_id": c.lake_id,
            "lake_name": c.lake.name if c.lake else "",
            "filed_by": c.filed_by,
            "priority": c.priority,
            "issue": c.issue,
            "photos_count": c.photos_count,
            "status": c.status,
            "created_at": str(c.created_at),
        }
        for c in complaints
    ]

@router.post("/{complaint_id}/respond")
def respond_to_complaint(
    complaint_id: str,
    req: RespondRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    response = ComplaintResponse(
        id=str(uuid.uuid4()),
        complaint_id=complaint_id,
        officer_id=current_user.id,
        template=req.template,
        message_body=req.message_body,
        send_sms=req.send_sms,
    )
    db.add(response)
    complaint.status = req.update_status_to
    db.commit()
    return {"message": f"Response sent. Complaint status updated to '{req.update_status_to}'."}

@router.put("/{complaint_id}/status")
def update_complaint_status(
    complaint_id: str,
    new_status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    complaint.status = new_status
    db.commit()
    return {"message": f"Status updated to {new_status}"}

# ── Field Verifications ──────────────────────────────────────────────
router_v = APIRouter(prefix="/verifications", tags=["Field Verifications"])

@router_v.get("")
def list_verifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    tasks = db.query(FieldVerification).order_by(FieldVerification.created_at.desc()).all()
    scheduled = sum(1 for t in tasks if t.status == "Scheduled")
    completed = sum(1 for t in tasks if t.status == "Completed")
    return {
        "stats": {"scheduled": scheduled, "completed_this_month": completed, "active_teams": 5},
        "tasks": [
            {
                "id": t.id,
                "lake_id": t.lake_id,
                "scheduled_date": t.scheduled_date,
                "team_name": t.team_name,
                "description": t.description,
                "status": t.status,
                "report_url": t.report_url,
            }
            for t in tasks
        ]
    }

@router_v.post("", status_code=201)
def create_verification(
    req: VerificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    task = FieldVerification(
        id=str(uuid.uuid4()),
        complaint_id=req.complaint_id,
        lake_id=req.lake_id,
        scheduled_date=req.scheduled_date,
        team_name=req.team_name,
        description=req.description,
        officer_id=current_user.id,
    )
    db.add(task)
    db.commit()
    return {"message": "Field verification scheduled", "id": task.id}

@router_v.put("/{task_id}/complete")
def complete_verification(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    task = db.query(FieldVerification).filter(FieldVerification.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = "Completed"
    db.commit()
    return {"message": "Verification marked as completed"}
