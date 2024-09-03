from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/dashboard")
async def admin_dashboard():
    return {"message": "Welcome to the admin dashboard"}
