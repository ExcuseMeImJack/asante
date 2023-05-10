import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
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
	);
}

export default Navigation;
