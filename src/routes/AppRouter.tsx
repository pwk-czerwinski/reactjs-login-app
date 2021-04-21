import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Routes from './Routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginForm from '../components/login/LoginForm';
import Dashboard from '../components/dashboard/Dashboard';

/**
 * Router with all routes in the whole application.
 */
const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute restricted component={LoginForm} path={Routes.Login} exact />
            <PrivateRoute component={Dashboard} path={Routes.Dashboard} exact />
            <Redirect to={Routes.Login} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter
