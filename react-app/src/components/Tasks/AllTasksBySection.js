import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasksBySectionId } from '../../store/tasks';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';

function AllTasksBySection({sectionId}){
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);
    console.log(sectionId)

    //dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getAllTasksBySectionId(sectionId))
    }, [dispatch])

    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks;

    if (!tasks) return <h1>...Loading</h1>

	return (
        <div>
            <h1>My Tasks</h1>
            {tasks.map((task) => {
            return  <div key={task.id}>
                        { console.log(task.id)}
                        <div>{task.name}</div>
                    </div>
            })}
        </div>
	);
}

export default AllTasksBySection;
