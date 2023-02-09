import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { findEmail } from "../../store/session";
import { useDispatch } from "react-redux";
import authExit from '../../images/auth-exit.svg';
import errorMark from '../../images/error-mark.png';
import './LoginForm.css'


function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emptyEmail, setEmptyEmail] = useState(true);
  const [stepOne, setStepOne] = useState(true);
  const [stepOneErrors, setStepOneErrors] = useState([]);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    if (credential === "") {
      setEmptyEmail(true);
    } else {
      setEmptyEmail(false);
    }

    setStepOneErrors([])
  }, [credential, setEmptyEmail])

  const nextStep = async (e) => {
    e.preventDefault();

    if (!credential) {
      setStepOneErrors(['Email is required.']);
      setEmptyEmail(false);
      return
    }

    const res = await dispatch(findEmail(credential)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setStepOneErrors(data.errors);
      });

    if (stepOneErrors.length) {
      return
    } else if (res && res.result) {
      setLogin(true);
    } else if (res && !res.result) {
      setSignup(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };


  return (
    <div className='login-form animate-modal-auth'>
      <header className='auth-header'>
        <button className='auth-exit' onClick={() => setShowModal(false)}>
          <img src={authExit} alt='X' />
        </button>
        <div>
          Log in or sign up
        </div>
      </header>
      <div className='auth-content'>
        <h3 className='auth-welcome'>
          Welcome to AirBallnBrick
        </h3>
        <form className='auth-form' onSubmit={handleSubmit}>
          <div className='credential-container'>
            <input
              type="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,4}|[0-9]{1,3})(\]?)$"
              className={emptyEmail ? 'credential-email' : 'credential-email invalid-email'}
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <div className='credential-header'></div>
          </div>
          {stepOneErrors.length > 0 && (
          <div className='auth-error-container'>
            <ul className='auth-error-list'>
              {stepOneErrors.map((error, idx) => (
                  <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} />{error}</li>
              ))}
            </ul>
          </div>
          )}
          <button className='auth-next' onClick={nextStep}>Continue</button>
          {/* <div className='password-container'>
            <label>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}
          {/* <button className='login-form-button' type="submit">Continue</button> */}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
