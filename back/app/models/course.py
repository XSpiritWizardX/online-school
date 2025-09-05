from app.db import db


class Course(db.Model):
    __tablename__ = "courses"

    # fields
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", name="fk_courses_owner_id"),
        nullable=False,
    )
    title = db.Column(db.String(100))
    description = db.Column(db.Text, nullable=True)
    language = db.Column(db.Text)
    level = db.Column(db.Text)
    price = db.Column(db.Numeric)
    is_published = db.Column(db.Boolean)
    preview_video_url = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now(),
    )

    # relationships
    owner = db.relationship("User", back_populates="courses")

    # constraints
    __table_args__ = (
        db.UniqueConstraint(
            "owner_id", "title", name="unique_user_course_title"
        ),
    )

    def __repr__(self):
        return f"<Course {self.owner_id,self.title}>"

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "title": self.title,
            "description": self.description,
            "language": self.language,
            "level": self.level,
            "price": self.price,
            "is_published": self.is_published,
            "preview_video_url": self.preview_video_url,
            "image_url": self.image_url,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
