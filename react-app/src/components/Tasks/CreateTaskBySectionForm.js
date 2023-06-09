import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskBySectionId } from '../../store/tasks';
import './CreateTaskBySectionForm.css'

function CreateTaskBySectionForm({sectionId, setCreateButton}){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        if (!taskName) {
            setErrors(error => ({...errors, taskName: "Task Name Required"}))
        }
        if (taskName.length > 15) {
            setErrors(error => ({...errors, taskName: "Task Must be 15 or less characters."}))
            return;
        }
        if (!description) {
            setErrors(errors => ({...errors, description: "Description Required!"}))
            return;
        }
        if(description.length > 60){
            setErrors(errors => ({...errors, description: "Description must be 60 characters or less."}))
            return;
        }

        const data = await dispatch(addTaskBySectionId({
            name: taskName,
            due_date: dueDate,
            description: description
        }, sectionId))
        if (data.status === 401) {
            console.log(data)
            setErrors(errors => ({...errors, dueDate: "Due Date Required!"}))
            return;
        }
        setCreateButton(true)
    }

    return (
        <div>
            <form className='createtaskform' onSubmit={handleSubmit}>
                    <p>Task Name</p>
                    <input
                        type="text"
                        placeholder="Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <div className="error-container">
                    {errors.taskName && <p>{errors.taskName}</p>}
                    </div>
                    <p>Due Date</p>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="error-container">
                    {errors.dueDate && <p>{errors.dueDate}</p>}
                    </div>
                    <p className='test'>Description</p>
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="error-container">
                    {errors.description && <p>{errors.description}</p>}
                    </div>
                    <button type="submit" className="submit-create-task">Create Task</button>
                </form>
            </div>
    );
}

export default CreateTaskBySectionForm;
