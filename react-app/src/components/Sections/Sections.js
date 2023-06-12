import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId, orderSections } from '../../store/sections';
import { getTasksByUserId, orderTasksThunk } from '../../store/tasks';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import './Sections.css'

function Sections() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.sections.sections);
    const storeTasks = useSelector((state) => state.tasks);



    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
        dispatch(getTasksByUserId())
    }, [dispatch, boardId, sections.length])

    const onDragEnd = async (result) => {
        const { destination, source, type } = result;

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

                const tasksClone = [...sourceSectionTasks]
                const task = sourceSectionTasks[source.index]
                tasksClone.splice(source.index, 1)
                tasksClone.splice(destination.index, 0, task)
                await dispatch(orderTasksThunk(tasksClone, sourceSectionId))
                await dispatch(getTasksByUserId())
            }

            if (sourceSectionId !== destSectionId) {

                //call 2 thunks
                //change section id for task
                //reorder the tasks in the both sections source/destination
                const sourceTasks = [...sourceSectionTasks]
                const destTasks = [...destSectionTasks]
                const task = sourceTasks[source.index]
                sourceTasks.splice(source.index, 1)
                destTasks.splice(destination.index, 0, task)

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
            <div className=''>
                {/* <div className='kb-or-mouse'>
                    <i className="fa-solid fa-keyboard" id="keyboard"></i>
                    <p>or</p>
                    <i className="fa-solid fa-computer-mouse" id="mouse"></i>
                </div>
                <div className='scroll-container'>
                    <i className="fa-solid fa-left-right" id="left-right"></i>
                </div> */}
                <div className='tooltip-container'>
                    <i className="fa-regular fa-circle-question" id="tooltip" title="Click and drag with mouse or use Tab Space and Arrow Keys"></i>
                </div>
            </div>
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
                                            </div>
                                            <div>
                                                <AllTasksBySection section={section} boardId={boardId} />
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
