import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import { Draggable } from 'react-beautiful-dnd';
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
                <div>
                    <SingleTask task={task}/>
                </div>
            ))}
        </div>
	);
}

export default AllTasksBySection;
