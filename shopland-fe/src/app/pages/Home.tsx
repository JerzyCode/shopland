import {useState, useEffect} from 'react';
import {Box, Container, Grid2, Paper, TextField, Typography} from "@mui/material";

interface Product {
    id: number;
    name: string;
    shortDescription: string;
    price: number;
}

export function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    async function fetchProducts() {
        const response = await fetch('http://localhost:8080/shopland/rest/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Produkty:', data);
        setProducts(data);
    }
    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <Container maxWidth="lg" sx={{padding: 2, minHeight: '100vh', minWidth: '60vw', marginTop: '2rem'}}>
            <TextField
                label="Wpisz coś"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '1rem' }}
            />
            <Grid2 container spacing={1}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid2 size={4} key={product.id}>
                            <Paper elevation={3} sx={{padding: 2, textAlign: 'center', minHeight: 200}}>
                                <Typography variant="h6">{product.name}</Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '80%',
                                        backgroundColor: '#f0f0f0', // Kolor tła dla miejsca na zdjęcie
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '4px',
                                        marginBottom: 2,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/*{product.image ? (*/}
                                    {/*    <img*/}
                                    {/*        src={product.image} // Link do zdjęcia*/}
                                    {/*        alt={product.name}*/}
                                    {/*        style={{*/}
                                    {/*            maxWidth: '100%',*/}
                                    {/*            maxHeight: '100%',*/}
                                    {/*            objectFit: 'cover',*/}
                                    {/*        }}*/}
                                    {/*    />*/}
                                    {/*) : (*/}
                                    {/*    <Typography variant="caption" color="textSecondary">No photo</Typography>*/}
                                    {/*)}*/}
                                    <img
                                        src="https://media.istockphoto.com/id/471212116/pl/zdj%C4%99cie/mops-gog.jpg?s=1024x1024&w=is&k=20&c=9o9ke6JIjAtxhg22ESuOtw0XRB-fP3fw4_RwUXDgRxk=" // Link do zdjęcia pieska
                                        alt="Dog"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Typography variant="body2">{product.shortDescription}</Typography>
                                <Typography variant="subtitle1" color="primary">
                                    {product.price.toFixed(2)} zł
                                </Typography>
                            </Paper>
                        </Grid2>
                    ))
                ) : (
                    <Typography>Brak produktów do wyświetlenia.</Typography>
                )}
            </Grid2>
        </Container>
    );
}


