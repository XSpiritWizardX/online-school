from flask import Blueprint

from app.api.v0 import bp as v0_bp


bp = Blueprint("api", __name__)

bp.register_blueprint(v0_bp, url_prefix="/v0")
