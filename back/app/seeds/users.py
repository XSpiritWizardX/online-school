from app.db import db
from app.models.user import User

# declare content of each user to seed
user_seeds = [
    {"email": "admin@example.io", "password": "password"},
    {"email": "normie@example.com", "password": "password"},
]

# keep a list of unique identifiers for seeded users for use in other
# seeds, so they can dynamically determine things like "user_id"
user_emails = map(lambda user_seed: user_seed["email"], user_seeds)


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
