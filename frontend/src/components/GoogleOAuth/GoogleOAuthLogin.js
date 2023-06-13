import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import validator from 'validator';
import * as sessionActions from "../../store/session";
import loadingGif from '../../images/host-court-loading.gif';
import GeneralLoginError from "../GeneralLoginError";
import Loading from "../Loading";
import './GoogleOAuth.css';

const GoogleOAuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const { ivString } = useParams();
  const token = useParams()['*'];
  const [email, setEmail] = useState(null);
  const [errors, setErrors] = useState([]);
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

    if (window.name !== 'airballnbrick_google_popup' || !validator.isEmail(decryptedEmail)) {
      navigate('/oauth/error');
    };

    setLoading(true);

  }, [navigate, ivString, token]);

  useEffect(() => {
    const loginPage = async () => {
      if (email) {
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
      }
    };

    loginPage();
  }, [dispatch, email, loading])

  if (sessionUser) return <Navigate replace to="/" />;


  return (
    loading ?
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
      <Loading />
  )
}

export default GoogleOAuthLogin;
