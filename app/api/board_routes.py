from flask import Blueprint, request
from app.models import Board, db, Section
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms.create_board_form import CreateBoardForm

# Creates a Blueprint for board routes
board_routes = Blueprint('boards', __name__, url_prefix="/api/boards")


@board_routes.route('/<int:board_id>/sections')
@login_required
# Get all sections by board id
def get_sections(board_id):
    # Query board by board id
    board = Board.query.get(board_id)
    if (board.user_id == current_user.to_dict().id):
        # Query all sections by board id
        sections = Section.query.filter(Section.board_id == board_id)
        return { 'sections': [section.to_dict() for section in sections] }
    else:
        return {'errors': ['Unauthorized']}, 401

@board_routes.route('', methods=["POST"])
@login_required
# Create a board of current user
def create_board():
    user_id = current_user.to_dict().id
    # Creates instance of create board form class
    form = CreateBoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Uses values from the form instance to create new board
        board = Board(
            name=form.data['name'],
            user_id=user_id,
        )
        # Add board to database
        db.session.add(board)
        # Updates database
        db.session.commit()
        return { "Board": board.to_dict() }
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@board_routes.route('/<int:board_id>')
@login_required
# Get single board by id
def get_board(board_id):
    # Query board by board id
    board = Board.query.get(board_id)
    # Check if board belongs to user
    if (board.user_id == current_user.to_dict().id):
        return { "Board": board.to_dict() }
    else:
        return {'errors': ['Unauthorized']}, 401

@board_routes.route('/<int:board_id>', methods=["DELETE"])
@login_required
# Delete single board by id
def delete_board(board_id):
    # Query a board by board id
    board = Board.query.get(board_id)
    # Check if board belongs to user
    if (board.user_id == current_user.to_dict().id):
        # Deletes board from database
        db.session.delete(board)
        # Updates database
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401
