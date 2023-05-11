import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import { Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';

function AllTasksBySection({sectionId}){
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);


    // dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch])

    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks.filter((task) => task.section_id === sectionId);


	return (
        <div>

            {tasks.map((task) => (
                <div key={task.id}>
                    <SingleTask task={task}/>
                </div>
            ))}
        </div>
	);
}

export default AllTasksBySection;
