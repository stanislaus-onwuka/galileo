from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.get_database('galileo')

# All collections
customers_collection = database.get_collection("customers")

artisans_collection = database.get_collection("artisans")

suppliers_collection = database.get_collection("suppliers")

admins_collection = database.get_collection("admins")

guarantors_collection = database.get_collection("guarantors")

