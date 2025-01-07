import * as React from 'react';
import {useState} from 'react';
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


const pages = [
    {label: 'Reviews', href: '/shopland/reviews'},
    {label: 'Order History', href: '/shopland/order-history'},
];

export function AppHeader() {
    const navigate = useNavigate();
    const {user, logout} = useAuth();
    const isUserLoggedIn = user && user.role !== Role.GUEST;
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [loginPopupOpened, setLoginPopupOpened] = useState(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout()
        navigate('/shopland');
    }

    const handleOpenPopup = () => setLoginPopupOpened(true);
    const handleClosePopup = () => setLoginPopupOpened(false);


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

                        <Box sx={{flexGrow: 0}}>
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
                                        <MenuItem onClick={handleOpenPopup}>
                                            <Typography sx={{textAlign: 'center'}}>Login</Typography>
                                        </MenuItem>
                                        <MenuItem>
                                            <Typography sx={{textAlign: 'center'}}>Register</Typography>
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <LoginPopup open={loginPopupOpened} onClose={handleClosePopup}/>
        </>
    );
}
