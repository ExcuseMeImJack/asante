import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/users';
import EditProfileModal from '../EditProfileModal';
import OpenModalButton from '../OpenModalButton';
import './UserProfile.css'
import { getTasksByUserId } from '../../store/tasks';
import { getBoardsByUserId } from '../../store/boards';

function UserProfile(){
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.users.profile);
    const tasks = useSelector((state) => state.tasks.tasks);
    const boards = useSelector((state) => state.boards.boards);

    console.log(profile)
    console.log(tasks);
    console.log(boards);

    //dispatch thunk to populate storeUsers variable
    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getTasksByUserId())
        dispatch(getBoardsByUserId())
    }, [dispatch])

    if (!profile) return <h1>...Loading</h1>

	return (
        <div className='profile-page'>
            <div className='profile-info-container'>
                <div className='profile-pic-container'>
                    <img id='profile-pic-image' src={profile.profile_pic_url}/>
                </div>
                <div className='profile-info'>
                    <h1>{profile.name}</h1>
                    <div className='email-container'>
                        <i className="fa-regular fa-envelope"></i>
                        <p>{profile.email}</p>
                    </div>
                </div>
                <div className='edit-profile-button-div'>
                    <OpenModalButton
                            cName={"edit-profile-button"}
                            buttonText={"Edit profile"}
                            modalComponent={<EditProfileModal/>}
                        />
                </div>
            </div>

            <div className='profile-aboutme-quote-container'>
                <div id='about-me-container'>

                </div>
                <div id='quotes-container'>

                </div>
            </div>

            <div className='profile-boards-container'>

            </div>

            <div className='profile-tasks-container'>

            </div>

        </div>
	);
}

export default UserProfile;
