import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import errorMark from '../../images/error-mark.png';
import './SignupStep.css';

function SignupStep({ credential }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState(credential);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setUploading(true);

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                        setUploading(false);
                    }
                });
        }

        setUploading(false);
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <div className='credential-container signup-container-first'>
                <input
                    type="email"
                    className='credential'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    required
                />
                <div className='credential-header credential-email'></div>
                <div className='signup-info'>
                    We'll email you trip confirmations and receipts.
                </div>
            </div>
            <div className='credential-container signup-container'>
                <input
                    type="text"
                    className='credential'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className='credential-header credential-username'></div>
                <div className='signup-info'>
                    This is what other users will see you as.
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
            </div>
            <div className='credential-container signup-container'>
                <input
                    type="password"
                    className='credential'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className='credential-header credential-password'></div>
            </div>
            <div className='credential-container signup-container'>
                <input
                    type="password"
                    className='credential'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className='credential-header credential-confirm-password'></div>
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
        </form>
    );
}

export default SignupStep;
