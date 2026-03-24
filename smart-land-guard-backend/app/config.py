from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_env: str = "development"
    app_port: int = 8000
    frontend_url: str = "http://localhost:5173"

    jwt_secret: str = "smartlandguard_super_secret_key_2026"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 120

    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""

    sentinel_hub_client_id: str = ""
    sentinel_hub_client_secret: str = ""

    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""

    sendgrid_api_key: str = ""
    sendgrid_from_email: str = "alerts@smartlandguard.gov.in"

    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
