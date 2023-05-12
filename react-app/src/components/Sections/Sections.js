import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId } from '../../store/sections';
import { useHistory, useParams } from 'react-router-dom';
import AllTasksBySection from '../Tasks/AllTasksBySection';
import './Sections.css'
import { deleteSectionById } from '../../store/sections';

function Sections() {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const storeSections = useSelector((state) => state.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId, storeSections.sections.length])


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
