from flask import Blueprint, request
from app.models import Board, db, Section, Task
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_section_form import EditSectionForm
from ..forms.create_task_form import CreateTaskForm
from ..forms.create_section_form import CreateSectionForm

section_routes = Blueprint('sections', __name__, url_prefix="/api/sections")

@section_routes.route('')
def test():
    sections = Section.query.all()
    return {'sections': [section.to_dict() for section in sections]}

@section_routes.route('/<int:section_id>')
@login_required
# Get section by section id
def get_section(section_id):
    section = Section.query.get(section_id)
    return section.to_dict()

@section_routes.route('/<int:section_id>')
@login_required
# Delete section by section id
def delete_section(section_id):
    section = Section.query.get(section_id)
    db.session.delete(section)
    db.session.commit()
    return {'message': 'Successfully deleted!'}

@section_routes.route('/<int:section_id>', methods=["PUT"])
@login_required
# Edit a section by id
def edit_section(section_id):
    section = Section.query.get(section_id)
    form = EditSectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        section.name=form.data['name']
        db.session.commit()
        return section.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<int:section_id>/<int:user_id>/task', methods=["POST"])
@login_required
# Create a task
def create_task(user_id, section_id):
    task_count = len(Task.query.filter(Task.section_id == section_id))
    form = CreateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            name=form.data['name'],
            order=task_count,
            due_date=form.data['due_date'],
            description=form.data['description'],
            section_id=section_id,
            user_id=user_id,
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@section_routes.route('/<int:board_id>', methods=["POST"])
@login_required
# Create a section of current user
def create_section(board_id):
    section_count = len(Section.query.filter(Section.board_id == board_id))
    form = CreateSectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        section = Section(
            name=form.data['name'],
            order = section_count,
            board_id=board_id,
        )
        db.session.add(section)
        db.session.commit()
        return section.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
