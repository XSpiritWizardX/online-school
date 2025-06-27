from flask import Flask
from flask_login import LoginManager


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "secret-key-change-this"

    # Initialize Flask-Login
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "auth.login"

    # Import models to register user_loader
    from app.models import load_user

    login_manager.user_loader(load_user)

    # Register blueprints
    from app.auth import bp as auth_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")

    from app.main import bp as main_bp

    app.register_blueprint(main_bp)

    return app
