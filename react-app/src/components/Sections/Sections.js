import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId, orderSections } from '../../store/sections';
import { useHistory, useParams } from 'react-router-dom';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import './Sections.css'
import { deleteSectionById } from '../../store/sections';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';


function Sections() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const storeSections = useSelector((state) => state.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId, storeSections.sections.length])

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


        const sections = [ ...storeSections.sections ]
        const section = sections[source.index]
        sections.splice(source.index, 1)
        sections.splice(destination.index, 0, section)

        dispatch(orderSections(sections, boardId))
    }

    // grab sections array from the storeSections object
    const sections = storeSections.sections;

    if (!sections) return <h1>...Loading</h1>

    return (
        <div>
            <div className='section-gallery'>
                {sections.map((section) => {
                    return <div key={section.id} className='single-section-border'>
                        <div>{section.name}</div>
                        <button onClick={async (e) => {
                            e.preventDefault()
                            await dispatch(deleteSectionById(section))
                            return history.push(`/boards/${boardId}`)
                        }}>Delete Section</button>
                        <AllTasksBySection sectionId={section.id}/>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Sections;

function Sections() {
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT" direction='horizontal'>
                {(provided) => (
                    <div className='section-gallery' {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.map((section, index) => (
                        <Draggable draggableId={"section-" + section.id} key={section.id} index={index}>
                        {(provided) => (
                            <div className='single-section-border' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div>
                                    <div>{section.name}</div>
                                    <AllTasksBySection sectionId={section.id}/>
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
