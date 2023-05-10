import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteUserThunk, getUserProfile } from "../../store/users"
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import "./DeleteUser.css"

function DeleteUserModal() {
    const dispatch = useDispatch()
    const history = useHistory()
    const storeProfile = useSelector(state => state.users)
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])

    return (
        <div className="delete-profile-modal-container">
            <h1>Delete Profile</h1>
            <h3 id="delete-profile-text">Are you sure you want to continue with this action? <br/>This will permanently delete your Asante account.</h3>
            <div className="delete-cancel-profile-buttons">
                <button className="delete-profile-button" onClick={async (e) => {
                    e.preventDefault()
                    await dispatch(deleteUserThunk(storeProfile.profile))
                    closeModal()
                    history.push('/')
                }}>Delete</button>
                <button className="cancel-delete-profile-button" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteUserModal
