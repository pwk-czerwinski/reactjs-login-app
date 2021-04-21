import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Routes from './Routes';
import PublicRoute from './PublicRoute';
import LoginForm from '../components/login/LoginForm';

/**
 * Router with all routes in the whole application.
 */
const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute restricted component={LoginForm} path={Routes.Login} exact />
            <Redirect to={Routes.Login} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter
