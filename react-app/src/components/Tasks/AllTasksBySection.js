import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskByTaskId, editTaskByTaskId, getTasksByUserId, orderTasksThunk } from '../../store/tasks';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';
import { useHistory } from 'react-router-dom';

function AllTasksBySection({ sectionId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const storeTasks = useSelector((state) => state.tasks);
    const storeBoards = useSelector((state) => state.boards);
    const [editButtonHidden, setEditButtonHidden] = useState(false);
    const [createButtonHidden, setCreateButtonHidden] = useState(false);

    // dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch])

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        console.log('Source ~~~~~~~~~>', source)
        console.log('Destination ~~~~>', destination)
        console.log('DraggableId ~~~~>', draggableId)
        // console.log('Type ~~~~~~~~~~~>', type)
        // const taskId = +draggableId.split('-')[1]

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }
        //same column
        if (destination.droppableId === source.droppableId) {
            //reorder the task in 1 section
            const sectionId = +destination.droppableId.split('-')[1]
            const tasksClone = [...tasks]
            const task = tasksClone[source.index]
            tasksClone.splice(source.index, 1)
            tasksClone.splice(destination.index, 0, task)
            dispatch(orderTasksThunk(tasksClone, sectionId))
        }

        // else {
        //     //call 2 thunks
        //     //change section id for task
        //     //reorder the tasks in the both sections source/destination
        //     const tasksClone = [...storeTasks.tasks]
        //     const task = tasksClone[source.index]
        //     console.log(task)
        //     tasksClone.splice(source.index, 1)
        //     tasksClone.splice(destination.index, 0, task)
        //     // dispatch(editTaskByTaskId(task, task.id))
        //     // dispatch(orderTasks(tasksClone))
        // }


    }

    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks.filter((task) => task.section_id === sectionId);


    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'section-' + sectionId} type='task'>
                    {(provided) => (
                        <div className='task-gallery' {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <div key={task.id}>
                                    <Draggable draggableId={"task-" + task.id} key={task.id} index={index}>
                                        {(provided) => (
                                            <div className='single-task-border' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                <SingleTask task={task} />
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default AllTasksBySection;
