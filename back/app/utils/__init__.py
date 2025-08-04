from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import current_app, jsonify, request

from app.models import get_user


def generate_jwt_token(user_id, expires_in=3600):
    """Generate JWT token for user"""
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(seconds=expires_in),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(
        payload, current_app.config["SECRET_KEY"], algorithm="HS256"
    )


def decode_jwt_token(token):
    """Decode and validate JWT token"""
    try:
        payload = jwt.decode(
            token,
            current_app.config["SECRET_KEY"],
            algorithms=["HS256"],
        )
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def extract_token_from_header(auth_header):
    """Extract Bearer token from Authorization header"""
    if auth_header and auth_header.startswith("Bearer "):
        return auth_header.split(" ")[1]
    return None


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
