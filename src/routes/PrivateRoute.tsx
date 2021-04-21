import React, { ReactElement, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Routes from './Routes';
import AuthContext from '../state/AuthContext';

/**
 * Private route.
 * @param props
 */
const PrivateRoute = (props: RouteProps & any): ReactElement => {
    const { isAuthenticated } = useContext(AuthContext);
    const { component: Component, ...rest } = props;

    const render = (props: RouteProps) => {
        if (!isAuthenticated) {
            return <Redirect to={Routes.Login} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
}

export default PrivateRoute;
