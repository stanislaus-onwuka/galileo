from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from models import User, UserInDB, UserResponse
from utils import verify_password, get_password_hash, create_access_token
from database import users_collection
from bson import ObjectId

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_user(username: str):
    user = await users_collection.find_one({"username": username})
    if user:
        return UserInDB(**user)

async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

@app.post("/signup", response_model=UserResponse)
async def signup(user: User):
    user_exists = await users_collection.find_one({"email": user.email})
    if user_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    user.password = get_password_hash(user.password)
    user = await users_collection.insert_one(user.dict())
    created_user = await users_collection.find_one({"_id": user.inserted_id})
    return UserResponse(username=created_user["username"], email=created_user["email"])

@app.post("/login", response_model=UserResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return UserResponse(username=user.username, email=user.email, token=access_token)
