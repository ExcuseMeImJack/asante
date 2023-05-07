import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardById } from '../../store/boards';
import './SingleBoard.css'
import { useParams } from 'react-router-dom';

function SingleBoard(){
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const storeBoards = useSelector((state) => state.boards);
    //dispatch thunk to populate storeBoards variable
    useEffect(() => {
        dispatch(getBoardById(boardId))
    }, [dispatch, boardId])

    // grab users array from the storeUsers object
    const board = storeBoards.board;
    if (!board) return <h1>...Loading</h1>
	return (
        <div>
            <h1>Boards</h1>
            <div>{board.name}</div>
            <div>{board.id}</div>
        </div>
	);
}

export default SingleBoard;
