import React, { FunctionComponent, useEffect, useState } from 'react';
import useApi from '../../api/useApi';
import Navbar from './navbar/Navbar';
import UserContext from '../../state/UserContext';
import User from '../../types/User';
import { Skeleton } from '@material-ui/core';

/**
 * This component handles getting user data and showing the navbar.
 */
const Dashboard: FunctionComponent = () => {
    const { getUser } = useApi();
    const [ user, setUser ] = useState<User>({} as User);
    const [ isPending, setIsPending ] = useState<boolean>(false);

    useEffect(() => {
        if (!isPending && !user.lastName) {
            setIsPending(true);
            getUser().then(res => {
                setUser(res?.data);
                setIsPending(false)
            });
        }

        // eslint-disable-next-line
    }, [getUser, isPending]);

    return (
        <UserContext.Provider value={user}>
            {
                isPending ? <Skeleton height={70} animation="wave" /> : <Navbar />
            }
        </UserContext.Provider>
    );
}

export default Dashboard;
