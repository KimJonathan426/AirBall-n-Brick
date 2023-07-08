import { useEffect, useState } from 'react';
import loadingGif from '../../images/host-court-loading.gif';
import './HostSpot.css';

const HostFooter = ({ step, setStep, locationStep, setLocationStep, address, city,
    state, zipcode, country, setTransitionClass, isFinalCheck, setIsFinalCheck }) => {

    const [progressBar1, setProgressBar1] = useState('0');
    const [progressBar2, setProgressBar2] = useState('0');
    const [progressBar3, setProgressBar3] = useState('0');
    const [nextDisabled, setNextDisabled] = useState(false);
    const [backButtonLoading, setBackButtonLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        if (step !== 4) {
            if (nextDisabled) {
                setNextDisabled(false);
            };
            return;
        };

        if (locationStep === 0) {
            setNextDisabled(true);
        } else if (locationStep === 1 && (!address || !city || !state || !zipcode || !country)) {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        };

    }, [step, locationStep, address, city, state, zipcode, country]);

    const handleBack = () => {
        if (step === 4 && locationStep > 0) {
            setLocationStep(locationStep - 1);
            return;
        }

        setBackButtonLoading(true);
        setTransitionClass('host-spot-container-transition');
        setTimeout(() => {
            setStep(step - 1);
            setBackButtonLoading(false);
        }, 600);
    };

    const handleNext = () => {
        if (step === 4 && locationStep === 1) {
            console.log('clicked next')
            setIsFinalCheck(true);
            return;
        }

        setButtonLoading(true);
        setTransitionClass('host-spot-container-transition');
        setTimeout(() => {
            setStep(step + 1);
            setButtonLoading(false);
        }, 600);
        // setProgressBar1('40');
    };


    return (
        <>
            {step === 0 ?
                <div className='host-spot-start'>
                    {buttonLoading ?
                        <button className='host-spot-load-box'>
                            <img className='host-spot-btn-load' src={loadingGif} alt='loading...' />
                        </button>
                        :
                        <button onClick={handleNext} className='host-spot-start-btn'>Get Started</button>
                    }
                </div>
                :
                <>
                    <div className='host-spot-footer-progress'>
                        <div className='host-spot-footer-progress-bar'>
                            <div className='footer-progress-bar-highlight'
                                style={{ transition: 'transform 600ms linear 0s', transform: `translateX(${progressBar1}%)` }} />
                        </div>
                        <div className='host-spot-footer-progress-bar'>
                            <div className='footer-progress-bar-highlight'
                                style={{ transition: 'transform 600ms linear 0s', transform: `translateX(${progressBar2}%)` }} />
                        </div>
                        <div className='host-spot-footer-progress-bar'>
                            <div className='footer-progress-bar-highlight'
                                style={{ transition: 'transform 600ms linear 0s', transform: `translateX(${progressBar3}%)` }} />
                        </div>
                    </div>
                    <div className='host-spot-footer-step'>
                        {backButtonLoading ?
                            <button className='host-spot-back-loading'>
                                <img className='host-spot-btn-load-back' src={loadingGif} alt='loading...' />
                            </button>
                            :
                            <button onClick={handleBack} className='host-spot-back-btn'>Back</button>
                        }
                        {buttonLoading ?
                            <button className='host-spot-next-loading'>
                                <img className='host-spot-btn-load-next' src={loadingGif} alt='loading...' />
                            </button>
                            :
                            <button
                                onClick={handleNext}
                                disabled={nextDisabled}
                                className={nextDisabled ? 'host-spot-next-btn-disabled' : 'host-spot-next-btn'}>
                                Next
                            </button>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default HostFooter;
