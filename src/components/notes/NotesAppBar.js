import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );
    const inputArchivo = useRef(null);

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

    return (
        <div className='notes__appbar'>
            <span>24 de Junio de 2021</span>

            <input 
                ref={ inputArchivo }
                type="file" 
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className='btn'
                    onClick={ handleUploadImg }
                >
                    Picture
                </button>

                <button 
                    className='btn'
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
            
        </div>
    )
}
