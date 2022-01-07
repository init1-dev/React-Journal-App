import Swal from 'sweetalert2';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { startLoading, finishLoading } from "./ui";
import { noteLogout } from './notes';

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            })
            .catch( err => {
                // console.log(err);
                dispatch( finishLoading() );
                Swal.fire('Error', err.code, 'error');
            })
    };
};

export const startRegisterWithNameEmailPassword = ( email, password, name ) => {
    return ( dispatch ) => {

        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) => {
                await updateProfile(user, {
                    displayName: name
                })

                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( err => {
                // console.log(err);
                Swal.fire('Error', err.code, 'error');
            })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();

        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch( login(user.uid, user.displayName, user.photoURL) )
            });
    };
};

export const login = (uid, displayName, photoURL = "") => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        photoURL
    }
});

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();

        await signOut(auth);

        dispatch( logout() );
        dispatch( noteLogout() );
    }
};

export const logout = () => ({
    type: types.logout
});