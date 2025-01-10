import { Box, Paper, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Product {
    id: number;
    name: string;
    shortDescription: string;
    price: number;
    imageUrl: string;
}

type ProductComponentProps = {
    product: Product;
};

export function ProductCard({ product }: ProductComponentProps) {
    const navigate = useNavigate();

    return (
        <Paper elevation={3}
               sx={{
                   padding: 2,
                   textAlign: 'center',
                   minHeight: 200,
                   transition: 'all 0.3s ease-in-out',
                   cursor: 'pointer',
                   '&:hover': {
                       backgroundColor: '#f5f5f5',
                       transform: 'scale(1.05)',
                       boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                   }
               }}
               onClick={() => navigate(`/product/${product.id}`)}
        >
            <Typography
                variant="h6"
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {product.name}</Typography>
            <Box
                sx={{
                    width: '100%',
                    height: '250px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    marginBottom: 2,
                    overflow: 'hidden',
                }}
            >
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                ) : (
                    <Typography variant="caption" color="textSecondary">No photo</Typography>
                )}
            </Box>
            <Typography variant="subtitle1" color="primary">
                {product.price.toFixed(2)} zł
            </Typography>
        </Paper>
    );
}