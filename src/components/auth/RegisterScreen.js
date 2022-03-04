import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startRegisterWithEmailPassword } from '../../actions/auth';
import { removeError, setErrorAction } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {
  
  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    name: 'Nacho',
    email: 'nacho@gmail.com',
    password: '4203154',
    password2: '4203154'
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if ( isFormValid() ) { 
      dispatch( startRegisterWithEmailPassword( email, password, name ) );
    }
  }

  const isFormValid = () => {
    
    if ( name.trim().length === 0 ) {
      dispatch( setErrorAction('Name is required.') );
      return false;
    } else if ( !validator.isEmail( email ) ) {
      dispatch( setErrorAction('Email is not valid.') );
      return false;
    } else if ( password !== password2 ) {
      dispatch( setErrorAction('Passwords do not match.') );
      return false;
    } else if ( password.length < 6 ) {
      dispatch( setErrorAction('The password must have at least 6 characters.') );
      return false;
    }

    dispatch( removeError() );
    return true;
  }

  return (
    <>
        <h3 className='auth__title'>Register</h3>

        <form onSubmit={ handleRegister }>

          {
            msgError &&
            (
              <div className='auth__alert-error'>
                { msgError }
              </div>
            )
          }

          <input
            autoComplete="off"
            className='auth__input'
            name="name"
            onChange={ handleInputChange }
            placeholder="Name"
            type="text"
            value={ name }
          />
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
          <input 
            className='auth__input'
            name="password2"
            onChange={ handleInputChange }
            placeholder="Repeat password"
            type="password"
            value={ password2 }
          />

          <button
            className='btn btn-primary btn-block mb-5'
            type="submit"
          >
            Register
          </button>

          <Link 
            className='link'
            to='/auth/login'
          >
            Already registered?
          </Link>

        </form>
    </>
  )
}
