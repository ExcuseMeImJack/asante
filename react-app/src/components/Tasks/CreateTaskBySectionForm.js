import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskBySectionId } from '../../store/tasks';

function CreateTaskBySectionForm({sectionId}){
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addTaskBySectionId({
            name: taskName,
            due_date: dueDate,
            description: description
        }, sectionId))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label>
                    Name
                    <input
                        type="text"
                        placeholder="Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    </label>
                    {/* <div className="error-container">
                    {errors.name && <p>{errors.name}</p>}
                    </div> */}
                    <label>
                    Due Date
                    <input
                        type="text"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    </label>
                    {/* <div className="error-container">
                    {errors.name && <p>{errors.name}</p>}
                    </div> */}
                    <label>
                    Description
                    <input
                        type="text"
                        placeholder="Description"
                        value={sectionName}
                        onChange={(e) => setDescription(e.target.value)}
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

export default CreateTaskBySectionForm;
