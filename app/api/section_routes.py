from flask import Blueprint, request
from app.models import Board, db, Section
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_section_form import EditSectionForm
from ..forms.create_section_form import CreateSectionForm

# Creates a Blueprint for section routes
section_routes = Blueprint('sections', __name__, url_prefix="/api/sections")

@section_routes.route('')
@login_required

def get_sections():
    sections = Section.query.all()
    boards = Board.query.all()
    return {'sections': [section.to_dict()
                         for section in sections
                         for board in boards
                         if section.board_id == board.id
                         if board.user_id == current_user.id]}

# {'id': 1, 'name': 'Section 1', 'order': 0, 'board_id': 1, 'created_at': datetime.date(2023, 5, 8), 'updated_at': datetime.date(2023, 5, 8)}


@section_routes.route('/<int:section_id>')
@login_required
# Get section by section id
def get_section(section_id):
    # Query a section by section id
    section = Section.query.get(section_id)

    if not section:
        return {'errors': ['Section does not exist']}, 404

    board_id = section.board_id
    board = Board.query.get(board_id)

    # if not board:
    #     return {'errors': ['Board does not exist']}, 404

    # Check if board belongs to current user
    if (board.user_id == current_user.id):
        return { "Section": section.to_dict() }
    else:
        return {'errors': ['Unauthorized']}, 401

@section_routes.route('/<int:section_id>', methods=["DELETE"])
@login_required
# Delete section by section id
def delete_section(section_id):
    # Query a section by section id
    section = Section.query.get(section_id)

    if not section:
        return {'errors': ['Section does not exist']}, 404

    board_id = section.board_id
    board = Board.query.get(board_id)
    # Check if board belongs to current user
    if (board.user_id == current_user.id):
        # Delete section
        db.session.delete(section)
        # Updates database
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401

@section_routes.route('/<int:board_id>/move', methods=["PUT"])
@login_required
# Reorder sections
def edit_section_order(board_id):
    data = request.json
    board = Board.query.get(board_id)
    # Check if board belongs to current user
    if (board.user_id == current_user.id):
        sections = []
        for index in range(0,len(data)):
            section = data[index]
            print('SECTION ~~~~~', type(section))
            db_section = Section.query.get(section['id'])
            db_section.order = index
            db.session.commit()
            sections.append(db_section)
        return { 'sections': [section.to_dict() for section in sections] }
    else:
        return {'errors': ['Unauthorized']}, 401


@section_routes.route('/<int:section_id>', methods=["PUT"])
@login_required
# Edit a section by id
def edit_section(section_id):
    # Query a section by section id
    section = Section.query.get(section_id)

    if not section:
        return {'errors': ['Section does not exist']}, 404

    board_id = section.board_id
    board = Board.query.get(board_id)
    # Check if board belongs to current user
    if (board.user_id == current_user.id):
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
    else:
        return {'errors': ['Unauthorized']}, 401



@section_routes.route('/<int:board_id>', methods=["POST"])
@login_required
# Create a section of current user
def create_section(board_id):
    board = Board.query.get(board_id)

    if not board:
        return {'errors': ['Board does not exist']}, 404

    # Check if board belongs to current user
    if (board.user_id == current_user.id):
        # Creates instance of create section form class
        form = CreateSectionForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # Gets the length of the sections in a board
            section_count = len(list(Section.query.filter(Section.board_id == board_id)))
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
    else:
        return {'errors': ['Unauthorized']}, 401
