from flask import Blueprint, request
from app.models import Board, db, Section
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms.edit_section_form import EditSectionForm

section_routes = Blueprint('sections', __name__, url_prefix="/sections")

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
        section = Section(
            name=form.data['name']
        )
        db.session.add(section)
        db.session.commit()
        return section.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
