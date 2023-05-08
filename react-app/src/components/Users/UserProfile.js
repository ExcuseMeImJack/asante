import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/users';
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
            <h1>Profile</h1>
            <div>
                <div>{profile.about_me}</div>
                <div>{profile.name}</div>
                <div>{profile.email}</div>
                <div>{profile.username}</div>
            </div>
        </div>
	);
}

export default UserProfile;
