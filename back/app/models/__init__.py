from app.models.user import User
from app.models.course import Course

__all__ = [
    'User',
    'Course',
    'get_user',
    'authenticate_user',
    ]

def get_user(user_id):
    """Get user by ID"""
    return User.query.get(user_id)


def authenticate_user(email, password):
    """Authenticate user credentials"""
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return user
    return None
