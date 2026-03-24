from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models.models import Observation, Lake, Complaint
from app.auth import get_current_user, require_officer
from app.models.models import User
from pydantic import BaseModel
import uuid
from app.utils.cloudinary_utils import upload_image


router = APIRouter(prefix="/observations", tags=["Observations"])

@router.post("", status_code=201)
def submit_observation(
    lake_id: str = Form(...),
    concern_type: str = Form(...),
    description: str = Form(...),
    priority: str = Form("Medium"),
    location_note: Optional[str] = Form(None),
    email_updates: bool = Form(True),
    sms_alerts: bool = Form(False),
    photos: List[UploadFile] = File([]),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    lake = db.query(Lake).filter(Lake.id == lake_id).first()
    if not lake:
        raise HTTPException(status_code=404, detail="Lake not found")

    # Handle Photo Uploads
    photo_urls = []
    for photo in photos:
        url = upload_image(photo.file)
        if url:
            photo_urls.append({"url": url, "filename": photo.filename})

    obs = Observation(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        lake_id=lake_id,
        concern_type=concern_type,
        description=description,
        priority=priority,
        location_note=location_note,
        photos=photo_urls,
        email_updates=email_updates,
        sms_alerts=sms_alerts,
    )
    db.add(obs)


    # Auto-create complaint for officer review
    complaint = Complaint(
        id=str(uuid.uuid4()),
        lake_id=lake_id,
        observation_id=obs.id,
        filed_by=current_user.name or "Anonymous",
        priority=priority.upper()[:6],
        issue=description,
        photos_count=len(photo_urls)
    )
    db.add(complaint)
    db.commit()

    ref_id = f"#OBS2026-{obs.id[:6].upper()}"
    return {
        "id": obs.id,
        "message": "Observation submitted for review. You will receive email updates.",
        "reference_id": ref_id
    }

@router.get("/my")
def get_my_observations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    obs_list = db.query(Observation).filter(Observation.user_id == current_user.id).all()
    return [
        {
            "id": o.id,
            "lake_id": o.lake_id,
            "concern_type": o.concern_type,
            "description": o.description,
            "priority": o.priority,
            "status": o.status,
            "created_at": str(o.created_at),
        }
        for o in obs_list
    ]

@router.get("/all")
def get_all_observations(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    obs_list = db.query(Observation).order_by(Observation.created_at.desc()).all()
    return [
        {
            "id": o.id,
            "lake_id": o.lake_id,
            "concern_type": o.concern_type,
            "description": o.description,
            "priority": o.priority,
            "status": o.status,
            "email_updates": o.email_updates,
            "created_at": str(o.created_at),
        }
        for o in obs_list
    ]

@router.put("/{obs_id}/status")
def update_status(
    obs_id: str,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_officer)
):
    obs = db.query(Observation).filter(Observation.id == obs_id).first()
    if not obs:
        raise HTTPException(status_code=404, detail="Observation not found")
    obs.status = status
    db.commit()
    return {"message": f"Status updated to {status}"}
