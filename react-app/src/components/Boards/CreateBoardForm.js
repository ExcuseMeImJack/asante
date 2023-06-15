import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../store/boards";
import { useHistory } from "react-router-dom";
import "./CreateBoardForm.css";

function CreateBoardForm({ setShowSlideoutMenu, buttonType }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [boardName, setBoardName] = useState("");
  const [showCreateBoardMenu, setShowCreateBoardMenu] = useState(false);
  const [errors, setErrors] = useState({});
  // const [isMenuOpen, setMenuOpen] = useState(false)
  const ulRef = useRef();

  const openMenu = () => {
    setBoardName("");
    // setMenuOpen(true)
    setShowCreateBoardMenu(true);

    if (showCreateBoardMenu) return;
  };

  useEffect(() => {
    if (!showCreateBoardMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowCreateBoardMenu(false);
        setTimeout(() => {
          setErrors({});
        }, 500);
        // setMenuOpen(false)
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showCreateBoardMenu]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();

    const err = {};
    if (!boardName) err.boardName = "You must enter a board name";
    if (boardName.length > 15)
      err.boardName = "Board name must be less than 15 characters";
    setErrors(err);

    if (!Object.values(err).length > 0) {
      const board = await dispatch(createBoard({ name: boardName }));
      setShowCreateBoardMenu(false);
      history.push(`/boards/${board.id}`);
      if(buttonType === 'big'){
        setShowSlideoutMenu(false);
      }
      setErrors({});
    }
  };

  const ulClassName =
    "create-board-slide" + (showCreateBoardMenu ? "" : " createBoardHidden");

  const ulClassNameSmall =
    "create-board-slide-small" + (showCreateBoardMenu ? "" : " createBoardHidden");

  return (
    <>
      <div className="create-button-div-small">
        {buttonType === "big" && (
          <button onClick={openMenu} className="create-board-btn">
            <i className="fa-solid fa-plus create-board-plus-symb"></i>
            Create
          </button>
        )}
        {buttonType === "small" && (
          <button onClick={openMenu} className="create-board-btn-small">
            <i className="fa-solid fa-plus create-board-plus-symb"></i>
            Create
          </button>
        )}
      </div>
      {buttonType === "big" && (
        <div className={ulClassName} ref={ulRef}>
          <div className="create-board-div">
            <h2 className="create-board-text">Create a Board</h2>
            <form onSubmit={handleCreateBoard}>
              {errors.boardName && (
                <p className="error-container">{errors.boardName}</p>
              )}
              <div className="create-board-input">
                <input
                  type="text"
                  placeholder=" New board name..."
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
                <div className="create-board-divider"></div>
              </div>
              <button id="create-board-button">Create</button>
            </form>
          </div>
        </div>
      )}
      {buttonType === "small" && (
        <div className={ulClassNameSmall} ref={ulRef}>
          <div className="create-board-div">
            <h2 className="create-board-text-small">Create a Board</h2>
            <form onSubmit={handleCreateBoard}>
              {errors.boardName && (
                <p className="error-container">{errors.boardName}</p>
              )}
              <div className="create-board-input">
                <input
                  type="text"
                  placeholder=" New board name..."
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
                <div className="create-board-divider"></div>
              </div>
              <button id="create-board-button">Create</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateBoardForm;
