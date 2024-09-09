from datetime import datetime
from typing import Optional

from bson import ObjectId
from models import Coordinates, RoleEnum, ServiceRequest
from pydantic import BaseModel, EmailStr, Field, validator


class UserResponse(BaseModel):
    username: str
    email: EmailStr
    role: RoleEnum
    access_token: Optional[str] = None


class UserSignupInput(BaseModel):
    firstName: str = Field(..., min_length=3, max_length=50)
    lastName: str = Field(..., min_length=3, max_length=50)
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: RoleEnum
    guarantor_firstName: str = Field(..., min_length=3, max_length=50)
    guarantor_lastName: str = Field(..., min_length=3, max_length=50)
    guarantor_phoneNumber: str = Field(..., min_length=10, max_length=15)


class BaseProfileResponse(BaseModel):
    id: str  = Field(alias="_id")
    username: str
    firstName: str
    lastName: str
    role: RoleEnum
    address: Optional[str] = None
    location: Coordinates = Coordinates(latitude=6.5158, longitude=3.3898)
    phone_number: Optional[str] = None

    @validator('id', pre=True)
    def objectid_to_str(cls, id):
        return str(id) if isinstance(id, ObjectId) else id


class ArtisanProfileResponse(BaseProfileResponse):
    rating_count: float = 0
    avg_rating: float = 0
    services: Optional[list] = []
    min_service_rate: Optional[int] = 0
    max_service_rate: Optional[int] = 0
    business_name: Optional[str] = None


class ArtisanRating(BaseModel):
    rating: float = Field(..., ge=0, le=5)
    comment: Optional[str] = None


class ServiceRequestResponse(ServiceRequest):
    id: str  = Field(alias="_id")
    client_id: str
    artisan_id: str
    date_time: datetime

    @validator('id', pre=True)
    def objectid_to_str(cls, id):
        return str(id) if isinstance(id, ObjectId) else id


class AdminResponse(BaseModel):
    action: str
    reason: Optional[str] = None
