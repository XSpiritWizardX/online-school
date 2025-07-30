from app.db import db
from app.models.course import Course
from app.models.user import User
from app.seeds.users import user_emails

# declare content of each course to seed
course_seeds = [
    {"title": "Python for Beginners"},
    {"title": "Advanced Javascript"},
]


def seed_courses():
    """create test courses"""
    # ensure each course has a valid owner_id dynamically, rather than
    # manually
    users = User.query.filter(User.email.in_(user_emails)).all()
    for user, course_seed in zip(users, course_seeds):
        course_seed["owner_id"] = user.id

    for course_seed in course_seeds:
        owner_id = course_seed["owner_id"]
        title = course_seed["title"]
        course = Course(owner_id=owner_id, title=title)

        db.session.add(course)

    db.session.commit()


def unseed_courses():
    """remove test courses"""
    for course_seed in course_seeds:
        title = course_seed["title"]
        Course.query.filter_by(title=title).delete()

    db.session.commit()
