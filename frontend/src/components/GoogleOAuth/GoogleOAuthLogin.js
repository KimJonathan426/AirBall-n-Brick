import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import exclamationPoint from '../../images/exclamation-point.svg';
import './GoogleOAuth.css';

const GoogleOAuthLogin = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { email } = useParams();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const loginPage = async () => {

      const response = await dispatch(sessionActions.googleLogin({ email })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        }
      );

      if (response) {
        window.opener.location.reload();
        window.opener.focus();
        window.close();
      }
    }

    loginPage();
  }, [dispatch, email]);

  if (sessionUser) return <Redirect to="/" />;

  return (
    <div>
      {errors.length > 0 ? (
        <div className='google-login-error'>
          <div className='login-error-mark'>
            <img className='exclamation-point' src={exclamationPoint} alt='exclamation point' />
          </div>
          <div className='google-login-error-inner'>
            <strong style={{ color: "#222222" }}>Let's try that again</strong>
            We encountered an issue logging you in. Please try again.
          </div>
        </div>
      )
        :
        <div className='google-login-status'>
          Signing in
          <img className='loading-ellipsis' src={loadingGif} alt='loading gif' />
        </div>
      }
    </div>
  )
}

export default GoogleOAuthLogin;
