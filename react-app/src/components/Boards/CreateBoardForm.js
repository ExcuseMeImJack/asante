import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../store/boards';
import { Redirect } from 'react-router-dom';

function CreateBoardForm(){
    const dispatch = useDispatch();
    const [boardName, setBoardName] = useState('')

    const handleSubmit = async () => {
        const board = await dispatch(createBoard({boardName}))
        return Redirect(`/boards/${board.id}`)
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
