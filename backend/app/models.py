from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr = Field(..., unique=True)
    password: str = Field(..., min_length=6)

class UserInDB(User):
    hashed_password: str

class UserResponse(BaseModel):
    username: str
    email: EmailStr
    token: Optional[str] = None
