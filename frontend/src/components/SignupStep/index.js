import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupStep.css';

function SignupStep({ credential }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState(credential);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            {/* <div>
          <ul className='signup-errors-container'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div> */}
            <div className='credential-container'>
                <input
                    type="text"
                    className='credential'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className='credential-header credential-email'></div>
            </div>
            <div className='credential-container'>
                <input
                    type="text"
                    className='credential'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className='credential-header credential-username'></div>
            </div>
            <div className='credential-container'>
                <input
                    type="password"
                    className='credential'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className='credential-header credential-password'></div>
            </div>
            <div className='credential-container'>
                <input
                    type="password"
                    className='credential'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className='credential-header credential-confirm-password'></div>
            </div>
            <button className='signup-form-button' type="submit">Sign Up</button>
        </form>
    );
}

export default SignupStep;
