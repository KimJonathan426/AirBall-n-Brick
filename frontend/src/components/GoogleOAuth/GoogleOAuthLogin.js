import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import GeneralLoginError from "../GeneralLoginError";
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
        <GeneralLoginError />
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
