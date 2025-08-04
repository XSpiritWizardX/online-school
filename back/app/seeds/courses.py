from app.db import db
from app.models.course import Course
from app.models.user import User
from app.seeds.users import user_emails

course_seeds = [
    {
        "title": "Introduction to Python",
        "description": "Learn the basics of Python programming.",
    },
    {
        "title": "Advanced JavaScript",
        "description": "Dive into JavaScript and its frameworks.",
    },
]


def seed_courses():
    """create test courses"""
    users = User.query.filter(User.email.in_(user_emails)).all()
    if not users:
        raise ValueError("No users found to assign as course owners.")
    for index, course_seed in enumerate(course_seeds):
        course = Course(
            owner_id=users[index % len(users)].id,
            title=course_seed["title"],
            description=course_seed["description"],
        )
        db.session.add(course)
    db.session.commit()


def unseed_courses():
    """remove test courses"""
    users = User.query.filter(User.email.in_(user_emails)).all()
    if not users:
        return

    for index, course_seed in enumerate(course_seeds):
        owner_id = users[index % len(users)].id
        Course.query.filter_by(
            title=course_seed["title"], owner_id=owner_id
        ).delete()
    db.session.commit()
