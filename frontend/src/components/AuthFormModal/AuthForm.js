import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { findEmail } from "../../store/session";
import { useDispatch } from "react-redux";
import SignupStep from "../SignupStep";
import loadingGif from '../../images/host-court-loading.gif';
import authExit from '../../images/auth-exit.svg';
import errorMark from '../../images/error-mark.png';
import goBack from '../../images/left-arrow.svg';
import './AuthForm.css';


function AuthForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [inputEmailClass, setInputEmailClass] = useState('credential')
  const [stepOne, setStepOne] = useState(true);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'unset'
    }
  }, [])

  useEffect(() => {
    let temp = 'credential'

    if (credential !== "") {
      temp += ' invalid'
    }

    setInputEmailClass(temp)
    setErrors([])
  }, [credential, login, setInputEmailClass])

  useEffect(() => {
    setErrors([])
  }, [password])

  const nextStep = async (e) => {
    e.preventDefault();

    if (!credential) {
      setErrors(['Email is required.']);
      setInputEmailClass('credential invalid')
      return
    }

    setUploading(true);

    const res = await dispatch(findEmail(credential)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          setUploading(false);
        }
      });

    if (errors.length) {
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

  const returnStepOne = () => {
    setInputEmailClass('credential invalid')
    setPassword("")
    setStepOne(true);
    setLogin(false);
    setSignup(false);
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
    <div className='auth-form animate-modal-auth'>
      <header className='auth-header'>
        {stepOne ?
          <button className='auth-exit' onClick={() => setShowModal(false)}>
            <img src={authExit} alt='X' />
          </button>
          :
          <button className='auth-exit' onClick={returnStepOne}>
            <img src={goBack} alt='go back arrow' />
          </button>
        }
        {stepOne &&
          <div>
            Log in or sign up
          </div>
        }
        {login &&
          <div>
            Log in
          </div>
        }
        {signup &&
          <div>
            Finish signing up
          </div>
        }
      </header>
      <div className='auth-content'>
        {!signup ?
          <>
            <h3 className='auth-welcome'>
              Welcome to AirBallnBrick
            </h3>
            <form className='login-form' onSubmit={handleSubmit}>
              <div className={errors.length ? 'combined-input-invalid' : 'combined-input-main'}>
                <div className='credential-container'>
                  <input
                    type="email"
                    pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,4}|[0-9]{1,3})(\]?)$"
                    className={login ? 'combined-input' : inputEmailClass}
                    disabled={!stepOne}
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                  <div className='credential-header credential-email'></div>
                </div>
                {login && (
                  <div className='credential-container'>
                    <input
                      type="password"
                      className={errors.length ? 'password-credential-invalid' : 'password-credential'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={errors.length ? 'credential-header-invalid credential-password' : 'credential-header credential-password'}></div>
                  </div>
                )}
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
              {login &&
                <>
                  {uploading ?
                    <button disabled className='credential-loading'>
                      <img className='credential-loading-img' src={loadingGif} alt='loading...' />
                    </button>
                    :
                    <button className='auth-next' type='submit'>Continue</button>
                  }
                </>
              }
            </form>
          </>
          :
          <SignupStep credential={credential} />
        }
      </div>
    </div>
  );
}

export default AuthForm;
