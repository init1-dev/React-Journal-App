import moment from 'moment';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeNote, startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    /* 
        TODO:
        - Cambiar fecha de nota estática por la real con la librería Date
        - Si la nota tiene una imagen, al modificar el texto y guardar, se elimina la imagen
        - Agregar un botón para cerrar la nota y setear el active a null
    */

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );
    const inputArchivo = useRef(null);
    const noteDate = moment( active.lastSave || active.date );

    const handleUploadImg = () => {
        inputArchivo.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if( file ) {
            dispatch( startUploading( file ) );
        }
    };

    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    };

    const handleCloseNote = () => {
        dispatch( closeNote() );
    }

    return (
        <div className='notes__appbar'>
            <span className='journal__text-shadow'>Updated: { noteDate.format("L HH:mm:ss") }</span>

            <input 
                ref={ inputArchivo }
                type="file" 
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className='btn journal__text-shadow'
                    onClick={ handleUploadImg }
                >
                    Upload Img <i className='fas fa-upload'></i>
                </button>

                <button 
                    className='btn journal__text-shadow'
                    onClick={ handleSave }
                >
                    Save <i className='fas fa-save'></i>
                </button>

                <button 
                    className='btn journal__text-shadow'
                    onClick={ handleCloseNote }
                >
                    Close <i className='fas fa-times-circle'></i>
                </button>
            </div>
            
        </div>
    )
}
