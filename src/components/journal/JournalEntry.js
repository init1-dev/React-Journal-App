import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>

            <div 
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png)'
                }}    
            ></div>
            
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo día
                </p>

                <p className='journal__entry-content'>
                    Lorem ipsum bla bla bla lo que tú diga illo cabesa
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
