import os

from datetime import datetime, timezone
from typing import List
from bson import ObjectId
from dotenv import load_dotenv

from fastapi import APIRouter, Depends, HTTPException, Path, BackgroundTasks

from database import artisans_collection, jobs_collection, service_requests_collection
from models import Coordinates, Job, JobStatus, RoleEnum, ServiceRequest, UserInDB
from utils import calculate_distance, get_current_user, require_roles, send_email
from schemas import ArtisanProfileResponse, ArtisanRating, ServiceRequestResponse

load_dotenv()  # load environment variables
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

router = APIRouter()


def get_artisans_collection():
    return artisans_collection


@router.get("/dashboard")
async def artisan_dashboard():
    return {"message": "Welcome to the artisan dashboard"}


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


@router.post("/request-service/{artisan_id}", response_model=ServiceRequestResponse)
async def request_service(
    artisan_id: str,
    request: ServiceRequest,
    background_tasks: BackgroundTasks,
    user: UserInDB = Depends(get_current_user),
):
    # Validate artisan exists
    artisan = await artisans_collection.find_one({"_id": ObjectId(artisan_id)})
    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    req_data = {
        **request.model_dump(exclude_unset=True),
        "client_id": user.id,
        "artisan_id": artisan_id,
        "date_time": datetime.now(timezone.utc)
    }
    new_req = await service_requests_collection.insert_one(req_data)

    subject = "New Service Request"
    request_time = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    content = f"""
    A new service request has been created:
    
    Time: {request_time}

    Client: {user.firstName} {user.lastName}

    Artisan: {artisan['firstName']} {artisan['lastName']}
    Artisan Email: {artisan.get("email", "N/A")}
    Artisan Phone: {artisan.get("phoneNumber", "N/A")}

    Service Type: {request.service_type}
    Price Offer: ₦{request.price_offer}
    Description: {request.description or "N/A"}
    """

    # Send email notification to admin
    background_tasks.add_task(send_email, ADMIN_EMAIL, subject, content)
    return await service_requests_collection.find_one({"_id": new_req.inserted_id})


@router.get("/jobs", response_model=list[Job])
async def get_artisan_jobs(
    user: UserInDB = Depends(
        require_roles([RoleEnum.artisan, RoleEnum.admin])
    ),
):
    return await jobs_collection.find({"artisan_id": user.id}).to_list(None)


@router.get("/recommend", response_model=List[ArtisanProfileResponse])
async def recommend_artisans(
    user: UserInDB = Depends(get_current_user),
    max_distance: float = 50,
    limit: int = 20
):
    if not user.location:
        raise HTTPException(status_code=400, detail="User location not set")

    # Query artisans without using coordiantes
    artisans_cursor = artisans_collection.find({
        "location": {"$exists": True},
    })

    # Calculate distances and filter artisans
    artisans_with_distance = []
    async for artisan in artisans_cursor:
        artisan_location = Coordinates(**artisan["location"])
        distance = calculate_distance(user.location, artisan_location)
        # If artisan is within the specified max_distance, add to list
        if distance <= max_distance:
            artisan_data = {
                **artisan,
                "id": str(artisan["_id"]),
                "distance": distance
            }
            artisans_with_distance.append(artisan_data)

    # Sort artisans by closest distance and apply limit
    sorted_artisans = sorted(artisans_with_distance, key=lambda x: x["distance"])
    return sorted_artisans[:limit]


@router.post("/review/{artisan_id}")
async def rate_artisan(
    artisan_id: str,
    rating: ArtisanRating,
    user: UserInDB = Depends(get_current_user)
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
    artisan = await artisans_collection.find_one_and_update(
        {"_id": ObjectId(artisan_id)},
        {
            "$inc": {
                "total_ratings": rating.rating,
                "rating_count": 1
            }
        },
        return_document=True
    )
    if not artisan:
        raise HTTPException(status_code=404, detail="Artisan not found")

    # Calculate and update new rating score
    new_score = round(artisan["total_ratings"] / artisan["rating_count"], 1)
    await artisans_collection.update_one(
        {"_id": ObjectId(artisan_id)},
        {"$set": {"avg_rating": new_score}}
    )

    return {"message": "Artisan rated successfully"}
