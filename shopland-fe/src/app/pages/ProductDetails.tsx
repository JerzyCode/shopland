import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, CircularProgress, Paper, Stack, Typography, ListItem} from '@mui/material';
import {OpinionCard} from '../components/OpinionCard.tsx';
import {useAuth} from "../context/AuthContext.tsx";
import {Role} from "../models/User.ts";
import {getProductDetails} from "../services/ProductService.ts";
import {getOpinionsForProduct} from "../services/OpinionService.ts";
import {addProductToCart} from "../services/CartService.ts";
import {AddOpinionPopup} from "./AddOpinionPopup.tsx";

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
    const {id} = useParams<{ id: string }>();
    const {user} = useAuth();
    const [product, setProduct] = useState<Product | null>(null);
    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [opinionsLoading, setOpinionsLoading] = useState(false);
    const [addOpinionPopupOpened, setAddOpinionPopupOpened] = useState(false);

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

    const loadOpinions = async () => {
        setOpinionsLoading(true)
        try {
            const response = await getOpinionsForProduct(Number(id))
            if (response.status === 200) {
                setOpinions(response.body)
            } else {
                setError('Unknown Error Occurred');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setOpinionsLoading(false)
        }
    }

    const addToCart = async () => {
        setLoading(true);
        try {
            const response = await addProductToCart(Number(id), 1);
            if (response.status === 200) {
                console.log('Produkt dodany do koszyka:', response.body);
                setProduct(prevProduct => {
                    if (!prevProduct || prevProduct.availableAmount <= 0) return prevProduct;

                    return {
                        ...prevProduct,
                        availableAmount: prevProduct.availableAmount - 1,
                    };
                });
            } else {
                throw new Error(response.body?.message || 'Nie udało się dodać produktu do koszyka');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            //TODO decrement available amount product
        }
    };

    const calculateAverageRating = (opinions: Opinion[]) => {
        if (opinions.length === 0) return 0;
        const totalRating = opinions.reduce((acc, opinion) => acc + opinion.value, 0);
        return (totalRating / opinions.length).toFixed(2);
    };


    const handleOpenAddOpinionPopup = () => setAddOpinionPopupOpened(true);
    const handleCloseAddOpinionPopup = () => setAddOpinionPopupOpened(false);


    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Product not found.</Typography>;
    }

    return (
        <>
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

                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            padding: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                marginTop: 2,
                                marginRight: '10px',
                            }}
                            disabled={!(user?.hasRole(Role.USER) || user?.hasRole(Role.ADMIN)) || product.availableAmount <= 0}
                            onClick={addToCart}
                        >
                            {(user?.hasRole(Role.USER) || user?.hasRole(Role.ADMIN)) ? 'Dodaj do koszyka' : 'Zaloguj się, aby dodać do koszyka'}
                        </Button>
                        {(user?.hasRole(Role.USER) || user?.hasRole(Role.ADMIN)) && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 16,
                                    width: '50px',
                                    paddingLeft: 5,
                                    paddingRight: 5
                                }}
                                onClick={handleOpenAddOpinionPopup}
                            >
                                Add opinion
                            </Button>
                        )}
                    </Box>
                </Paper>

                <Typography variant="h5">Średnia ocena: {calculateAverageRating(opinions)} / 5</Typography>

                {opinionsLoading ? (
                    <Box display="flex"
                         justifyContent="center"
                         alignItems="center"
                         sx={{width: '100%', height: 200}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5">Opinions:</Typography>
                        {opinions.length > 0 ? (
                            <Stack spacing={2}>
                                {opinions.map((opinion) => (
                                    <ListItem key={opinion.id}
                                              sx={{padding: 0, display: 'flex', flexDirection: 'column'}}>
                                        <OpinionCard
                                            opinion={opinion}
                                            usernameVisible={true}
                                            shouldDeleteBeVisible={user?.role === Role.ADMIN}
                                            shouldEditBeVisible={user?.role === Role.USER && opinion.userEmail === user?.email}
                                            onDeleteOpinion={loadOpinions}
                                        />
                                        <div style={{borderBottom: '1px solid #ccc', margin: '10px 0'}}/>
                                    </ListItem>
                                ))}
                            </Stack>
                        ) : (
                            <Typography>Brak opinii o tym produkcie.</Typography>
                        )}
                    </>
                )}


            </Box>
            <AddOpinionPopup open={addOpinionPopupOpened}
                             onClose={handleCloseAddOpinionPopup}
                             onSuccess={loadOpinions}
                             productId={Number(id)}/>
        </>

    );
}
