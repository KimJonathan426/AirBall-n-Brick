import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import HostSpotIntro from './Steps/HostSpotIntro';
import Step1Intro from './Steps/Step1/Step1Intro';
import Step1Describe from './Steps/Step1Describe';
import Step1Type from './Steps/Step1Type';
import Step1Location from './Steps/Step1Location';
import LocationConfirm from './Steps/Step1Location/LocationConfirm';
import HostFooter from './HostFooter';
import logo from '../../images/logo-image.png';
import './HostSpot.css';

const HostSpot = () => {

    const [step, setStep] = useState(0);
    const [locationStep, setLocationStep] = useState(0);
    const [transitionClass, setTransitionClass] = useState('host-spot-container-transition');

    const [tags, setTags] = useState(new Set());
    const [type, setType] = useState('full');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');

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
                {step === 4 && locationStep === 0 &&
                    <Step1Location
                        locationStep={locationStep} setLocationStep={setLocationStep}
                        setAddress={setAddress} setCity={setCity}
                        setState={setState} setZipcode={setZipcode}
                        setCountry={setCountry} />
                }
                {step === 4 && locationStep === 1 &&
                    <LocationConfirm />
                }
            </div>
            <div className='host-spot-footer'>
                <HostFooter
                    step={step} setStep={setStep}
                    locationStep={locationStep} setLocationStep={setLocationStep}
                    address={address} city={city}
                    state={state} zipcode={zipcode}
                    country={country} setTransitionClass={setTransitionClass} />
            </div>
        </>
    )
};

export default HostSpot;
