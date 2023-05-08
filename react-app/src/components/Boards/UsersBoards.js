import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardsByUserId } from '../../store/boards';
import { useHistory } from 'react-router-dom';
import './UsersBoards.css'

function UsersBoards(){
    const dispatch = useDispatch();
    const history = useHistory();
    const storeBoards = useSelector((state) => state.boards);
    const userId = useSelector((state) => state.session.user.id);

    //dispatch thunk to populate storeBoards variable
    useEffect(() => {
        dispatch(getBoardsByUserId())
    }, [dispatch, userId])

    if (!storeBoards.boards) return <h1>...Loading</h1>
    // grab boards array from the storeBoards object
    const boards = storeBoards.boards;

    if (!boards) return <h1>...Loading</h1>
    console.log(boards)
	return (
        <div>
            <h1>My Boards</h1>
            <button onClick={() => {history.push('/boards/new')}}>Add New Board</button>
            {boards.map((board) => {
            return  <div key={board.id}>
                        <div>{board.name}</div>
                    </div>
            })}
        </div>
	);
}

export default UsersBoards;
