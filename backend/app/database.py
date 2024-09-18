from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

MONGO_DETAILS = "mongodb://localhost:27017"

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.get_database('galileo')

# All collections
customers_collection = database.get_collection("customers")

artisans_collection = database.get_collection("artisans")

suppliers_collection = database.get_collection("suppliers")

admins_collection = database.get_collection("admins")

guarantors_collection = database.get_collection("guarantors")

service_requests_collection = database.get_collection("service_requests")

jobs_collection = database.get_collection("jobs")

