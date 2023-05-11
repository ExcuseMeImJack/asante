import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId, orderSections } from '../../store/sections';
import { useHistory, useParams } from 'react-router-dom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import EditSectionForm from './EditSectionForm';
import CreateTaskBySectionForm from '../Tasks/CreateTaskBySectionForm';
import './Sections.css'
import './Sections.css'
import { deleteSectionById } from '../../store/sections';

function Sections() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sections = useSelector((state) => state.sections.sections);
    console.log('sections from state', sections.map(s => s.name))
    const [editButtonHidden, setEditButtonHidden] = useState(false);
    const [createButtonHidden, setCreateButtonHidden] = useState(false);


    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId, storeSections.sections.length])

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        console.log('Source ~~~~~~~~~>', source)
        console.log('Destination ~~~~~~~~~>', destination)
        console.log('DraggableId ~~~~~~~~~~~~~~~>', draggableId)

        if (
            !destination ||
            destination.dropableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sectionsClone = [...sections]
        const section = sectionsClone[source.index]
        sectionsClone.splice(source.index, 1)
        sectionsClone.splice(destination.index, 0, section)

        dispatch(orderSections(sectionsClone, boardId))
    }

    // grab sections array from the storeSections object

    if (!sections) return <h1>...Loading</h1>

    return (
        <div>
            {console.log('sections in return ', sections.map(s => s.name))}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="ROOT" direction='horizontal'>
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
