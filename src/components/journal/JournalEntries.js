import React from 'react'
import { useSelector } from 'react-redux';

import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    // console.log('journal entries render');

    const { notes } = useSelector( state => state.notes );
    const sortedNotes = notes.sort( ( a, b ) => {
        return b.date - a.date;
    });

    const notesPending = sortedNotes.filter( note => {
        return note.done === false;
    });

    const notesDone = sortedNotes.filter( note => {
        return note.done === true;
    });

    return (
        <div className='journal__entries'>
            <h4 className='journal__entry-category-text'>Pending:</h4>
            {
                (notesPending.length === 0)
                    ? <p className='journal__entry-category-inner-text'>{ notesPending.length } notes pending</p>
                    : notesPending
                        .map( note => (
                            <JournalEntry
                                key={ note.id } 
                                { ...note }
                            />
                        ))
            }

            {
                ( notesDone.length > 0 )
                    &&
                        <h4 className='journal__entry-category-text'>Done:</h4>
            }

            {
                notesDone
                    .map( note => (
                        <JournalEntry
                            key={ note.id } 
                            { ...note }
                        />
                    ))
            }
            
        </div>
    )
}
