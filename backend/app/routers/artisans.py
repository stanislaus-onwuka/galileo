from bson import ObjectId

from fastapi import APIRouter, Depends, HTTPException, Path

from database import artisans_collection
from models import ArtisanProfileUpdate

router = APIRouter()


def get_artisans_collection():
    return artisans_collection


@router.get("/dashboard")
async def artisan_dashboard():
    return {"message": "Welcome to the artisan dashboard"}


@router.get("/all", response_model=list[ArtisanProfileUpdate])
async def get_all_artisans(
    collection=Depends(get_artisans_collection)
):
    artisans = await collection.find().to_list(length=None)
    return [ArtisanProfileUpdate(**artisan) for artisan in artisans]


@router.get("/{artisan_id}", response_model=ArtisanProfileUpdate)
async def artisan_profile(
    artisan_id: str = Path(..., description="The ID of the artisan to update"),
    collection=Depends(get_artisans_collection)
):
    # Find the artisan by ID
    artisan_id = ObjectId(artisan_id)
    artisan = await collection.find_one({"_id": artisan_id})

    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    return ArtisanProfileUpdate(**artisan)


# /recommend
# /recommend - artisans
# /profile
# /update-profile
