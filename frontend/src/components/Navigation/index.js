import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavDropdown from '../NavDropdown';
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
      <>
        <NavDropdown sessionUser={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavDropdown sessionUser={sessionUser} />
      </>
    );
  }

  return (
    <div className={navFixed ? 'nav-container-fixed' : 'nav-container'}>
      <NavLink className='logo-nav' exact to="/">
        <img className='logo-image' src={logoImage} />
        <img className='logo-text' src={logoText} />
      </NavLink>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
