from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from enum import Enum


class RoleEnum(str, Enum):
    admin = "admin"
    artisan = "artisan"
    customer = "customer"
    supplier = "supplier"


class Coordinates(BaseModel):
    type: str = Field("Point")
    coordinates: List[float] = Field(..., description="List containing latitude and longitude")


# Base user
class User(BaseModel):
    firstName: str = Field(..., min_length=3, max_length=50)
    lastName: str = Field(..., min_length=3, max_length=50)
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: RoleEnum


class Guarantor(BaseModel):
    first_name: str = Field(..., min_length=3, max_length=50)
    last_name: str = Field(..., min_length=3, max_length=50)
    phone_number: str = Field(..., min_length=10, max_length=15)
    user_id: str = Field(...)


class UserInDB(User):
    hashed_password: str = None

# Customers  
class CustomerUpdate(BaseModel):
    firstName: Optional[str] = Field(..., min_length=3, max_length=50)
    lastName: Optional[str] = Field(..., min_length=3, max_length=50)
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=6)
    phone_number: Optional[str] = Field(None, description="User's phone number")
    address: Optional[str] = Field(None, description="User's address")
    location: Optional[Coordinates]


class ProfileUpdateBase(BaseModel):
    firstName: str = Field(None, min_length=3, max_length=50)
    lastName: str = Field(None, min_length=3, max_length=50)
    phone_number: Optional[str] = None
    address: Optional[str] = None


class CustomerProfileUpdate(ProfileUpdateBase):
    preferences: Optional[List[str]] = None


class ArtisanProfileUpdate(ProfileUpdateBase):
    min_rate: Optional[int] = None
    max_rate: Optional[int] = None
    services: Optional[list] = None
    business_name: Optional[str] = Field(..., min_length=3, max_length=100)


class SupplierProfileUpdate(ProfileUpdateBase):
    company_name: Optional[str] = None
    products: Optional[List[str]] = None
