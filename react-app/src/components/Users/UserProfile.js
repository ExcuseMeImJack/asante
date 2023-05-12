import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../store/users";
import EditProfileModal from "../EditProfileModal";
import OpenModalButton from "../OpenModalButton";
import "./UserProfile.css";
import { getTasksByUserId } from "../../store/tasks";
import { getBoardsByUserId } from "../../store/boards";
import DeleteUserModal from "../DeleteUserModal";
import SlideOutTask from '../SlideOutTask/SlideOutTask'
import quoteCensor from "./quoteCensor";
import { Link } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);
  const tasks = useSelector((state) => state.tasks.tasks);
  const boards = useSelector((state) => state.boards.boards);
  const [quoteInfo, setQuoteInfo] = useState("");

  //dispatch thunk to populate storeUsers variable
  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getTasksByUserId());
    dispatch(getBoardsByUserId());
  }, [dispatch]);

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',{
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
        };
    fetchQuote();

  }, [dispatch]);

  if (!profile) return <h1>...Loading</h1>;

  if (quoteInfo[0]) {
    const quote = quoteInfo[0].quote;
    const author = quoteCensor(quoteInfo[0].author);


        return (
            <div className='profile-page'>
                <div className='profile-info-container'>
                    <div className='profile-pic-container'>
                        <img id='profile-pic-image' alt="" src={profile.profile_pic_url}/>
                    </div>
                    <div className='profile-info'>
                        <h1>{profile.name}</h1>
                        <div className='username-email-container'>
                            <div className='username-container'>
                                <p>@</p>
                                <p>{profile.username} |</p>
                            </div>
                            <div className='email-container'>
                                <i className="fa-regular fa-envelope"></i>
                                <p>{profile.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='edit-delete-profile-button-div'>
                        <OpenModalButton
                            buttonStyleClass={"edit-profile-button change-cursor"}
                            buttonText={"Edit profile"}
                            modalComponent={<EditProfileModal/>}
                            modalStyleClass={'edit-profile-modal-content'}
                        />
                        <OpenModalButton
                            buttonStyleClass={"delete-user-button change-cursor"}
                            buttonText={"Delete user"}
                            modalComponent={<DeleteUserModal/>}
                            modalStyleClass={'delete-profile-modal-content'}
                        />
                    </div>
                </div>
                <div className='profile-tiles-container'>
                    <div className='profile-page-div-1'>
                        <div id='profile-boards-container'>
                            <h2>My Boards</h2>
                            <div className='profile-user-boards-container'>
                                {boards ?
                                    boards.map(board => (
                                        <div className='profile-user-board-tile' key={board.id}>
                                            <div className='profile-divider'></div>
                                            <Link to={`/boards/${board.id}`} id='profile-board-link' className='change-cursor'>{board.name}</Link>
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
                                            <SlideOutTask task={task} key={task.id}/>
                                        ))
                                    :
                                    <div><p>You have no tasks</p></div>}
                            </div>
                            <div className='profile-divider'></div>
                        </div>

                    </div>
                    <div className='profile-page-div-2'>
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
            </div>
        );
    } else {
        return <h1>...Loading</h1>
    }
}

export default UserProfile;
