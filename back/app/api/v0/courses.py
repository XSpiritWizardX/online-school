from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
import traceback

from app.db import db
from app.models import Course
from app.utils import jwt_required

bp = Blueprint("courses", __name__)


@bp.route("/", methods=["POST"])
@jwt_required
def create_course(current_user):
    """create a new course"""
    data = request.get_json()

    if not data:
        return jsonify({"message": "need json body"}), 400

    request_fields = set(data.keys())

    required_fields = {
        "title",
        "language",
        "level",
        "price",
        "is_published",
    }
    optional_fields = {
        "description",
        "preview_video_url",
        "image_url",
    }
    allowed_fields = required_fields | optional_fields

    rejected_fields = request_fields - allowed_fields
    missing_fields = required_fields - request_fields

    if rejected_fields or missing_fields:
        body = {
            "message": "rejected and/or missing fields",
            "missing_fields": sorted(list(missing_fields)),
            "rejected_fields": sorted(list(rejected_fields)),
            "required_fields": sorted(list(required_fields)),
            "optional_fields": sorted(list(optional_fields)),
        }
        return jsonify(body), 400

    data["owner_id"] = current_user.id

    course = Course(**data)

    try:
        db.session.add(course)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        if (
            "UNIQUE constraint failed: courses.owner_id, courses.title"
            in str(e)
        ):
            body = {"message": "duplicate course title for user"}
            return jsonify(body), 409

        else:
            print(f"IntegrityError in {__file__}")
            traceback.print_exc()
    except Exception as e:
        db.session.rollback()
        print(f"Unexpected error in {__file__}:")
        traceback.print_exc(e)
        return jsonify({"message": "error creating course"}), 500

    return jsonify(course.to_dict()), 201


@bp.route("/", methods=["GET"])
def get_courses():
    """get all courses"""
    courses = Course.query.all()
    body = {str(course.id): course.to_dict() for course in courses}
    return jsonify(body), 200


@bp.route("/<int:course_id>/", methods=["GET"])
def get_course(course_id):
    """get a specific course"""
    course = Course.query.filter_by(
        id=course_id,
    ).first()

    if not course:
        return jsonify({"message": "course not found"}), 404
    return jsonify(course.to_dict()), 200


@bp.route("/<int:course_id>/", methods=["PATCH"])
@jwt_required
def update_course(current_user, course_id):
    """modify an existing course"""
    data = request.get_json()

    if not data:
        return jsonify({"message": "need json body"}), 400

    request_fields = set(data.keys())

    required_fields = set([])
    optional_fields = {
        "owner_id",
        "title",
        "description",
        "language",
        "level",
        "price",
        "is_published",
        "preview_video_url",
        "image_url",
    }
    allowed_fields = required_fields | optional_fields

    rejected_fields = request_fields - allowed_fields
    missing_fields = required_fields - request_fields

    if rejected_fields or missing_fields:
        body = {
            "message": "rejected and/or missing fields",
            "missing_fields": sorted(list(missing_fields)),
            "rejected_fields": sorted(list(rejected_fields)),
            "required_fields": sorted(list(required_fields)),
            "optional_fields": sorted(list(optional_fields)),
        }
        return jsonify(body), 400

    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "course not found"}), 404

    if course.owner_id != current_user.id:
        body = {"message": "not allowed to change this course"}
        return jsonify(body), 401

    # do the actual update
    for field in data:
        setattr(course, field, data[field])

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"error updating course in {__file__}")
        print(e)
        traceback.print_exc()
        return jsonify({"message": "error updating course"}), 500
    return jsonify(course.to_dict()), 200


@bp.route("/<int:course_id>/", methods=["DELETE"])
@jwt_required
def delete_course(current_user, course_id):
    """delete course by id"""
    course = Course.query.filter_by(
        id=course_id,
        owner_id=current_user.id,
    ).first()

    if not course:
        return jsonify({"message": "course not found"}), 404

    try:
        db.session.delete(course)
        db.session.commit()

    except Exception as e:
        print(f"unexpected error in {__file__}:")
        traceback.print_exc(e)
        return jsonify({"message": "error deleting course"}), 500

    return jsonify(course.id), 200
