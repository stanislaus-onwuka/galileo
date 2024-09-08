from datetime import datetime
from enum import Enum
from typing import List, Optional

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


# Base user
class User(BaseModel):
    id: str = Field(alias="_id")
    firstName: str = Field(..., min_length=3, max_length=50)
    lastName: str = Field(..., min_length=3, max_length=50)
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: RoleEnum

    address: Optional[str] = None
    location: Optional[Coordinates] = Coordinates(latitude=6.5158, longitude=3.3898)
    distance: Optional[float] = None
    phone_number: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

    @validator('id', pre=True)
    def objectid_to_str(cls, id):
        return str(id) if isinstance(id, ObjectId) else id


class UserInDB(User):
    hashed_password: str = None


class Guarantor(BaseModel):
    first_name: str = Field(..., min_length=3, max_length=50)
    last_name: str = Field(..., min_length=3, max_length=50)
    phone_number: str = Field(..., min_length=10, max_length=15)
    user_id: str = Field(...)

# ============================
# Profile Models
# ============================


class BaseProfile(BaseModel):
    firstName: Optional[str] = Field(None, min_length=3, max_length=50)
    lastName: Optional[str] = Field(None, min_length=3, max_length=50)
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    location: Optional[Coordinates] = Coordinates(latitude=6.5158, longitude=3.3898)
    distance: Optional[float] = None
    phone_number: Optional[str] = None


class CustomerProfile(BaseProfile):
    preferences: Optional[List[str]] = None


class ArtisanProfile(BaseProfile):
    rating_score: float = 0
    min_service_rate: Optional[int] = 0
    max_service_rate: Optional[int] = 0
    services: Optional[list] = []
    business_name: Optional[str] = Field(None, min_length=3, max_length=100)


class SupplierProfile(BaseProfile):
    ...


# ============================
# Service Request and Job Models
# ============================

class ServiceRequest(BaseModel):
    id: str = Field(None, alias="_id")
    client_id: str = None
    artisan_id: str = None
    service_type: str
    price_offer: float
    description: Optional[str] = None
    status: JobStatus = JobStatus.pending
    date_time: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

    @validator('id', pre=True)
    def objectid_to_str(cls, id):
        return str(id) if isinstance(id, ObjectId) else id


class Job(BaseModel):
    id: str = Field(None, alias="_id")
    client_id: str
    artisan_id: str
    client_name: str
    service_type: str
    price_offer: float
    description: Optional[str] = None
    status: JobStatus = JobStatus.pending
    date_time: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

    @validator('id', pre=True)
    def objectid_to_str(cls, id):
        return str(id) if isinstance(id, ObjectId) else id
