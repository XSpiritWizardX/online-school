from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "change-this-secret-key"

    # Enable CORS for React frontend
    CORS(
        app,
        origins=["http://localhost:3000", "http://localhost:5173"],
    )

    # Register API blueprint only
    from app.api import bp as api_bp

    app.register_blueprint(api_bp, url_prefix="/api")

    return app
