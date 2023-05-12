import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectionByBoardId } from '../../store/sections'

function CreateSectionForm({boardId, setPlus}){
    const dispatch = useDispatch();
    const [sectionName, setSectionName] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!sectionName) {
            setErrors(errors => ({...errors, sectionName: "Please enter a section name"}))
            // setButtonHidden(false);
            return;
        }
        await dispatch(addSectionByBoardId({name: sectionName}, boardId))
        setPlus(true)
    }

    return (
        <div>
            <form className='new-section-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="New Section Name"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    <div className="error-container">
                    {errors.sectionName && <p>{errors.sectionName}</p>}
                    </div>
                    <button type="submit" className="submit-create">Create Section</button>
                </form>
            </div>
    );
}

export default CreateSectionForm;
