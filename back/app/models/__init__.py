class User:
    def __init__(self, id):
        self.id = id


# Simple user store (use database in production)
users = {"admin@aa.io": "password"}


def get_user(user_id):
    """Get user by ID"""
    if user_id in users:
        return User(user_id)
    return None


def authenticate_user(username, password):
    """Authenticate user credentials"""
    if username in users and users[username] == password:
        return User(username)
    return None
