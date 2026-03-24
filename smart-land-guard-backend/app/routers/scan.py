from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models.models import Lake, ScanResult
from app.auth import require_admin
from pydantic import BaseModel
import uuid
from datetime import date

router = APIRouter(prefix="/scan", tags=["Scan & Change Detection"])

class ScanRequest(BaseModel):
    lake_ids: Optional[List[str]] = None
    date_from: Optional[str] = None
    date_to: Optional[str] = None

def run_mock_scan(lake_ids: List[str], db_url: str):
    """
    Mock change detection job.
    Replace the logic inside with real Sentinel Hub + OpenCV pipeline
    once you have the API keys.
    """
    from app.database import SessionLocal
    from app.models.models import Lake, ScanResult
    from datetime import datetime
    import random

    db = SessionLocal()
    try:
        for lake_id in lake_ids:
            lake = db.query(Lake).filter(Lake.id == lake_id).first()
            if not lake:
                continue

            # Mock: simulate a new area reading (±5% of current area)
            baseline = lake.baseline_area_ha or 100
            current  = lake.current_area_ha or baseline
            new_area = round(current * random.uniform(0.97, 1.00), 2)
            change   = round(baseline - new_area, 2)
            pct      = round((change / baseline) * 100, 2) if baseline > 0 else 0

            if pct < 5:
                alert = "Stable"
            elif pct < 15:
                alert = "Moderate"
            elif pct < 30:
                alert = "High"
            else:
                alert = "Critical"

            # Save scan result
            scan = ScanResult(
                id=str(uuid.uuid4()),
                lake_id=lake_id,
                scan_date=str(date.today()),
                satellite="Sentinel-2 (Mock)",
                new_area_ha=new_area,
                change_ha=change,
                change_pct=pct,
                alert_level=alert,
            )
            db.add(scan)

            # Update lake
            lake.current_area_ha = new_area
            lake.area_change_ha  = change
            lake.change_pct      = pct
            lake.alert_level     = alert
            lake.last_scanned    = datetime.utcnow()
            db.commit()
    finally:
        db.close()

@router.post("/run")
def trigger_scan(
    req: ScanRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    _=Depends(require_admin)
):
    lake_ids = req.lake_ids
    if not lake_ids:
        lake_ids = [l.id for l in db.query(Lake).all()]

    job_id = str(uuid.uuid4())
    background_tasks.add_task(run_mock_scan, lake_ids, "")
    return {
        "job_id": job_id,
        "status": "queued",
        "lakes_count": len(lake_ids),
        "message": "Scan queued. Results will be available shortly."
    }

@router.get("/results")
def get_all_scan_results(
    lake_id: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(require_admin)
):
    query = db.query(ScanResult)
    if lake_id:
        query = query.filter(ScanResult.lake_id == lake_id)
    results = query.order_by(ScanResult.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "lake_id": r.lake_id,
            "scan_date": r.scan_date,
            "satellite": r.satellite,
            "new_area_ha": r.new_area_ha,
            "change_ha": r.change_ha,
            "change_pct": r.change_pct,
            "alert_level": r.alert_level,
            "new_img_url": r.new_img_url,
            "change_map_url": r.change_map_url,
            "report_pdf_url": r.report_pdf_url,
            "created_at": str(r.created_at),
        }
        for r in results
    ]
