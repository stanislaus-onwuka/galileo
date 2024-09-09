from bson import ObjectId

from fastapi import BackgroundTasks, HTTPException, Path
from fastapi import APIRouter, Depends

from database import artisans_collection, jobs_collection, service_requests_collection
from models import ArtisanProfile, Job, RoleEnum, UserInDB
from schemas import AdminResponse, ServiceRequestResponse
from utils import get_user, require_roles, send_email


router = APIRouter()


async def get_artisans_collection():
    return artisans_collection


@router.get("/dashboard")
async def admin_dashboard():
    return {"message": "Welcome to the admin dashboard"}


@router.patch("/artisan/{artisan_id}", response_model=ArtisanProfile)
async def update_artisan_profile(
    profile_data: ArtisanProfile,
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

    return await artisans_collection.find_one({"_id": artisan_id})


@router.get("/requests/pending", response_model=list[ServiceRequestResponse])
async def list_pending_service_requests(
    _: UserInDB = Depends(require_roles([RoleEnum.admin]))
):
    return await service_requests_collection.find(
        {"status": {"$ne": "accepted"}},
    ).to_list(length=None)

