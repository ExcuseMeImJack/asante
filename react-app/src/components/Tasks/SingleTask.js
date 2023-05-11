import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById } from '../../store/tasks';
import { useParams } from 'react-router-dom';
import './SingleTask.css'

function SingleTask({task}){

    if (!task) return <h1>...Loading</h1>

	return (
        <div className='single-task-card'>
            <h3>{task.name}</h3>
            <div>{task.description || "No description"}</div>
        </div>
	);
}

export default SingleTask;
