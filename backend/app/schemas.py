from pydantic import BaseModel, EmailStr
from typing import Optional
from models import RoleEnum


class UserResponse(BaseModel):
    username: str
    email: EmailStr
    role: RoleEnum
    token: Optional[str] = None
