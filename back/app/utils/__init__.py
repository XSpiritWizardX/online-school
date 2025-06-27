import jwt
from datetime import datetime, timedelta
from flask import current_app


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
