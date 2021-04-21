import React, { FunctionComponent, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Skeleton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import useNavbarStyles from '../../../styles/dashboard/navbar/navbarClasses';
import UserContext from '../../../state/UserContext';
import NavbarMenu from './menu/NavbarMenu';

/**
 * This component contains a navbar with information about the currently logged user.
 * It also has an avatar that is clickable. After clicking it menu is shown.
 */
const Navbar: FunctionComponent = () => {
    const classes = useNavbarStyles();
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Navbar
                    </Typography>
                    <Typography variant="subtitle2" className={classes.intro}>
                        <UserContext.Consumer>
                            { (user) => user.firstName && user.lastName ?
                                `Welcome ${user.firstName} ${user.lastName}` :
                                <Skeleton animation="wave" width={120} />
                            }
                        </UserContext.Consumer>
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <NavbarMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
