import os
from cloudinary import config
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from routers import admins, artisans, auth, customers, suppliers, users

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

load_dotenv()  # load environment variables

# cloudinary config
config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET"),
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify a list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.), or specify a list of allowed methods
    allow_headers=["*"],  # Allow all headers, or specify a list of allowed headers
)


# Routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["user"])
app.include_router(customers.router, prefix="/customers", tags=["customers"])
app.include_router(artisans.router, prefix="/artisans", tags=["artisans"])
app.include_router(admins.router, prefix="/admins", tags=["admins"])
app.include_router(suppliers.router, prefix="/suppliers", tags=["suppliers"])



@app.get("/")
def read_root():
    return {"message": "Welcome to the Galileo API"}
