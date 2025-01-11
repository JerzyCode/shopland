import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, CircularProgress, Paper, Stack, Typography, ListItem} from '@mui/material';
import {OpinionCard} from '../components/OpinionCard.tsx';
import {useAuth} from "../context/AuthContext.tsx";
import {Role} from "../models/User.ts";
import {getProductDetails} from "../services/ProductService.ts";
import {getOpinionsForProduct} from "../services/OpinionService.ts";
import {addProductToCart} from "../services/CartService.ts";

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

export function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [product, setProduct] = useState<Product | null>(null);
    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProduct();
        fetchOpinions();
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await getProductDetails(Number(id));
            if (response.status === 200) {
                setProduct(response.body);
            } else {
                throw new Error(response.body?.message || 'Nie udało się pobrać danych produktu');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchOpinions = async () => {
        setLoading(true);
        try {
            const response = await getOpinionsForProduct(Number(id));
            if (response.status === 200) {
                setOpinions(response.body);
            } else {
                throw new Error(response.body?.message || 'Nie udało się pobrać opinii');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        setLoading(true);
        try {
            const response = await addProductToCart(Number(id), 1);
            if (response.status === 200) {
                console.log('Produkt dodany do koszyka:', response.body);
            } else {
                throw new Error(response.body?.message || 'Nie udało się dodać produktu do koszyka');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOpinion = async (opinionId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/shopland/rest/api/opinion/products/${id}/${opinionId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Nie udało się usunąć opinii');
            }

            setOpinions(prevOpinions => prevOpinions.filter(opinion => opinion.id !== opinionId));
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
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Product not found.</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 3, marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </Box>
                )}
                <Typography variant="subtitle1" color="textSecondary" sx={{ textAlign: 'center' }}>
                    {product.description || 'Brak opisu'}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    Dostępna ilość: {product.availableAmount}
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    disabled={!(user?.hasRole(Role.USER) || user?.hasRole(Role.ADMIN)) || product.availableAmount <= 0}
                    onClick={addToCart}
                >
                    {(user?.hasRole(Role.USER) || user?.hasRole(Role.ADMIN)) ? 'Dodaj do koszyka' : 'Zaloguj się, aby dodać do koszyka'}
                </Button>
            </Paper>

            <Typography variant="h5">Średnia ocena: {calculateAverageRating(opinions)} / 5</Typography>

            <Typography variant="h5">Opinie:</Typography>
            {opinions.length > 0 ? (
                <Stack spacing={2}>
                    {opinions.map((opinion) => (
                        <ListItem key={opinion.id} sx={{padding: 0, display: 'flex', flexDirection: 'column'}}>
                            <OpinionCard
                                opinion={opinion}
                                usernameVisible={false}
                                shouldDeleteBeVisible={user?.role === Role.ADMIN}
                                shouldEditBeVisible={user?.role === Role.ADMIN}
                                onDeleteOpinion={handleDeleteOpinion}
                            />
                            <div style={{borderBottom: '1px solid #ccc', margin: '10px 0'}}/>
                        </ListItem>
                    ))}
                </Stack>
            ) : (
                <Typography>Brak opinii o tym produkcie.</Typography>
            )}

            {(user?.hasRole(Role.ADMIN) || user?.hasRole(Role.ADMIN)) && (
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
