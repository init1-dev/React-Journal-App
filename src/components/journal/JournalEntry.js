import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { activeNote } from '../../actions/notes';

export const JournalEntry = ( note ) => {

    // console.log('journal entry render');

    const { id, date, title, body, url, lastSave, done } = note;
    const { active } = useSelector(state => state.notes);
    const noteDate = moment( date );
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        if( !note || note?.id === active?.id ) {
            return
        }

        dispatch( activeNote( id, { title, body, date, url, lastSave, done } ) );
    }
    
    return (
        <div 
            className='journal__entry pointer animate__animated animate__fadeIn'
            onClick={ handleEntryClick }
        >

            {
                url &&
                    <div 
                        className='journal__entry-picture'
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${ url })`
                        }}    
                    ></div>
            }
            
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    { 
                        title.length > 15
                            ?  title.substring(0, 15) + ' ...'
                            : title
                    }
                </p>

                <p className='journal__entry-content'>
                    { 
                        body.length > 110 
                            ? body.substring(0, 110) + ' ...'
                            : body
                    }
                </p>
            </div>

            <div className='journal__entry-box'>
                {
                    done &&
                        <i className='fas fa-check-circle'></i>
                }
                <div className='journal__entry-date-box'>
                    <span> { noteDate.format('dddd') } </span>
                    <h4> { noteDate.format('Do') } </h4>
                </div>
            </div>

        </div>
    )
}
