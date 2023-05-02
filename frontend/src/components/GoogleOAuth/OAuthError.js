import React from 'react';
import logoText from '../../images/logo-text.png';
import errorBot from '../../images/google-bot-error.png';
import './GoogleOAuth.css';

const OAuthError = () => {

    return (
        <div className='oauth-error-container'>
            <div className='oauth-error-main'>
                <img className='oauth-logo' src={logoText} alt='AirBallnBrick logo text' />
                <div className='oauth-error-header'>
                    Authorization Error
                </div>
                <h4>
                    Error 401
                </h4>
                <h4 className='oauth-error-description'>
                    Failed to authorize Google user.
                    <br></br>
                    Please try again!
                </h4>
                <img src={errorBot} alt='google broken error robot'/>
            </div>
        </div>
    )
}

export default OAuthError;
