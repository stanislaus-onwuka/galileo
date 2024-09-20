import os

import requests
from dotenv import load_dotenv

load_dotenv()  # load environment variables


PAYSTACK_API_KEY = os.getenv("PAYSTACK_API_KEY")


class PayStackSerivce:
    headers = {
        'Authorization': f'Bearer {PAYSTACK_API_KEY}',
        'Content-Type': 'application/json'
    }
    currency = "NGN"
    session = requests.Session()

    @classmethod
    def initialise_payment(cls, email: str, amount: float, **kwargs) -> str | None:
        url = "https://api.paystack.co/transaction/initialize"
        payload = {
            "email": email,
            "amount": str(amount * 100),  # amount in kobo
            "currency": cls.currency,
            "metadata": kwargs
        }

        try:
            response = cls.session.post(url, headers=cls.headers, json=payload)
            response.raise_for_status()
            return response.json()["data"]["authorization_url"]
        except requests.exceptions.HTTPError as e:
            return
