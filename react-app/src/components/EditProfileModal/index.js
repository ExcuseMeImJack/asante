import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from '../../store/users';
import { useModal } from "../../context/Modal";
import './EditProfile.css'

function EditProfileModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.profile)
    const [name, setName] = useState(userInfo.name)
    const [email] = useState(userInfo.email)
    const [aboutMe, setAboutMe] = useState(userInfo.about_me)
    const [profilePicUrl, setProfilePicUrl] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    // eslint-disable-next-line

    if(aboutMe === null) {
         setAboutMe("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(formData)
        formData.append("profile_pic_url", profilePicUrl);

        if(name) formData.append("name", name);
        if(email) formData.append("email", email);
        if(aboutMe) formData.append("about_me", aboutMe);

        setImageLoading(true);
        console.log("FORMDATA~~~~~~~~~~~~~>", formData)
        const res = await fetch('/api/users', {
            method: "PUT",
            body: formData
        })

        if(res.ok) {
            await res.json();
            setImageLoading(false)
            console.log("res ok")
            closeModal();
            dispatch(getUserProfile())
        } else {
            setImageLoading(false)
            console.log("error")
        }
    }

    const handleChangeProfilePic = () => {

    }

    return(
        <div>
            <h2 id="profile-settings-header">My Settings</h2>
            <div className="profile-divider"/>
            <div className="edit-profile-content">
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data">
                        <p className="profile-pic-section">Your photo</p>
                        <div className="edit-profile-pic-container">
                            <img id="current-profile-pic" alt="" src={userInfo.profile_pic_url} onClick={() => handleChangeProfilePic()}/>
                            <div className="profile-pic-input-description">
                                <label className="change-cursor"> Upload your photo
                                    <input
                                    className="upload-profile-pic-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfilePicUrl(e.target.files[0])}
                                    />
                                </label>
                                <p className="profile-pic-description">Photos help your teammates recognize you in Asana</p>
                            </div>
                        </div>
                        <div className="edit-profile-details-grid">
                            <label className="name-input">
                                Your full name
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="email-input">
                                Email
                                <input
                                    type="text"
                                    value={email}
                                    disabled={true}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="aboutme-input">
                            About me
                                <textarea
                                    type="textarea"
                                    value={aboutMe}
                                    placeholder={aboutMe}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="display-theme">
                            {/* Implement Dark Mode/Light Mode Here */}
                        </div>
                    {(imageLoading)&& <p></p>}
                    <div className="commit-changes">
                        <button className="save-profile-edit-changes change-cursor" type="submit">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal;
