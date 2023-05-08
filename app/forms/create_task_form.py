from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField
from wtforms.validators import DataRequired

class CreateTaskForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    due_date = DateField('Due Date')
    description = TextAreaField('Description')
