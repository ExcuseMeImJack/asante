import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./SlideOutMenu.css";
import CreateBoardForm2 from "../Boards/CreateBoardForm";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsByUserId } from "../../store/boards";
import boardicon from "../../assets/board.png";
import Loading from "../Loading/Loading";

function SlideOutMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const boards = useSelector((state) => state.boards.boards);

  useEffect(() => {
    dispatch(getBoardsByUserId());
  }, [dispatch]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "slide-out-menu" + (showMenu ? "" : " hidden-menu");

  if (!boards) return null;

  return (
    <div>
      <i
        onClick={openMenu}
        className="fa-solid fa-bars nav-slideout-bars"
        id="bars"
      ></i>
      <ul className={ulClassName} ref={ulRef}>
        <div className="nav-create-board-form-popout">
          {
            <CreateBoardForm2
              setShowSlideoutMenu={setShowMenu}
              buttonType={"big"}
            />
          }
        </div>
        <div
          className="hoverable nav-home change-cursor"
          onClick={() => history.push("/")}
        >
          <NavLink exact to="/">
            <i className="fa-solid fa-house nav-home-icon"></i>Home
          </NavLink>
        </div>
        <div
          className="hoverable nav-tasks change-cursor"
          onClick={() => history.push("/tasks")}
        >
          <NavLink exact to="/tasks">
            <i className="fa-regular fa-circle-check nav-check-icon"></i>My
            Tasks
          </NavLink>
        </div>

        <li className="nav-border-div"></li>
        {boards.length > 0 ? (
          <div>
            <div className="nav-plus-boards nav-create-board-form-popout">
              My Boards
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="my-boards scroll">
          {boards.map((board) => (
            <div
              key={board.id}
              className="nav-boards change-cursor hoverable"
              onClick={() => history.push(`/boards/${board.id}`)}
            >
              <div className="nav-inner-board-div">
                <img
                  id="sidemenu-boards-icon"
                  src={boardicon}
                  alt="board icon"
                />
                <p>{board.name}</p>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default SlideOutMenu;
