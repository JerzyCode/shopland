import {useState, useEffect} from 'react';
import {Container, Grid2, Paper, TextField, Typography} from "@mui/material";

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
            />
            <Grid2 container spacing={1}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid2 size={4} key={product.id}>
                            <Paper elevation={3} sx={{padding: 2, textAlign: 'center'}}>
                                <Typography variant="h6">{product.name}</Typography>
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


