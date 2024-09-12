import random
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, BackgroundTasks, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from pydantic import EmailStr

from models import User
from schemas import LoginForm, UserResponse
from utils import (create_access_token, get_collection_by_role, get_password_hash, get_user, send_email,
                   update_user_password, verify_password)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


async def authenticate_user(email: str, password: str) -> bool:
    user = await get_user(email, by_email=True)
    return user if user and verify_password(password, user.password) else False


# Routes
@router.post("/signup", response_model=UserResponse)
async def signup(user: User):
    # Check if the email is already registered in any collection
    if await get_user(user.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    if await get_user(user.email, by_email=True):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Insert user
    user_collection = get_collection_by_role(user.role)
    user_result = await user_collection.insert_one(
        {**user.model_dump(exclude={"password", "guarantor_firstName", "guarantor_lastName", "guarantor_phoneNumber"}), 
        "password": get_password_hash(user.password)}
    )

    # Generate auth access token and return response
    created_user = await user_collection.find_one({"_id": user_result.inserted_id})
    access_token = create_access_token(data={"sub": created_user["email"], "role": created_user["role"]})

    return UserResponse(
        username=created_user["username"],
        email=created_user["email"],
        role=created_user["role"],
        access_token=access_token
    )

@router.post("/login", response_model=UserResponse)
async def login(form_data: LoginForm):
    user: User = await authenticate_user(form_data.email, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    return UserResponse(username=user.username, email=user.email, role=user.role, access_token=access_token)


@router.post("/forgot-password")
async def request_otp(email: EmailStr, background_tasks: BackgroundTasks):
    user = await get_user(email, by_email=True)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    otp = random.randint(100000, 999999)
    hashed_otp = get_password_hash(str(otp))
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=15)

    # Update user with hashed OTP and expiration time
    collection = get_collection_by_role(user.role)
    await collection.update_one(
        {"email": email},
        {"$set": {"otp": hashed_otp, "otp_expiration": expiration_time}}
    )

    background_tasks.add_task(
        send_email,
        subject="Password Reset OTP",
        recipient_email=user.email,
        content=f"Your OTP is: {otp}"
    )

    return JSONResponse(content={"message": "OTP sent to email."})


@router.post("/verify-otp")
async def verify_otp(email: EmailStr, otp: int, new_password: str):
    user = await get_user(email, by_email=True)
    user_collection = get_collection_by_role(user.role)

    user_data = await user_collection.find_one({"email": user.email})
    stored_otp = user_data.get("otp")
    otp_expiration = user_data.get("otp_expiration")

    if not user or not stored_otp or not otp_expiration:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="No OTP request found")

    # Convert otp_expiration to UTC timezone
    otp_expiration = otp_expiration.replace(tzinfo=timezone.utc)
    if datetime.now(timezone.utc) > otp_expiration:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="OTP has expired")

    if not verify_password(str(otp), stored_otp):  # Verify the hashed OTP
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

    # OTP is valid, update the password
    hashed_password = get_password_hash(new_password)
    await update_user_password(email, hashed_password)

    # Clear the OTP fields
    await user_collection.update_one(
        {"email": email},
        {"$set": {"otp": None, "otp_expiration": None}}
    )

    return JSONResponse(content={"message": "Password updated successfully"})
