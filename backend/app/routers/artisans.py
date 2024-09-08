from typing import List
from bson import ObjectId

from fastapi import APIRouter, Depends, HTTPException, Path, Query

from database import artisans_collection, jobs_collection, service_requests_collection
from models import Coordinates, Job, JobStatus, RoleEnum, ServiceRequest, UserInDB
from utils import calculate_distance, get_current_active_user, require_roles, sort_artisans_key
from schemas import ArtisanProfileResponse, ArtisanRating

router = APIRouter()


def get_artisans_collection():
    return artisans_collection


@router.get("/dashboard")
async def artisan_dashboard():
    return {"message": "Welcome to the artisan dashboard"}


@router.get("/all", response_model=list[ArtisanProfileResponse])
async def get_all_artisans(
    collection=Depends(get_artisans_collection)
):
    return await collection.find().to_list(length=None)


@router.get("/profile/{artisan_id}", response_model=ArtisanProfileResponse)
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


@router.get("/recommend", response_model=List[ArtisanProfileResponse])
async def recommend_artisans(
    user: UserInDB = Depends(get_current_active_user),
    max_distance: float = 50,
    limit: int = 20
):
    if not user.location:
        raise HTTPException(status_code=400, detail="User location not set")

    # Query artisans without using geospatial features
    artisans_cursor = artisans_collection.find({
        "location": {"$exists": True},
    })

    # Calculate distances and filter artisans
    artisans_with_distance = []
    async for artisan in artisans_cursor:
        artisan_location = Coordinates(**artisan["location"])
        distance = calculate_distance(user.location, artisan_location)
        # If artist is within the specified max_distance, add to list
        if distance <= max_distance:
            artisan_data = {
                **artisan,
                "id": str(artisan["_id"]),
                "distance": distance
            }
            artisans_with_distance.append(artisan_data)

    # Sort artists by closest distance and apply limit
    sorted_artisans = sorted(artisans_with_distance, key=lambda x: x["distance"])
    return sorted_artisans[:limit]


@router.post("/review/{artisan_id}")
async def rate_artisan(
    artisan_id: str,
    rating: ArtisanRating,
    user: UserInDB = Depends(get_current_active_user)
):
    # Verify job exists, belongs to user, and is completed
    job = await jobs_collection.find_one({
        "artisan_id": artisan_id,
        "client_id": user.id,
        "status": JobStatus.successful
    })
    if not job:
        raise HTTPException(
            status_code=404,
            detail="You can't rate this artisan as they haven't completed a job for you."
        )

    # Update artisan's rating
    updated_artisan = await artisans_collection.find_one_and_update(
        {"_id": ObjectId(artisan_id)},
        {
            "$inc": {
                "total_ratings": rating.rating,
                "rating_count": 1
            }
        },
        return_document=True
    )
    if not updated_artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    # Calculate and update new rating score
    new_score = round(updated_artisan["total_ratings"] / updated_artisan["rating_count"], 1)
    await artisans_collection.update_one(
        {"_id": ObjectId(artisan_id)},
        {"$set": {"avg_rating": new_score}}
    )

    return {"message": "Artisan rated successfully"}


@router.get("/filter", response_model=List[ArtisanProfileResponse])
async def filter_artisans(
    user: UserInDB = Depends(get_current_active_user),
    address: str = Query(None, description="Address to search"),
    km: float = Query(float('inf'), description="Proximity in kilometers"),
    price_from: int = Query(None, description="Minimum service rate"),
    price_to: int = Query(None, description="Maaximum service rate"),
    avg_rating: float = Query(None, ge=0, le=5, description="Artisan rating"),
    limit: int = Query(20, description="Maximum number of results to return")
):
    query = {"location": {"$exists": True}}

    if avg_rating is not None:
        query["avg_rating"] = {"$gte": avg_rating}

    if address:
        query["address"] = {"$regex": address, "$options": "i"}

    if price_from is not None:
        query["min_service_rate"] = {"$lte": float(price_to)}

    if price_to is not None:
        query["max_service_rate"] = {"$gte": float(price_from)}

    artisans_cursor = artisans_collection.find(query)

    filtered_artisans = []
    async for artisan in artisans_cursor:
        artisan_location = Coordinates(**artisan["location"])
        if user.location:
            distance = calculate_distance(user.location, artisan_location)
            if distance <= km:
                artisan["distance"] = distance
                filtered_artisans.append(artisan)
        else:
            artisan["distance"] = None
            filtered_artisans.append(artisan)

    sorted_artisans = sorted(
        filtered_artisans,
        key=lambda x: sort_artisans_key(x, avg_rating)
    )

    return sorted_artisans[:limit]
