import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/users";
import EditProfileModal from "../EditProfileModal";
import OpenModalButton from "../OpenModalButton";
import "./UserDeleteConfirmation.css";
import { getTasksByUserId } from "../../store/tasks";
import { getBoardsByUserId } from "../../store/boards";
import DeleteUserModal from "../DeleteUserModal";
import SlideOutTask from '../SlideOutTask/SlideOutTask'
import quoteCensor from "./quoteCensor";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

function UserDeleteConfirmation() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();

    return (
        <div className="confirm-delete-stuff">
            
        </div>
    )
}

export default UserDeleteConfirmation;
