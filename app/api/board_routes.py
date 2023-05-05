from flask import Blueprint, request
from app.models import Board, db, Section
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.create_board_form import CreateBoardForm
from ..forms.create_section_form import CreateSectionForm

board_routes = Blueprint('boards', __name__, url_prefix="/boards")

@board_routes.route('/<int:user_id>')
@login_required
# Get all boards of current user
def get_boards(user_id):
    boards = Board.query.filter(Board.user_id == user_id)
    return {'boards': [board.to_dict() for board in boards]}

@board_routes.route('/<int:user_id>', methods=["POST"])
@login_required
# Create a board of current user
def create_board(user_id):
    form = CreateBoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        board = Board(
            name=form.data['name'],
            user_id=user_id,
        )
        db.session.add(board)
        db.session.commit()
        return board.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@board_routes.route('/<int:board_id>')
@login_required
# Get single board by id
def get_board(board_id):
    board = Board.query.get(board_id)
    return board.to_dict()

@board_routes.route('/<int:board_id>')
@login_required
# Delete single board by id
def delete_board(board_id):
    board = Board.query.get(board_id)
    db.session.delete(board)
    db.session.commit()
    return {'message': 'Successfully deleted!'}

@board_routes.route('/<int:board_id>/sections')
@login_required
# Get all sections by board id
def get_sections(board_id):
    sections = session.query(Board).join(Section)
    return {'sections': [section.to_dict() for section in sections]}

@board_routes.route('/<int:board_id>', methods=["POST"])
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
