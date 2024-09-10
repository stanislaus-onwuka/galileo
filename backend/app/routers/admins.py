from bson import ObjectId

from fastapi import BackgroundTasks, HTTPException, Path
from fastapi import APIRouter, Depends

from database import artisans_collection, jobs_collection, service_requests_collection
from models import Job, RoleEnum, UserInDB
from schemas import AdminResponse, ArtisanProfileUpdate, ServiceRequestResponse
from utils import get_user, require_roles, send_email


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

    return await artisans_collection.find_one({"_id": artisan_id})


@router.get("/requests/pending", response_model=list[ServiceRequestResponse])
async def list_pending_service_requests(
    _: UserInDB = Depends(require_roles([RoleEnum.admin]))
):
    return await service_requests_collection.find(
        {"status": {"$ne": "accepted"}},
    ).to_list(length=None)


@router.post("/requests/{request_id}/respond", response_model=Job)
async def admin_respond_to_service_request(
    request_id: str,
    response: AdminResponse,
    background_tasks: BackgroundTasks,
    _: UserInDB = Depends(require_roles([RoleEnum.admin]))
):
    # Validate service request exists
    service_request = await service_requests_collection.find_one({"_id": ObjectId(request_id)})
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")

    # Check if the request is already accepted
    if service_request.get("status") == "accepted":
        job = await jobs_collection.find_one({"request_id": ObjectId(request_id)})
        if job:
            return job
        else:
            raise HTTPException(status_code=404, detail="Job not found for accepted service request")

    if response.action not in ["accept", "decline"]:
        raise HTTPException(status_code=400, detail="Invalid action. Must be 'accept' or 'decline'")

    if response.action == "accept":
        # Create a job
        client = await get_user(service_request["client_id"], by_id=True)
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")

        job_data = Job(
            client_id=service_request["client_id"],
            artisan_id=service_request["artisan_id"],
            client_name=f"{client.firstName} {client.lastName}",
            service_type=service_request["service_type"],
            price_offer=service_request["price_offer"],
            description=service_request.get("description"),
            request_id=request_id
        )

        new_job = await jobs_collection.insert_one(job_data.dict())
        created_job = await jobs_collection.find_one({"_id": new_job.inserted_id})

        # Update service request status
        await service_requests_collection.update_one(
            {"_id": ObjectId(request_id)},
            {"$set": {"status": "accepted"}}
        )

        # Notify artisan and client
        artisan = await artisans_collection.find_one({"_id": ObjectId(service_request["artisan_id"])})
        if artisan and artisan.get("email"):
            background_tasks.add_task(
                send_email,
                artisan["email"],
                "New Job Assigned",
                f"You have been assigned a new job for {service_request['service_type']}."
            )

        if client and client.email:
            background_tasks.add_task(
                send_email,
                client.email,
                "Service Request Accepted",
                f"Your service request for {service_request['service_type']} has been accepted."
            )

        return created_job

    else:  # decline
        # Notify client
        client = await get_user(service_request["client_id"], by_id=True)
        if client and client.email:
            background_tasks.add_task(
                send_email,
                client.email,
                "Service Request Declined",
                f"Your service request for {service_request['service_type']} has been declined. Reason: {response.reason or 'Not provided'}"
            )

        # Delete the service request
        await service_requests_collection.delete_one({"_id": ObjectId(request_id)})

        raise HTTPException(status_code=200, detail="Service request declined and deleted")
