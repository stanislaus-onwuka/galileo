import math
import os
from datetime import datetime, timedelta, timezone

import bcrypt
from bson import ObjectId
from dotenv import load_dotenv
from jose import JWTError, jwt
from mailjet_rest import Client
from pymongo.collection import Collection

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from database import artisans_collection, customers_collection, suppliers_collection
from models import Coordinates, RoleEnum, UserInDB

load_dotenv()  # load environment variables

# ============================
# Constants and OAuth2 setup
# ============================
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
SECRET_KEY = os.getenv("SECRET_KEY")

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
EMAIL_API_KEY = os.getenv("EMAIL_API_KEY")
EMAIL_API_SECRET = os.getenv("EMAIL_API_SECRET")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# ============================
# JWT Handling
# ============================
def decode_token(token: str):
    """Decode JWT token"""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create a JWT access token with optional expiration time"""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode["exp"] = expire
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ============================
# Authentication and Authorization
# ============================
async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    """Get the current active user based on token and required roles"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)
        username: str = payload.get("sub")
        role: str = payload.get("role")
        token_data = {"username": username, "role": role}
    except JWTError as e:
        raise credentials_exception from e

    user = await get_user_from_collection(username=token_data["username"], role=RoleEnum(token_data["role"]))
    if user is None:
        raise credentials_exception

    return user


# ============================
# Password Management
# ============================
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify if the plain password matches the hashed password"""
    password_byte_enc = plain_password.encode('utf-8')
    return bcrypt.checkpw(password_byte_enc, hashed_password.encode('utf-8'))


def get_password_hash(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    return hashed_password.decode('utf-8')


# ============================
# User and Role Handling
# ============================
def get_collection_by_role(role: RoleEnum) -> Collection:
    """Get the appropriate collection based on the user's role"""
    if role == RoleEnum.customer:
        return customers_collection
    elif role == RoleEnum.artisan:
        return artisans_collection
    elif role == RoleEnum.supplier:
        return suppliers_collection
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role provided",
        )


async def get_user_from_collection(username: str, role: RoleEnum):
    """Fetch user data from the appropriate collection by role"""
    collection = get_collection_by_role(role)
    user = await collection.find_one({"username": username})
    return UserInDB(**user) if user else None


def require_roles(required_roles: list[RoleEnum]):
    async def role_checker(user: UserInDB = Depends(get_current_user)):
        if RoleEnum(user.role) not in required_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions :(")
        return user
    return role_checker


# ============================
# User Management
# ============================
async def get_user(identifier: str, by_email: bool = False, by_id: bool = False) -> UserInDB:
    """Retrieve a user from any collection based on the identifier (email, username, or id)"""
    collections = [customers_collection, artisans_collection, suppliers_collection]
    query_field = "email" if by_email else "_id" if by_id else "username"

    for collection in collections:
        if by_id:
            user = await collection.find_one({"_id": ObjectId(identifier)})
        else:
            user = await collection.find_one({query_field: identifier})
        if user:
            return UserInDB(**user)


async def update_user_password(email: str, hashed_password: str):
    user = await get_user(email, by_email=True)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    collection = get_collection_by_role(user.role)
    await collection.update_one({"email": email}, {"$set": {"hashed_password": hashed_password}})


# ============================
# Email Handling
# ============================
async def send_email(recipient_email, subject, content):
    api_key = EMAIL_API_KEY
    api_secret = EMAIL_API_SECRET
    mailjet = Client(auth=(api_key, api_secret), version='v3.1')
    data = {
        'Messages': [
            {
                "From": {
                    "Email": ADMIN_EMAIL,
                    "Name": "Galileo"
                },
                "To": [
                    {
                        "Email": f"{recipient_email}",
                        "Name": " "
                    }
                ],
                "Subject": f"{subject}",
                "TextPart": f"{content}",
            }
        ]
    }
    result = mailjet.send.create(data=data)
    print(result.status_code)
    print(result.json())


# ============================
# Others
# ============================

def calculate_distance(coord1: Coordinates, coord2: Coordinates) -> float:
    """
    Calculate the great-circle distance between two points on Earth.
    Uses the Haversine formula for spherical geometry.
    """
    R = 6371  # Earth's radius in kilometers
    lat1, lon1 = math.radians(coord1.latitude), math.radians(coord1.longitude)
    lat2, lon2 = math.radians(coord2.latitude), math.radians(coord2.longitude)
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * \
        math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c
