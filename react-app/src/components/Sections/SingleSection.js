import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionById } from '../../store/sections';
import { useParams } from 'react-router-dom';
import './SingleSection.css'

function SingleSection(){
    const dispatch = useDispatch();
    const { sectionId } = useParams();
    const storeSections = useSelector((state) => state.sections);
    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionById(sectionId))
    }, [dispatch, sectionId])

    // grab users array from the storeUsers object
    console.log(storeSections)
    const section = storeSections.section;
    console.log(section)
    if (!section) return <h1>...Loading</h1>
	return (
        <div>
            <h1>Section</h1>
            <div>{section.name}</div>
            <div>{section.id}</div>
        </div>
	);
}

export default SingleSection;
