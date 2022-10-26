import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  const currentLocation = useLocation();

  const [navFixed, setNavFixed] = useState(false);

  useEffect(() => {
    switch (currentLocation.pathname) {
      case `/`:
        setNavFixed(true);
        break;
      default:
        setNavFixed(false);
        break;
    }


  }, [currentLocation])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='session-logged-in'>
        <div className='about-link-logged-in-container'>
          <NavLink className='about-link-logged-in' exact to='/about'>About</NavLink>
        </div>
        <div className='host-link-container'>
          <NavLink className='host-link' to="/spots/new">Host a Court</NavLink>
        </div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='about-link-logged-out' exact to='/about'>About</NavLink>
        <DemoButton />
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className={navFixed ? 'nav-container-fixed' : 'nav-container'}>
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
