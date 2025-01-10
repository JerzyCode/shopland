import * as React from 'react';
import {SetStateAction, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useAuth} from "../context/AuthContext.tsx";
import {Role} from "../models/User.ts";
import {useNavigate} from 'react-router-dom';
import {LoginPopup} from "./LoginPopup.tsx";
import {RegisterPopup} from "./RegisterPopup.tsx";
import {Alert, Snackbar} from "@mui/material";
import {ShoppingCart} from "./ShoppingCart.tsx";


const pages = [
    {label: 'My Opinions', href: '/shopland/opinions'},
    {label: 'Order History', href: '/shopland/order-history'},
];

export function AppHeader() {
    const navigate = useNavigate();
    const {user, logout} = useAuth();
    const isUserLoggedIn = user && user.role !== Role.GUEST;
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [loginPopupOpened, setLoginPopupOpened] = useState(false);
    const [registerPopupOpened, setRegisterPopupOpened] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout()
        navigate('/shopland');
        setSnackbarMessage('You successfully logged out!!');
        setSeverity('success');
        setOpenSnackbar(true);
    }

    const handleOpenLoginPopup = () => setLoginPopupOpened(true);
    const handleCloseLoginPopup = () => setLoginPopupOpened(false);

    const handleOpenRegisterPopup = () => setRegisterPopupOpened(true);
    const handleCloseRegisterPopup = () => setRegisterPopupOpened(false);


    const onRegisterSuccess = () => {
        handleOpenLoginPopup();
        setSnackbarMessage('You are successfully registered!!');
        setSeverity('success');
        setOpenSnackbar(true);
    }

    const onLoginSuccess = () => {
        setSnackbarMessage('You are successfully logged in!!');
        setSeverity('success');
        setOpenSnackbar(true);
    }

    const openSnackBar = (message: string, severity: SetStateAction<"error" | "success" | "info" | "warning">) => {
        setSnackbarMessage(message);
        setSeverity(severity);
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <AppBar sx={{backgroundColor: '#6a1b9a', color: '#ffffff'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                            <AdbIcon sx={{mr: 1}}/>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/shopland"
                                sx={{
                                    mr: 4,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Shopland
                            </Typography>

                            {isUserLoggedIn ? (
                                pages.map((page) => (
                                    <Button
                                        key={page.label}
                                        href={page.href}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page.label}
                                    </Button>
                                ))
                            ) : null}

                        </Box>

                        <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center'}}>
                            {isUserLoggedIn && (
                                <ShoppingCart openSnackBar={openSnackBar}/>
                            )}

                            {isUserLoggedIn && (
                                <Typography
                                    sx={{
                                        ml: 2,
                                        mr: 2,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    {user?.name}
                                </Typography>
                            )}
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {isUserLoggedIn ? (
                                    <MenuItem onClick={handleLogout}>
                                        <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                                    </MenuItem>
                                ) : (
                                    <>
                                        <MenuItem onClick={handleOpenLoginPopup}>
                                            <Typography sx={{textAlign: 'center'}}>Login</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleOpenRegisterPopup}>
                                            <Typography sx={{textAlign: 'center'}}>Register</Typography>
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginPopup open={loginPopupOpened} onClose={handleCloseLoginPopup} onSuccess={onLoginSuccess}/>
            <RegisterPopup open={registerPopupOpened} onClose={handleCloseRegisterPopup} onSuccess={onRegisterSuccess}/>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={8000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={severity}
                    sx={{width: '100%'}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
