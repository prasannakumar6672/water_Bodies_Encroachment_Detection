"""
seed.py — Run once to populate the DB with:
  - Admin user
  - Officer user
  - Public user
  - 5 monitored lakes
  - Sample scan results per lake
  - Sample complaints & field verifications

Usage:
    cd smart-land-guard-backend
    python seed.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal, Base, engine
from app.models.models import (
    User, Lake, ScanResult, Complaint, Observation, FieldVerification, OfficerRegistration
)
from app.auth import hash_password
import uuid
from datetime import datetime, date

Base.metadata.create_all(bind=engine)
db = SessionLocal()

def clear():
    for model in [FieldVerification, Complaint, Observation, ScanResult, Lake, OfficerRegistration, User]:
        db.query(model).delete()
    db.commit()

def seed():
    clear()
    print("🌱 Seeding database...")

    # ── Users ──────────────────────────────────────────────────────
    admin = User(id=str(uuid.uuid4()), name="System Admin",
                 email="admin@smartlandguard.gov.in",
                 password=hash_password("admin123"), role="admin")
    officer = User(id=str(uuid.uuid4()), name="Rajesh Kumar",
                   email="rajesh@gov.in",
                   password=hash_password("officer123"), role="officer", phone="+919876543210")
    public = User(id=str(uuid.uuid4()), name="Ramesh Kumar",
                  email="ramesh@example.com",
                  password=hash_password("user123"), role="public")
    db.add_all([admin, officer, public])
    db.commit()
    print("  ✅ Users created")

    # ── Monitored Lakes ────────────────────────────────────────────
    lakes = [
        Lake(id="hussain_sagar",    name="Hussain Sagar Lake",   district="Hyderabad",  mandal="Khairatabad",
             latitude=17.4239, longitude=78.4738, baseline_year=2019,
             baseline_area_ha=545.0, current_area_ha=498.0, area_change_ha=47.0,
             change_pct=8.62, alert_level="Moderate",
             bbox=[78.452, 17.416, 78.498, 17.437],
             baseline_image_url="https://res.cloudinary.com/demo/image/upload/satellite_baseline.jpg"),
        Lake(id="kapra_lake",       name="Kapra Lake",           district="Medchal",    mandal="Kapra",
             latitude=17.4980, longitude=78.5670, baseline_year=2019,
             baseline_area_ha=120.0, current_area_ha=115.0, area_change_ha=5.0,
             change_pct=4.2, alert_level="Stable",
             bbox=[78.551, 17.485, 78.590, 17.510]),
        Lake(id="saroornagar_lake", name="Saroornagar Lake",     district="Rangareddy", mandal="Saroornagar",
             latitude=17.3380, longitude=78.5500, baseline_year=2019,
             baseline_area_ha=280.0, current_area_ha=241.0, area_change_ha=39.0,
             change_pct=13.9, alert_level="Moderate",
             bbox=[78.535, 17.328, 78.565, 17.348]),
        Lake(id="mir_alam_lake",    name="Mir Alam Lake",        district="Hyderabad",  mandal="Mehdipatnam",
             latitude=17.3916, longitude=78.4397, baseline_year=2019,
             baseline_area_ha=103.0, current_area_ha=72.0, area_change_ha=31.0,
             change_pct=30.1, alert_level="Critical",
             bbox=[78.431, 17.383, 78.451, 17.402]),
        Lake(id="durgam_cheruvu",   name="Durgam Cheruvu",       district="Rangareddy", mandal="Serilingampally",
             latitude=17.4286, longitude=78.3875, baseline_year=2019,
             baseline_area_ha=65.0, current_area_ha=63.0, area_change_ha=2.0,
             change_pct=3.1, alert_level="Stable",
             bbox=[78.380, 17.422, 78.396, 17.436]),
    ]
    db.add_all(lakes)
    db.commit()
    print("  ✅ Lakes seeded (5 lakes)")

    # ── Scan Results ───────────────────────────────────────────────
    scan_data = [
        ("hussain_sagar",    "2024-01-29", 498.0, 47.0,  8.62,  "Moderate"),
        ("hussain_sagar",    "2023-06-15", 510.0, 35.0,  6.42,  "Moderate"),
        ("hussain_sagar",    "2022-03-10", 525.0, 20.0,  3.67,  "Stable"),
        ("saroornagar_lake", "2024-01-15", 241.0, 39.0,  13.9,  "Moderate"),
        ("mir_alam_lake",    "2024-01-10", 72.0,  31.0,  30.1,  "Critical"),
        ("kapra_lake",       "2024-01-20", 115.0, 5.0,   4.2,   "Stable"),
        ("durgam_cheruvu",   "2024-01-22", 63.0,  2.0,   3.1,   "Stable"),
    ]
    for lid, sdate, new_a, change, pct, alert in scan_data:
        db.add(ScanResult(
            id=str(uuid.uuid4()), lake_id=lid, scan_date=sdate,
            satellite="Sentinel-2", new_area_ha=new_a, change_ha=change,
            change_pct=pct, alert_level=alert,
        ))
    db.commit()
    print("  ✅ Scan results seeded")

    # ── Observations ───────────────────────────────────────────────
    obs1 = Observation(
        id=str(uuid.uuid4()), user_id=public.id, lake_id="hussain_sagar",
        concern_type="Suspected Land-Use Change",
        description="Construction activity detected near the east boundary buffer zone.",
        priority="HIGH", status="Submitted"
    )
    obs2 = Observation(
        id=str(uuid.uuid4()), user_id=public.id, lake_id="kapra_lake",
        concern_type="Pollution / Dumping",
        description="Sewage inlet overflow reported during recent rains.",
        priority="MEDIUM", status="Under Review"
    )
    db.add_all([obs1, obs2])
    db.commit()

    # ── Complaints ─────────────────────────────────────────────────
    db.add(Complaint(
        id=str(uuid.uuid4()), lake_id="hussain_sagar", observation_id=obs1.id,
        filed_by="Ramesh Kumar", priority="HIGH",
        issue="Construction activity detected near the east boundary buffer zone.",
        photos_count=3, status="Pending"
    ))
    db.add(Complaint(
        id=str(uuid.uuid4()), lake_id="kapra_lake", observation_id=obs2.id,
        filed_by="Anonymous", priority="MEDIUM",
        issue="Sewage inlet overflow reported during recent rains.",
        photos_count=1, status="Pending"
    ))
    db.commit()
    print("  ✅ Observations & Complaints seeded")

    # ── Field Verifications ────────────────────────────────────────
    db.add_all([
        FieldVerification(id=str(uuid.uuid4()), lake_id="saroornagar_lake",
                          scheduled_date="2026-02-01", team_name="Field Team Alpha",
                          description="Survey for reported encroachment.", status="Scheduled", officer_id=officer.id),
        FieldVerification(id=str(uuid.uuid4()), lake_id="mir_alam_lake",
                          scheduled_date="2026-02-03", team_name="Team Beta",
                          description="Boundary check verification.", status="Pending", officer_id=officer.id),
        FieldVerification(id=str(uuid.uuid4()), lake_id="hussain_sagar",
                          scheduled_date="2026-01-25", team_name="Field Team Gamma",
                          description="Routine inspection completed.", status="Completed", officer_id=officer.id),
    ])
    db.commit()
    print("  ✅ Field Verifications seeded")

    # ── Officer Approval Queue ─────────────────────────────────────
    db.add(OfficerRegistration(
        id=str(uuid.uuid4()), name="Mr. Suresh Reddy",
        email="suresh.reddy@revenue.gov.in", department="Revenue Department",
        designation="Assistant District Officer", region="Nalgonda District",
        applied_date="2026-01-25", documents=["Aadhaar_Suresh.pdf", "Posting_Order.pdf"]
    ))
    db.commit()
    print("  ✅ Officer Approval Queue seeded")

    print("\n✅ Database seeded successfully!\n")
    print("━" * 45)
    print("  🔑 LOGIN CREDENTIALS")
    print("━" * 45)
    print("  Admin   → admin@smartlandguard.gov.in  / admin123")
    print("  Officer → rajesh@gov.in               / officer123")
    print("  Public  → ramesh@example.com          / user123")
    print("━" * 45)

if __name__ == "__main__":
    seed()
    db.close()
