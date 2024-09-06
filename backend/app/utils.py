from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
import bcrypt
from models import UserInDB, RoleEnum
from database import customers_collection, artisans_collection, suppliers_collection
from pymongo.collection import Collection
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer


# ============================
# Constants and OAuth2 setup
# ============================
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


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


async def get_user_from_collection(email: str, role: RoleEnum):
    """Fetch user data from the appropriate collection by role"""
    collection = get_collection_by_role(role)
    user = await collection.find_one({"email": email})
    return UserInDB(**user) if user else None


# ============================
# Authentication and Authorization
# ============================
async def get_current_active_user(token: str = Depends(oauth2_scheme), required_roles: list[RoleEnum] = []):
    """Get the current active user based on token and required roles"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None or role is None:
            raise credentials_exception
        token_data = {"email": email, "role": role}
    except JWTError as e:
        raise credentials_exception from e

    user = await get_user_from_collection(email=token_data["email"], role=RoleEnum(token_data["role"]))
    if user is None:
        raise credentials_exception

    if required_roles and RoleEnum(user.role) not in required_roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    return user


# ============================
# User Management
# ============================
async def get_user(identifier: str, by_email: bool = False) -> UserInDB:
    """Retrieve a user from any collection based on the identifier (email or username)"""
    collections = [customers_collection, artisans_collection, suppliers_collection]
    query_field = "email" if by_email else "username"

    for collection in collections:
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
def send_email(recipient_email, subject, content):
    print(content)
