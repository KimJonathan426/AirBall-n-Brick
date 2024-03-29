import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import HostSpotIntro from './Steps/HostSpotIntro';
import Step1Intro from './Steps/StepIntros/Step1Intro';
import Step1Tags from './Steps/Step1Tags';
import Step1Type from './Steps/Step1Type';
import Step1Location from './Steps/Step1Location';
import LocationConfirm from './Steps/Step1Location/LocationConfirm';
import LocationPin from './Steps/Step1Location/LocationPin';
import Step2Intro from './Steps/StepIntros/Step2Intro';
import Step2Amenities from './Steps/Step2Amenities';
import Step2Photos from './Steps/Step2Photos';
import Step2Title from './Steps/Step2Title';
import Step2Description from './Steps/Step2Description';
import Step3Intro from './Steps/StepIntros/Step3Intro';
import Step3Price from './Steps/Step3Price';
import FinalReview from './Steps/FinalReview';
import HostFooter from './HostFooter';
import logo from '../../images/logo-image.png';
import './HostSpot.css';

const HostSpot = () => {

    const sessionUser = useSelector(state => state.session.user);

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
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("You'll be at peak performance and have the best time at this unique court.");
    const [price, setPrice] = useState('60');

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

    // return user to home page if they are not logged in.
    if (!sessionUser) return (
        <Navigate replace to="/" />
    );

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
                    <Step1Tags tags={tags} setTags={setTags} />
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
                {step === 8 &&
                    <Step2Title title={title} setTitle={setTitle} />
                }
                {step === 9 &&
                    <Step2Description description={description} setDescription={setDescription} />
                }
                {step === 10 &&
                    <Step3Intro />
                }
                {step === 11 &&
                    <Step3Price price={price} setPrice={setPrice} />
                }
                {step === 12 &&
                    <FinalReview
                        images={images} title={title} description={description} price={price}
                        address={address} city={city} state={state} zipcode={zipcode}
                        country={country} />
                }
            </div>
            <div className='host-spot-footer'>
                <HostFooter
                    step={step} setStep={setStep}
                    locationStep={locationStep} setLocationStep={setLocationStep}
                    address={address} city={city} state={state} zipcode={zipcode}
                    country={country} lat={lat} lng={lng} showSpecific={showSpecific}
                    tags={tags} amenities={amenities} type={type} price={price}
                    setTransitionClass={setTransitionClass} setIsFinalCheck={setIsFinalCheck}
                    setDisableScroll={setDisableScroll} images={images} title={title}
                    description={description} />
            </div>
        </>
    )
};

export default HostSpot;
