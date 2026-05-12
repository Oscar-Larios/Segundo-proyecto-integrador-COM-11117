import os
from dotenv import load_dotenv

load_dotenv(".env")
load_dotenv(".secrets")


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://localhost/nytclone")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    NYT_API_KEY = os.getenv("NYT_API_KEY", "")
