import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import errorMark from '../../images/error-mark.png';

function GoogleSignup() {
    const dispatch = useDispatch();
    const { email } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState("");
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [usernameErrors, setUsernameErrors] = useState([]);

    useEffect(() => {
        setUsernameErrors([])
    }, [username]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
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

        return dispatch(sessionActions.signup({ email, username }))
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
    };


    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <div className='credential-container signup-container-first'>
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

export default GoogleSignup;
