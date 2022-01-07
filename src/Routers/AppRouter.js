import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/loaders/loader.svg';
import { Switch, Redirect, HashRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName, user.photoURL ) );
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );

        })
        
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if( checking ) {
        return (
            <div className='journal__loader'>
                <h1>Loading..</h1>
                <Logo />
            </div>
        )
    }
    
    return (
        <HashRouter>
            <div>
                <Switch>

                    <PublicRoute 
                        path="/auth" 
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter } 
                    />
                    
                    <PrivateRoute 
                        exact path="/" 
                        isAuthenticated={ isLoggedIn }
                        component={ JournalScreen } 
                    />

                    <Redirect to="/auth/login" />
                    
                </Switch>
            </div>
        </HashRouter>
    )
}
