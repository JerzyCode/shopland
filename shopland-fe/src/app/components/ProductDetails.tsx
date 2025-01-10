import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Typography, CircularProgress, Paper, Grid2, Button, Stack} from '@mui/material';
import {OpinionCard} from './OpinionCard';

interface Product {
    name: string;
    description: string | null;
    availableAmount: number;
    imageUrl: string;
}

interface Opinion {
    id: number;
    productId: number;
    productName: string;
    userEmail: string;
    content: string;
    value: number;
}

interface User {
    isAuthenticated: boolean;
    role: string;
}

export function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productResponse = await fetch(`http://localhost:8080/shopland/rest/api/products/${id}`);
                if (!productResponse.ok) throw new Error('Produkt nie został znaleziony');

                const productData = await productResponse.json();
                setProduct(productData);

                const opinionResponse = await fetch(`http://localhost:8080/shopland/rest/api/opinion/products/${id}`);
                if (!opinionResponse.ok) throw new Error('Nie udało się pobrać opinii');

                const opinionData = await opinionResponse.json();
                console.log(opinionData);
                setOpinions(opinionData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDeleteOpinion = async (opinionId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/shopland/rest/api/opinion/products/${id}/${opinionId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Nie udało się usunąć opinii');
            }

            setOpinions(opinions.filter(opinion => opinion.id !== opinionId));
        } catch (err: any) {
            setError('Błąd podczas usuwania opinii');
        }
    };

    const calculateAverageRating = (opinions: Opinion[]) => {
        if (opinions.length === 0) return 0;
        const totalRating = opinions.reduce((acc, opinion) => acc + opinion.value, 0);
        return (totalRating / opinions.length).toFixed(2);
    };

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Produkt nie został znaleziony.</Typography>;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', padding: 2, gap: 3, marginTop: '3rem'}}>
            <Paper elevation={3} sx={{padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h4">{product.name}</Typography>
                {product.imageUrl && (
                    <Box
                        sx={{
                            width: '100%',
                            height: '300px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            marginBottom: 2,
                        }}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                        />
                    </Box>
                )}
                <Typography variant="subtitle1" color="textSecondary" sx={{textAlign: 'center'}}>
                    {product.description || 'Brak opisu'}
                </Typography>
                <Typography variant="h6" color="primary" sx={{marginTop: 2}}>
                    Dostępna ilość: {product.availableAmount}
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{marginTop: 2}}
                    disabled={!user?.isAuthenticated || product.availableAmount <= 0}
                >
                    {user?.isAuthenticated ? 'Dodaj do koszyka' : 'Zaloguj się, aby dodać do koszyka'}
                </Button>
            </Paper>

            <Typography variant="h5">Średnia ocena: {calculateAverageRating(opinions)} / 5</Typography>

            <Typography variant="h5">Opinie:</Typography>
            {opinions.length > 0 ? (
                <Stack spacing={2}
                       alignItems="center"
                       justifyContent="center"
                    >
                    {opinions.slice(0, 10).map((opinion) => (
                            <OpinionCard
                                opinion={opinion}
                                usernameVisible={true}
                                shouldDeleteBeVisible={user?.role === 'ADMIN'}
                                shouldEditBeVisible={false}
                                onDeleteOpinion={handleDeleteOpinion}
                            />
                    ))}
                </Stack>
            ) : (
                <Typography>Brak opinii o tym produkcie.</Typography>
            )}

            {user?.isAuthenticated && (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                    }}
                >
                    Dodaj opinię
                </Button>
            )}
        </Box>
    );
}
