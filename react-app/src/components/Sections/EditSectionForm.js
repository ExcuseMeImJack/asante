import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editSectionBySectionId } from '../../store/sections';
import { getSectionsByBoardId } from '../../store/sections';

function EditSectionForm({sectionId, setButtonHidden, boardId}){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        let hasErrors = false;
        if (!sectionName) {
            setErrors(errors => ({...errors, sectionName: "Please enter a new name"}))
            hasErrors = true;
            return;
        }
        await dispatch(editSectionBySectionId({name: sectionName}, sectionId));
        await dispatch(getSectionsByBoardId(boardId));
        // setButtonHidden(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Section Name"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    <div className="error-container">
                        {errors.sectionName && <p>{errors.sectionName}</p>}
                    </div>
                    <button type="submit" className="submit-create">Edit Section</button>
                </form>
            </div>
    );
}

export default EditSectionForm;
