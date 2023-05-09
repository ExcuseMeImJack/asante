import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId } from '../../store/sections';
import { useParams } from 'react-router-dom';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import './Sections.css'

function Sections() {
    const { boardId } = useParams()
    const dispatch = useDispatch();
    const storeSections = useSelector((state) => state.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId])

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        console.log('Source ~~~~~~~~~>', source)
        console.log('Destination ~~~~~~~~~>', destination)
        console.log('DraggableId ~~~~~~~~~~~~~~~>', draggableId)
        // if (!destination) {
        //     return;
        // }

        // if (
        //     destination.dropableId === source.droppableId &&
        //     destination.index === source.index
        // ) {
        //     return;
        // }

        // const column = source.droppableId;
        // console.log("COLUMN ~~~~~~~~~~~~~~~>", column)
        // const newSectionIds = Array.from(column.sectionIds);
        // console.log("new section ids ~~~~~~~~~~~>", newSectionIds)
        // newSectionIds.splice(source.index, 1);
        // newSectionIds.splice(destination.index, 0, draggableId);
        // console.log("new section ids after~~~~~~~~~~~>", newSectionIds)

        // const newColumn = {
        //     ...column,
        //     sectionIds: newSectionIds
        // }
    }

    // grab sections array from the storeSections object
    const sections = storeSections.sections;

    if (!sections) return <h1>...Loading</h1>

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT">
                {(provided) => (
                    <div className='section-gallery' {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.map((section, index) => (
                        <Draggable draggableId={"section-" + section.id} key={section.id} index={index}>
                        {(provided) => (
                            <div className='single-section-border' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div {...provided.droppableProps} ref={provided.innerRef}>
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
