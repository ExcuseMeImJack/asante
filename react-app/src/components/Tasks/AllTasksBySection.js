import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId, orderTasksThunk } from '../../store/tasks';
import { useHistory, useParams } from 'react-router-dom';
import { getSectionsByBoardId, orderSections, deleteSectionById } from '../../store/sections';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import SingleTask from './SingleTask';
import EditSectionForm from '../Sections/EditSectionForm';
import CreateTaskBySectionForm from '../Tasks/CreateTaskBySectionForm';
import './AllTasksBySection.css'

function AllTasksBySection({ section, boardId }) {
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);
    const sections = useSelector((state) => state.sections.sections);
    const [editButton, setEditButton] = useState(false);
    const [createButton, setCreateButton] = useState(true);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const history = useHistory();

    // dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch, sections])

    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>

    const tasks = storeTasks.tasks.filter(task => task.section_id === section.id).sort((a, b) => a.order - b.order)

    return (
        <div>
            {!editButton
                ? <i className="fa-solid fa-pen-to-square edit-section-button" id="pen" onClick={() => { setEditButton(true) }}></i>
                : <i className="fa-solid fa-xmark edit-section-button" id="xmark" onClick={() => { setEditButton(false) }}></i>}
            {!editButton
                ? <></>
                : <EditSectionForm sectionId={section.id} boardId={boardId} setEditButton={setEditButton} />}
            <div className='tasks-container'>
                <div className='delete-warning-section'>
                    <i className='fa-solid fa-trash section-trash' id="section-trash" onClick={async (e) => {
                        e.preventDefault()
                        if (!deleteClicked) {
                            return setDeleteClicked(true)
                        }
                        // await dispatch(deleteSectionById(section))
                        // return history.push(`/boards/${boardId}`)
                    }}></i>
                    {deleteClicked && <p className='delete-text-section'>Are you sure?</p>}
                    <div>
                                {deleteClicked && <i className='fa-solid fa-xmark' id="section-xmark" onClick={() => { setDeleteClicked(false)}}></i>}
                    {deleteClicked && <i className='fa-solid fa-check' id="section-check" onClick={async () => {
                        await dispatch(deleteSectionById(section))
                        return history.push(`/boards/${boardId}`)
                    }}></i>}
                </div>
            </div>

                {createButton
                        ?  <i className="fa-solid fa-plus create-task-button" id="plus" onClick={() => { setCreateButton(false) }}></i>
                    : <i className="fa-solid fa-minus create-task-button" id="minus" onClick={() => { setCreateButton(true) }}></i>}
                {createButton
                        ?  <></>
                        :  <CreateTaskBySectionForm sectionId={section.id} setCreateButton={setCreateButton} />}
                {console.log('SECTION TASKS~~~~~~~', tasks.map(t => t.order))}
                <Droppable droppableId={'section-' + section.id} type='task'>
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
        </div>
    );
}

export default AllTasksBySection;
