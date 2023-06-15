import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavDropdown from '../NavDropdown';
import logoImage from '../../images/logo-image.png';
import logoText from '../../images/logo-text.png';
import './Navigation.css';


function Navigation({ isLoaded, fixed, type}) {
  const sessionUser = useSelector(state => state.session.user);

  const [navClass, setNavClass] = useState('nav-inner');

  useEffect(() => {
    if (type) {
      setNavClass(`nav-inner ${type}`)
    };

  }, [type])

  return (
    <div className={fixed ? 'nav-container-fixed' : 'nav-container'}>
      <div className={navClass}>
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
