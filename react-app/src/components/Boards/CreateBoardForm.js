import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../store/boards";
import { useHistory } from "react-router-dom";
import "./CreateBoardForm.css"

function CreateBoardForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [boardName, setBoardName] = useState("");
  const [showCreateBoardMenu, setShowCreateBoardMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    console.log("open board creation menu");
    if (showCreateBoardMenu) return;
    setShowCreateBoardMenu(true);
  };

  useEffect(() => {
    if (!showCreateBoardMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowCreateBoardMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showCreateBoardMenu]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    const board = await dispatch(createBoard({ name: boardName }));
    return history.push(`/boards/${board.id}`);
  };

  const ulClassName =
    "create-board-slide" + (showCreateBoardMenu ? "" : " createBoardHidden");
  const closeMenu = () => setShowCreateBoardMenu(false);

  return (
    <>
      <li onClick={openMenu} className="create-board-btn">
        Create
      </li>
      <div className={ulClassName}>
       <div>
        <form onSubmit={handleCreateBoard}>
          <div className="create-board-input">
            <input
              ref={ulRef}
              type="text"
              placeholder="New board name..."
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
          {/* <div className="error-container">
                    {errors.name && <p>{errors.name}</p>}
                </div> */}
          <button type="submit" className="submit-create">
            Submit
          </button>
        </form></div>
      </div>
    </>
  );
}

export default CreateBoardForm;
