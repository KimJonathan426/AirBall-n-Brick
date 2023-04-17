import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import GeneralLoginError from "../GeneralLoginError";
import PageNotFound from "../PageNotFound";
import Loading from "../Loading";
import './GoogleOAuth.css';

const GoogleOAuthLogin = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { email } = useParams();
  const [errors, setErrors] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.name === 'airballnbrick_google_popup') {
      setIsPopup(true);
    };

    setLoading(true);

    const loginPage = async () => {

      if (isPopup) {
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
        };
      };
    };

    loginPage();
  }, [dispatch, isPopup, email]);

  if (sessionUser) return <Redirect to="/" />;

  return (
    loading ? isPopup ?
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
      :
      <PageNotFound />
      :
      <Loading />
  )
}

export default GoogleOAuthLogin;
