import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById } from "../../store/tasks";
import { useParams } from "react-router-dom";
import "./SingleTask.css";

function SingleTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const storeTasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, [dispatch]);

  const task = storeTasks.task;

  if (!task) return <h1>...Loading</h1>;

  return (
    <div className="single-task-container">
      <div className="single-task-card">
        <h3>{task.name}</h3>
        <div>{task.description || "No description"}</div>
      </div>
    </div>
  );
}

export default SingleTask;
