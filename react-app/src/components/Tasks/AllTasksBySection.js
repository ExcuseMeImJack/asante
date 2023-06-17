import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksByUserId } from "../../store/tasks";
import { useHistory } from "react-router-dom";
import { deleteSectionById } from "../../store/sections";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SingleTask from "./SingleTask";
import EditSectionForm from "../Sections/EditSectionForm";
import CreateTaskBySectionForm from "../Tasks/CreateTaskBySectionForm";
import "./AllTasksBySection.css";
import Loading from "../Loading/Loading";

function AllTasksBySection({ section, boardId }) {
  const dispatch = useDispatch();
  const storeTasks = useSelector((state) => state.tasks);
  const sections = useSelector((state) => state.sections.sections);
  const [editButton, setEditButton] = useState(false);
  const [createButton, setCreateButton] = useState(true);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const history = useHistory();

  // dispatch thunk to populate storeTasks variable
  useEffect(() => {
    dispatch(getTasksByUserId());
  }, [dispatch, sections]);

  // grab tasks array from the storeTasks object
  if (!storeTasks || !sections || !storeTasks.tasks) return <Loading/>;

  const tasks = storeTasks.tasks
    .filter((task) => task.section_id === section.id)
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      {!editButton ? (
        <div
          className="edit-section-btn"
          onClick={() => {
            setEditButton(true);
          }}
        >
          <i
            className="fa-solid fa-pen-to-square edit-section-button"
            id="pen"
          ></i>
          <p>Edit Section Name</p>
        </div>
      ) : (
        <i
          className="fa-solid fa-xmark edit-section-button"
          id="xmark"
          onClick={() => {
            setEditButton(false);
          }}
        ></i>
      )}
      {!editButton ? (
        <></>
      ) : (
        <EditSectionForm
          sectionId={section.id}
          boardId={boardId}
          setEditButton={setEditButton}
        />
      )}
      <div
        className="delete-section-btn"
        onClick={async (e) => {
          e.preventDefault();
          if (!deleteClicked) {
            setDeleteClicked(true);
          } else setDeleteClicked(false);
        }}
      >
        <i className="fa-solid fa-trash section-trash" id="section-trash"></i>
        <p>Delete Section</p>
      </div>
      <div className="delete-warning-section">
        <div className="section-check-x">
          {deleteClicked && (
            <p className="delete-text-section">Are you sure?</p>
          )}
          {deleteClicked && (
            <i
              className="fa-solid fa-xmark"
              id="section-xmark"
              onClick={() => {
                setDeleteClicked(false);
              }}
            ></i>
          )}
          {deleteClicked && (
            <i
              className="fa-solid fa-check"
              id="section-check"
              onClick={async () => {
                await dispatch(deleteSectionById(section));
                return history.push(`/boards/${boardId}`);
              }}
            ></i>
          )}
        </div>
      </div>
      <div className="border-divider-tasks"></div>
      <div className="tasks-container">
        {createButton ? (
          <div
            className="add-task-sec-butn"
            onClick={() => {
              setCreateButton(false);
            }}
          >
            <i className="fa-solid fa-plus create-task-button" id="plus"></i>
            <p>Add Task</p>
          </div>
        ) : (
          <i
            className="fa-solid fa-minus create-task-button"
            id="minus"
            onClick={() => {
              setCreateButton(true);
            }}
          ></i>
        )}
        {createButton ? (
          <></>
        ) : (
          <CreateTaskBySectionForm
            sectionId={section.id}
            setCreateButton={setCreateButton}
          />
        )}
        <Droppable droppableId={"section-" + section.id} type="task">
          {(provided) => (
            <div
              className="task-gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable
                  draggableId={"task-" + task.id}
                  key={task.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="single-task-border"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <SingleTask task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default AllTasksBySection;
