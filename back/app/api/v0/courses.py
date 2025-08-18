from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
import traceback

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


@bp.route("/", methods=["POST"])
@jwt_required
def create_course(current_user):
    """create a new course"""
    data = request.get_json()

    if not data:
        return jsonify({"message": "need json body"}), 400

    title = data.get("title")
    if not title:
        return jsonify({"message": "title required"}), 400

    course = Course(
        owner_id=current_user.id,
        title=title,
        description=data.get("description"),
    )

    try:
        db.session.add(course)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        if (
            "UNIQUE constraint failed: courses.owner_id, courses.title"
            in str(e)
        ):
            return (
                jsonify(
                    {"message": "duplicate course title for user"}
                ),
                409,
            )
        else:
            print(f"IntegrityError in {__file__}")
            traceback.print_exc()
    except Exception as e:
        db.session.rollback()
        print(f"Unexpected error in {__file__}:")
        traceback.print_exc(e)
        return jsonify({"message": "error creating course"}), 500

    return (
        jsonify(
            {
                "message": "course created successfully",
                "course": course.to_dict(),
            }
        ),
        201,
    )


@bp.route("/<int:course_id>/", methods=["GET"])
@jwt_required
def get_course(current_user, course_id):
    """get a specific course"""
    course = Course.query.filter_by(
        id=course_id,
        owner_id=current_user.id,
    ).first()

    if not course:
        return jsonify({"message": "course not found"}), 404
    return jsonify({"course": course.to_dict()}), 200


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

    return jsonify({"message": "course deleted successfully"})
