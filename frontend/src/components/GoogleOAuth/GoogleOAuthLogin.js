import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import validator from 'validator';
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import GeneralLoginError from "../GeneralLoginError";
import PageNotFound from "../PageNotFound";
import Loading from "../Loading";
import './GoogleOAuth.css';

const GoogleOAuthLogin = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { ivString } = useParams();
  const token = useParams()['*'];
  const [email, setEmail] = useState(token);
  const [errors, setErrors] = useState([]);
  const [isValidPopup, setIsValidPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // validate user came from backend api with encryption/decryption and window name
  useEffect(() => {
    const iv = CryptoJS.enc.Hex.parse(ivString);
    const key = CryptoJS.enc.Hex.parse(process.env.REACT_APP_DECRYPTION_SECRET);

    const decryptedEmail = CryptoJS.AES.decrypt(
      token,
      key,
      {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString(CryptoJS.enc.Utf8);

    setEmail(decryptedEmail);

    if (window.name === 'airballnbrick_google_popup' && validator.isEmail(decryptedEmail)) {
      setIsValidPopup(true);
    };

    setLoading(true);

    const loginPage = async () => {
      if (isValidPopup) {
        const response = await dispatch(sessionActions.googleLogin({ email })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            };
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
  }, [dispatch, isValidPopup, email, ivString, token]);

  if (sessionUser) return <Navigate replace to="/" />;

  return (
    loading ? isValidPopup ?
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
