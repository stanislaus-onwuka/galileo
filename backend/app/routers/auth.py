from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
# from fastapi.responses import RedirectResponse

from models import User, UserInDB, LoginForm, RoleEnum
from schemas import UserResponse
from utils import verify_password, get_password_hash, create_access_token, get_collection_by_role
from database import customers_collection, artisans_collection, suppliers_collection


router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_user(identifier: str, by_email: bool = False) -> UserInDB:
    collections = [customers_collection, artisans_collection, suppliers_collection]
    query_field = "email" if by_email else "username"

    for collection in collections:
        user = await collection.find_one({query_field: identifier})
        if user:
            return UserInDB(**user)


async def authenticate_user(username: str, password: str) -> bool:
    user = await get_user(username)
    return user if user and verify_password(password, user.password) else False


# Routes
@router.post("/signup", response_model=UserResponse)
async def signup(user: User):
    # Check if the email is already registered in any collection
    if await get_user(user.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    if await get_user(user.email, by_email=True):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user.password = get_password_hash(user.password)

    collection = get_collection_by_role(user.role)

    user = await collection.insert_one(user.model_dump())
    created_user = await collection.find_one({"_id": user.inserted_id})

    return UserResponse(
        username=created_user["username"],
        email=created_user["email"],
        role=created_user["role"]
    )




@router.post("/login", response_model=UserResponse)
async def login(form_data: LoginForm):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.username})
    return UserResponse(username=user.username, email=user.email, role=user.role, token=access_token)