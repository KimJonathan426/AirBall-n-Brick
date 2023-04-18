import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import errorMark from '../../images/error-mark.png';
import PageNotFound from "../PageNotFound";
import Loading from "../Loading";
import './GoogleOAuth.css';

function GoogleOAuthSignup() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { ivString, token } = useParams();
    const [email, setEmail] = useState(token);
    const [username, setUsername] = useState("");
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [usernameErrors, setUsernameErrors] = useState([]);
    const [isValidPopup, setIsValidPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    // validate user came from backend api with encryption/decryption and window name
    useEffect(() => {
        const iv = CryptoJS.enc.Hex.parse(ivString);
        const key = CryptoJS.enc.Hex.parse(process.env.REACT_APP_DECRYPTION_SECRET);

        const decryptedEmail = CryptoJS.AES.decrypt(
            token,
            key,
            { iv: iv }
        ).toString(CryptoJS.enc.Utf8);

        setEmail(decryptedEmail);

        if (window.name === 'airballnbrick_google_popup') {
            setIsValidPopup(true);
        };

        setLoading(true);
    }, [ivString, token]);

    useEffect(() => {
        setUsernameErrors([]);
    }, [username]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        if (!username) {
            setUsernameErrors(['Username is required.']);
            setUploading(false);
            return;
        }

        setErrors([]);
        setEmailErrors([]);
        setUsernameErrors([]);

        const response = await dispatch(sessionActions.googleSignup({ email, username }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    const errMap = {
                        'Email': [],
                        'Username': [],
                        'Invalid': []
                    };

                    for (let err of data.errors) {
                        const words = err.split(' ');
                        if (words[0] === 'Email' || words[0] === 'Username') {
                            errMap[words[0]].push(err)
                        } else {
                            errMap['Invalid'].push(err)
                        }
                    };

                    setEmailErrors(errMap['Email'])
                    setUsernameErrors(errMap['Username'])
                    setErrors(errMap['Invalid'])
                    setUploading(false);
                }
            });

        if (response) {
            // window.opener.postMessage({ type: "SUCCESSFUL_SIGNUP", user: response.user }, "http://localhost:3000")
            window.opener.location.reload();
            window.opener.focus();
            window.close();
        }
    };


    return (
        loading ? isValidPopup ?
            <form className='google-signup-form' onSubmit={handleSubmit}>
                <header className='auth-header'>
                    Finish signing up
                </header>
                <div className='auth-content'>
                    <div className='credential-container signup-container'>
                        <input
                            type="text"
                            className={usernameErrors.length ? 'credential-invalid' : 'credential'}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className={usernameErrors.length ? 'credential-header-invalid credential-username' : 'credential-header credential-username'}></div>
                        {usernameErrors.length > 0 ?
                            <div className='auth-error-container'>
                                <ul className='auth-error-list'>
                                    {usernameErrors.map((error, idx) => (
                                        <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} alt='error exclamation mark' />{error}</li>
                                    ))}
                                </ul>
                            </div>
                            :
                            <div className='signup-info'>
                                This is what other users will see you as.
                            </div>
                        }
                    </div>
                    <div className='credential-container signup-container'>
                        <input
                            type="email"
                            className={emailErrors.length ? 'credential-invalid' : 'credential'}
                            value={email}
                            disabled
                        />
                        <div className={emailErrors.length ? 'credential-header-invalid credential-email' : 'credential-header credential-email'}></div>
                        {emailErrors.length > 0 ?
                            <div className='auth-error-container'>
                                <ul className='auth-error-list'>
                                    {emailErrors.map((error, idx) => (
                                        <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} alt='error exclamation mark' />{error}</li>
                                    ))}
                                </ul>
                            </div>
                            :
                            <div className='signup-info'>
                                We'll email you trip confirmations and receipts.
                            </div>
                        }
                        {errors.length > 0 && (
                            <div className='auth-error-container'>
                                <ul className='auth-error-list'>
                                    {errors.map((error, idx) => (
                                        <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} alt='error exclamation mark' />{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className='google-notice'>
                            This info came from Google.
                        </div>
                    </div>
                    <div className='disclosure'>
                        By selecting <strong>Agree and continue</strong>, I agree with AirBallnBrick's Terms of Service to always display good sportsmanship and have a great time.
                    </div>
                    {uploading ?
                        <button disabled className='credential-loading'>
                            <img className='credential-loading-img' src={loadingGif} alt='loading...' />
                        </button>
                        :
                        <button className='auth-next' type='submit'>Agree and continue</button>
                    }
                </div>
            </form>
            :
            <PageNotFound />
            :
            <Loading />
    );
}

export default GoogleOAuthSignup;
