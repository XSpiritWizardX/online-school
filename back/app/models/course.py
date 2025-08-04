from app.db import db


class Course(db.Model):
    __tablename__ = "courses"
    #  Make sure that combination of owner id and title is unique
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # Define relationship to User model
    
    def __repr__(self):
        return f"<Course {self.owner_id,self.title}>"
