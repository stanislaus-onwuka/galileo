from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import EmailStr

from schemas import UserResponse, UserSignupInput
from models import Guarantor, User, LoginForm
from database import guarantors_collection
from utils import get_user, verify_password, get_password_hash, create_access_token, get_collection_by_role, send_email, update_user_password

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def authenticate_user(username: str, password: str) -> bool:
    user = await get_user(username)
    return user if user and verify_password(password, user.password) else False


# Routes
@router.post("/signup", response_model=UserResponse)
async def signup(user: UserSignupInput):
    # Check if the email is already registered in any collection
    if await get_user(user.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    if await get_user(user.email, by_email=True):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Insert user
    user_collection = get_collection_by_role(user.role)
    user_result = await user_collection.insert_one(
        {**user.model_dump(exclude={"password"}), 
        "password": get_password_hash(user.password)}
    )
    user_id = str(user_result.inserted_id)

    # Create and insert Guarantor
    guarantor = Guarantor(
        first_name=user.guarantor_firstName,
        last_name=user.guarantor_lastName,
        phone_number=user.guarantor_phoneNumber,
        user_id=user_id
    )
    await guarantors_collection.insert_one(guarantor.model_dump())

    # Generate auth access token and return response
    created_user = await user_collection.find_one({"_id": user_result.inserted_id})
    access_token = create_access_token(data={"sub": created_user["email"], "role": created_user["role"]})

    return UserResponse(
        username=created_user["username"],
        email=created_user["email"],
        role=created_user["role"],
        token=access_token
    )


@router.post("/login", response_model=UserResponse)
async def login(form_data: LoginForm):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.username})
    return UserResponse(username=user.username, email=user.email, role=user.role, token=access_token)
