import {FormEvent, useState} from "react";
import {loginUser} from "../services/AuthService.ts";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAuth} from "../context/AuthContext.tsx";

interface LoginPopupProps {
    open: boolean;
    onClose: () => void;
}

export function LoginPopup({open, onClose}: LoginPopupProps) {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await loginUser({email, password});

            if (response.status === 200) {
                login(response.body);
                onClose();
                clearInputs()
                navigate('/shopland');
            } else if (response.status === 403) {
                setErrorMessage('Invalid email or password. Please try again.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setPassword('')
            setIsLoading(false);
        }
    };


    const handleClosePopup = () => {
        clearInputs()
        onClose();
    }

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }


    return (
        <Dialog
            open={open}
            onClose={handleClosePopup}
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: '#3f434b',
                    color: '#ffffff',
                    borderRadius: 10,
                    padding: 3,
                    width: 500,
                },
            }}
        >
            <DialogTitle sx={{fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center'}}>Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2}}>
                        {errorMessage && (
                            <Typography
                                sx={{
                                    color: '#ff5252',
                                    fontSize: '0.9rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        )}
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            sx={textFieldStyles}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            sx={textFieldStyles}
                        />

                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClosePopup}
                    sx={{
                        backgroundColor: '#6a1b9a',
                        color: '#ffffff',
                        fontSize: '1rem',
                        padding: '6px 15px',
                        borderRadius: 4,
                        '&:hover': {
                            backgroundColor: '#9c4dcc',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    sx={{
                        backgroundColor: isLoading ? '#9c4dcc' : '#6a1b9a',
                        color: '#ffffff',
                        fontSize: '1rem',
                        padding: '6px 15px',
                        borderRadius: 4,
                        '&:hover': {
                            backgroundColor: '#9c4dcc',
                        },
                    }}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#9c4dcc',
        },
        '&:hover fieldset': {
            borderColor: '#9c4dcc',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#9c4dcc',
        },
        '& input': {
            color: '#ffffff',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#ffffff',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#9c4dcc',
    }
};
