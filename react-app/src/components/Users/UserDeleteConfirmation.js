import React from "react";
import "./UserDeleteConfirmation.css";
import { useModal } from "../../context/Modal";
import "./UserDeleteConfirmation.css"

function UserDeleteConfirmation() {
    const {closeModal} = useModal();

    return (
        <>
            <div className="handle-profile-delete-div" onClick={closeModal}>
                <h3>Account Successfully Deleted</h3>
            </div>
        </>

    )
}

export default UserDeleteConfirmation;
