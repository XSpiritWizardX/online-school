from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, id):
        self.id = id


# Simple user store (use database in production)
users = {"admin": "password"}


def load_user(user_id):
    if user_id in users:
        return User(user_id)
    return None


def authenticate_user(username, password):
    if username in users and users[username] == password:
        return User(username)
    return None
