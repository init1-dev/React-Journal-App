import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';
import moment from 'moment';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body, id } = formValues;

    const noteDate = moment( note.date );

    const activeId = useRef( note.id );

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
        
    }, [ note, reset ]);

    useEffect(() => {
        
        dispatch( activeNote( formValues.id, {...formValues} ) );
        
    }, [ formValues, dispatch ]);

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className='notes__main-content animate__animated animate__fadeIn animate__faster'>

            <NotesAppBar />

            <div className='notes__content animate__animated animate__fadeIn animate__faster'>

                <input 
                    type="text" 
                    name='title'
                    placeholder='Title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    name='body'
                    placeholder='Write some text here'
                    className='notes__textarea'
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url) &&
                        <div className='notes_image'>
                            <img 
                                src={ note.url } 
                                alt="imagen" 
                            />
                        </div>
                }
                
            </div>

            <div className='notes__createDate'>
                Created: { noteDate.format('MMMM Do YYYY, HH:mm:ss') }
            </div>

            <button
                className='btn-del btn-danger'
                onClick={ handleDelete }
            >
                Delete <i className='fas fa-trash-alt'></i>
            </button>
            
        </div>
    )
}
