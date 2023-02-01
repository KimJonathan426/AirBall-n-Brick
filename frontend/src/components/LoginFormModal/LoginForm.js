import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import authExit from '../../images/auth-exit.svg'
import './LoginForm.css'


function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  console.log(errors)

  return (
    <form className='login-form animate-modal-auth' onSubmit={handleSubmit}>
      <header className='auth-header'>
        <button className='auth-exit' onClick={() => setShowModal(false)}>
          <img src={authExit} />
        </button>
        <div>
          Log in or sign up
        </div>
      </header>
      <div className='errors-container'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className='credential-container'>
        <label>
          Email
        </label>
        <input
          type="email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </div>
      <div className='password-container'>
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className='login-form-button' type="submit">Continue</button>
    </form>
  );
}

export default LoginForm;
