from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id         = Column(String, primary_key=True, default=gen_uuid)
    name       = Column(String(100), nullable=False)
    email      = Column(String(150), unique=True, nullable=False)
    password   = Column(String(255), nullable=False)
    role       = Column(String(20), default="public")   # public | officer | admin
    phone      = Column(String(20), nullable=True)
    status     = Column(String(20), default="Active")   # Active | Suspended
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class OfficerRegistration(Base):
    __tablename__ = "officer_registrations"
    id          = Column(String, primary_key=True, default=gen_uuid)
    name        = Column(String(100), nullable=False)
    email       = Column(String(150), nullable=False)
    department  = Column(String(150))
    designation = Column(String(100))
    region      = Column(String(100))
    applied_date= Column(String(30))
    status      = Column(String(20), default="Pending") # Pending | Approved | Rejected
    documents   = Column(JSON, default=list)
    admin_notes = Column(Text, nullable=True)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

class Lake(Base):
    __tablename__ = "lakes"
    id                = Column(String(50), primary_key=True)   # e.g. "hussain_sagar"
    name              = Column(String(200), nullable=False)
    district          = Column(String(100))
    mandal            = Column(String(100))
    latitude          = Column(Float)
    longitude         = Column(Float)
    bbox              = Column(JSON)                           # [W, S, E, N]
    baseline_year     = Column(Integer)
    baseline_area_ha  = Column(Float)
    current_area_ha   = Column(Float)
    area_change_ha    = Column(Float, default=0)
    change_pct        = Column(Float, default=0)
    alert_level       = Column(String(20), default="Stable")  # Stable | Moderate | High | Critical
    baseline_image_url= Column(Text, nullable=True)
    last_scanned      = Column(DateTime(timezone=True), nullable=True)
    created_at        = Column(DateTime(timezone=True), server_default=func.now())

    scan_results  = relationship("ScanResult", back_populates="lake")
    observations  = relationship("Observation", back_populates="lake")
    complaints    = relationship("Complaint", back_populates="lake")

class ScanResult(Base):
    __tablename__ = "scan_results"
    id              = Column(String, primary_key=True, default=gen_uuid)
    lake_id         = Column(String(50), ForeignKey("lakes.id"))
    scan_date       = Column(String(30))
    satellite       = Column(String(50), default="Sentinel-2")
    new_area_ha     = Column(Float)
    change_ha       = Column(Float)
    change_pct      = Column(Float)
    alert_level     = Column(String(20))
    baseline_img_url= Column(Text, nullable=True)
    new_img_url     = Column(Text, nullable=True)
    change_map_url  = Column(Text, nullable=True)
    report_pdf_url  = Column(Text, nullable=True)
    raw_data        = Column(JSON, default=dict)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())

    lake = relationship("Lake", back_populates="scan_results")

class Observation(Base):
    __tablename__ = "observations"
    id           = Column(String, primary_key=True, default=gen_uuid)
    user_id      = Column(String, ForeignKey("users.id"), nullable=True)
    lake_id      = Column(String(50), ForeignKey("lakes.id"))
    concern_type = Column(String(100))
    description  = Column(Text, nullable=False)
    location_note= Column(Text, nullable=True)
    priority     = Column(String(20), default="Medium")
    photos       = Column(JSON, default=list)
    email_updates= Column(Boolean, default=True)
    sms_alerts   = Column(Boolean, default=False)
    status       = Column(String(30), default="Submitted")    # Submitted | Under Review | Resolved
    created_at   = Column(DateTime(timezone=True), server_default=func.now())

    lake = relationship("Lake", back_populates="observations")

class Complaint(Base):
    __tablename__ = "complaints"
    id               = Column(String, primary_key=True, default=gen_uuid)
    lake_id          = Column(String(50), ForeignKey("lakes.id"))
    observation_id   = Column(String, ForeignKey("observations.id"), nullable=True)
    filed_by         = Column(String(100), default="Anonymous")
    priority         = Column(String(10), default="MEDIUM")   # LOW | MEDIUM | HIGH
    issue            = Column(Text)
    photos_count     = Column(Integer, default=0)
    status           = Column(String(30), default="Pending")  # Pending | Under Review | Resolved
    assigned_officer = Column(String, ForeignKey("users.id"), nullable=True)
    created_at       = Column(DateTime(timezone=True), server_default=func.now())

    lake = relationship("Lake", back_populates="complaints")
    responses = relationship("ComplaintResponse", back_populates="complaint")

class ComplaintResponse(Base):
    __tablename__ = "complaint_responses"
    id           = Column(String, primary_key=True, default=gen_uuid)
    complaint_id = Column(String, ForeignKey("complaints.id"))
    officer_id   = Column(String, ForeignKey("users.id"))
    template     = Column(String(100))
    message_body = Column(Text)
    send_sms     = Column(Boolean, default=True)
    sent_at      = Column(DateTime(timezone=True), server_default=func.now())

    complaint = relationship("Complaint", back_populates="responses")

class FieldVerification(Base):
    __tablename__ = "field_verifications"
    id             = Column(String, primary_key=True, default=gen_uuid)
    lake_id        = Column(String(50), ForeignKey("lakes.id"), nullable=True)
    complaint_id   = Column(String, ForeignKey("complaints.id"), nullable=True)
    scheduled_date = Column(String(30))
    team_name      = Column(String(100))
    description    = Column(Text)
    status         = Column(String(20), default="Scheduled") # Scheduled | Pending | Completed
    report_url     = Column(Text, nullable=True)
    officer_id     = Column(String, ForeignKey("users.id"), nullable=True)
    created_at     = Column(DateTime(timezone=True), server_default=func.now())

class SystemSetting(Base):
    __tablename__ = "system_settings"
    key        = Column(String(100), primary_key=True)
    value      = Column(Text, nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
