import React, { useEffect, useState } from 'react';
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
    const [quoteInfo, setQuoteInfo] = useState("");

    console.log(profile)
    console.log(tasks);
    console.log(boards);

    //dispatch thunk to populate storeUsers variable
    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getTasksByUserId())
        dispatch(getBoardsByUserId())
    }, [dispatch])

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await fetch('https://api.api-ninjas.com/v1/quotes?category=success',{
                headers: {'X-Api-Key': 'WrkXdZlorsWnOkvJdFoc9Q==oNhDvwTXKFJguwGD'},
                contentType: 'application/json'
            })
            // console.log('QUOTE RES', res)
            if(res.ok){
                const data = await res.json()
                setQuoteInfo(data)

            } else {
                return('error', res.error)
            }
        }
        fetchQuote()
    }, [dispatch])

    if (!profile) return <h1>...Loading</h1>

    if (quoteInfo[0]){
        const quote = quoteInfo[0].quote;
        const author = quoteInfo[0].author;

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
                <div className='profile-tiles-container'>
                    <div id='profile-boards-container'>
                        <h2>My Boards</h2>
                        <div className='profile-user-boards-container'>
                            {boards ?
                                boards.map(board => (
                                    <div className='profile-user-board-tile'>
                                        <div className='profile-divider'></div>
                                        <p>{board.name}</p>
                                    </div>
                                ))
                            :
                            <div><p>You have no boards</p></div>}
                        </div>
                        <div className='profile-divider'></div>
                    </div>
                    <div id='profile-tasks-container'>
                        <h2>My Tasks</h2>
                        <div className='profile-user-tasks'>
                            {tasks ?
                                    tasks.map(task => (
                                        <div className='profile-user-task-tile'>
                                            <div className='profile-divider'></div>
                                            <p>{task.name}</p>
                                        </div>
                                    ))
                                :
                                <div><p>You have no tasks</p></div>}
                        </div>
                        <div className='profile-divider'></div>
                    </div>
                    <div id='about-me-container'>
                        <h2>About me</h2>
                        <p>{profile.about_me ? profile.about_me : "Use this space to tell people about yourself."}</p>
                    </div>
                    <div id='quotes-container'>
                        <h2>Need some motivation?</h2>
                        <p>"{quote}"</p>
                        <p id='author'>- {author}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>...Loading</h1>
    }
}

export default UserProfile;
