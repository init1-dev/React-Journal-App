import React from 'react';
import { useDispatch } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';

export const SideBar = () => {

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <aside className='journal__sidebar'>

            <div className='journal__sidebar-navbar'>
                <h3>
                    <i className='far fa-moon'></i>
                    <span> In1t </span>
                </h3>

                <button 
                    className='btn'
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div className='journal__new-entry'>
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>
                    New entry
                </p>
            </div>

            <JournalEntries />
            
        </aside>
    )
}
