import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionById } from '../../store/sections';
import { useParams } from 'react-router-dom';
import './SingleSection.css'
import Loading from '../Loading/Loading';

function SingleSection(){
    const dispatch = useDispatch();
    const { sectionId } = useParams();
    const storeSections = useSelector((state) => state.sections);

    //dispatch thunk to populate storeSections variable
    useEffect(() => {
        dispatch(getSectionById(sectionId))
    }, [dispatch, sectionId])

    const section = storeSections.section;

    if (!storeSections) return <Loading/>

	return (
        <div>
            <h1>Section</h1>
            <div>{section.name}</div>
            <div>{section.id}</div>
        </div>
	);
}

export default SingleSection;
