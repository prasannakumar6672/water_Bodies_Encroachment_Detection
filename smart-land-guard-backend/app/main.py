from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth, lakes, observations, complaints, admin, scan
from app.routers.complaints import router_v  # verifications

# Create all DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Land Guard API",
    description="Water Bodies Encroachment Detection System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ── Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Include routers
PREFIX = "/api/v1"
app.include_router(auth.router,         prefix=PREFIX)
app.include_router(lakes.router,        prefix=PREFIX)
app.include_router(observations.router, prefix=PREFIX)
app.include_router(complaints.router,   prefix=PREFIX)
app.include_router(router_v,            prefix=PREFIX)
app.include_router(scan.router,         prefix=PREFIX)
app.include_router(admin.router,        prefix=PREFIX)

@app.get("/")
def root():
    return {
        "name": "Smart Land Guard API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "ok"}
