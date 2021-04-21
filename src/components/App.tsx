import React, { FunctionComponent, useState } from 'react';
import AppRouter from '../routes/AppRouter';
import CookieT from '../types/CookieT';
import useCookies from '../shared/useCookies';
import Constants from '../shared/Constants';
import AuthContext from '../state/AuthContext';

/**
 * The main component contains the whole application.
 */
const App: FunctionComponent = () => {
    const cookieInstance: CookieT = useCookies();
    const [ isAuthenticated, setIsAuthenticated]  = useState(!!cookieInstance.getCookie(Constants.TOKEN_COOKIE_NAME));

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <AppRouter />
        </AuthContext.Provider>
    );
}

export default App;
