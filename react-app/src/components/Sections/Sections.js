import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionsByBoardId } from '../../store/sections';
import { useParams } from 'react-router-dom';
import './Sections.css'

function Sections(){
    const { boardId } = useParams()
    const dispatch = useDispatch();
    const storeSections = useSelector((state) => state.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionsByBoardId(boardId))
    }, [dispatch, boardId])

    // grab Sections array from the storeSections object
    const sections = storeSections.sections;
    if (!sections) return <h1>...Loading</h1>
	return (
        <div>
            <h1>Sections</h1>
            {sections.map((section) => {
            return  <div key={section.id}>
                        <div>{section.name}</div>
                        <div>{section.order}</div>
                    </div>
            })}
        </div>
	);
}

export default Sections;
