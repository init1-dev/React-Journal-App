import { db } from "../firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

// react-journal

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            lastSave: '',
            done: false
        }

        const docRef = await addDoc( collection(db, `${uid}/journal/notes`), newNote );

        dispatch( activeNote( docRef.id, newNote ) );
        dispatch( addNewNote( docRef.id, newNote ) );
    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const closeNote = () => ({
    type: types.notesClose
});

export const noteDone = ( note ) => {
    return async( dispatch, getState ) => {

        note.done = !note.done;
        
        dispatch( startSaveNote( note, true ) );
    }
};

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
};

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note, done = null ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if(!note.url) {
            delete note.url
        }

        const lastSave = new Date().getTime();
        const noteToFirestore = { ...note };
        noteToFirestore.lastSave = lastSave;
        delete noteToFirestore.id;

        await updateDoc( doc(db, `${ uid }/journal/notes/${ note.id }`), noteToFirestore );
        
        dispatch( refreshNote( note.id, noteToFirestore ) );
        dispatch( activeNote( note.id, noteToFirestore ) );
        
        if( done === null ) {
            Swal.fire({ text: 'Saved', title: note.title, icon: 'success', showConfirmButton: false, timer: 1500 })
        }
    }
};

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return ( dispatch, getState ) => {
        
        const { active:activeNote } = getState().notes;

        Swal.fire({ title: 'Uploading..', text: 'Please wait..', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
        
        fileUpload( file )
            .then( fileUrl => {
                activeNote.url = fileUrl;
        
                dispatch( startSaveNote( activeNote ) );
                Swal.close();
            })
            .catch( err => {
                Swal.fire('Error', err.error.message, 'error');
            })

    }
};

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        await deleteDoc( doc( db, `${ uid }/journal/notes/${ id }` ));

        dispatch( deleteNote( id ) );
    }
};

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});