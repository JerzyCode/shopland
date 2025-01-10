import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';

interface Product {
    name: string;
    description: string | null;
    availableAmount: number;
    imageUrl: string;
}

interface Opinion {
    id: number;
    content: string;
    rating: number;
}

export function ProductDetails() {
    const { id } = useParams<{ id: string }>(); // Pobieramy id z URL
    const [product, setProduct] = useState<Product | null>(null);
    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                setOpinions(opinionData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Produkt nie został znaleziony.</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
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
                <Typography variant="subtitle1" color="textSecondary">
                    {product.description ? product.description : 'Brak opisu'}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    Dostępna ilość: {product.availableAmount}
                </Typography>
            </Paper>

            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h5">Opinie:</Typography>
                {opinions.length > 0 ? (
                    <Grid container spacing={2}>
                        {opinions.map((opinion) => (
                            <Grid item xs={12} key={opinion.id}>
                                <Paper sx={{ padding: 2 }}>
                                    <Typography variant="h6">Ocena: {opinion.rating} / 5</Typography>
                                    <Typography variant="body1">{opinion.content}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>Brak opinii o tym produkcie.</Typography>
                )}
            </Box>
        </Box>
    );
}

