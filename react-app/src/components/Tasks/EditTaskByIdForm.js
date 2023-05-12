import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskBySectionId, getTasksByUserId } from '../../store/tasks';
import { editTaskByTaskId } from '../../store/tasks';
import './EditTaskByIdForm.css'

function EditTaskByIdForm({ task, ulRef }){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [taskName, setTaskName] = useState(task.name)
    const [dueDate, setDueDate] = useState(task.due_date)
    const [description, setDescription] = useState(task.description)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!taskName) setErrors({...errors, taskName: "Task Name Required!"})
        if (!dueDate) setErrors({...errors, dueDate: "Due Date Required!"})
        if (!description) setErrors({...errors, description: "Description Required!"})
        await dispatch(editTaskByTaskId({
            name: taskName,
            due_date: dueDate,
            description: description
        }, task.id))
        await dispatch(getTasksByUserId())
    }


    //format date so that input default value works
    const date = new Date(dueDate);
    let formattedDate = date.toLocaleDateString('en-CA');
    const day = parseInt(formattedDate.split("-")[2]) + 1;
    formattedDate = formattedDate.split("-");
    formattedDate[2] = day;
    formattedDate = formattedDate.join("-")

    return (
        <div>
            <form onSubmit={handleSubmit} className='form'>
                    <input
                        ref={ulRef}
                        className='edit-task-input'
                        type="text"
                        placeholder="Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <div className="error-container">
                        {errors.dueDate && <p>{errors.dueDate}</p>}
                    </div>
                    <input
                        type="date"
                        className='edit-task-input'
                        defaultValue={formattedDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="error-container">
                        {errors.taskName && <p>{errors.taskName}</p>}
                    </div>
                    <input
                        type="text"
                        className='edit-task-input'
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="error-container">
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <button type="submit" className="form-button">Edit Task</button>
                </form>
            </div>
    );
}

export default EditTaskByIdForm;
