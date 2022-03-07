import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";

import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';

import { types } from "../types/types";


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${ uid }/journal/notes`).add( newNote );

        dispatch( activeNotes( docRef.id, newNote ) );

        dispatch( addNewNote( docRef.id, newNote ) );

    }
}

export const activeNotes = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, 
        ...note
    }
});

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            
            await db.doc(`${ uid }/journal/notes/${ note.id }`)
            .update( noteToFirestore );

            dispatch( refreshNote(note.id, note ) );

            Swal.fire('Saved', note.title, 'success');

        } catch (err) {
            const error = err.stack.split(':');
            const msgError = `${error[0]}: ${error[1]}`;
            Swal.fire('Error', msgError , 'error');
        }

    }
}

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
    return async ( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );
        
        Swal.close();

    }
}

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        try {

            await db.doc(`${ uid }/journal/notes/${ id }`).delete();
            
            dispatch( deleteNote(id) );
            
        } catch (error) {
            throw error;
        }
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});