from fastapi import APIRouter, Depends

from models import RoleEnum, UserInDB
from schemas import BaseProfileUpdate, ArtisanProfileUpdate, SupplierProfileUpdate
from utils import get_collection_by_role, get_current_user

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
    profile_update: BaseProfileUpdate,
    user: UserInDB = Depends(get_current_user),
):
    profile_class = get_profile_class(user.role)
    # profile = profile_class(**profile_update.model_dump())
    print("=== "*100, profile_update, {**profile_update.model_dump()})

    collection = get_collection_by_role(user.role)
    # await collection.update_one(
    #     {"email": user.email},
    #     {"$set": {**profile_update.model_dump()}}
    # )

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
