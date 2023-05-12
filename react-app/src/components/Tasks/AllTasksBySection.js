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

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        console.log('Source ~~~~~~~~~>', source)
        console.log('Destination ~~~~>', destination)
        console.log('DraggableId ~~~~>', draggableId)
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
                    const tasksClone = [...tasks]
                    const task = tasks[source.index]
                    tasksClone.splice(source.index, 1)
                    tasksClone.splice(destination.index, 0, task)
                    await dispatch(orderTasksThunk(tasksClone, sectionId))
                    await dispatch(getTasksByUserId())
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

                const sectionId = section.id
                const tasks = storeTasks.tasks.filter(task => task.section_id === sectionId)

                tasks.sort((a,b) => {
                    return a.order - b.order
                })

                return (
                    <div>
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
                        {!editButton
                            ? <i className="fa-solid fa-pen-to-square edit-section-button" id="pen" onClick={() => { setEditButton(true) }}></i>
                            : <i className="fa-solid fa-xmark edit-section-button" id="xmark" onClick={() => { setEditButton(false) }}></i>}
                        {!editButton
                            ? <></>
                            : <EditSectionForm sectionId={section.id} boardId={boardId} setButton={setEditButton} />}
                    <div className='tasks-container'>

                        {createButton
                        ?  <i className="fa-solid fa-plus create-task-button" id="plus" onClick={() => { createButton ? setCreateButton(false) : setCreateButton(true) }}></i>
                        : <i className="fa-solid fa-minus create-task-button" id="minus" onClick={() => { createButton ? setCreateButton(false) : setCreateButton(true) }}></i>}
                        {createButton
                        ?  <></>
                        :  <CreateTaskBySectionForm sectionId={section.id} setButton={setCreateButton} />}
                        {console.log('STORE TASKS~~~~~~~', tasks.map(t => [t.order, t.name]))}
                        <DragDropContext onDragEnd={onDragEnd}>
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
                        </DragDropContext>
                    </div >
                </div>
    );
}

export default AllTasksBySection;
