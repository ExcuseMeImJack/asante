import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId, orderSections } from '../../store/sections';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import EditSectionForm from './EditSectionForm';
import CreateTaskBySectionForm from './CreateSectionForm';
import './Sections.css'

function Sections() {
    const { boardId } = useParams()
    const dispatch = useDispatch();
    const storeSections = useSelector((state) => state.sections);
    const [editButtonHidden, setEditButtonHidden] = useState(false);
    const [createButtonHidden, setCreateButtonHidden] = useState(false);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId])

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        // console.log('Source ~~~~~~~~~>', source)
        console.log('Destination ~~~~~~~~~>', destination)
        // console.log('DraggableId ~~~~~~~~~~~~~~~>', draggableId)

        console.log(!destination)
        if (!destination) {
            return;
        }

        console.log(destination.dropableId === source.droppableId && destination.index === source.index)
        if (destination.dropableId === source.droppableId && destination.index === source.index) return


        const sections = [...storeSections.sections]
        const section = sections[source.index]
        console.log(sections.map(section => section.name), section.name)
        console.log('start ', source.index, 'end ', destination.index)
        sections.splice(source.index, 1)
        console.log('Between splice ', sections.map(section => section.name))
        sections.splice(destination.index, 0, section)
        console.log(sections.map(section => section.name))

        dispatch(orderSections(sections, boardId))
        dispatch(getSectionsByBoardId(boardId))
        // dispatch new sections
    }

    // grab sections array from the storeSections object
    const sections = storeSections.sections;

    if (!sections) return <h1>...Loading</h1>

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="ROOT" direction='horizontal'>
                    {(provided) => (
                        <div className='section-gallery' {...provided.droppableProps} ref={provided.innerRef}>
                            {sections.map((section, index) => (
                                <Draggable draggableId={"section-" + section.id} key={section.id} index={index}>
                                    {(provided) => (
                                        <div className='single-section-border' ref={provided.innerRef} {...provided.draggableProps}>
                                            <div className='section-header' {...provided.dragHandleProps}>
                                                <div>{section.name}</div>
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
