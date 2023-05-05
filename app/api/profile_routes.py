from flask import Blueprint, request
from app.models import Board, db, Section, Task, User
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_profile_form import EditProfileForm

profile_routes = Blueprint('profiles', __name__, url_prefix="/profiles")

@profile_routes.route('/<int:user_id>')
@login_required
# Get profile of current user
def get_profile(user_id):
    profile = User.query.get(user_id)
    return profile.to_dict()

@profile_routes.route('/<int:user_id>', methods=["PUT"])
@login_required
# Edit profile by user id
def edit_profile(user_id):
    profile = User.query.get(user_id)
    form = EditProfileForm()
    if form.validate_on_submit():
        profile.name=form.data["name"]
        profile.about_me=form.data["about_me"]
        profile.profile_pic_url=form.data["profile_pic_url"]
        db.session.commit()
        return profile.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@profile_routes.route('/<int:user_id>')
@login_required
# Delete user by id
def delete_user(user_id):
    profile = User.query.get(user_id)
    db.session.delete(profile)
    db.session.commit()
    return {'message': 'Successfully deleted!'}
