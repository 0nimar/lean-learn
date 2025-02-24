from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

uri = os.getenv("uri")


# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'),tls=True, tlsCAFile=certifi.where())

def get_database():
    return client["question_db"]
