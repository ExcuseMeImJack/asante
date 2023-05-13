import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskByTaskId,
  editTaskByTaskId,
  getTasksByUserId,
} from "../../store/tasks";
import "./UsersTasks.css";
import SlideOutTask from "../SlideOutTask/SlideOutTask";
import EditTaskByIdForm from "./EditTaskByIdForm";
import { getBoardById } from "../../store/boards";

function UsersTasks() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const storeTasks = useSelector((state) => state.tasks.tasks);
  const boards = useSelector((state) => state.boards.boards);

  //dispatch thunk to populate storeTasks variable
  useEffect(() => {
    dispatch(getTasksByUserId());
  }, [dispatch, user]);

  // grab tasks array from the storeTasks object
//   if (!storeTasks.tasks) return <h1>...Loading</h1>;
  if (!user || user === null) return <h1>...Loading</h1>;

  // const id = user.id;
  const tasks = storeTasks;
  //   console.log("helloooooooo:", tasks);

  if (!tasks) return <h1>...Loading</h1>;

  function dateFormat(date) {
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
    const storeTask = storeTasks.find((findTask) => findTask.id === task.id);
    const board = boards.find(
      (findBoard) => findBoard.section_id === storeTask.section_id.id
    );
    if (board) {
        return board.name;
    }
  }

  return (
    <div className="my-tasks-page">
    <div className="userstasks-container">
    <h1 id="my-tasks-title">My Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <div className="task-grid">
            <div className="task-item">
                <p>Tasks</p>
                <p>Due Date</p>
                <p id="my-tasks-boardname">Board Name</p>
                </div>
          {tasks.map((task) => (
            <div key={task.id} className="task-items">
              <SlideOutTask task={task} key={task} />
              <p>{dateFormat(new Date(task.due_date))}</p>
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
  );
}

export default UsersTasks;
