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

    if not task:
        return {'errors': ['Task does not exist']}, 404

    # Check if task belongs to current user
    if (task.user_id == current_user.id):
        return { "Task": task.to_dict() }
    else:
        return {'errors': ['Unauthorized']}, 401

@task_routes.route('/section/<int:section_id>')
@login_required
# Get task by id
def get_all_tasks(section_id):
    print()
    # Query a task by task id
    tasks = Task.query.filter(Task.section_id == section_id)
    print('TASKS~~~~', tasks)
    # Check if task belongs to current user
    return { "Tasks": [task.to_dict() for task in tasks] }

@task_routes.route('/<int:section_id>/move', methods=["PUT"])
@login_required
# Re order tasks
def edit_task_order(task_id):
    data = request.json
    task = Task.query.get(task_id)
    if (task.user_id == current_user.id):
        for index in range(0,len(data)):
            task = data[index]
            task['order'] = index


@task_routes.route('/<int:task_id>', methods=["PUT"])
@login_required
# Edit task by id
def edit_task(task_id):
    # Query a task by task id
    task = Task.query.get(task_id)

    if not task:
        return {'errors': ['Task does not exist']}, 404

    # Check if task belongs to current user
    if (task.user_id == current_user.id):
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

@task_routes.route('/<int:task_id>', methods=["DELETE"])
@login_required
# Delete task by id
def delete_task(task_id):
    # Query a task by task id
    task = Task.query.get(task_id)

    if not task:
        return {'errors': ['Task does not exist']}, 404

    # Check if task belongs to current user
    if (task.user_id == current_user.id):
        # Deletes task from database
        db.session.delete(task)
        # Updates database
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401
