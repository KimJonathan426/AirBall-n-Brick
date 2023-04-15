import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import errorMark from '../../images/error-mark.png';
import './GoogleOAuth.css';

const GoogleExistingLogin = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { email } = useParams();
    const [password, setPassword] = useState("");
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setErrors([])
    }, [password]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        if (!password) {
            setErrors(['Password is required.']);
            setUploading(false);
            return;
        }

        setErrors([]);

        const response = await dispatch(sessionActions.login({ credential: email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                    setUploading(false);
                }
            });

        if (response) {
            window.opener.location.reload();
            window.opener.focus();
            window.close();
        }
    };

    return (
        <form className='google-existing-login-form' onSubmit={handleSubmit}>
            <header className='auth-header'>
                Log in
            </header>
            <div className='auth-content'>
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
                                <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} alt='error exclamation mark' />{error}</li>
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
    );
};

export default GoogleExistingLogin;
