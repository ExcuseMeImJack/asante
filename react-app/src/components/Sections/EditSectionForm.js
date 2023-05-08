import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import editSectionBySectionId from '../../store/sections'

function EditSectionForm({sectionId}){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('')

    const handleSubmit = async () => {
        await dispatch(editSectionBySectionId({name: sectionName}, sectionId))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label>
                    Name
                    <input
                        type="text"
                        placeholder="Name"
                        value={boardName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    </label>
                    {/* <div className="error-container">
                    {errors.name && <p>{errors.name}</p>}
                    </div> */}
                    <button type="submit" className="submit-create">Edit Section</button>
                </form>
            </div>
    );
}

export default EditSectionForm;
