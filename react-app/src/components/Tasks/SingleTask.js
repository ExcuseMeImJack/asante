import React, { useEffect, useRef, useState } from 'react';
import EditTaskByIdForm from '../Tasks/EditTaskByIdForm';
import './SingleTask.css'

function SingleTask({ task }) {
    const [showEditTask, setShowEditTask] = useState(false);
    const ulRef = useRef();
    // console.log(task)

    const openTask = () => {
        if (showEditTask) return;
        setShowEditTask(true);
      };

    useEffect(() => {
    if (!showEditTask) return;

    const closeTask = (e) => {
        if (!ulRef.current) return;
        if (!ulRef.current.contains(e.target)) {
        setShowEditTask(false);
        }
    };
    document.addEventListener("click", closeTask);
    return () => document.removeEventListener("click", closeTask);
    }, [showEditTask]);

    if (!task) return <h1></h1>
    const ulClassName = "board-task" + (showEditTask ? "" : " board-hidden-task");

    return (
        <div className='single-task-card' onClick={openTask}>
            <h3>{task.name}</h3>
            <div>{task.description || "No description"}</div>
            <ul className={ulClassName} ref={ulRef}>
                <EditTaskByIdForm task={task} ulRef={ulRef} type={"single-task"} setShowEditTask={setShowEditTask}/>
            </ul>
        </div>
    );
}

export default SingleTask;
