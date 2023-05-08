import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import editSection from '../../store/sections'

function EditSectionForm(){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('')

    const handleSubmit = async () => {
        await dispatch(editSection({name: sectionName}))
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
