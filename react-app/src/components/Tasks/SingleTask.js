import React from 'react';
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
