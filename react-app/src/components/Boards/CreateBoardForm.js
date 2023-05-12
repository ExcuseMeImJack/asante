import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../store/boards";
import { useHistory } from "react-router-dom";
import "./CreateBoardForm.css";

function CreateBoardForm({needsButton}) {
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

  return (
    <>
    {needsButton ?
      <div className="create-button-div">
        <button onClick={openMenu} className="create-board-btn">
          <i className="fa-solid fa-plus create-board-plus-symb"></i>
          Create
        </button>
      </div>
    :
      <i className="fa-solid fa-plus change-cursor" onClick={openMenu}></i>
    }
      <div className={ulClassName} ref={ulRef}>
        <div className="create-board-div">
          <h2 className="create-board-text">Create a Board</h2>
          <form onSubmit={handleCreateBoard}>
            <div className="create-board-input">
              <input
                type="text"
                placeholder="New board name..."
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              <div className="create-board-divider"></div>
            </div>
            <button id="create-board-button">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateBoardForm;
