import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from '../../store/users';
import { useModal } from "../../context/Modal";

function EditProfileModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.profile)
    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [aboutMe, setAboutMe] = useState(userInfo.about_me)
    const [profilePicUrl, setProfilePicUrl] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)

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

        const res = await fetch('/api/users', {
            method: "PUT",
            body: formData
        })

        if(res.ok) {
            await res.json();
            setImageLoading(false)
            console.log("res ok")
            closeModal();
        } else {
            setImageLoading(false)
            console.log("error")
        }
    }

    const handleChangeProfilePic = () => {

    }

    return(
        <div>
            <img src={userInfo.profile_pic_url} onClick={() => handleChangeProfilePic()}/>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data">

                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicUrl(e.target.files[0])}
                    />

                    <label>
                        Your full name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                       About me
                        <textarea
                            type="textarea"
                            value={aboutMe}
                            placeholder={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                        />
                    </label>
                {(imageLoading)&& <p>Loading...</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditProfileModal;
