import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import './UsersTasks.css'

function UsersTasks(){
    const dispatch = useDispatch();
    const storeTasks = useSelector((state) => state.tasks);
    const user = useSelector((state) => state.session.user);

    //dispatch thunk to populate storeTasks variable
    useEffect(() => {
        dispatch(getTasksByUserId())
    }, [dispatch, user])

    // grab tasks array from the storeTasks object
    if (!storeTasks.tasks) return <h1>...Loading</h1>
    if (!user) return <h1>...Loading</h1>

    const id = user.id;

    const tasks = storeTasks.tasks;

    if (!tasks) return <h1>...Loading</h1>

	return (
        <div>
            <h1>My Tasks</h1>
            {tasks.map((task) => {
            return  <div key={task.id}>
                        <div>{task.name}</div>
                    </div>
            })}
        </div>
	);
}

export default UsersTasks;
