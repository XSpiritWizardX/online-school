from app.db import db
from app.models.user import User

email = "admin@example.io"
password = "password"


def seed_users():
    """create test user"""
    admin = User(email=email)
    admin.set_password(password)

    db.session.add(admin)
    db.session.commit()


def undo_users():
    """remove test user"""
    User.query.filter_by(email=email).delete()
    db.session.commit()
