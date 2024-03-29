import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CryptoJS from 'crypto-js';
import validator from 'validator';
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import { ReactComponent as ErrorMark } from '../../images/error-mark.svg';
import Loading from "../Loading";
import './GoogleOAuth.css';

const GoogleExistingLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const { ivString } = useParams();
    const token = useParams()['*'];
    const [email, setEmail] = useState(token);
    const [password, setPassword] = useState("");
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState([]);
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

        if (window.name !== 'airballnbrick_google_popup' || !validator.isEmail(decryptedEmail)) {
            navigate('/oauth/error');
        };

        setLoading(true);
    }, [navigate, ivString, token]);

    useEffect(() => {
        setErrors([]);
    }, [password]);

    if (sessionUser) return <Navigate replace to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        if (!password) {
            setErrors(['Password is required.']);
            setUploading(false);
            return;
        };

        setErrors([]);

        const response = await dispatch(sessionActions.login({ credential: email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                    setUploading(false);
                };
            });

        if (response) {
            window.opener.location.reload();
            window.opener.focus();
            window.close();
        };
    };

    return (
        loading ?
            <form className='google-existing-login-form' onSubmit={handleSubmit}>
                <header className='auth-header'>
                    Welcome back
                </header>
                <div className='auth-content'>
                    <h4 className='existing-notice'>
                        The account associated with this email was registered with AirBallnBrick and requires a password...
                    </h4>
                    <div className={errors.length ? 'combined-input-invalid' : 'combined-input-main'}>
                        <div className='credential-container'>
                            <input
                                type="email"
                                className={'combined-input'}
                                value={email}
                                disabled
                            />
                            <div className='credential-header credential-email'></div>
                        </div>
                        <div className='credential-container'>
                            <input
                                type="password"
                                className={errors.length ? 'password-credential-invalid' : 'password-credential'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className={errors.length ? 'credential-header-invalid credential-password' : 'credential-header credential-password'}></div>
                        </div>
                    </div>
                    {errors.length > 0 && (
                        <div className='auth-error-container'>
                            <ul className='auth-error-list'>
                                {errors.map((error, idx) => (
                                    <li className='auth-error-item' key={idx}><ErrorMark className='exclamation-mark' />{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {uploading ?
                        <button disabled className='credential-loading'>
                            <img className='credential-loading-img' src={loadingGif} alt='loading...' />
                        </button>
                        :
                        <button className='auth-next' type='submit'>Continue</button>
                    }
                </div>
            </form>
            :
            <Loading />
    );
};

export default GoogleExistingLogin;
