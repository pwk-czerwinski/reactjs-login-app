import React, { ReactElement, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Routes from './Routes';
import AuthContext from '../state/AuthContext';

interface Props {
    restricted?: boolean;
}

/**
 * Public route.
 * @param props
 */
const PublicRoute = (props: Props & RouteProps & any): ReactElement => {
    const { isAuthenticated } = useContext(AuthContext);
    const { component: Component, restricted = false, ...rest } = props;

    const render = (props: JSX.IntrinsicAttributes) => {
        if (isAuthenticated && restricted) {
            return <Redirect to={Routes.Dashboard} />;
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
}

export default PublicRoute;
