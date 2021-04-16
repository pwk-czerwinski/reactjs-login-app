import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from './Routes';
import LoginForm from './../LoginForm';

/**
 * Router with all routes in the whole application.
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path={Routes.START}
                    render={() => <Redirect to={Routes.LOGIN} />}
                />
                <Route path={Routes.LOGIN}>
                    <LoginForm />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter
