import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskByTaskId, editTaskByTaskId, getAllTasksBySectionId, getTasksByUserId, orderTasksThunk } from '../../store/tasks';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';
import { useHistory } from 'react-router-dom';

function AllTasksBySection({ sectionId }) {
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);

    // dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch])

    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks.filter(task => task.section_id === sectionId).sort((a, b) => a.order - b.order)

    return (
        <div className='tasks-container'>
            {console.log('SECTION TASKS~~~~~~~', tasks.map(t => t.order))}
            <Droppable droppableId={'section-' + sectionId} type='task'>
                {(provided) => (
                    <div className='task-gallery' {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Draggable draggableId={"task-" + task.id} key={task.id} index={index}>
                                {(provided) => (
                                    < div className='single-task-border' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                        <SingleTask task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div >
    );
}

export default AllTasksBySection;
