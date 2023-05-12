import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../store/boards";
import { useHistory } from "react-router-dom";
import "./CreateBoardForm.css";

function CreateBoardForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [boardName, setBoardName] = useState("");
  const [showCreateBoardMenu, setShowCreateBoardMenu] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false)
  const ulRef = useRef();

  const openMenu = () => {
    setBoardName("")
    setMenuOpen(true)
    setShowCreateBoardMenu(true);

    if (showCreateBoardMenu) return;
  };

  useEffect(() => {
    if (!showCreateBoardMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowCreateBoardMenu(false);
        setMenuOpen(false)
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showCreateBoardMenu]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    const board = await dispatch(createBoard({ name: boardName }));
    setShowCreateBoardMenu(false)
    return history.push(`/boards/${board.id}`);
  };

  const ulClassName =
    "create-board-slide" + (showCreateBoardMenu ? "" : " createBoardHidden");

  return (
    <>
    <div className="create-button-div">
        <button onClick={openMenu} className="create-board-btn">
          <i className="fa-solid fa-plus create-board-plus-symb"></i>
          Create
        </button>
      </div>
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
