import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserThunk, getUserProfile } from "../../store/users";
import { getBoardsByUserId } from "../../store/boards";
import "./Homepage.css";
import { getTasksByUserId } from "../../store/tasks";
import { Link } from "react-router-dom";

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
  const storeProfile = useSelector((state) => state.users.profile);
  const [currentDate, setCurrentDate] = useState("");
  const greeting = greetingUser();
  const storeTasks = useSelector((state) => state.tasks);
  const storeBoards = useSelector((state) => state.boards.boards);
  console.log("store boards:", storeBoards);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getBoardsByUserId());
    dispatch(getTasksByUserId());

    const today = new Date();
    const formattedDate = dateFormat(today);
    setCurrentDate(formattedDate);
  }, [dispatch]);

  const tasks = storeTasks && storeTasks.tasks;
  //make sure storeBoards is not null before accessing boards property
  const boards = storeBoards && storeBoards.boards;

  return (
    <>
      <div className="homepage-container">
        <div className="home">Home</div>
        <div className="yellow">
          <div className="red">
            <div className="current-date">{currentDate}</div>
            <div className="hello-user">
              {greeting}
              {storeProfile.name}
            </div>
          </div>

          <div className="blue">
            <div id="homepage-tasks-container">
              <h2>My Tasks</h2>
              <div className="homepage-user-tasks">
                {tasks ? (
                  tasks.map((task) => (
                    <div className="homepage-user-task-tile" key={task.id}>
                      <div className="homepage-divider"></div>
                      <Link
                        to={`/tasks/${task.id}`}
                        id="homepage-task-link"
                        className="change-cursor"
                      >
                        {task.name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>You have no tasks</p>
                  </div>
                )}
              </div>
              <div className="profile-divider"></div>
            </div>
            <div id="homepage-boards-container">
              <h2>My Boards</h2>
              <div className="homepage-user-boards-container">
                {boards ? (
                  boards.map((board) => (
                    <div className="homepage-user-board-tile" key={board.id}>
                      <div className="homepage-divider"></div>
                      <Link
                        to={`/boards/${board.id}`}
                        id="homepage-board-link"
                        className="change-cursor"
                      >
                        {board.name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>You have no boards</p>
                  </div>
                )}
              </div>
              <div className="profile-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
