import React from 'react'
import { useSelector } from 'react-redux';

import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    // console.log('journal entries render');

    const { notes } = useSelector( state => state.notes );
    const sortedNotes = notes.sort( ( a, b ) => {
        return b.date - a.date;
    });

    return (
        <div className='journal__entries'>

            {
                sortedNotes.map( note => (
                    <JournalEntry
                        key={ note.id } 
                        { ...note }
                    />
                ))
            }
            
        </div>
    )
}
