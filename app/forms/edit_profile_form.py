from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS


class EditProfileForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    about_me = StringField('About me')
    profile_pic_url = FileField("Profile pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
