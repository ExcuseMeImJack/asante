import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserThunk, getUserProfile } from "../../store/users"
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./DeleteUser.css"
import UserDeleteConfirmation from "../Users/UserDeleteConfirmation";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";

function DeleteUserModal() {
    const dispatch = useDispatch()
    const history = useHistory()
    const storeProfile = useSelector(state => state.users)
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])

    const handleDelete = async() => {
        await dispatch(deleteUserThunk(storeProfile.profile))
        await dispatch(logout())
        history.push('/')
        setTimeout(()=> closeModal(), 1500)
    }

    return (
        <div className="delete-profile-modal-container">
            <h1>Delete Profile</h1>
            <h3 id="delete-profile-text">Are you sure you want to continue with this action? <br/>This will permanently delete your Asante account.</h3>
            <div className="delete-cancel-profile-buttons">
                <OpenModalButton
                modalComponent={<UserDeleteConfirmation/>}
                onButtonClick={handleDelete}
                buttonStyleClass="delete-profile-button"
                modalStyleClass={"handle-profile-delete"}
                buttonText={"Delete"}
                />
                <button className="cancel-delete-profile-button" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteUserModal
