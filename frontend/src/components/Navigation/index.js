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
    switch (currentLocation.pathname.startsWith('/spots')) {
      case true:
        setNavFixed(false);
        break;
      default:
        setNavFixed(true);
        break;
    }


  }, [currentLocation])


  return (
    <div className={navFixed ? 'nav-container-fixed' : 'nav-container'}>
      <div className='nav-inner'>
        <NavLink className='logo-nav' to="/">
          <img className='logo-image' src={logoImage} alt='logo' />
          <img className='logo-text' src={logoText} alt='logo text' />
        </NavLink>
        <div>
          {isLoaded && (
            <NavDropdown sessionUser={sessionUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
