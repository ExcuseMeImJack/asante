from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Section(db.Model):
    __tablename__ = "sections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)


    tasks = db.relationship("Task", back_populates="sections")
    boards = db.relationship("Board", back_populates="sections")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'order': self.order,
            'board_id': self.board_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
