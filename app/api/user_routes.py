from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Board, Task
from ..forms.create_task_form import CreateTaskForm
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_profile_form import EditProfileForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>/tasks')
@login_required
# Get all tasks of current user
def get_tasks(id):
    #Filter all tasks by the user id
    tasks = Task.query.filter(Task.user_id == id)
    return {'tasks': [task.to_dict() for task in tasks]}

@user_routes.route('/<int:id>/boards')
@login_required
# Get all boards of current user
def get_boards(id):
    #Filter all boards by the user id
    boards = Board.query.filter(Board.user_id == id)
    return {'boards': [board.to_dict() for board in boards]}

@user_routes.route('/<int:id>')
@login_required
# Get profile of current user
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/task/<int:section_id>', methods=["POST"])
@login_required
# Create a task
def create_task(id, section_id):
    # Gets the length of the section
    task_count = len(Task.query.filter(Task.section_id == section_id))
    # Creates instance of create task form class
    form = CreateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Uses values from the form instance to create new task
        task = Task(
            name=form.data['name'],
            # Sets task as the last task in the section
            order=task_count,
            due_date=form.data['due_date'],
            description=form.data['description'],
            section_id=section_id,
            user_id=id,
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:user_id>', methods=["PUT"])
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


@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
# Delete user by id
def delete_user(user_id):
    profile = User.query.get(user_id)
    db.session.delete(profile)
    db.session.commit()
    return {'message': 'Successfully deleted!'}
