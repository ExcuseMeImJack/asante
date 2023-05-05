from flask import Blueprint, request
from app.models import Board, db, Section, Task
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_task_form import EditTaskForm

task_routes = Blueprint('tasks', __name__, url_prefix="/tasks")

@task_routes.route('/<int:user_id>')
@login_required
# Get all tasks of current user
def get_tasks(user_id):
    tasks = Task.query.filter(Task.user_id == user_id)
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/<int:task_id>')
@login_required
# Get task by id
def get_task(task_id):
    task = Task.query.get(task_id)
    return task.to_dict()

@task_routes.route('/<int:task_id>', methods=["PUT"])
@login_required
# Edit task by id
def edit_task(task_id):
    task = Task.query.get(task_id)
    form = EditTaskForm()
    if form.validate_on_submit():
        task.name=form.data["name"]
        task.due_date=form.data["due_date"]
        task.description=form.data["description"]
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<int:task_id>')
@login_required
# Delete task by id
def delete_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()
    return {'message': 'Successfully deleted!'}
