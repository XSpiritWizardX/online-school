from datetime import datetime
from flask import Blueprint, jsonify, request

from app.db import db
from app.models import User, authenticate_user
from app.utils import generate_jwt_token, jwt_required

bp = Blueprint("auth", __name__)


@bp.route("/login", methods=["POST"])
def login():
    """login endpoint for frontend testing"""
    data = request.get_json()

    if not data:
        return jsonify({"message": "need json body"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return (
            jsonify({"message": "email and password required"}),
            400,
        )

    user = authenticate_user(email, password)

    if not user:
        return jsonify({"message": "invalid credentials"}), 401

    token = generate_jwt_token(user.id)
    return (
        jsonify(
            {
                "user": user.to_dict(),
                "token": token,
            }
        ),
        200,
    )


@bp.route("/logout", methods=["DELETE"])
@jwt_required
def logout(current_user):
    """logout endpoint"""
    return (
        jsonify({"message": "logged out successfully", "user": None}),
        200,
    )


@bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"message": "need json body"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify(
            {"message": "signup: email and password required"}
        )

    extant_user = User.query.filter_by(email=email).first()
    if extant_user:
        return (
            jsonify({"message": "email already registered"}),
            409,
        )

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    date_of_birth = data.get("date_of_birth")
    phone_number = data.get("phone_number")
    address = data.get("address")
    city = data.get("city")
    state = data.get("state")
    zipcode = data.get("zipcode")
    display_name = data.get("display_name")
    avatar_url = data.get("avatar_url")
    bio = data.get("bio")
    theme_id = data.get("theme_id")

    if date_of_birth:
        try:
            date_of_birth = datetime.strptime(
                date_of_birth, "%Y-%m-%d"
            ).date()
        except ValueError:
            return (
                jsonify({"message": "invalid date format"}),
                400,
            )

    user = User(
        email=email,
        first_name=first_name,
        last_name=last_name,
        date_of_birth=date_of_birth,
        phone_number=phone_number,
        address=address,
        city=city,
        state=state,
        zipcode=zipcode,
        display_name=display_name,
        avatar_url=avatar_url,
        bio=bio,
        theme_id=theme_id,
    )
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()

        token = generate_jwt_token(user.id)

        return (
            jsonify(
                {
                    "message": "user created successfully",
                    "user": user.to_dict(),
                    "token": token,
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()

        import traceback

        print(f"Error in signup: {e}")
        print(traceback.format_exc())

        return jsonify({"message": "db error creating user"}), 500


@bp.route("/verify", methods=["GET"])
@jwt_required
def verify(current_user):
    token = generate_jwt_token(current_user.id)
    return (
        jsonify(
            {
                "message": "verification confirmed",
                "user": current_user.to_dict(),
                "token": token,
            }
        ),
        200,
    )
