from bson import ObjectId

from fastapi import APIRouter, Depends, HTTPException, Path

from database import artisans_collection, jobs_collection, service_requests_collection
from models import ArtisanProfileUpdate, Job, RoleEnum, ServiceRequest, UserInDB
from utils import get_current_active_user, require_roles

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
    return await collection.find().to_list(length=None)


@router.get("/profile/{artisan_id}", response_model=ArtisanProfileUpdate)
async def artisan_profile(
    artisan_id: str = Path(..., description="The ID of the artisan to update"),
    collection=Depends(get_artisans_collection)
):
    # Find the artisan by ID
    artisan_id = ObjectId(artisan_id)
    artisan = await collection.find_one({"_id": artisan_id})

    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    return artisan


@router.post("/request-service/{artisan_id}", response_model=ServiceRequest)
async def request_service(
    artisan_id: str,
    request: ServiceRequest,
    user: UserInDB = Depends(get_current_active_user),
):
    # Create service request
    request.client_id = user.id
    request.artisan_id = artisan_id
    req_data = request.model_dump(exclude_unset=True)
    new_req = await service_requests_collection.insert_one(req_data)

    # Create Job
    job_data = {
        **request.model_dump(exclude={"_id", "id"}),
        "client_name": f"{user.firstName} {user.lastName}"
    }
    await jobs_collection.insert_one(job_data)

    return await service_requests_collection.find_one({"_id": new_req.inserted_id})

@router.get("/jobs", response_model=list[Job])
async def get_artisan_jobs(
    current_user: UserInDB = Depends(require_roles([RoleEnum.artisan, RoleEnum.admin])),
):
    return await jobs_collection.find({"artisan_id": current_user.id}).to_list(None)

# /recommend
# /recommend - artisans
# /profile
# /update-profile
