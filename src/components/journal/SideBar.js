import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const SideBar = () => {

    const dispatch = useDispatch();
    const { name, image } = useSelector( state => state.auth );
    
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleAddNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className='journal__sidebar'>

            <div className='journal__sidebar-navbar'>
                <h3>
                    {
                        image 
                            ? <img className='journal__profileimg' src={ image } alt="profile" />
                            : <i className='far fa-moon'></i> 
                    }
                    <span> { name } </span>
                </h3>

                <button 
                    className='btn'
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div 
                className='journal__new-entry'
                onClick={ handleAddNewNote }
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>
                    New entry
                </p>
            </div>

            <JournalEntries />
            
        </aside>
    )
}
