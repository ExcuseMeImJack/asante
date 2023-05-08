import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import addSection from '../../store/sections'

function CreateSectionForm({boardId}){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('')

    const handleSubmit = async () => {
        await dispatch(addSection({name: sectionName}, boardId))
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
                    <button type="submit" className="submit-create">Create Section</button>
                </form>
            </div>
    );
}

export default CreateSectionForm;
