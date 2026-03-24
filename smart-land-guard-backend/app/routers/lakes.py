from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models.models import Lake, ScanResult
from app.auth import get_current_user, require_admin
from pydantic import BaseModel
import uuid

router = APIRouter(prefix="/lakes", tags=["Lakes"])

class LakeCreate(BaseModel):
    id: str
    name: str
    district: Optional[str] = None
    mandal: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    bbox: Optional[list] = None
    baseline_year: Optional[int] = 2019
    baseline_area_ha: Optional[float] = None

@router.get("")
def list_lakes(
    district: Optional[str] = None,
    alert_level: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Lake)
    if district:
        query = query.filter(Lake.district == district)
    if alert_level:
        query = query.filter(Lake.alert_level == alert_level)
    lakes = query.all()
    return [
        {
            "id": l.id,
            "name": l.name,
            "district": l.district,
            "mandal": l.mandal,
            "latitude": l.latitude,
            "longitude": l.longitude,
            "baseline_area_ha": l.baseline_area_ha,
            "current_area_ha": l.current_area_ha,
            "area_change_ha": l.area_change_ha,
            "change_pct": l.change_pct,
            "alert_level": l.alert_level,
            "baseline_image_url": l.baseline_image_url,
            "last_scanned": str(l.last_scanned) if l.last_scanned else None,
        }
        for l in lakes
    ]

@router.get("/{lake_id}")
def get_lake(lake_id: str, db: Session = Depends(get_db)):
    lake = db.query(Lake).filter(Lake.id == lake_id).first()
    if not lake:
        raise HTTPException(status_code=404, detail="Lake not found")

    scans = (db.query(ScanResult)
             .filter(ScanResult.lake_id == lake_id)
             .order_by(ScanResult.created_at.desc())
             .all())

    return {
        "id": lake.id,
        "name": lake.name,
        "district": lake.district,
        "mandal": lake.mandal,
        "latitude": lake.latitude,
        "longitude": lake.longitude,
        "baseline_year": lake.baseline_year,
        "baseline_area_ha": lake.baseline_area_ha,
        "current_area_ha": lake.current_area_ha,
        "area_change_ha": lake.area_change_ha,
        "change_pct": lake.change_pct,
        "alert_level": lake.alert_level,
        "baseline_image_url": lake.baseline_image_url,
        "last_scanned": str(lake.last_scanned) if lake.last_scanned else None,
        "scan_history": [
            {
                "id": s.id,
                "scan_date": s.scan_date,
                "satellite": s.satellite,
                "new_area_ha": s.new_area_ha,
                "change_ha": s.change_ha,
                "change_pct": s.change_pct,
                "alert_level": s.alert_level,
                "new_img_url": s.new_img_url,
                "change_map_url": s.change_map_url,
                "report_pdf_url": s.report_pdf_url,
            }
            for s in scans
        ]
    }

@router.post("", status_code=201)
def add_lake(lake_data: LakeCreate, db: Session = Depends(get_db),
             admin=Depends(require_admin)):
    if db.query(Lake).filter(Lake.id == lake_data.id).first():
        raise HTTPException(status_code=409, detail="Lake ID already exists")
    lake = Lake(**lake_data.dict(), current_area_ha=lake_data.baseline_area_ha)
    db.add(lake)
    db.commit()
    db.refresh(lake)
    return {"message": "Lake added successfully", "id": lake.id}
