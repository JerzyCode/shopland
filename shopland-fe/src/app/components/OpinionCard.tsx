import {Opinion} from "../models/Opinion.ts";
import {Card, CardContent, CircularProgress, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import {deleteOpinion, updateOpinion} from "../services/OpinionService.ts";
// @ts-ignore
import React, {useState} from "react";


interface OpinionCardProps {
    opinion: Opinion;
    usernameVisible: boolean;
    shouldDeleteBeVisible: boolean;
    shouldEditBeVisible: boolean;
    onDeleteOpinion: (opinion: number) => void;
}


export function OpinionCard({
                                opinion,
                                usernameVisible,
                                shouldDeleteBeVisible,
                                shouldEditBeVisible,
                                onDeleteOpinion
                            }: OpinionCardProps) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editedContent, setEditedContent] = useState(opinion.content);
    const [editedValue, setEditedValue] = useState(opinion.value);


    const handleProductNameClick = () => {
        navigate(`/shopland/product/${opinion.productId}`);
        console.log(`Navigating to /product/${opinion.productId}`);
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await deleteOpinion(opinion.id);
            if (response.status == 200) {
                onDeleteOpinion(opinion.id)
            }
        } catch (error) {
            console.error("Cannot delete opinion", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        setIsEditing(false);
        setLoading(true);
        try {
            await updateOpinion(opinion.id, {content: editedContent, score: editedValue})
        } catch (error) {
            console.error("Cannot delete opinion", error);
        } finally {
            setLoading(false);
        }
    };

    const handleContentChange = (event: any) => {
        setEditedContent(event.target.value);
    };

    const handleValueChange = (event: any) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0 && value <= 5) {
            setEditedValue(value);
        }
    };

    const editButtonRight = shouldDeleteBeVisible ? 40 : 8


    return (
        <Card
            sx={{
                minWidth: '60vw',
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 2,
                width: '100%',
                minHeight: '50px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent>
                {shouldEditBeVisible &&
                    <>
                        {!isEditing ?
                            <IconButton
                                onClick={handleEdit}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: editButtonRight,
                                    color: '#6a1b9a',
                                    '&:hover': {
                                        color: '#3e1a69',
                                    },
                                }}
                            >
                                <EditIcon/>
                            </IconButton>
                            :
                            <IconButton
                                onClick={handleSave}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: editButtonRight,
                                    color: '#83e316',
                                    '&:hover': {
                                        color: '#3e1a69',
                                    },
                                }}
                            >
                                <EditIcon/>
                            </IconButton>
                        }
                    </>

                }

                {shouldDeleteBeVisible &&
                    <IconButton
                        onClick={handleDelete}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: '#9a1b32',
                            '&:hover': {
                                color: '#3e1a69',
                            },
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                }

                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        color: '#6a1b9a',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#3e1a69',
                            textDecoration: 'underline',
                        }
                    }}
                    onClick={handleProductNameClick}
                >
                    {opinion.productName}
                </Typography>

                {usernameVisible &&
                    <Typography variant="body2" color="textSecondary">
                        User: {opinion.userEmail}
                    </Typography>
                }

                {isEditing ? (
                    <TextField
                        fullWidth
                        multiline
                        value={editedContent}
                        onChange={handleContentChange}
                        sx={{marginBottom: 2}}
                    />
                ) : (
                    <Typography variant="body1" mt={1}>
                        {editedContent}
                    </Typography>
                )}

                {isEditing ? (
                    <TextField
                        fullWidth
                        type="number"
                        value={editedValue}
                        onChange={handleValueChange}
                        sx={{marginBottom: 2}}
                    />
                ) : (
                    <Typography variant="subtitle2" mt={2}>
                        Value: {editedValue} / 5
                    </Typography>
                )}

                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )}
            </CardContent>
        </Card>
    )
        ;
}
