import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/users';
import './Users.css'

function Users(){
    const dispatch = useDispatch();
    const storeUsers = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])
    const users = storeUsers.users;
	return (
        <div>
            <h1>Users</h1>
            {users && users.map((user) => {
        return <div key={user.id}>
                    <div>{user.username}</div>
                    <div>{user.about_me}</div>
                    <img className="user-profile-img" src={user.profile_pic_url} alt="profile pic" />
               </div>
            })}
            <div>{}</div>
        </div>
	);
}

export default Users;
