import { createContext } from 'react';

/**
 * This context contains data related to authentication.
 */
const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (auth: boolean) => {}
});

export default AuthContext;
