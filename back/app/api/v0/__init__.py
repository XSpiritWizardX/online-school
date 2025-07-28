from flask import Blueprint

from app.api.v0.auth import bp as auth_bp


bp = Blueprint("v0", __name__)

bp.register_blueprint(auth_bp, url_prefix="/auth")
