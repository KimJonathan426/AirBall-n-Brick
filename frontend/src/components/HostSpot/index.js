import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import HostSpotIntro from './Steps/HostSpotIntro';
import logo from '../../images/logo-image.png';
import './HostSpot.css';

const HostSpot = () => {


    return (
        <>
            <NavLink className='logo-nav' to="/">
                <img className='host-spot-logo' src={logo} alt='airballnbrick logo' />
            </NavLink>
            <div className='host-spot-container'>
                <HostSpotIntro />
            </div>
        </>
    )
};

export default HostSpot;
