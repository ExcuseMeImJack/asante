import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/users';
import EditProfileModal from '../EditProfileModal';
import OpenModalButton from '../OpenModalButton';
import './UserProfile.css'

function UserProfile(){
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.users.profile);
    //dispatch thunk to populate storeUsers variable
    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])

    if (!profile) return <h1>...Loading</h1>

	return (
        <div>
            <div className='profile-info-container'>
                <div className='profile-pic-container'>
                    <img className='profile-pic-image' src={profile.profile_pic_url}/>
                </div>
                <h1>{profile.name}</h1>
                <div className='email-container'>
                    <i className="fa-regular fa-envelope"></i>
                    <p>{profile.email}</p>
                </div>
                <OpenModalButton
                    buttonText={"Edit profile"}
                    modalComponent={<EditProfileModal/>}
                />
            </div>
        </div>
	);
}

export default UserProfile;
