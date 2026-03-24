from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.database import get_db
from app.models.models import User, OfficerRegistration
from app.auth import hash_password, verify_password, create_access_token, get_current_user
import uuid

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = "public"

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = None

class OfficerRegisterRequest(BaseModel):
    name: str
    email: str
    department: str
    designation: str
    region: str
    documents: Optional[list] = []

@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if user.status == "Suspended":
        raise HTTPException(status_code=403, detail="Account suspended")
    if user.role != req.role:
        raise HTTPException(status_code=403, detail=f"This account is not a {req.role} account")

    token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "phone": user.phone,
        }
    }

@router.post("/register", status_code=201)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=409, detail="Email already registered")
    user = User(
        id=str(uuid.uuid4()),
        name=req.name,
        email=req.email,
        password=hash_password(req.password),
        phone=req.phone,
        role="public"
    )
    db.add(user)
    db.commit()
    return {"message": "Registration successful. You can now login."}

@router.post("/register/officer", status_code=201)
def register_officer(req: OfficerRegisterRequest, db: Session = Depends(get_db)):
    from datetime import date
    reg = OfficerRegistration(
        id=str(uuid.uuid4()),
        name=req.name,
        email=req.email,
        department=req.department,
        designation=req.designation,
        region=req.region,
        applied_date=str(date.today()),
        documents=req.documents
    )
    db.add(reg)
    db.commit()
    return {"message": "Application submitted. Pending admin approval."}

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "phone": current_user.phone,
    }
