from fastapi import APIRouter, Depends, HTTPException, status
from models import User, UserInDB, CustomerUpdate
from utils import get_password_hash
from database import customers_collection
from utils import get_current_active_user

router = APIRouter()

@router.get("/dashboard")
async def customer_dashboard():
    return {"message": "Welcome to the customer dashboard"}


@router.put("/update-customer-profile")
async def update_customer_details(
    user_update: CustomerUpdate,
    current_user: UserInDB = Depends(get_current_active_user)
):
    update_data = user_update.dict(exclude_unset=True)
    
    # Hash the password if it's being updated
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))

    # Update user data in the database
    updated_user = await customers_collection.find_one_and_update(
        {"_id": current_user.id},
        {"$set": update_data},
        return_document=True
    )
    
    if not updated_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return UserInDB(**updated_user)



# @router.post("/add-customer-location")
# async def add_location(location: UserLocation):
#     user_data = await users_collection.find_one({"username": location.username})
#     if not user_data:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     await users_collection.update_one(
#         {"username": location.username},
#         {"$set": {"location": location.location.dict()}}
#     )
    
#     return {"message": "Location updated successfully"}


# /profile
# /update-profile