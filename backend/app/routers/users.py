from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile

from models import RoleEnum, UserInDB
from schemas import ArtisanProfileResponse, BaseProfileResponse, BaseProfileUpdate, SupplierProfileUpdate
from utils import get_collection_by_role, get_current_user, upload_to_cloudinary

router = APIRouter()


def get_response_class(user_role):
    privileged_roles = [RoleEnum.admin, RoleEnum.artisan, RoleEnum.supplier]
    return ArtisanProfileResponse if user_role in privileged_roles else BaseProfileResponse


@router.patch("/profile/update")
async def profile(
    firstName: str,
    lastName: str,
    address: str,
    phone_number: str,
    services: list = None,
    business_name: str = None,
    min_service_rate: int = None,
    max_service_rate: int = None,
    qualification_file: UploadFile = None,
    user: UserInDB = Depends(get_current_user),
):
    # Check for privileged users and validate mandatory fields
    if user.role in [RoleEnum.artisan, RoleEnum.supplier]:
        if not business_name:
            raise HTTPException(status_code=400, detail="Business name is required")
        if not services:
            raise HTTPException(status_code=400, detail="Services are required")
        if min_service_rate is None or max_service_rate is None:
            raise HTTPException(status_code=400, detail="Service rates are required")

    if user.role == RoleEnum.artisan and not user.qualification_file and not qualification_file:
        raise HTTPException(status_code=400, detail="Qualification file is required.")

    update_data = {
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "phone_number": phone_number,
        "min_service_rate": min_service_rate,
        "max_service_rate": max_service_rate,
        "services": services,
        "business_name": business_name
    }
    update_data = {k: v for k, v in update_data.items() if v is not None}

    if user.role == RoleEnum.artisan and qualification_file:
        cloudinary_url = await upload_to_cloudinary(qualification_file)
        update_data["qualification_file"] = cloudinary_url

    collection = get_collection_by_role(user.role)
    await collection.update_one(
        {"email": user.email},
        {"$set": update_data}
    )

    response_class = get_response_class(user.role)
    profile_data = await collection.find_one({"email": user.email})

    return response_class(**profile_data)


@router.get("/profile")
async def profile(
    user: UserInDB = Depends(get_current_user),
):
    profile_class = get_response_class(user.role)
    collection = get_collection_by_role(user.role)
    user_data = await collection.find_one({"email": user.email})

    return profile_class(**user_data)
