from flask import Blueprint, request
from app.models import Board, db, Section, Task
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_task_form import EditTaskForm

# Creates a Blueprint for task routes
task_routes = Blueprint('tasks', __name__, url_prefix="/api/tasks")

@task_routes.route('/<int:task_id>')
@login_required
# Get task by id
def get_task(task_id):
    # Query a task by task id
    task = Task.query.get(task_id)
    # Check if task belongs to current user
    if (task.user_id == current_user.to_dict().id):
        return { "Task": task.to_dict() }
    else:
        return {'errors': ['Unauthorized']}, 401

@task_routes.route('/<int:task_id>', methods=["PUT"])
@login_required
# Edit task by id
def edit_task(task_id):
    # Query a task by task id
    task = Task.query.get(task_id)
    # Check if task belongs to current user
    if (task.user_id == current_user.to_dict().id):
        # Creates instance of edit task form class
        form = EditTaskForm()
        # Uses values from the form instance to edit a task
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # Uses values from the form instance to edit task
            task.name=form.data["name"]
            task.due_date=form.data["due_date"]
            task.description=form.data["description"]
            # Updates database
            db.session.commit()
            return { "Task": task.to_dict() }

        # Returns validation errors
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {'errors': ['Unauthorized']}, 401

@task_routes.route('/<int:task_id>')
@login_required
# Delete task by id
def delete_task(task_id):
    # Query a task by task id
    task = Task.query.get(task_id)
    # Check if task belongs to current user
    if (task.user_id == current_user.to_dict().id):
        # Deletes task from database
        db.session.delete(task)
        # Updates database
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401
