from dotenv import load_dotenv
import os

load_dotenv(".env.local")
load_dotenv(".env.development")


class Config:
    PORT = int(os.environ.get("FLASK_RUN_PORT", 5000))


class DevelopmentConfig(Config):
    DEBUG = True
    PORT = int(os.environ.get("FLASK_RUN_PORT", 5000))


class ProductionConfig(Config):
    DEBUG = False
    PORT = int(os.environ.get("FLASK_RUN_PORT", 8000))
