from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import DevelopmentConfig, ProductionConfig
from app.db import db
import os


def create_app():
    app = Flask(__name__)

    if os.environ.get("FLASK_ENV") == "production":
        app.config.from_object(ProductionConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL", "sqlite:///dev.db"
    )

    db.init_app(app)

    Migrate(app, db)

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
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
