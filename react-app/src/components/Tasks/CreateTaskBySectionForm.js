import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskBySectionId } from '../../store/tasks';
import './CreateTaskBySectionForm.css'

function CreateTaskBySectionForm({sectionId, setButtonHidden}){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState('')
    const [taskName, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!taskName) {
            setErrors({...errors, taskName: "Task Name Required"})
            // setButtonHidden(false);
            return;
        }
        await dispatch(addTaskBySectionId({
            name: taskName,
            due_date: dueDate,
            description: description
        }, sectionId))
        setButtonHidden(false);
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                    <label>
                    Name
                    <input
                        type="text"
                        placeholder="Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    </label>
                    <div className="error-container">
                    {errors.taskName && <p>{errors.taskName}</p>}
                    </div>
                    <label>
                    Due Date
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    </label>
                    <div className="error-container">
                    {errors.date && <p>{errors.date}</p>}
                    </div>
                    <label>
                    Description
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </label>
                    <div className="error-container">
                    {errors.description && <p>{errors.description}</p>}
                    </div>
                    <button type="submit" className="submit-create">Create Task</button>
                </form>
            </div>
    );
}

export default CreateTaskBySectionForm;
