import React, { useEffect, useRef, useState } from "react";
import EditTaskByIdForm from "../Tasks/EditTaskByIdForm";
import "./SingleTask.css";
import Loading from "../Loading/Loading";

function SingleTask({ task }) {
  const [showEditTask, setShowEditTask] = useState(false);
  const ulRef = useRef();
  const [updated, setUpdated] = useState(false);

  const openTask = () => {
    if (showEditTask) return;
    setShowEditTask(true);
  };

  useEffect(() => {
    if (!showEditTask) return;

    const closeTask = (e) => {
      if (!ulRef.current) return;
      if (!ulRef.current.contains(e.target)) {
        setShowEditTask(false);
      }
    };
    document.addEventListener("click", closeTask);
    return () => document.removeEventListener("click", closeTask);
  }, [showEditTask]);

  if (!task) return <Loading/>;
  const ulClassName = "board-task" + (showEditTask ? "" : " board-hidden-task");

  const getDueDate = () => {

    let date = task.due_date.split(' ')[1]
    let month = task.due_date.split(' ')[2]
    let year = task.due_date.split(' ')[3]

    const due = date + ' ' + month + ' ' + year
    return due;
  }

  return (
    <div className="single-task-card" onClick={openTask}>
      <h3>{task.name}</h3>
      <h4>{getDueDate()}</h4>
      <div className="single-task-desc">
        {task.description || "No description"}
      </div>
      <div className={ulClassName} ref={ulRef}>
        <EditTaskByIdForm
          task={task}
          ulRef={ulRef}
          type={"single-task"}
          setShowEditTask={setShowEditTask}
          updated={updated}
          setUpdated={setUpdated}
        />
      </div>
    </div>
  );
}

export default SingleTask;
