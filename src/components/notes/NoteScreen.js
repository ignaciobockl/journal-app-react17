import React from 'react';

import { NotesAppBar } from './NotesAppBar';


export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        
      <NotesAppBar />

      <div className='notes__content'>
        <input 
          autoComplete="off"
          className='notes__title-input'
          placeholder='Some awesome title'
          type='text'
        />

        <textarea 
          className='notes__textarea'
          placeholder='What happened today'
        ></textarea>

        <div className='notes__image'>
          <img
            alt='imagen'
            src="https://i0.wp.com/zeeoii.com/wp-content/uploads/2020/07/4K-Ultra-HD-Nature-Mountains-Wallpapers-3840X2160-22.jpg?fit=1024%2C576&ssl=1"
          />
        </div>
      </div>

    </div>
  )
}
