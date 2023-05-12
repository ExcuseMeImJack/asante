import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logoutUserThunk } from "../../store/users";
import { getUserProfile } from '../../store/users';
import OpenModalButton from "../OpenModalButton";
import "./ProfileButton.css";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    dispatch(getUserProfile())
}, [dispatch])


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUserThunk());
    await dispatch(logout())
    return history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <img src={profile.profile_pic_url} onClick={openMenu} id='navbar-pic-image' className='profile-button'/>
        {/* <i className="fas fa-user-circle" /> */}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li onClick={handleLogout}>Log Out</li>
          </>
        ) : (
          <>
            <li onClick={() => history.push("/login")}>Log In</li>

            <li onClick={() => history.push("/signup")}>Sign up</li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
