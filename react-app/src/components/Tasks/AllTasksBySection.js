import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import { Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';
import EditSectionForm from '../Sections/EditSectionForm';
import CreateTaskBySectionForm from './CreateTaskBySectionForm';

function AllTasksBySection({sectionId}){
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);
    const [editButtonHidden, setEditButtonHidden] = useState(false);
    const [createButtonHidden, setCreateButtonHidden] = useState(false);

    // dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch])

    const storeTasks = useSelector((state) => state.tasks)

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        console.log('Source ~~~~~~~~~>', source)
        console.log('Destination ~~~~~~~~~>', destination)
        console.log('DraggableId ~~~~~~~~~~~~~~~>', draggableId)
        if (!destination) {
            return;
        }

        if (
            destination.dropableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }


        const tasks = [ ...storeTasks.tasks ]
        const task = tasks[source.index]
        tasks.splice(source.index, 1)
        tasks.splice(destination.index, 0, task)

        dispatch(orderTasks(tasks, sectionId))
    }


    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks.filter((task) => task.section_id === sectionId);


	return (
        <div>
            {!editButtonHidden
            ? <button className="edit-section-button" onClick={() => {setEditButtonHidden(true)}}>Edit Section</button>
            : <EditSectionForm sectionId={sectionId} setButtonHidden={setEditButtonHidden} />}
            {!createButtonHidden
            ? <button className="create-task-button" onClick={() => {setCreateButtonHidden(true)}}>Add Task</button>
            : <CreateTaskBySectionForm sectionId={sectionId} setButtonHidden={setCreateButtonHidden} />}

            {tasks.map((task) => (
                <div key={task.id}>
                    <SingleTask task={task}/>
                </div>
            ))}
        </div>
	);
}

export default AllTasksBySection;
