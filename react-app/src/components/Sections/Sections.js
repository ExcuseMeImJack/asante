import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId, orderSections, deleteSectionById } from '../../store/sections';
import { getTasksByUserId, orderTasksThunk } from '../../store/tasks';
import { useHistory, useParams } from 'react-router-dom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import EditSectionForm from './EditSectionForm';
import CreateTaskBySectionForm from '../Tasks/CreateTaskBySectionForm';
import './Sections.css'

function Sections() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sections = useSelector((state) => state.sections.sections);
    const storeTasks = useSelector((state) => state.tasks);
    const [editButtonHidden, setEditButtonHidden] = useState(false);
    const [createButtonHidden, setCreateButtonHidden] = useState(false);


    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
        dispatch(getTasksByUserId())
    }, [dispatch, boardId, sections.length])

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        // console.log('Source ~~~~~~~~~>', source)
        // console.log('Destination ~~~~>', destination)
        // console.log('DraggableId ~~~~>', draggableId)
        // console.log('Type ~~~~~~~~~~~>', type)

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }
        if (type === 'section') {

            const sectionsClone = [...sections]
            const section = sectionsClone[source.index]
            sectionsClone.splice(source.index, 1)
            sectionsClone.splice(destination.index, 0, section)

            dispatch(orderSections(sectionsClone, boardId))
        }

        const sourceSectionId = +source.droppableId.split('-')[1]
        const destSectionId = +destination.droppableId.split('-')[1]

        const sourceSectionTasks = storeTasks.tasks.filter(task => task.section_id === sourceSectionId).sort((a,b) => a.order - b.order)
        const destSectionTasks = storeTasks.tasks.filter(task => task.section_id === destSectionId).sort((a,b) => a.order - b.order)

        if (type === 'task') {
            if (sourceSectionId === destSectionId) {
                //reorder the task in 1 section
                // console.log('TASKS~~~~~~~~~~~~~', tasks.map(t => t.order))
                const tasksClone = [...sourceSectionTasks]
                const task = sourceSectionTasks[source.index]
                tasksClone.splice(source.index, 1)
                tasksClone.splice(destination.index, 0, task)
                await dispatch(orderTasksThunk(tasksClone, sourceSectionId))
                await dispatch(getTasksByUserId())
            }

            if (sourceSectionId !== destSectionId) {
                console.log('source tasks ', sourceSectionTasks)
                console.log('dest tasks ', destSectionTasks)
                console.log('ID ', sourceSectionId)
                console.log('ID ', destSectionId)
                //call 2 thunks
                //change section id for task
                //reorder the tasks in the both sections source/destination
                const sourceTasks = [...sourceSectionTasks]
                const destTasks = [...destSectionTasks]
                const task = sourceTasks[source.index]
                console.log(task)
                sourceTasks.splice(source.index, 1)
                destTasks.splice(destination.index, 0, task)
                console.log(sourceTasks)
                console.log(destTasks)
                // dispatch(editTaskByTaskId(task, task.id))
                // dispatch(orderTasks(tasksClone))
                await dispatch(orderTasksThunk(sourceTasks, sourceSectionId))
                await dispatch(orderTasksThunk(destTasks, destSectionId))
                await dispatch(getTasksByUserId())
            }
        }
    }

    // grab sections array from the storeSections object

    if (!sections) return <h1>...Loading</h1>

    sections.sort((a, b) => {
        return a.order - b.order
    })

    return (
        <div>
            {/* {console.log(sections.map((s)=> s.order))} */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="ROOT" direction='horizontal' type='section'>
                    {(provided) => (
                        <div className='section-gallery' {...provided.droppableProps} ref={provided.innerRef}>
                            {sections.map((section, index) => (
                                <Draggable draggableId={"section-" + section.id} key={section.id} index={index} >
                                    {(provided) => (
                                        <div className='single-section-border' ref={provided.innerRef} {...provided.draggableProps}>
                                            <div className='section-header' {...provided.dragHandleProps}>
                                                <div>{section.name}</div>
                                                <button onClick={async (e) => {
                                                    e.preventDefault()
                                                    await dispatch(deleteSectionById(section))
                                                    return history.push(`/boards/${boardId}`)
                                                }}>Delete Section</button>
                                                {!editButtonHidden
                                                    ? <button className="edit-section-button" onClick={() => { setEditButtonHidden(true) }}>Edit Section</button>
                                                    : <EditSectionForm sectionId={section.id} setButtonHidden={setEditButtonHidden} />}
                                                {!createButtonHidden
                                                    ? <button className="create-task-button" onClick={() => { setCreateButtonHidden(true) }}>Add Task</button>
                                                    : <CreateTaskBySectionForm sectionId={section.id} setButtonHidden={setCreateButtonHidden} />}
                                            </div>
                                            <div>
                                                <AllTasksBySection sectionId={section.id} />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Sections;
