import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { startLoadingNotes, startNewNote } from '../../actions/notes';

export const SideBar = () => {

    const dispatch = useDispatch();
    const { name, image, uid } = useSelector( state => state.auth );
    
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleAddNewNote = () => {
        dispatch( startNewNote() );
    }

    const handleRefreshNotes = () => {
        dispatch( startLoadingNotes( uid ) )
    }

    return (
        <aside className='journal__sidebar'>

            <div className='journal__sidebar-navbar'>
                <h3>
                    {
                        image 
                            ? <img className='journal__profileimg' src={ image } alt="profile" />
                            : <i className='journal__profileimg far fa-user'></i> 
                    }
                    <span> { name } </span>
                </h3>

                <div className='journal__button-container'>
                    <button 
                        className='btn'
                        onClick={ handleAddNewNote }
                    >
                        <i className='fas fa-plus'></i>
                    </button>
                    
                    <button 
                        className='btn'
                        onClick={ handleRefreshNotes }
                    >
                        <i className='fas fa-redo-alt'></i> 
                    </button>

                    <button 
                        className='btn'
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </div>

            </div>

            <JournalEntries />
            
        </aside>
    )
}
