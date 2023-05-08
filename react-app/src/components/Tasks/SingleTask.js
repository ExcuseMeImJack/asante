import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById } from '../../store/tasks';
import { useParams } from 'react-router-dom';
import './SingleTask.css'

function SingleTask({taskId}){
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);

    //dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    const task = storeTasks.task;

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
