from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class EditProfileForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    about_me = StringField('About me', validators=[DataRequired()])
    profile_pic_url = StringField('Profile pic', validators=[DataRequired()])
