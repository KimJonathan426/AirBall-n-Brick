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
            <div className='host-spot-nav'>
                <NavLink to="/">
                    <img className='host-spot-logo' src={logo} alt='airballnbrick logo' />
                </NavLink>
            </div>
            <div className='host-spot-container'>
                <HostSpotIntro />
            </div>
            <div className='host-spot-footer'>
                <div className='host-spot-start'>
                    <button className='host-spot-start-btn'>Get Started</button>
                </div>
            </div>
        </>
    )
};

export default HostSpot;
