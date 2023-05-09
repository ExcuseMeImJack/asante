import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskByTaskId, getTasksByUserId } from '../../store/tasks';
import './AllTasksBySection.css'
import SingleTask from './SingleTask';
import EditSectionForm from '../Sections/EditSectionForm';
import CreateTaskBySectionForm from './CreateTaskBySectionForm';
import { useHistory } from 'react-router-dom';

function AllTasksBySection({sectionId}){
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
            {tasks.map((task) => {
                return <div key={task.id}>
                    <button onClick={async (e) => {
                            e.preventDefault()
                            const boardId = task.board_id
                            await dispatch(deleteTaskByTaskId(task))
                            return history.push(`/boards/${storeBoards.board.id}`)
                        }}>Delete Task</button>
                    <SingleTask task={task}/>
                </div>
            })}
        </div>
	);
}

export default AllTasksBySection;
