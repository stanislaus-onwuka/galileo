from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from enum import Enum


class LoginForm(BaseModel):
    username: str
    password: str

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
    email: EmailStr = Field(..., unique=True)
    password: str = Field(..., min_length=6)
    role: RoleEnum


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


