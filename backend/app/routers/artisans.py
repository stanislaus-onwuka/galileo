import math
from typing import List
from bson import ObjectId

from fastapi import APIRouter, Depends, HTTPException, Path

from database import artisans_collection, jobs_collection, service_requests_collection
from models import ArtisanProfile, Coordinates, Job, RoleEnum, ServiceRequest, UserInDB
from utils import get_current_active_user, require_roles

router = APIRouter()


def get_artisans_collection():
    return artisans_collection


@router.get("/dashboard")
async def artisan_dashboard():
    return {"message": "Welcome to the artisan dashboard"}


@router.get("/all", response_model=list[ArtisanProfile])
async def get_all_artisans(
    collection=Depends(get_artisans_collection)
):
    return await collection.find().to_list(length=None)


@router.get("/profile/{artisan_id}", response_model=ArtisanProfile)
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
    current_user: UserInDB = Depends(
        require_roles([RoleEnum.artisan, RoleEnum.admin])
    ),
):
    return await jobs_collection.find({"artisan_id": current_user.id}).to_list(None)


def calculate_distance(coord1: Coordinates, coord2: Coordinates) -> float:
    R = 6371  # Earth's radius in kilometers
    lat1, lon1 = math.radians(coord1.latitude), math.radians(coord1.longitude)
    lat2, lon2 = math.radians(coord2.latitude), math.radians(coord2.longitude)
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * \
        math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c


@router.get("/recommend-artisans", response_model=List[ArtisanProfile])
async def recommend_artisans(current_user: UserInDB = Depends(get_current_active_user), max_distance: float = 50, limit: int = 10):
    if not current_user.location:
        raise HTTPException(status_code=400, detail="User location not set")

    artisans = list(artisans_collection.find({"role": "artisan"}))

    # Calculate distances and filter artisans
    artisans_with_distance = []
    for artisan in artisans:
        if "location" in artisan and artisan["location"]:
            distance = calculate_distance(
                current_user.location, Coordinates(**artisan["location"]))
            if distance <= max_distance:
                artisans_with_distance.append(
                    {**artisan, "distance": distance})

    # Sort artisans by rating (descending) and distance (ascending)
    sorted_artisans = sorted(
        artisans_with_distance,
        key=lambda x: (-x.get("rating", 0), x["distance"])
    )

    # Limit the number of results
    recommended_artisans = sorted_artisans[:limit]

    return [ArtisanProfile(**artisan) for artisan in recommended_artisans]
