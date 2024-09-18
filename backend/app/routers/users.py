from typing import Optional
from fastapi import APIRouter, Depends, UploadFile

from models import RoleEnum, UserInDB
from schemas import BaseProfileUpdate, ArtisanProfileUpdate, SupplierProfileUpdate
from utils import get_collection_by_role, get_current_user, upload_to_cloudinary

router = APIRouter()


def get_profile_class(user_role):
    if user_role == RoleEnum.customer:
        profile_class = BaseProfileUpdate
    elif user_role == RoleEnum.supplier:
        profile_class = SupplierProfileUpdate
    elif user_role in [RoleEnum.artisan, RoleEnum.admin]:
        profile_class = ArtisanProfileUpdate

    return profile_class

@router.patch("/profile/update")
async def profile(
    firstName: str,
    lastName: str,
    username: str,
    address: str,
    phone_number: str,
    min_service_rate: int,
    max_service_rate: int,
    services: list,
    business_name: str,
    qualification_file: UploadFile,
    user: UserInDB = Depends(get_current_user),
):
    update_data = {
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "address": address,
        "phone_number": phone_number,
        "min_service_rate": min_service_rate,
        "max_service_rate": max_service_rate,
        "services": services.split(",") if services else None,
        "business_name": business_name
    }
    update_data = {k: v for k, v in update_data.items() if v is not None}
    print(update_data, qualification_file)
    profile_class = get_profile_class(user.role)

    if user.role == RoleEnum.artisan and qualification_file:
        cloudinary_url = await upload_to_cloudinary(qualification_file)
        update_data["qualification_file"] = cloudinary_url

    print(update_data, "update_data")

    collection = get_collection_by_role(user.role)
    await collection.update_one(
        {"email": user.email},
        {"$set": update_data}
    )

    profile_data = await collection.find_one({"email": user.email})
    return profile_class(**profile_data)

@router.get("/profile")
async def profile(
    user: UserInDB = Depends(get_current_user),
):
    profile_class = get_profile_class(user.role)
    collection = get_collection_by_role(user.role)
    user_data = await collection.find_one({"email": user.email})

    return profile_class(**user_data)
