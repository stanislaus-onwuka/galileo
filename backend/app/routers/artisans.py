import os

from datetime import datetime, timezone
from typing import List
from bson import ObjectId
from dotenv import load_dotenv

from fastapi import APIRouter, Depends, HTTPException, Path, BackgroundTasks, Query, Request

from services import PayStackSerivce
from database import artisans_collection, jobs_collection, service_requests_collection, transactions_collection
from models import Coordinates, Job, JobStatus, RoleEnum, ServiceRequest, UserInDB
from utils import (calculate_distance, generate_recommendations, get_cached_recommendations, get_current_user, get_user,
                   require_roles, send_email, sort_artisans_key, update_user_recommendations, verify_webhook_origin)
from schemas import ArtisanProfileResponse, ArtisanRating, PaystackWebhookPayload, ServiceRequestResponse

load_dotenv()  # load environment variables
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

router = APIRouter()


@router.get("/profile/{artisan_id}", response_model=ArtisanProfileResponse)
async def artisan_profile(
    artisan_id: str = Path(..., description="The ID of the artisan to update"),
    collection=Depends(lambda: artisans_collection)
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


@router.get("/requests", response_model=list[ServiceRequestResponse])
async def list_pending_service_requests(
    user: UserInDB = Depends(require_roles([RoleEnum.artisan]))
):
    return await service_requests_collection.find(
        {"status": {"$ne": "accepted"}, "client_id": user.id},
    ).to_list(length=None)


@router.get("/jobs", response_model=list[Job])
async def get_artisan_jobs(
    user: UserInDB = Depends(
        require_roles([RoleEnum.artisan, RoleEnum.admin])
    ),
):
    return await jobs_collection.find({"artisan_id": user.id}).to_list(None)


@router.get("/recommend", response_model=List[ArtisanProfileResponse])
async def recommend_artisans(
    background_tasks: BackgroundTasks,
    limit: int = 10,
    max_distance: float = 50,
    user: UserInDB = Depends(get_current_user),
):
    if not user.location:
        raise HTTPException(status_code=400, detail="User location not set")

    # Try to get cached recommendations
    recommended_artisans = await get_cached_recommendations(user, limit)

    # If no cached recommendations, generate new ones
    if not recommended_artisans:
        recommended_artisans = await generate_recommendations(user, max_distance, limit)

        # Update user's cached recommendations in the background
        background_tasks.add_task(
            update_user_recommendations, user, recommended_artisans)

    return recommended_artisans


@router.get("/filter", response_model=List[ArtisanProfileResponse])
async def filter_artisans(
    user: UserInDB = Depends(get_current_user),
    artisan_rating: float = Query(None, ge=0, le=5),
    location: str = Query(None, description="Address to search"),
    proximity: float = Query(100, description="Proximity in kilometers"),
    limit: int = Query(20, description="Maximum number of results to return")
):
    query = {"location": {"$exists": True}}

    if artisan_rating is not None:
        query["avg_rating"] = {"$gte": artisan_rating}

    if location:
        query["address"] = {"$regex": location, "$options": "i"}

    artisans_cursor = artisans_collection.find(query)

    filtered_artisans = []
    async for artisan in artisans_cursor:
        artisan_location = Coordinates(**artisan["location"])
        if user.location:
            distance = calculate_distance(user.location, artisan_location)
            if distance <= proximity:
                artisan["distance"] = distance
                filtered_artisans.append(artisan)
        else:
            artisan["distance"] = None
            filtered_artisans.append(artisan)

    sorted_artisans = sorted(
        filtered_artisans,
        key=lambda x: sort_artisans_key(x, artisan_rating)
    )

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


@router.get("/initialise-payment/{job_id}")
async def initialize_payment(
    job_id: str = Path(...),
    user: UserInDB = Depends(get_current_user)
):
    job = await jobs_collection.find_one({"_id": ObjectId(job_id), "client_id": user.id})

    if not job or job.get("status") == "paid":
        raise HTTPException(status_code=404, detail="Job not found")

    if job.get("status") != "completed":
        raise HTTPException(status_code=404, detail="Job not yet completed")

    if payment_url := PayStackSerivce.initialise_payment(
        job_id=job_id,
        email=user.email,
        amount=job.get("price_offer"),
    ):
        return {"payment_url": payment_url}

    return HTTPException(status_code=400, detail="Invalid request")



@router.post("/paystack-webhook")
async def paystack_webhook(request: Request, payload: PaystackWebhookPayload):
    # if verify_webhook_origin(request):
    payment_data = payload.data
    job_id = payment_data.get("metadata", {}).get("job_id")
    # handle successful service payment
    if payload.event in ["charge.success", "transfer.success"]:
        paid_amount = payment_data.get("amount")

        # save transaction to database
        await transactions_collection.insert_one(
            {
                "success": True,
                "job_id": job_id,
                "paid_amount": paid_amount,
                "paid_at": payment_data.get("paidAt"),
            }
        )

        # mark job status as paid
        await jobs_collection.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": {"status": "paid"}}
        )

        # update artisan balance
        job = await jobs_collection.find_one({"_id": ObjectId(job_id)})
        artisan_id = job.get("artisan_id")
        await artisans_collection.update_one(
            {"_id": ObjectId(artisan_id)},
            {"$inc": {"balance": paid_amount}}
        )

        return {"message": "Payment successful"}
    else:
        await transactions_collection.insert_one(
            {"success": False, "job_id": job_id}
        )

    return HTTPException(status_code=400, detail="Payment failed")
