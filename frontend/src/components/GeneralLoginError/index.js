import exclamationPoint from '../../images/exclamation-point.svg';
import './GeneralLoginError.css';

const GeneralLoginError = () => {
    return (
        <div className='general-login-error'>
            <div className='login-error-mark'>
                <img className='exclamation-point' src={exclamationPoint} alt='exclamation point' />
            </div>
            <div className='general-login-error-inner'>
                <strong style={{ color: "#222222" }}>Let's try that again</strong>
                We encountered an issue logging you in. Please try again.
            </div>
        </div>
    );
};

export default GeneralLoginError;
