import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/users";
import EditProfileModal from "../EditProfileModal";
import OpenModalButton from "../OpenModalButton";
import "./UserProfile.css";
import { getTasksByUserId } from "../../store/tasks";
import { getBoardsByUserId } from "../../store/boards";
import DeleteUserModal from "../DeleteUserModal";
import SlideOutTask from "../SlideOutTask/SlideOutTask";
import quoteCensor from "./quoteCensor";
import { Link, useHistory } from "react-router-dom";
import boardicon from "../../assets/board.png";
import { getAllBoardsForEachSection } from "../../store/sections";

function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.users.profile);
  const tasks = useSelector((state) => state.tasks.tasks);
  console.log(tasks);
  const boards = useSelector((state) => state.boards.boards);
  const [quoteInfo, setQuoteInfo] = useState("");
  const sections = useSelector((state) => state.sections.sections);

  //dispatch thunk to populate storeUsers variable
  useEffect(() => {
    dispatch(getAllBoardsForEachSection());
    dispatch(getUserProfile());
    dispatch(getTasksByUserId());
    dispatch(getBoardsByUserId());

  }, [dispatch]);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=happiness",
        {
          headers: { "X-Api-Key": "WrkXdZlorsWnOkvJdFoc9Q==oNhDvwTXKFJguwGD" },
          contentType: "application/json",
        }
      );
      // console.log('QUOTE RES', res)
      if (res.ok) {
        const data = await res.json();
        setQuoteInfo(data);
      } else {
        return "error", res.error;
      }
    };
    fetchQuote();
  }, [dispatch]);

  if (!profile) return <h1></h1>;

  if (quoteInfo[0]) {
    const quote = quoteInfo[0].quote;
    const author = quoteCensor(quoteInfo[0].author);

    function dateFormatSmall(date) {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const month = months[date.getMonth()];
        const day = date.getDate();

        return `${month} ${day}`;
      }

    function getBoard(task) {
        // GET USER BOARDS
        // GET SECTIONS BY BOARD ID

        // CHECK TO SEE IF SECTION.ID === TASK.SECTION_ID
        const section = sections.find(
          (findSection) => findSection.id === task.section_id
        );
        if (!section) return null;
        const board = boards.find((findBoard) => findBoard.id === section.board_id);

        if (board) {
          return board.name;
        }
      }

    return (
      <div className="profile-page">
        <div className="profile-info-container">
          <div className="profile-pic-container">
            <img id="profile-pic-image" alt="" src={profile.profile_pic_url} />
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <div className="username-email-container">
              <div className="username-container">
                <p>@</p>
                <p>{profile.username} |</p>
              </div>
              <div className="email-container">
                <i className="fa-regular fa-envelope"></i>
                <p>{profile.email}</p>
              </div>
            </div>
          </div>
          <div className="edit-delete-profile-button-div">
            <OpenModalButton
              buttonStyleClass={"edit-profile-button change-cursor"}
              buttonText={"Edit profile"}
              modalComponent={<EditProfileModal />}
              modalStyleClass={"edit-profile-modal-content"}
            />
            {profile.email === "tester@aa.io" ?
                <OpenModalButton
                buttonStyleClass={"delete-user-button"}
                buttonText={"Cannot Delete Demo User"}
                modalComponent={""}
                modalStyleClass={"delete-profile-modal-content"}
              />
              :
              <OpenModalButton
                buttonStyleClass={"delete-user-button change-cursor"}
                buttonText={"Delete user"}
                modalComponent={<DeleteUserModal />}
                modalStyleClass={"delete-profile-modal-content"}
              />
            }
          </div>
        </div>
        <div className="profile-tiles-container">
          <div className="profile-page-div-1">
            <div id="profile-boards-container">
              <h2 id="profile-boards-header">My Boards</h2>
              <div className="profile-divider"></div>
              <div className="profile-user-boards-container">
                {boards.length > 0 ? (
                  boards.map((board) => (
                    <div
                      className="profile-user-board-tile change-cursor"
                      key={board.id}
                      onClick={() => history.push(`/boards/${board.id}`)}
                    >
                      <img id="boardimg" src={boardicon} />
                      <p id="profile-board-text">{board.name}</p>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>You have no boards</p>
                  </div>
                )}
              </div>
            </div>
            <div id="profile-tasks-container">
              <h2>My Tasks</h2>
              <div className="profile-divider"></div>
              <div className="profile-user-tasks">
                {tasks && tasks.length > 0 ? (
                  <div className="task-grid-home">
                    <div className="task-item-home">
                      <p>Tasks</p>
                      <p>Due Date</p>
                      <p id="my-tasks-boardname">Board Name</p>
                    </div>
                    {tasks.map((task) => (
                      <div key={task.id} className="task-items-home">
                        <SlideOutTask task={task} key={task} />
                        <p>{dateFormatSmall(new Date(task.due_date))}</p>
                        <p id="my-tasks-getboard">{getBoard(task)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>You have no tasks</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-page-div-2">
            <div id="about-me-container">
              <h2>About me</h2>
              <p>
                {profile.about_me
                  ? profile.about_me
                  : "Use this space to tell people about yourself."}
              </p>
            </div>
            <div id="quotes-container">
              <h2>Need some motivation?</h2>
              <p>"{quote}"</p>
              <p id="author">- {author}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>...Loading</h1>;
  }
}

export default UserProfile;
