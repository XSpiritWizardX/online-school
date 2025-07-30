from app.db import db
from app.models.user import User

user_seeds = [{"email": "admin@example.io", "password": "password"}]


def seed_users():
    """create test user"""
    for user_seed in user_seeds:
        user = User(email=user_seed["email"])
        user.set_password(user_seed["password"])

        db.session.add(user)
    db.session.commit()


def undo_users():
    """remove test user"""
    for user_seed in user_seeds:
        User.query.filter_by(email=user_seed["email"]).delete()
    db.session.commit()
