import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardById, getBoardsByUserId } from '../../store/boards';
import './SingleBoard.css'
import { useParams, useHistory } from 'react-router-dom';
import { deleteBoardById } from '../../store/boards';
import Sections from '../Sections/Sections';
import CreateSectionForm from '../Sections/CreateSectionForm';

function SingleBoard(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const storeBoards = useSelector((state) => state.boards);
    const [buttonHidden, setButtonHidden] = useState(false);

    //dispatch thunk to populate storeBoards variable
    useEffect(() => {
        dispatch(getBoardById(boardId))
        dispatch(getBoardsByUserId())
    }, [dispatch, boardId])



    const board = storeBoards.board;

    if (!board) return <h1>...Loading</h1>

	return (
        <div className='single-board-border'>
            <h2>{board.name}</h2>
            <button onClick={async (e) => {
                            e.preventDefault()
                            await dispatch(deleteBoardById(board))
                            return history.push(`/profile`)
                        }}>Delete Board</button>
            {!buttonHidden
            ? <button className="add-section-button" onClick={() => {setButtonHidden(true)}}>Add New Section</button>
            : <CreateSectionForm boardId={board.id} setButtonHidden={setButtonHidden} />}
            <div>
                <Sections />
            </div>

        </div>
	);
}

export default SingleBoard;
