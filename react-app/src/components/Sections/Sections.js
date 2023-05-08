import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId } from '../../store/sections';
import { useParams } from 'react-router-dom';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import './Sections.css'
import { getAllTasksBySectionId } from '../../store/tasks';
import EditSectionForm from './EditSectionForm';

function Sections() {
    const { boardId } = useParams()
    const dispatch = useDispatch();
    const storeSections = useSelector((state) => state.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId])



    // grab sections array from the storeSections object
    const sections = storeSections.sections;

    if (!sections) return <h1>...Loading</h1>

    return (
        <div>
            <div className='section-gallery'>
                {sections.map((section) => {
                    return <div key={section.id} className='single-section-border'>
                        <div>{section.name}</div>
                        <AllTasksBySection sectionId={section.id}/>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Sections;
