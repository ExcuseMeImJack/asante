import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SlideOutMenu from '../SlideOutMenu/SlideOutMenu';
import './Navigation.css';
import icon_image from '../../assets/asante-icon.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	return (
		<div className='nav-container'>
			<div className='home-left-navbar'>
				<SlideOutMenu />
				<div className='home-left-navbar change-cursor' onClick={() => history.push('/')}>
					<img id="site-icon" alt="" src={icon_image}></img>
					<h2 id='site-logo'>asante</h2>
				</div>
			</div>
			<ul className='nav-list'>
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
