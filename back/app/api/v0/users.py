from flask import Blueprint, jsonify, request
from datetime import datetime
import traceback

from app.db import db
from app.utils import jwt_required

bp = Blueprint("users", __name__)


# CREATE is in auth.py#signup because that's what app academy taught


@bp.route("/me/", methods=["GET"])
@jwt_required
def read_user(current_user):
    return jsonify(current_user.to_dict(), 200)


@bp.route("/me/", methods=["PATCH"])
@jwt_required
def update_user(current_user):
    """update current user's information"""
    data = request.get_json()

    if not data:
        return jsonify({"message": "need json body"}), 400

    # TODO dynamically get fields from User class
    updatable_fields = {
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "address",
        "city",
        "state",
        "country",
        "zipcode",
        "display_name",
        "avatar_url",
        "bio",
        "theme_id",
        "date_of_birth",
        "password",
    }

    incoming_fields = set(data.keys())
    invalid_fields = incoming_fields - updatable_fields

    if invalid_fields:
        return (
            jsonify(
                {
                    "message": "attempting to update invalid fields",
                    "invalid_fields": sorted(list(invalid_fields)),
                }
            ),
            400,
        )

    # update the fields provided
    for field in updatable_fields:
        if field in data:
            setattr(current_user, field, data[field])

    # TODO move this dob parsing into User model
    if "date_of_birth" in data:
        date_of_birth = data["date_of_birth"]
        if date_of_birth:
            try:
                date_of_birth = datetime.strptime(
                    date_of_birth, "%Y-%m-%d"
                ).date()
                current_user.date_of_birth = date_of_birth
            except ValueError:
                return (
                    jsonify({"message": "dob: invalid date format"}),
                    400,
                )
        else:
            current_user.date_of_birth = None

    try:
        db.session.commit()
        return jsonify(
            {
                "message": "user updated successfully",
                "user": current_user.to_dict(),
            },
            200,
        )
    except Exception as e:
        db.session.rollback()
        print(f"error updating user in {__file__}:")
        print(e)
        traceback.print_exc()
        return jsonify({"message": "error updating user"}), 500
