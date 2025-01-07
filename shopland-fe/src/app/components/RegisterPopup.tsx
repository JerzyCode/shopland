import {FormEvent, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {registerUser} from "../services/AuthService.ts";


interface RegisterPopupProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function RegisterPopup({open, onClose, onSuccess}: RegisterPopupProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState(0);
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!isInputValid()) {
            return;
        }

        try {
            const response = await registerUser({
                email: email,
                name: name,
                surname: surname,
                password: password,
                age: age
            })
            if (response.status === 400) {
                setErrorMessage('Email is already taken :(')
            }
            if (response.status === 200) {
                onSuccess();
                handleClosePopup();
            }

        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setPassword('')
            setPasswordAgain('')
            setIsLoading(false);
        }
    };

    const isInputValid = (): boolean => {
        const emailRegex = /\S+@\S+\.\S+/;

        if (password != passwordAgain) {
            setErrorMessage("Password do not match.");
            setPassword('');
            setPasswordAgain('');
            return false;
        }

        if (email.length < 3) {
            setErrorMessage("Email must contain at least 3 characters.");
            return false;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("Email is invalid.");
            return false;
        }
        if (name.length < 3) {
            setErrorMessage("Name must contain at least 3 characters.");
            return false;
        }
        if (surname.length < 3) {
            setErrorMessage("Surname must contain at least 3 characters.");
            return false;
        }

        if (password.length < 8) {
            setErrorMessage("Password must contain at least 8 characters.");
            return false;
        }


        return true;
    }


    const handleClosePopup = () => {
        clearInputs()
        onClose();
    }

    const clearInputs = () => {
        setEmail('');
        setSurname('')
        setName('')
        setAge(0)
        setPasswordAgain('')
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
            <DialogTitle sx={{fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center'}}>Register</DialogTitle>
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
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            sx={textFieldStyles}
                        />
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            sx={textFieldStyles}
                        />
                        <TextField
                            label="Surname"
                            variant="outlined"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            fullWidth
                            required
                            sx={textFieldStyles}
                        />
                        <TextField
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : 0)}
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
                        <TextField
                            label="Repeat Password"
                            type="password"
                            variant="outlined"
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
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
                    {isLoading ? 'Registering...' : 'Register'}
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
