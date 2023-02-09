import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { findEmail } from "../../store/session";
import { useDispatch } from "react-redux";
import loadingGif from '../../images/host-court-loading.gif';
import authExit from '../../images/auth-exit.svg';
import errorMark from '../../images/error-mark.png';
import './LoginForm.css'


function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [emptyEmail, setEmptyEmail] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(true);
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

  useEffect(() => {
    if (password === "") {
      setEmptyPassword(true);
    } else {
      setEmptyPassword(false);
    }

    setErrors([])
  }, [password, setEmptyPassword])

  const nextStep = async (e) => {
    e.preventDefault();

    if (!credential) {
      setStepOneErrors(['Email is required.']);
      setEmptyEmail(false);
      return
    }

    setUploading(true);

    const res = await dispatch(findEmail(credential)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setStepOneErrors(data.errors);
          setUploading(false);
        }
      });

    if (stepOneErrors.length) {
      setUploading(false);
      return
    } else if (res && res.result) {
      setStepOne(false);
      setLogin(true);
      setUploading(false);
    } else if (res && !res.result) {
      setStepOne(false);
      setSignup(true);
      setUploading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          setUploading(false);
        }
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
          {stepOne && (
            <div className='credential-container'>
              <input
                type="email"
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,4}|[0-9]{1,3})(\]?)$"
                className={emptyEmail ? 'credential' : 'credential invalid'}
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
              <div className='credential-header credential-email'></div>
            </div>
          )}
          {stepOneErrors.length > 0 && (
            <div className='auth-error-container'>
              <ul className='auth-error-list'>
                {stepOneErrors.map((error, idx) => (
                  <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} />{error}</li>
                ))}
              </ul>
            </div>
          )}
          {stepOne &&
            <>
              {uploading ?
                <button disabled className='credential-loading'>
                  <img className='credential-loading-img' src={loadingGif} alt='loading...' />
                </button>
                :
                <button className='auth-next' onClick={nextStep}>Continue</button>
              }
            </>
          }
          {login && (
            <>
              <div className='credential-container'>
                <input
                  type="password"
                  className={emptyPassword ? 'credential' : 'credential invalid'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className='credential-header credential-password'></div>
              </div>
              {errors.length > 0 && (
                <div className='auth-error-container'>
                  <ul className='auth-error-list'>
                    {errors.map((error, idx) => (
                      <li className='auth-error-item' key={idx}><img className='exclamation-mark' src={errorMark} />{error}</li>
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
