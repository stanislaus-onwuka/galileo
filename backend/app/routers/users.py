from fastapi import APIRouter, Depends

from models import ArtisanProfile, BaseProfile, CustomerProfile, RoleEnum, SupplierProfile, UserInDB
from utils import get_collection_by_role, get_current_active_user

router = APIRouter()


@router.patch("/profile/update")
async def update_profile(
    profile_update: BaseProfile,
    current_user: UserInDB = Depends(get_current_active_user),
):
    if current_user.role == RoleEnum.customer:
        profile_class = CustomerProfile
    elif current_user.role == RoleEnum.supplier:
        profile_class = SupplierProfile
    elif current_user.role == RoleEnum.artisan:
        profile_class = ArtisanProfile

    # Validate the profile data
    validated_profile = profile_class(**profile_update.model_dump(exclude_unset=True))

    # # If the user is an artisan and qualifications are provided, handle the file upload
    # if current_user.role == RoleEnum.artisan and qualifications:
    #     file_location = f"uploads/{qualifications.filename}"
    #     with open(file_location, "wb+") as file_object:
    #         file_object.write(qualifications.file.read())
    #     # Add the file location to the validated profile data
    #     validated_profile.qualifications_file = file_location

    collection = get_collection_by_role(current_user.role)
    await collection.update_one(
        {"email": current_user.email},
        {"$set": validated_profile.model_dump(exclude_unset=True)}
    )

    updated_user = await collection.find_one({"email": current_user.email})
    return profile_class(**updated_user)
