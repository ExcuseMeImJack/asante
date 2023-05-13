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
  if (!user) return <h1>...Loading</h1>;

	return (
        <div>
            <h1>My Tasks</h1>
            {tasks ?
                tasks.map(task => (
                <SlideOutTask task={task} key={task.id}/>))
                :
                <div><p>You have no tasks</p></div>}
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
    return board.name;
  }

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <SlideOutTask task={task} key={task} />
              <p>Due Date: {dateFormat(new Date(task.due_date))}</p>
              <p>{getBoard(task)}</p>

              {/* {boards.map((board) => board.name)} */}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>You have no tasks</p>
        </div>
      )}
    </div>
  );
}

export default UsersTasks;
