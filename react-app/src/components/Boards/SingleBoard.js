import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardById, getBoardsByUserId } from '../../store/boards';
import './SingleBoard.css'
import { useParams, useHistory } from 'react-router-dom';
import { deleteBoardById } from '../../store/boards';
import Sections from '../Sections/Sections';
import CreateSectionForm from '../Sections/CreateSectionForm';

function SingleBoard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const storeBoards = useSelector((state) => state.boards);
    // const sections = useSelector((state) => state.sections.sections);
    const [plus, setPlus] = useState(true);
    const [deleteClicked, setDeleteClicked] = useState(false);

    //dispatch thunk to populate storeBoards variable
    useEffect(() => {
        dispatch(getBoardById(boardId))
        dispatch(getBoardsByUserId())
    }, [dispatch, boardId])



    const board = storeBoards.board;

    if (!board) return <h1>...Loading</h1>

    return (
        <div className='board-container'>
            <div className='single-board-border'>
                <div className='warning-wrapper'>
                    <div className='board-and-trash'>
                        <h2>{board.name}</h2>
                        <i className='fa-solid fa-trash' id="board-trash" onClick={async (e) => {
                            e.preventDefault()
                            if (!deleteClicked) {
                                return setDeleteClicked(true)
                            }
                        }}></i>
                    </div>
                    <div className='delete-warning-board'>
                        {deleteClicked && <p className='delete-text red'>Are you sure?</p>}
                        <div className='check-and-x'>
                            {deleteClicked && <i className='fa-solid fa-xmark' id="xmark" onClick={() => { setDeleteClicked(false)}}></i>}
                            {deleteClicked && <i className='fa-solid fa-check' id="check" onClick={async () => {
                                await dispatch(deleteBoardById(board))
                                return history.push(`/`)
                            }}></i>}
                        </div>
                    </div>
                </div>
                {plus
                    ? <i className="fa-solid fa-plus add-section-button" id="section-plus" onClick={() => { setPlus(false) }}>Add New Section</i>
                    : <i className="fa-solid fa-minus add-section-button" id="section-minus" onClick={() => { setPlus(true) }}> Close</i>}
                {plus
                    ? <div className='new-section-form'></div>
                    : <CreateSectionForm boardId={board.id} setPlus={setPlus} />}
                <div>
                    <Sections />
                </div>
            </div>
        </div>
    );
}

export default SingleBoard;
