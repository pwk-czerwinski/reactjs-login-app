import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem} from '@material-ui/core';
import useApi from '../../../../api/useApi';
import Routes from '../../../../routes/Routes';
import AuthContext from '../../../../state/AuthContext';
import ApiT from '../../../../types/ApiT';

interface Props {
    anchorEl: HTMLElement | null;
    setAnchorEl: (anchorEl: null | HTMLElement) => void;
}

/**
 * This component contains a menu with one item - logout which allows a user logout from the application.
 * @param anchorEl
 * @param setAnchorEl
 */
const NavbarMenu: FunctionComponent<Props> = ({ anchorEl, setAnchorEl }: Props) => {
    const history = useHistory();
    const api: ApiT = useApi();
    const { setIsAuthenticated } = useContext(AuthContext);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setIsAuthenticated(false);
        api.logout();
        history.push(Routes.Login);
    }

    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem
                onClick={logout}
            >
                Logout
            </MenuItem>
        </Menu>
    );
}

export default NavbarMenu;
