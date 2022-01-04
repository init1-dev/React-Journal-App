import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );

        })
        
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if( checking ) {
        return (
            <h1>Espere..</h1>
        )
    }
    
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}
