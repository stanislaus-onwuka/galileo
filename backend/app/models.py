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
    latitude: Optional[float]
    longitude: Optional[float]


# Base user
class User(BaseModel):
    id: str = Field(alias="_id")
    firstName: str = Field(..., min_length=3, max_length=50)
    lastName: str = Field(..., min_length=3, max_length=50)
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: RoleEnum
    location: Optional[Coordinates] = [0, 0]

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
    firstName: str = Field(None, min_length=3, max_length=50)
    lastName: str = Field(None, min_length=3, max_length=50)
    phone_number: Optional[str] = Field(None, description="User's phone number")
    address: Optional[str] = Field(None, description="User's address")
    location: Optional[Coordinates]
    distance: float = None


class CustomerProfile(BaseProfile):
    preferences: Optional[List[str]] = None


class ArtisanProfile(BaseProfile):
    min_rate: Optional[int] = None
    max_rate: Optional[int] = None
    rating: float = 0
    services: Optional[list] = None
    business_name: Optional[str] = Field(None, min_length=3, max_length=100)


class SupplierProfile(ArtisanProfile):
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
