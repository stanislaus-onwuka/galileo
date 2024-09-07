from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from models import RoleEnum


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
