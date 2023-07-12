import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import HostSpotIntro from './Steps/HostSpotIntro';
import Step1Intro from './Steps/StepIntros/Step1Intro';
import Step1Describe from './Steps/Step1Describe';
import Step1Type from './Steps/Step1Type';
import Step1Location from './Steps/Step1Location';
import LocationConfirm from './Steps/Step1Location/LocationConfirm';
import LocationPin from './Steps/Step1Location/LocationPin';
import Step2Intro from './Steps/StepIntros/Step2Intro';
import Step2Amenities from './Steps/Step2Amenities';
import Step2Photos from './Steps/Step2Photos';
import HostFooter from './HostFooter';
import logo from '../../images/logo-image.png';
import './HostSpot.css';

const HostSpot = () => {

    const [step, setStep] = useState(0);
    const [locationStep, setLocationStep] = useState(0);
    const [isFinalCheck, setIsFinalCheck] = useState(false);
    const [transitionClass, setTransitionClass] = useState('host-spot-container-transition');
    const [scrolled, setScrolled] = useState(false);
    const [disableScroll, setDisableScroll] = useState(false);

    const [tags, setTags] = useState(new Set());
    const [amenities, setAmenities] = useState(new Set());
    const [type, setType] = useState('full');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('United States');
    const [lat, setLat] = useState(38.483378);
    const [lng, setLng] = useState(-109.681333);
    const [showSpecific, setShowSpecific] = useState(false);
    const [images, setImages] = useState(null);


    useEffect(() => {
        if (step === 4) {
            setTransitionClass('host-spot-container');
            setDisableScroll(false);
        } else if (scrolled) {
            setTransitionClass('host-spot-container-scrolled-down');
            setDisableScroll(false);
        } else {
            setTransitionClass('host-spot-container');
            setDisableScroll(false);
        }
    }, [step, scrolled]);

    useEffect(() => {
        const mainContainer = document.getElementById('host-spot-main-container');

        const handleScroll = () => {
            let scrollValue = mainContainer.scrollTop;

            if (!disableScroll) {
                if (scrollValue > 1) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                };
            };
        };

        if (mainContainer) {
            mainContainer.addEventListener('scroll', handleScroll);
        };

        return () => {
            if (mainContainer) {
                mainContainer.removeEventListener('scroll', handleScroll);
            };
        };
    }, [disableScroll]);


    return (
        <>
            <div className='host-spot-nav'>
                <NavLink to="/">
                    <img className='host-spot-logo' src={logo} alt='airballnbrick logo' />
                </NavLink>
            </div>
            <div id='host-spot-main-container' className={transitionClass}>
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
                        setLocationStep={setLocationStep} setAddress={setAddress}
                        setCity={setCity} setState={setState} setZipcode={setZipcode}
                        setCountry={setCountry} lat={lat} lng={lng} setLat={setLat}
                        setLng={setLng} />
                }
                {step === 4 && locationStep === 1 &&
                    <LocationConfirm
                        showSpecific={showSpecific} setShowSpecific={setShowSpecific}
                        address={address} setAddress={setAddress} city={city}
                        setCity={setCity} state={state} setState={setState}
                        zipcode={zipcode} setZipcode={setZipcode} country={country}
                        setCountry={setCountry} lat={lat} setLat={setLat} lng={lng}
                        setLng={setLng} isFinalCheck={isFinalCheck}
                        setIsFinalCheck={setIsFinalCheck} setLocationStep={setLocationStep} />
                }
                {step === 4 && locationStep === 2 &&
                    <LocationPin
                        address={address} city={city} state={state} zipcode={zipcode}
                        country={country} lat={lat} setLat={setLat} lng={lng}
                        setLng={setLng} />
                }
                {step === 5 &&
                    <Step2Intro />
                }
                {step === 6 &&
                    <Step2Amenities amenities={amenities} setAmenities={setAmenities} />
                }
                {step === 7 &&
                    <Step2Photos images={images} setImages={setImages} />
                }
            </div>
            <div className='host-spot-footer'>
                <HostFooter
                    step={step} setStep={setStep}
                    locationStep={locationStep} setLocationStep={setLocationStep}
                    address={address} city={city} state={state} zipcode={zipcode}
                    country={country} setTransitionClass={setTransitionClass}
                    setIsFinalCheck={setIsFinalCheck} setDisableScroll={setDisableScroll} />
            </div>
        </>
    )
};

export default HostSpot;
