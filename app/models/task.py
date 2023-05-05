from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    due_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    sections = db.relationship('Section', back_populates='tasks')
    users = db.relationship('User', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'order': self.order,
            'due_date': self.due_date,
            'description': self.description,
            'section_id': self.section_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
