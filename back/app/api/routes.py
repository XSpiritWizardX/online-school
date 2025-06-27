from flask import request, jsonify
from functools import wraps
from app.api import bp
from app.models import authenticate_user, get_user
from app.utils import (
    generate_jwt_token,
    decode_jwt_token,
    extract_token_from_header,
)


def jwt_required(f):
    """Decorator to require JWT authentication"""

    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Get token from Authorization header
        auth_header = request.headers.get("Authorization")
        if auth_header:
            token = extract_token_from_header(auth_header)

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        user_id = decode_jwt_token(token)
        if user_id is None:
            return (
                jsonify({"message": "Token is invalid or expired"}),
                401,
            )

        # Verify user exists
        user = get_user(user_id)
        if not user:
            return jsonify({"message": "User not found"}), 401

        # Pass user to the route
        return f(user, *args, **kwargs)

    return decorated


@bp.route("/login", methods=["POST"])
def login():
    """Login endpoint - returns JWT token"""
    data = request.get_json()

    if (
        not data
        or not data.get("username")
        or not data.get("password")
    ):
        return (
            jsonify({"message": "Username and password required"}),
            400,
        )

    user = authenticate_user(data["username"], data["password"])
    if user:
        token = generate_jwt_token(user.id)
        return (
            jsonify(
                {
                    "message": "Login successful",
                    "token": token,
                    "user": {"id": user.id, "username": user.id},
                }
            ),
            200,
        )
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@bp.route("/verify", methods=["GET"])
@jwt_required
def verify_token(current_user):
    """Verify JWT token validity"""
    return (
        jsonify(
            {
                "valid": True,
                "user": {
                    "id": current_user.id,
                    "username": current_user.id,
                },
            }
        ),
        200,
    )


@bp.route("/profile", methods=["GET"])
@jwt_required
def get_profile(current_user):
    """Get user profile"""
    return (
        jsonify(
            {
                "user": {
                    "id": current_user.id,
                    "username": current_user.id,
                }
            }
        ),
        200,
    )


@bp.route("/dashboard", methods=["GET"])
@jwt_required
def get_dashboard_data(current_user):
    """Get dashboard data"""
    return (
        jsonify(
            {
                "message": f"Welcome to dashboard, {current_user.id}!",
                "user": {
                    "id": current_user.id,
                    "username": current_user.id,
                },
                "data": {"stats": {"logins": 1, "active": True}},
            }
        ),
        200,
    )


@bp.route("/logout", methods=["POST"])
@jwt_required
def logout(current_user):
    """Logout endpoint (client should discard token)"""
    return jsonify({"message": "Logged out successfully"}), 200
