import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectionByBoardId } from '../../store/sections'

function CreateSectionForm({boardId, setButtonHidden}){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!sectionName) {
            setButtonHidden(false);
            return;
        }
        await dispatch(addSectionByBoardId({name: sectionName}, boardId))
        setButtonHidden(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label>
                    Name
                    <input
                        type="text"
                        placeholder="Name"
                        value={sectionName}
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
