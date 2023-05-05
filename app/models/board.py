from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    users = db.relationship("User", back_populates="boards")
    sections = db.relationship("Section", back_populates="boards")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'sections': self.sections
        }
