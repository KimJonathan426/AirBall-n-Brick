import { useEffect, useState } from 'react';
import loadingGif from '../../images/host-court-loading.gif';
import './HostSpot.css';

const HostFooter = ({ step, setStep, setTransitionClass }) => {

    const [progressBar1, setProgressBar1] = useState('0');
    const [progressBar2, setProgressBar2] = useState('0');
    const [progressBar3, setProgressBar3] = useState('0');
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleBack = () => {
        setTransitionClass('host-spot-container-transition');
        setTimeout(() => {
            setStep(step - 1);
        }, 600);
    };

    const handleNext = () => {
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
                        <button onClick={handleBack} className='host-spot-back-btn'>Back</button>
                        {!buttonLoading ?
                            <button className='host-spot-next-loading'>
                                <img className='host-spot-btn-load-next' src={loadingGif} alt='loading...' />
                            </button>
                            :
                            <button onClick={handleNext} className='host-spot-next-btn'>Next</button>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default HostFooter;
