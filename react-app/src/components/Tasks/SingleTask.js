import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById } from '../../store/tasks';
import { useParams } from 'react-router-dom';
import './SingleTask.css'

function SingleTask(){
    const dispatch = useDispatch();
    const { taskId } = useParams();
    const storeTasks = useSelector((state) => state.tasks);
    //dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch, taskId])

    // grab users array from the storeUsers object
    console.log(storeTasks)
    const task = storeTasks.task;
    console.log(task)
    if (!task) return <h1>...Loading</h1>
	return (
        <div>
            <h1>Task</h1>
            <div>{task.name}</div>
            <div>{task.id}</div>
        </div>
	);
}

export default SingleTask;
