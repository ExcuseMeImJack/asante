import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/users";
import { getBoardsByUserId } from "../../store/boards";
import "./Homepage.css";
import { getTasksByUserId } from "../../store/tasks";
import { useHistory } from "react-router-dom";
import SlideOutTask from "../SlideOutTask/SlideOutTask";
import boardicon from "../../assets/board.png";
import { getAllBoardsForEachSection } from "../../store/sections";
import CreateBoardForm from "../Boards/CreateBoardForm";

// creating a function to format the date
function dateFormat(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${dayOfWeek}, ${month} ${day}`;
}

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

function greetingUser() {
  //getHours gets the hours of 0-23 and assigns to currentTime
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning, ";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon, ";
  } else {
    return "Good evening, ";
  }
}

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const storeProfile = useSelector((state) => state.users.profile);
  const [currentDate, setCurrentDate] = useState("");
  const greeting = greetingUser();
  const tasks = useSelector((state) => state.tasks.tasks);
  const boards = useSelector((state) => state.boards.boards);
  const sections = useSelector((state) => state.sections.sections);

  useEffect(() => {
    dispatch(getAllBoardsForEachSection());
    dispatch(getUserProfile());
    dispatch(getBoardsByUserId());
    dispatch(getTasksByUserId());


    const today = new Date();
    const formattedDate = dateFormat(today);
    setCurrentDate(formattedDate);
  }, [dispatch]);

  //   const tasks = storeTasks && storeTasks.tasks;
  //make sure storeBoards is not null before accessing boards property
  //   const boards = storeBoards && storeBoards.boards;

  if (!tasks) return null;

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

  const getDueDate = (task) => {
    let date = task.due_date.split(' ')[1]
    let month = task.due_date.split(' ')[2]
    let year = task.due_date.split(' ')[3]

    const due =  ' ' + month + ' ' + date + ' ' + year
    return due;
  }

  return (
    <>
      <div className="homepage-container">
        {/* <div className="home">Home</div> */}
        <div className="yellow">
          <div className="red">
            <div className="current-date">{currentDate}</div>
            <div className="hello-user">
              <h2>
                {greeting}
                {storeProfile.name}
              </h2>
            </div>
          </div>

          <div className="blue">
            <div id="homepage-tasks-container">
              <h2
                className="change-cursor"
                onClick={() => history.push("/tasks")}
              >
                My Tasks
              </h2>
              <div className="homepage-user-tasks">
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
                        <p>{getDueDate(task)}</p>
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
              <div className="homepage-divider"></div>
            </div>
            <div id="homepage-boards-container">
              <div className="board-title-home">
                <h2>My Boards</h2>
                <CreateBoardForm buttonType={'small'}/>
              </div>
              <div className="profile-user-boards-container">
                {boards.length > 0 ? (
                  boards.map((board) => (
                    <div className="profile-user-board-tile" key={board.id}>
                      <div className="homepage-divider"></div>
                      <div
                        className="profile-user-board-tile change-cursor"
                        key={board.id}
                        onClick={() => history.push(`/boards/${board.id}`)}
                      >
                        <img id="boardimg" src={boardicon} alt="board icon" />
                        <p id="profile-board-text">{board.name}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>You have no boards</p>
                  </div>
                )}
              </div>
            </div>
              <div className="buffer-space"></div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
