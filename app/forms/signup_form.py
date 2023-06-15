from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username must be less than 41 characters.')

def email_length(form, field):
    email = field.data
    if len(email) > 255:
        raise ValidationError('Email must be less than 256 characters.')

def password_length(form, field):
    password = field.data
    if len(password) > 255:
        raise ValidationError('Password must be less than 256 characters.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, email_length, Email()])
    password = StringField('password', validators=[DataRequired(), password_length])
    name = StringField('name', validators=[DataRequired()])
