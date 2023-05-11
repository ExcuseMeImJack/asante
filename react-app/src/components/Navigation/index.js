import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SlideOutMenu from '../SlideOutMenu/SlideOutMenu';
import './Navigation.css';
import CreateBoardForm from '../Boards/CreateBoardForm';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<SlideOutMenu />
			<ul className='nav-list'>
					<CreateBoardForm/>
				<NavLink className='nav-list-item' exact to="/">Home</NavLink>
					<NavLink className='nav-list-item' exact to="/profile">Profile</NavLink>
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

// import React, {useState} from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';
// import CreateBoardForm from '../Boards/CreateBoardForm';

// function Navigation({ isLoaded }){
// 	const sessionUser = useSelector(state => state.session.user);
// 	const [test, setTest] = useState(false)

// 	const handleSubmit = () => {
// 		setTest(true)
// 	}

// 	return (
// 		<ul className='nav-list'>
// 				<button className='nav-list-item' onClick={handleSubmit}>Create</button>
// 				{test && <CreateBoardForm />}
// 				<NavLink className='nav-list-item' exact to="/">Home</NavLink>
// 				<NavLink className='nav-list-item' exact to="/profile">Profile</NavLink>
// 			{isLoaded && (
// 				<li>
// 					<ProfileButton user={sessionUser} />
// 				</li>
// 			)}
// 		</ul>
// 	);
// }

// export default Navigation;
