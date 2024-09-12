from datetime import datetime
from typing import Optional

from bson import ObjectId
from models import Coordinates, RoleEnum, ServiceRequest
from pydantic import BaseModel, EmailStr, Field, validator


class BaseModelWithID(BaseModel):
    id: str = Field(alias="_id")

    @validator('id', pre=True)
    def objectid_to_str(cls, v):
        return str(v) if isinstance(v, ObjectId) else v

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}


# ================================
# User Models
# ================================
class UserResponse(BaseModel):
    username: str
    email: EmailStr
    role: RoleEnum
    access_token: Optional[str] = None


class LoginForm(BaseModel):
    email: str
    password: str


# ================================
# Profile Models
# ================================
class BaseProfileResponse(BaseModelWithID):
    username: str
    firstName: str
    lastName: str
    role: RoleEnum
    address: Optional[str] = None
    location: Coordinates = Coordinates(latitude=6.5158, longitude=3.3898)
    phone_number: Optional[str] = None


class ArtisanProfileResponse(BaseProfileResponse):
    rating_count: float = 0
    avg_rating: float = 0
    services: Optional[list[str]] = []
    min_service_rate: Optional[int] = 0
    max_service_rate: Optional[int] = 0
    business_name: Optional[str] = None


# ================================
# Ratings and Service Requests
# ================================
class ArtisanRating(BaseModel):
    rating: float = Field(..., ge=0, le=5)
    comment: Optional[str] = None


class ServiceRequestResponse(BaseModelWithID, ServiceRequest):
    client_id: str
    artisan_id: str
    date_time: datetime


# ================================
# Admin Actions
# ================================
class AdminResponse(BaseModel):
    action: str
    reason: Optional[str] = None


# ================================
# Profile Updates
# ================================
class BaseProfileUpdate(BaseModel):
    firstName: Optional[str] = Field(None, min_length=3, max_length=50)
    lastName: Optional[str] = Field(None, min_length=3, max_length=50)
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    location: Optional[Coordinates] = Coordinates(
        latitude=6.5158, longitude=3.3898
    )
    phone_number: Optional[str] = None


class ArtisanProfileUpdate(BaseProfileUpdate):
    min_service_rate: Optional[int] = 0
    max_service_rate: Optional[int] = 0
    services: Optional[list[str]] = []
    business_name: Optional[str] = Field(None, min_length=3, max_length=100)


class SupplierProfileUpdate(ArtisanProfileUpdate):
    pass
