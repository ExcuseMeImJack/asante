import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardById } from '../../store/boards';
import './SingleBoard.css'
import { useParams } from 'react-router-dom';
import { getSectionsByBoardId } from '../../store/sections';
import Sections from '../Sections/Sections';

function SingleBoard(){
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const storeBoards = useSelector((state) => state.boards);
    const [buttonHidden, setButtonHidden] = useState(false)

    //dispatch thunk to populate storeBoards variable
    useEffect(() => {
        dispatch(getBoardById(boardId))
    }, [dispatch, boardId])



    const board = storeBoards.board;

    if (!board) return <h1>...Loading</h1>

	return (
        <div className='single-board-border'>
            <h2>{board.name}</h2>
            {!buttonHidden
            ? <button className="add-section-button" onClick={() => {setButtonHidden(true)}}>Add New Section</button>
            : <input type="text" placeholder='Section Name'></input>}
            <div>
                <Sections />
            </div>

        </div>
	);
}

export default SingleBoard;
