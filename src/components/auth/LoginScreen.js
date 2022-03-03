import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

import { startLoginEmailPassword } from '../../actions/auth';


export const LoginScreen = () => {
  
  const dispatch = useDispatch();

  const [ formValues, handleInputChange ] = useForm({
    email: 'nachotta@gmail.com',
    password: '4203154'
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword(email, password) );
  }

  return (
    <>
        <h3
          className='auth__title'
        >
          Login
        </h3>

        <form onSubmit={ handleLogin }>

          <input
            autoComplete="off"
            className='auth__input'
            name="email"
            onChange={ handleInputChange }
            placeholder="Email"
            type="text"
            value={ email }

          />
          <input 
            className='auth__input'
            name="password"
            onChange={ handleInputChange }
            placeholder="Password"
            type="password"
            value={ password }
          />

          <button
            className='btn btn-primary btn-block'
            type="submit"
          >
            Login
          </button>

          <div className='auth__social-network'>
            <p>Login with Social Networks</p>
            <div 
              className="google-btn"
            >
              <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                  <b>Sign in with google</b>
              </p>
            </div>
          </div>

          <Link 
            className='link'
            to='/auth/register'
          >
            Create new account
          </Link>

        </form>
    </>
  )
}
