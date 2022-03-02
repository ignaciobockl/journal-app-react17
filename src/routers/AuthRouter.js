import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
  return (
    <>
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
    </>
  )
}
