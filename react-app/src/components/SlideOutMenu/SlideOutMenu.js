import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import './SlideOutMenu.css'

export default function SlideOutMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

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

    const ulClassName = "slide-out-menu" + (showMenu ? "" : " hidden-menu");


  return (
    <div>
      <i onClick={openMenu} class="fa-solid fa-bars" id="bars"></i>
        <ul className={ulClassName} ref={ulRef}>
            <div className='cushion'></div>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink exact to="/profile">Profile</NavLink></li>
            <li><NavLink exact to="/boards/new">New Board</NavLink></li>
            <li>Filler</li>
        </ul>
    </div>
  )
}
