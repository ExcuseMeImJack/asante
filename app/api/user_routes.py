from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Board, Task
from ..forms.create_task_form import CreateTaskForm
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_profile_form import EditProfileForm
from .aws_helpers import upload_file_to_s3, get_unique_filename

# Creates a Blueprint for user routes
user_routes = Blueprint('users', __name__)

@user_routes.route('/tasks')
@login_required
# Get all tasks of current user
def get_tasks():
    user_id = current_user.id
    #Filter all tasks by the user id
    tasks = Task.query.filter(Task.user_id == user_id)
    return {'Tasks': [task.to_dict() for task in tasks] }

@user_routes.route('/boards')
@login_required
# Get all boards of current user
def get_boards():
    user_id = current_user.id
    #Filter all boards by the user id
    boards = Board.query.filter(Board.user_id == user_id)
    return {'Boards': [board.to_dict() for board in boards] }

@user_routes.route('')
@login_required
# Get profile of current user
def user():
    """
    Query for a user by id and returns that user in a dictionary
    """
    profile = User.query.get(current_user.id)
    return { "user": profile.to_dict() }

@user_routes.route('/task/<int:section_id>', methods=["POST"])
@login_required
# Create a task
def create_task(section_id):
    # Gets the length of the tasks in a section
    task_count = len(list(Task.query.filter(Task.section_id == section_id)))

    section = Task.query.get(section_id)

    if not section:
        return {'errors': ['Section does not exist']}, 404

    if section.user_id == current_user.id:
        # Creates instance of create task form class
        form = CreateTaskForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = current_user.id
            # Uses values from the form instance to create new task
            task = Task(
                name=form.data['name'],
                # Sets task as the last task in the section
                order=task_count,
                due_date=form.data['due_date'],
                description=form.data['description'],
                section_id=section_id,
                user_id=user_id,
            )
            # Add task to database
            db.session.add(task)
            # Updates database
            db.session.commit()
            return { "Task": task.to_dict() }
        # Returns validation errors
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {'errors': ['Unauthorized']}, 401


@user_routes.route('', methods=["PUT"])
@login_required
# Edit profile by user id
def edit_profile():
    # Query a user by user id
    profile = User.query.get(current_user.id)
    # Creates instance of edit profile form class
    form = EditProfileForm()
    # Uses values from the form instance to edit a user information
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        profile_pic = form.data["profile_pic_url"]
        profile_pic.filename = get_unique_filename(profile_pic.filename)
        upload = upload_file_to_s3(profile_pic)

        if "url" not in upload:
            return {'errors': [upload]}

        profile_pic_url = upload["url"]

        profile.name=form.data["name"]
        profile.about_me=form.data["about_me"]
        profile.profile_pic_url=profile_pic_url

        # Updates database
        db.session.commit()
        return profile.to_dict()
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('', methods=['DELETE'])
@login_required
# Delete user by id
def delete_user():
    # Query a user by user id
    profile = User.query.get(current_user.id)
    # Deletes profile from database
    db.session.delete(profile)
    # Updates database
    db.session.commit()
    return {'message': 'Successfully deleted!'}
