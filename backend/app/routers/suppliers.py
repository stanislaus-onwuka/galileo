from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/dashboard")
async def supplier_dashboard():
    return {"message": "Welcome to the supplier dashboard"}
