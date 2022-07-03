import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoButton from '../DemoButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logoImage from '../../images/logo-image.png';
import logoText from '../../images/logo-text.png';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='session-logged-in'>
        <div className='host-link-container'>
          <NavLink className='host-link' to="/spots/new">Host a Court</NavLink>
        </div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <DemoButton />
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='nav-container'>
      <NavLink className='logo-nav' exact to="/">
        <img className='logo-image' src={logoImage} />
        <img className='logo-text' src={logoText} />
      </NavLink>
      <div className='nav-buttons'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
