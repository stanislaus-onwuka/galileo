from bson import ObjectId
from typing import List, Optional
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from database import transactions_collection
from models import RoleEnum, UserInDB
from schemas import ArtisanProfileResponse, BaseProfileResponse, WalletResponse
from utils import get_collection_by_role, get_current_user, upload_to_cloudinary

router = APIRouter()


def get_response_class(user_role):
    privileged_roles = [RoleEnum.admin, RoleEnum.artisan, RoleEnum.supplier]
    return ArtisanProfileResponse if user_role in privileged_roles else BaseProfileResponse


@router.patch("/profile/update")
async def profile(
    address: str = Form(...),
    lastName: str = Form(...),
    firstName: str = Form(...),
    phone_number: str = Form(...),

    longitude: float = Form(None),
    latitude: float = Form(None),

    business_name: Optional[str] = Form(None),
    services: Optional[List[str]] = Form(None),
    qualification_file: UploadFile = File(None),
    min_service_rate: Optional[int] = Form(None),
    max_service_rate: Optional[int] = Form(None),

    user: UserInDB = Depends(get_current_user),
):
    # validate mandatory fields for artisans and suppliers
    if user.role in [RoleEnum.artisan, RoleEnum.supplier]:
        if not business_name:
            raise HTTPException(status_code=400, detail="Business name is required.")
        if not services:
            raise HTTPException(status_code=400, detail="Services are required.")
        if min_service_rate is None or max_service_rate is None:
            raise HTTPException(status_code=400, detail="Service rates are required.")

    if user.role == RoleEnum.artisan and not user.qualification_file and not qualification_file:
        raise HTTPException(status_code=400, detail="Qualification file is required.")

    update_data = {
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "phone_number": phone_number,
        "min_service_rate": min_service_rate,
        "max_service_rate": max_service_rate,
        "services": services or [],
        "business_name": business_name,
        "location": {"latitude": latitude, "longitude": longitude},
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
async def update_profile(
    user: UserInDB = Depends(get_current_user),
):
    profile_class = get_response_class(user.role)
    collection = get_collection_by_role(user.role)
    user_data = await collection.find_one({"email": user.email})

    return profile_class(**user_data)


@router.get('/wallet', response_model=WalletResponse)
async def wallet(user: UserInDB = Depends(get_current_user)):
    collection = get_collection_by_role(user.role)
    user_data = await collection.find_one({"_id": ObjectId(user.id)})
    user_id = ObjectId(user.id)

    # Fetch and format user transactions, including artisan info.
    # Match by user_id, lookup artisan details, add action and name fields, then sort by date.
    transactions_pipeline = [
    {"$match": {"$or": [{"client_id": user_id}, {"artisan_id": user_id}]}},
    {"$lookup": {"from": "artisans", "localField": "artisan_id", "foreignField": "_id", "as": "a"}},
    {"$addFields": {"action": {"$cond": [{"$eq": ["$artisan_id", user_id]}, "credited", "debited"]}, 
                    "artisan_name": {"$cond": [{"$eq": ["$artisan_id", user_id]}, "Self", 
                    {"$ifNull": [{"$arrayElemAt": ["$a.business_name", 0]}, 
                    {"$concat": [{"$arrayElemAt": ["$a.firstName", 0]}, " ", {"$arrayElemAt": ["$a.lastName", 0]}]}]}]}}},
    {"$sort": {"paid_at": -1}}
]

    transactions = await transactions_collection.aggregate(transactions_pipeline).to_list(None)

    return {"balance": user_data.get("balance", 0), "transactions": transactions}
