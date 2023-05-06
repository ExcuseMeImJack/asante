import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/users';

function Users(){
    const dispatch = useDispatch();
    const storeUsers = useSelector((state) => state.users);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const data = dispatch(getAllUsers())
        console.log(data["users"])
        setUsers(data["users"])
    }, [])

	return (
        <div>
            <h1>Users</h1>
            {storeUsers}
            {users}
        </div>
	);
}

export default Users;
