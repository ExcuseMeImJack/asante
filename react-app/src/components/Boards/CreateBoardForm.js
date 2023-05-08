import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../store/boards';
import { useHistory } from 'react-router-dom';

function CreateBoardForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [boardName, setBoardName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const board = await dispatch(createBoard({name: boardName}))
        return history.push(`/boards/${board.id}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label>
                    Name
                    <input
                        type="text"
                        placeholder="Name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                    />
                    </label>
                    {/* <div className="error-container">
                    {errors.name && <p>{errors.name}</p>}
                    </div> */}
                    <button type="submit" className="submit-create">Create Board</button>
                </form>
            </div>
    );
}

export default CreateBoardForm;
