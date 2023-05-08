import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';
import EditSectionForm from '../Sections/EditSectionForm';

function AllTasksBySection({sectionId}){
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);
    const [buttonHidden, setButtonHidden] = useState(false);

    // dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch])



    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks.filter((task) => task.section_id === sectionId);


	return (
        <div>
            {!buttonHidden
            ? <button className="edit-section-button" onClick={() => {setButtonHidden(true)}}>Edit Section</button>
            : <EditSectionForm sectionId={sectionId} setButtonHidden={setButtonHidden} />}
            {tasks.map((task) => {
                return <div key={task.id}>
                    <SingleTask task={task}/>
                </div>
            })}
        </div>
	);
}

export default AllTasksBySection;
