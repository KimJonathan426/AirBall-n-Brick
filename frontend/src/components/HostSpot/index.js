import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import HostSpotIntro from './Steps/HostSpotIntro';
import Step1Intro from './Steps/Step1/Step1Intro';
import Step1Describe from './Steps/Step1Describe';
import Step1Type from './Steps/Step1Type';
import HostFooter from './HostFooter';
import logo from '../../images/logo-image.png';
import './HostSpot.css';

const HostSpot = () => {

    const [step, setStep] = useState(0);
    const [transitionClass, setTransitionClass] = useState('host-spot-container-transition');
    const [tags, setTags] = useState(new Set());
    const [type, setType] = useState('full');

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
                {step === 0 &&
                    <HostSpotIntro />
                }
                {step === 1 &&
                    <Step1Intro />
                }
                {step === 2 &&
                    <Step1Describe tags={tags} setTags={setTags} />
                }
                {step === 3 &&
                    <Step1Type type={type} setType={setType} />
                }
            </div>
            <div className='host-spot-footer'>
                <HostFooter step={step} setStep={setStep} setTransitionClass={setTransitionClass} />
            </div>
        </>
    )
};

export default HostSpot;
