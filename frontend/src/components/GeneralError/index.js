import { useEffect, useState } from 'react';
import exclamation from '../../images/exclamation-point.svg';
import clearX from '../../images/clear-x-thin.svg';
import './GeneralError.css';

const GeneralError = ({ error, showError, setShowError }) => {

    const [errorClass, setErrorClass] = useState('general-error-container-standby');

    useEffect(() => {
        if (showError) {
            setErrorClass('general-error-container-on')
        }
        if (!showError && errorClass !== 'general-error-container-standby') {
            setErrorClass('general-error-container-off')
        };
    }, [showError, errorClass]);


    return (
        <div className={errorClass}>
            <div className='general-error-container-inner'>
                <div className='general-error-img-box'>
                    <div className='general-error-img-box-inner'>
                        <img className='general-error-exclamation' src={exclamation} alt='exclamation point' />
                    </div>
                </div>
                <div>
                    <div className='general-error-text-1'>
                        {error}
                    </div>
                </div>
                <div className='general-error-exit'>
                    <button className='general-error-cancel' onClick={() => setShowError(false)}>
                        <img style={{ width: '16px', height: '16px' }} src={clearX} alt='x' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GeneralError;
