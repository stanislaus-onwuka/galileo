from bson import ObjectId

from fastapi import APIRouter, HTTPException, Path

from database import artisans_collection
from models import ArtisanProfileUpdate

router = APIRouter()


@router.get("/dashboard")
async def artisan_dashboard():
    return {"message": "Welcome to the artisan dashboard"}


@router.get("/all")
async def get_all_artisans():
    return {"message": "Welcome to the artisan dashboard"}


@router.get("/{artisan_id}", response_model=ArtisanProfileUpdate)
async def artisan_profile(
    artisan_id: str = Path(..., description="The ID of the artisan to update"),
):
    # Find the artisan by ID
    artisan_id = ObjectId(artisan_id)
    artisan = await artisans_collection.find_one({"_id": artisan_id})

    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    return ArtisanProfileUpdate(**artisan)


# /recommend 
# /recommend - artisans
# /profile
# /update-profile
