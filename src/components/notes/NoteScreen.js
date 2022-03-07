import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeNotes } from '../../actions/notes';

import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar';


export const NoteScreen = () => {
  
  const dispatch = useDispatch();

  const { active: note } = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( note );
  const { body, title } = formValues;
  
  const activeId = useRef( note.id );

  useEffect(() => {

    if ( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id;
    }

  }, [note, reset]);
  
  useEffect(() => {
    
      dispatch( activeNotes( formValues.id, { ...formValues } ) )

  }, [ formValues, dispatch ]);
  

  return (
    <div className='notes__main-content'>
        
      <NotesAppBar />

      <div className='notes__content'>
        <input 
          autoComplete="off"
          className='notes__title-input'
          name='title'
          placeholder='Some awesome title'
          type='text'
          value={ title }
          onChange={ handleInputChange }
        />

        <textarea 
          className='notes__textarea'
          name='body'
          placeholder='What happened today'
          value={ body }
          onChange={ handleInputChange }
        ></textarea>

        {
          ( note.url ) 
          && (
            <div className='notes__image'>
              <img
                alt='imagen'
                src={ note.url }
              />
            </div>
          ) 
        }
      </div>

    </div>
  )
}
