from app.db import db
from app.models.user import User

user_seeds = [
    {"email": "admin@example.io", "password": "password"},
    {"email": "normie@example.com", "password": "password"},
]
user_emails = [user_seed["email"] for user_seed in user_seeds]


def seed_users():
    """create test users"""
    for user_seed in user_seeds:
        user = User(email=user_seed["email"])
        user.set_password(user_seed["password"])

        db.session.add(user)
    db.session.commit()


def unseed_users():
    """remove test users"""
    for user_seed in user_seeds:
        User.query.filter_by(email=user_seed["email"]).delete()
    db.session.commit()
