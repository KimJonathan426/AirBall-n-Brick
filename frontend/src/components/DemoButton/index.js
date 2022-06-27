import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './DemoButton.css';

function DemoButton() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, ] = useState('Demo User');
  const [password, ] = useState('DemoPassword');


  if (sessionUser) return (
    <Redirect to="/" />
  );

  const DemoLogin = (e) => {
    return dispatch(sessionActions.login({ credential, password }))
  }

  return (
    <button onClick={DemoLogin}>Demo Login</button>
  );
}

export default DemoButton;
