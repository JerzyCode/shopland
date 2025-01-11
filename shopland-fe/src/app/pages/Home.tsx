import {useEffect, useState} from 'react';
import {Container, Grid2, TextField, Typography} from "@mui/material";
import {ProductCard} from "../components/ProductCard.tsx";

interface Product {
    id: number;
    name: string;
    shortDescription: string;
    price: number;
    imageUrl: string;
}

export function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

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
                sx={{marginBottom: '1rem'}}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Grid2 container spacing={1}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 21).map((product) => (
                        <Grid2 size={4} key={product.id}>
                            <ProductCard product={product}/>
                        </Grid2>
                    ))
                ) : (
                    <Typography>Brak produktów do wyświetlenia.</Typography>
                )}
            </Grid2>
        </Container>
    );
}


