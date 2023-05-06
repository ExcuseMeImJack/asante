from flask import Blueprint, request
from app.models import Board, db, Section, Task
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_section_form import EditSectionForm
from ..forms.create_task_form import CreateTaskForm
from ..forms.create_section_form import CreateSectionForm

section_routes = Blueprint('sections', __name__, url_prefix="/api/sections")


@section_routes.route('/<int:id>')
@login_required
# Get section by section id
def get_section(id):
    section = Section.query.get(id)
    return section.to_dict()

@section_routes.route('/<int:id>', methods=["DELETE"])
@login_required
# Delete section by section id
def delete_section(id):
    section = Section.query.get(id)
    db.session.delete(section)
    db.session.commit()
    return {'message': 'Successfully deleted!'}

@section_routes.route('/<int:id>', methods=["PUT"])
@login_required
# Edit a section by id
def edit_section(id):
    section = Section.query.get(id)
    form = EditSectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        section.name=form.data['name']
        db.session.commit()
        return section.to_dict()
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
