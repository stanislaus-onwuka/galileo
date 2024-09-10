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
    firstName: str = Field(..., min_length=3, max_length=50)
    lastName: str = Field(..., min_length=3, max_length=50)
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    email: EmailStr
    role: RoleEnum

    address: Optional[str] = None
    location: Optional[Coordinates] = Coordinates(latitude=6.5158, longitude=3.3898)
    phone_number: Optional[str] = None



class UserInDB(User):
    hashed_password: str = None


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
