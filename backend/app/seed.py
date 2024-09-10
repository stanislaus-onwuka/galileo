import asyncio
import csv

from motor.motor_asyncio import AsyncIOMotorClient
from utils import get_password_hash


MONGO_DETAILS = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.get_database('galileo')
artisans_collection = database.get_collection("artisans")


async def insert_artisans_from_csv(csv_file_path):
    with open(csv_file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        artisans = []

        for index, row in enumerate(csv_reader):
            artisan = {
                "business_name": row["Name"],
                "username": "username",
                "firstName": f"Artisan {index}",
                "lastName": "Doe",
                "phoneNumber": "+2349013390589",
                "email": f"artisan{index}@example.com",
                "role": "artisan",
                "address": row["Address"],
                "qualification": int(row["Qualification"]),
                "location": {
                    "latitude": float(row["Latitude"]),
                    "longitude": float(row["Longitude"])
                }
            }
            artisans.append(artisan)

    if artisans:
        await artisans_collection.insert_many(artisans)
        print(f'{len(artisans)} artisans inserted successfully.')


async def main():
    csv_file_path = '../artisan_data.csv'
    await insert_artisans_from_csv(csv_file_path)


if __name__ == "__main__":
    asyncio.run(main())
