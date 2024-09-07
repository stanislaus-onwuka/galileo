from bson import ObjectId

from fastapi import HTTPException, Path
from fastapi import APIRouter, Depends

from database import artisans_collection
from models import ArtisanProfileUpdate, RoleEnum, UserInDB
from utils import require_roles


router = APIRouter()


async def get_artisans_collection():
    return artisans_collection


@router.get("/dashboard")
async def admin_dashboard():
    return {"message": "Welcome to the admin dashboard"}


@router.patch("/artisan/{artisan_id}", response_model=ArtisanProfileUpdate)
async def update_artisan_profile(
    profile_data: ArtisanProfileUpdate,
    artisan_id: str = Path(..., description="The ID of the artisan to update"),
    _: UserInDB = Depends(require_roles([RoleEnum.admin])),
):
    # Find the artisan by ID
    artisan_id = ObjectId(artisan_id)
    artisan = await artisans_collection.find_one({"_id": artisan_id})

    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    # Update the artisan profile
    updated_data = profile_data.model_dump(exclude_unset=True)
    await artisans_collection.update_one({"_id": artisan_id}, {"$set": updated_data})

    # Fetch the updated profile
    updated_artisan = await artisans_collection.find_one({"_id": artisan_id})
    return ArtisanProfileUpdate(**updated_artisan)
