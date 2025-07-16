from flask import Flask
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig
import os


def create_app():
    app = Flask(__name__)

    if os.environ.get("FLASK_ENV") == "production":
        app.config.from_object(ProductionConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    config = app.config
    front_port = config["FRONT_PORT"]

    # Enable CORS for React frontend
    CORS(
        app,
        origins=[f"http://localhost:{front_port}"],
    )

    # Register API blueprint only
    from app.api import bp as api_bp

    app.register_blueprint(api_bp, url_prefix="/api")

    return app
