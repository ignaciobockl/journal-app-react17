import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
          <Route
              component={ LoginScreen }
              exact path='/auth/login'
          />
          <Route
              component={ RegisterScreen }
              exact path='/auth/register'
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </div>
  )
}
