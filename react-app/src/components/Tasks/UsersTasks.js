import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUserId } from '../../store/tasks';
import './UsersTasks.css'
import SlideOutTask from '../SlideOutTask/SlideOutTask';

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

    // const id = user.id;
    const tasks = storeTasks.tasks;

	return (
        <div>
            <h1>My Tasks</h1>
            {tasks ?
                tasks.map(task => (
                <SlideOutTask task={task} key={task.id}/>))
                :
                <div><p>You have no tasks</p></div>}
        </div>
	);
}

export default UsersTasks;
