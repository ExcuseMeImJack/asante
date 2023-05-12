import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId, orderSections, deleteSectionById } from '../../store/sections';
import { useHistory, useParams } from 'react-router-dom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import './Sections.css'

function Sections() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sections = useSelector((state) => state.sections.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId, sections.length])

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
            destination.index === source.index)
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

    sections.sort((a,b) => {
        console.log(a, b)
        return a.order - b.order
    })

    return (
        <div>
            {console.log(sections.map((s)=> s.order))}
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
