from flask import Blueprint, jsonify, request

from app.db import db
from app.models import Course
from app.utils import jwt_required

bp = Blueprint("courses", __name__)


@bp.route("/", methods=["GET"])
@jwt_required
def get_courses(current_user):
    """get all courses for the current user"""
    courses = Course.query.filter_by(owner_id=current_user.id).all()
    return (
        jsonify(
            {"courses": [course.to_dict() for course in courses]}
        ),
        200,
    )
