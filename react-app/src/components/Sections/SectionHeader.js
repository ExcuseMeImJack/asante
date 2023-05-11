import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSectionById } from '../../store/sections';
import { useParams } from 'react-router-dom';
import './SectionHeader.css'

function SectionHeader({ section, provided }) {
    const dispatch = useDispatch();
    const storeSections = useSelector((state) => state.sections);



    //dispatch thunk to populate storeSections variable
    // useEffect(() => {
    //     dispatch(getSectionById(sectionId))
    // }, [dispatch, sectionId])

    if (!section) return <h1>...Loading</h1>

    return (
        <h1>hi</h1>
    );
}

export default SectionHeader;
