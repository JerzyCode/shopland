import {FormEvent, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {addOpinionForProduct} from "../services/OpinionService.ts";

interface AddOpinionPopupProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    productId: number;
}

export function AddOpinionPopup({open, onClose, onSuccess, productId}: AddOpinionPopupProps) {
    const [content, setContent] = useState('');
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await addOpinionForProduct(productId, {content: content, score: score});

            if (response.status === 200) {
                onClose();
                onSuccess();
            } else if (response.status === 400) {
                setErrorMessage('You already added opinion for this product. You can Edit it.')
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleClosePopup = () => {
        onClose();
    }


    const handleScoreChange = (value: number) => {
        if (value > 0 && value < 6) {
            setScore(value)
        }
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
            <DialogTitle sx={{fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center'}}>Add Opinion</DialogTitle>
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
                        <div>
                            <TextField
                                label="Content"
                                variant="outlined"
                                value={content}
                                multiline
                                minRows={3}
                                maxRows={6}
                                onChange={(e) => setContent(e.target.value)}
                                fullWidth
                                inputProps={{
                                    maxLength: 500,
                                }}
                                sx={textFieldStyles}
                            />
                            <Typography variant="body2" color="white" sx={{marginTop: 1}}>
                                {content.length}/500 characters
                            </Typography>
                        </div>
                        <TextField
                            label="Score"
                            type="number"
                            variant="outlined"
                            value={score}
                            onChange={(e) => handleScoreChange(e.target.value ? parseInt(e.target.value) : 0)}
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
                    Add Opinion
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
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
};
