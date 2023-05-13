import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/users";
import { getBoardsByUserId } from "../../store/boards";
import "./Homepage.css";
import { getTasksByUserId } from "../../store/tasks";
import { Link, useHistory } from "react-router-dom";
import SlideOutTask from "../SlideOutTask/SlideOutTask";

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
  const history = useHistory();
  const storeProfile = useSelector((state) => state.users.profile);
  const [currentDate, setCurrentDate] = useState("");
  const greeting = greetingUser();
  const tasks = useSelector((state) => state.tasks.tasks);
  const boards = useSelector((state) => state.boards.boards);
  //   console.log("store boards:", storeBoards);

  useEffect(() => {
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

  if(!tasks) return null

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
              <h2 className="change-cursor" onClick={() => history.push('/tasks')}>My Tasks</h2>
              <div className="homepage-user-tasks">
                {tasks ? (
                  tasks.map((task) => (
                    <SlideOutTask task={task} key={task.id} />
                  ))
                ) : (
                  <div>
                    <p>You have no tasks</p>
                  </div>
                )}
              </div>
              <div className="homepage-divider"></div>
            </div>
            <div id="homepage-boards-container">
              <h2>My Boards</h2>
              <div className="homepage-user-boards-container">
                {boards.length > 0 ? (
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
              {/* <div className="pro-divider"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
