import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../store/users';
import './Users.css'

function UserProfile(){
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.users.profile);
    const userId = useSelector((state) => state.session.user.id);

    //dispatch thunk to populate storeUsers variable
    useEffect(() => {
        dispatch(getUserProfile(userId))
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
