import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import HostSpotIntro from './Steps/HostSpotIntro';
import HostFooter from './HostFooter';
import logo from '../../images/logo-image.png';
import './HostSpot.css';
import Step1Intro from './Steps/Step1/Step1Intro';

const HostSpot = () => {

    const [step, setStep] = useState(0);
    const [transitionClass, setTransitionClass] = useState('host-spot-container-transition')

    useEffect(() => {
        setTransitionClass('host-spot-container');
    }, []);

    useEffect(() => {
        setTransitionClass('host-spot-container')
    }, [step]);

    return (
        <>
            <div className='host-spot-nav'>
                <NavLink to="/">
                    <img className='host-spot-logo' src={logo} alt='airballnbrick logo' />
                </NavLink>
            </div>
            <div className={transitionClass}>
                {step == 0 &&
                    <HostSpotIntro />
                }
                {step == 1 &&
                    <Step1Intro />
                }
            </div>
            <div className='host-spot-footer'>
                <HostFooter step={step} setStep={setStep} setTransitionClass={setTransitionClass} />
            </div>
        </>
    )
};

export default HostSpot;
