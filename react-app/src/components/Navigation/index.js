import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SlideOutMenu from '../SlideOutMenu/SlideOutMenu';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<SlideOutMenu />
			<ul className='nav-list'>
					<NavLink className='nav-list-item' exact to="/">Home</NavLink>
					<NavLink className='nav-list-item' exact to="/profile">Profile</NavLink>
					<NavLink className='nav-list-item' exact to="/boards/new">New Board</NavLink>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
