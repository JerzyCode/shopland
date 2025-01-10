// @ts-ignore
import React, {useEffect, useState} from "react";
import {Box, CircularProgress, Container, List, ListItem, Typography} from "@mui/material";
import {getOpinionsForUser} from "../services/OpinionService.ts";
import {Opinion} from "../models/Opinion.ts";
import {OpinionCard} from "../components/OpinionCard.tsx";

export function OpinionsPage() {
    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOpinions = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getOpinionsForUser();
                if (response.status === 200) {
                    setOpinions(response.body);
                } else {
                    setError(response.body?.message || "Failed to load opinions");
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchOpinions();
    }, []);

    const onDeleteOpinion = (opinionId: number) => {
        setOpinions((prevOpinions) => prevOpinions.filter(opinion => opinion.id !== opinionId));
    }

    return (
        <Container sx={{
            padding: "64px",
        }}
        >

            <Typography variant="h4" gutterBottom>
                Your Opinions:
            </Typography>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress/>
                </Box>
            )}

            {error && (
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            )}

            {!loading && !error && opinions.length === 0 && (
                <Typography variant="body1">You have not added any opinions yet.</Typography>
            )}

            {!loading && opinions.length > 0 && (
                <List>
                    {opinions.map((opinion) => (
                        <ListItem key={opinion.id} sx={{padding: 0}}>
                            <OpinionCard opinion={opinion}
                                         usernameVisible={false}
                                         shouldDeleteBeVisible={true}
                                         shouldEditBeVisible={true}
                                         onDeleteOpinion={onDeleteOpinion}/>
                            <div style={{borderBottom: '1px solid #ccc', margin: '10px 0'}}/>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}
