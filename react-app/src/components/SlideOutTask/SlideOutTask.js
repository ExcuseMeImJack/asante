import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './SlideOutTask.css'
import EditTaskByIdForm from '../Tasks/EditTaskByIdForm';

export default function SlideOutTask({ task }) {
    const storeTasks = useSelector((state) => state.tasks.tasks);
    const [showTask, setShowTask] = useState(false);
    const ulRef = useRef();
    const storeTask = storeTasks.find(findTask => findTask.id === task.id);

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

    const ulClassName = "slide-out-task" + (showTask ? "" : " hidden-task");


    // if(storeTasks.length == 0) return <p>You have no tasks.</p>

    // const formatDateForDisplay = () => {
    //   const formattedDate = storeTask.due_date?.split("00:00:00")[0].split(' ');
    //   const date = formattedDate[2]
    //   const month = formattedDate[1]
    //   return date + ' ' + month
    // }

  return (
    <div>
      {/* <div className='profile-divider'></div> */}
      <button id="profile-task-link" className='change-cursor' onClick={openTask}>{task.name}</button>
      <div>
      </div>
        <div className='task-slide-container'>
            <ul className={ulClassName} ref={ulRef}>
                <li className='slide-out-task-item'>{storeTask.name}</li>
                <li className='slide-out-task-item'>Due: {storeTask.due_date?.split("00:00:00")[0]}</li>
                <li className='slide-out-task-item'>{storeTask.description}</li>
                <EditTaskByIdForm task={task} ulRef={ulRef}/>
            </ul>
        </div>
    </div>
  )
}
