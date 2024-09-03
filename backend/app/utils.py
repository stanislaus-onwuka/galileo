from jose import JWTError, jwt
from datetime import datetime, timedelta
import bcrypt
from models import UserInDB,RoleEnum
from database import customers_collection, artisans_collection, suppliers_collection
from pymongo.collection import Collection

from fastapi import HTTPException, status
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_byte_enc = plain_password.encode('utf-8')
    return bcrypt.checkpw(password_byte_enc, hashed_password.encode('utf-8'))


def get_password_hash(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    return hashed_password.decode('utf-8')



def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "role": user["role"]
    }


def get_collection_by_role(role: RoleEnum) -> Collection:
    if role == RoleEnum.customer:
        return customers_collection
    elif role == RoleEnum.artisan:
        return artisans_collection
    elif role == RoleEnum.supplier:
        return suppliers_collection
    else:
        raise ValueError("Invalid role provided")



async def get_user_from_collection(email: str, role: RoleEnum):
    collection = get_collection_by_role(role)
    user = await collection.find_one({"email": email})
    if user:
        return UserInDB(**user)
    return None



async def get_current_active_user(token: str = Depends(oauth2_scheme), required_roles: list[RoleEnum] = []):
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
    except JWTError:
        raise credentials_exception
    
    user = await get_user_from_collection(email=token_data["email"], role=RoleEnum(token_data["role"]))
    if user is None:
        raise credentials_exception

    if required_roles and RoleEnum(user.role) not in required_roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    
    return user