import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/users';
import './Users.css'

function Users(){
    const dispatch = useDispatch();
    const storeUsers = useSelector((state) => state.users);

    //dispatch thunk to populate storeUsers variable
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    // grab users array from the storeUsers object
    const users = storeUsers.users;

    if (!users) return <h1>...Loading</h1>

	return (
        <div>
            <h1>Users</h1>
            {users.map((user) => {
            return  <div key={user.id}>
                        <div>{user.username}</div>
                        <div>{user.about_me}</div>
                        <img className="user-profile-img" src={user.profile_pic_url} alt="profile pic" />
                    </div>
            })}
        </div>
	);
}

export default Users;
