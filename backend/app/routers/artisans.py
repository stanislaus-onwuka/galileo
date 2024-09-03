from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/dashboard")
async def artisan_dashboard():
    return {"message": "Welcome to the artisan dashboard"}

@router.get("/all")
async def get_all_artisans():
    return {"message": "Welcome to the artisan dashboard"}


# /recommend 
# /recommend - artisans
# /profile
# /update-profile
