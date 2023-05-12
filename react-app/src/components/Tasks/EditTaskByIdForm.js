import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import { editTaskByTaskId } from '../../store/tasks';
import './EditTaskByIdForm.css'

function EditTaskByIdForm({ task, ulRef }){
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState(task.name);
    const [dueDate, setDueDate] = useState(task.due_date);
    const [description, setDescription] = useState(task.description);
    // const [clickedOnce, setClickedOnce] = useState(false);
    const [errors, setErrors] = useState({});
    const [updated, setUpdated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        let hasErrors = false;
        // if (!clickedOnce){
        //     setErrors(errors => ({...errors, dueDate: "Due Date Required!"}))
        //     hasErrors = true;
        //     setClickedOnce(true);
        // }
        if (!taskName){
            setErrors(errors => ({...errors, taskName: "Task Name Required!"}))
            hasErrors = true;
        }
        if (!dueDate) {
            setErrors(errors => ({...errors, dueDate: "Due Date Required!"}))
            hasErrors = true;
        }
        if (!description) {
            setErrors(errors => ({...errors, description: "Description Required!"}))
            hasErrors = true;
        }
        if (hasErrors) return;
        const data = await dispatch(editTaskByTaskId({
            name: taskName,
            due_date: dueDate,
            description: description
        }, task.id))
        console.log(data)
        if (data.status === 401) {
            setErrors(errors => ({...errors, dueDate: "Due Date Required!"}))
            hasErrors = true;
            return;
            // setClickedOnce(true);
        }
        await dispatch(getTasksByUserId())
        setUpdated(true)
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
                        {errors.taskName && <p>{errors.taskName}</p>}
                    </div>
                    <input
                        type="date"
                        className='edit-task-input'
                        defaultValue={formattedDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="error-container">
                        {errors.dueDate && <p>{errors.dueDate}</p>}
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
                    <div className="updated">
                        {updated && <p>Updated!</p>}
                    </div>
                    <button type="submit" className="form-button">Edit Task</button>
                </form>
            </div>
    );
}

export default EditTaskByIdForm;
