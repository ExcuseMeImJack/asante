from flask import Blueprint, request
from app.models import Board, db, Section, Task
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_section_form import EditSectionForm
from ..forms.create_task_form import CreateTaskForm
from ..forms.create_section_form import CreateSectionForm

# Creates a Blueprint for section routes
section_routes = Blueprint('sections', __name__, url_prefix="/api/sections")


@section_routes.route('/<int:id>')
@login_required
# Get section by section id
def get_section(id):
    # Query a section by section id
    section = Section.query.get(id)
    return { "Section": section.to_dict() }

@section_routes.route('/<int:id>', methods=["DELETE"])
@login_required
# Delete section by section id
def delete_section(id):
    # Query a section by section id
    section = Section.query.get(id)
    # Delete section
    db.session.delete(section)
    # Updates database
    db.session.commit()
    return {'message': 'Successfully deleted!'}

@section_routes.route('/<int:id>', methods=["PUT"])
@login_required
# Edit a section by id
def edit_section(id):
    # Query a section by section id
    section = Section.query.get(id)
    # Creates instance of edit section form class
    form = EditSectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Uses values from the form instance to edit section
        section.name=form.data['name']
        # Updates database
        db.session.commit()
        return { "Section": section.to_dict() }
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@section_routes.route('/<int:board_id>', methods=["POST"])
@login_required
# Create a section of current user
def create_section(board_id):
    # Gets the length of the sections in a board
    section_count = len(Section.query.filter(Section.board_id == board_id))
    # Creates instance of create section form class
    form = CreateSectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Uses values from the form instance to create new section
        section = Section(
            name=form.data['name'],
            # Sets section as the last section in the board
            order = section_count,
            board_id=board_id,
        )
        db.session.add(section)
        # Updates database
        db.session.commit()
        return { "Section": section.to_dict() }
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
