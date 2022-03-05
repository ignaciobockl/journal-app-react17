import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { firebase } from '../firebase/firebase-config';

import { login } from '../actions/auth';

import { JournalScreen } from '../components/journal/JournalScreen';


export const AppRouter = () => {
  
  const dispatch = useDispatch();

  const [ checking, setChecking ] = useState( true );
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged( (user) => {
      
      if ( user?.uid ) {
        dispatch( login( user.uid, user.displayName ) );
        setIsLoggedIn( true );
      } else {
        setIsLoggedIn( false );
      }

      setChecking( false );

    });

  }, [ dispatch, setChecking, setIsLoggedIn ] );

  if ( checking ) {
    return (
      <h1>Wait...</h1>
    )
  }
  

  return (
    <Router>
        <div>
            <Switch>

                <PublicRoute 
                    component={ AuthRouter }
                    isAutenticated={ isLoggedIn }
                    path='/auth'
                />

                <PrivateRoute 
                    component={ JournalScreen }
                    exact path='/'
                    isAutenticated={ isLoggedIn }
                />

                <Redirect to='/auth/login' />

            </Switch>
        </div>
    </Router>
  )
}
