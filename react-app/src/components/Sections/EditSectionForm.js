import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editSectionBySectionId } from '../../store/sections';
import { getSectionsByBoardId } from '../../store/sections';

function EditSectionForm({sectionId, setEditButton, boardId}){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!sectionName) {
            setErrors(errors => ({...errors, sectionName: "Please enter a new name"}))
            return;
        }
        await dispatch(editSectionBySectionId({name: sectionName}, sectionId));
        await dispatch(getSectionsByBoardId(boardId));
        setEditButton(false)
    }

    return (
        <div className='edit-section-div'>
            <form onSubmit={handleSubmit} className='new-section-form'>
                    <input
                        type="text"
                        placeholder="Section Name"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    <div className="error-container">
                        {errors.sectionName && <p>{errors.sectionName}</p>}
                    </div>
                    <button type="submit" className="submit-create"><i className="fa-solid fa-check"></i></button>
                </form>
            </div>
    );
}

export default EditSectionForm;
