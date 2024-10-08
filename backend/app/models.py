from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field, validator


# ============================
# Enums
# ============================
class RoleEnum(str, Enum):
    admin = "admin"
    artisan = "artisan"
    customer = "customer"
    supplier = "supplier"


class JobStatus(str, Enum):
    pending = "pending"
    successful = "successful"
    in_progress = "in-progress"
    cancelled = "cancelled"


# ============================
# User Related Models
# ============================
class Coordinates(BaseModel):
    # defaults to UNILAG coordinates
    latitude: Optional[float] = 6.5158
    longitude: Optional[float] = 3.3898


class User(BaseModel):
    id: str = Field(None, alias="_id")
    firstName: str = Field(..., min_length=3, max_length=50)
    lastName: str = Field(..., min_length=3, max_length=50)
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    email: EmailStr
    role: RoleEnum

    address: Optional[str] = None
    location: Optional[Coordinates] = Coordinates(latitude=6.5158, longitude=3.3898)
    phone_number: Optional[str] = None

    @validator('id', pre=True)
    def objectid_to_str(cls, v):
        return str(v) if isinstance(v, ObjectId) else v

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}


class UserInDB(User):
    hashed_password: str = None
    qualification_file: str = None
    recommended_artisans: list = []
    last_recommendation_update: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Guarantor(BaseModel):
    user_id: str
    first_name: str = Field(..., min_length=3, max_length=50)
    last_name: str = Field(..., min_length=3, max_length=50)
    phone_number: str = Field(..., min_length=10, max_length=14)


# ============================
# Service Request and Job Models
# ============================
class ServiceRequest(BaseModel):
    service_type: str
    price_offer: float
    description: Optional[str] = None


class Job(BaseModel):
    client_id: str
    artisan_id: str
    request_id: str
    client_name: str
    service_type: str
    price_offer: float
    description: Optional[str] = None
    status: JobStatus = JobStatus.pending
    date_time: datetime = Field(datetime.now(timezone.utc))


class Transaction(BaseModel):
    job_id: ObjectId
    client_id: ObjectId
    artisan_id: ObjectId
    service_requested: str
    paid_amount: float
    success: bool = False
    action: str = "credited"
    paid_at: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
