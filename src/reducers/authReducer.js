import { types } from "../types/types";

/* 
    {
        uid: 'jdskadkas1312321',
        name: 'In1t'
    }
*/

export const authReducer = ( state = {}, action ) => {
    
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                image: action.payload.photoURL
            }

        case types.logout:
            return { }
    
        default:
            return state;
    }

}