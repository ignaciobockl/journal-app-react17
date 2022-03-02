import React from 'react';


export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>

        <div 
            className='journal__entry-picture'
            style={{
                backgroundSize: 'cover',
                backgroundImage: 'url(https://cdn.getyourguide.com/img/tour/5c5c257ee51ce.jpeg/98.jpg)'
            }}
        ></div>

        <div className='journal__entry-body'>
            <p className='journal__entry-title'>
                Un nuevo dia
            </p>
            <p className='journal__entry-content'>
                Est et sint eu minim labore aliquip laborum.
            </p>
        </div>

        <div className='journal__entry-date-box'>
            <span>Monday</span>
            <h4>28</h4>
        </div>

    </div>
  )
}
