from flask import Blueprint

from app.api.v0.auth import bp as auth_bp
from app.api.v0.courses import bp as courses_bp
from app.api.v0.users import bp as users_bp


bp = Blueprint("v0", __name__)

bp.register_blueprint(auth_bp, url_prefix="/auth")
bp.register_blueprint(courses_bp, url_prefix="/courses")
bp.register_blueprint(users_bp, url_prefix="/users")
