import { Box, Paper, Typography } from "@mui/material";
import {ProductOrder} from "../models/ProductOrder.ts";

interface ProductOrderProps {
    productOrder: ProductOrder;
}

export function ProductOrderCard({ productOrder }: ProductOrderProps) {
    return (
        <Paper elevation={3}
               sx={{
                   padding: 2,
                   textAlign: 'center',
                   minHeight: 250,
                   minWidth: 800,
                   transition: 'all 0.3s ease-in-out',
                   cursor: 'default',
                   '&:hover': {
                       backgroundColor: '#f5f5f5',
                       transform: 'scale(1.05)',
                       boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                   }
               }}
        >
            <Typography
                variant="h6"
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {productOrder.name}
            </Typography>
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
                {productOrder.imageUrl ? (
                    <img
                        src={productOrder.imageUrl}
                        alt={productOrder.name}
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
                {productOrder.unitPrice.toFixed(2)} $
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Purchased Quantity: {productOrder.quantity}
            </Typography>
        </Paper>
    );
}
