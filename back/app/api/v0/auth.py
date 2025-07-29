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
        return jsonify({"message": "email already registered"}), 409

    user = User(email=email)
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
    except Exception:
        db.session.rollback()
        return jsonify({"message": "error creating user"}), 500

@bp.route("/signup", methods=["PUT"])
@jwt_required
def update_user(current_user):
    """Update current user's email"""
    data = request.get_json()
    if not data:
        return jsonify({"message": "Missing JSON body"}), 400

    current_user.email = data.get("email", current_user.email)

    try:
        db.session.commit()
        return jsonify({
            "message": "User updated",
            "user": current_user.to_dict()
        }), 200
    except Exception:
        db.session.rollback()
        return jsonify({"message": "Error updating user"}), 500



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
