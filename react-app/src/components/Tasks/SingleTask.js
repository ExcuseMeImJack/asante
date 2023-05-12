import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SlideOutTask from '../SlideOutTask/SlideOutTask';
import EditTaskByIdForm from '../Tasks/EditTaskByIdForm';
import './SingleTask.css'

function SingleTask({ task }) {
    const storeTasks = useSelector((state) => state.tasks.tasks);
    const storeTask = storeTasks.find(findTask => findTask.id === task.id)
    const [showTask, setShowTask] = useState(false);
    const ulRef = useRef();
    // console.log(task)

    const openTask = () => {
        if (showTask) return;
        setShowTask(true);
      };

    useEffect(() => {
    if (!showTask) return;

    const closeTask = (e) => {
        if (!ulRef.current) return;
        if (!ulRef.current.contains(e.target)) {
        setShowTask(false);
        }
    };
    document.addEventListener("click", closeTask);
    return () => document.removeEventListener("click", closeTask);
    }, [showTask]);

    if (!task) return <h1>...Loading</h1>
    const ulClassName = "board-task" + (showTask ? "" : " board-hidden-task");

    return (
        <div className='single-task-card' onClick={openTask}>
            <h3>{task.name}</h3>
            <div>{task.description || "No description"}</div>
            <ul className={ulClassName} ref={ulRef}>
                <EditTaskByIdForm task={task} ulRef={ulRef} type={"single-task"}/>
            </ul>
        </div>
    );
}

export default SingleTask;
