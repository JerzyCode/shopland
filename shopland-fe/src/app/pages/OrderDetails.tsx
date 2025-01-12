import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../services/OrderService";
import { ProductOrderCard } from "../components/ProductOrderCard";
import { ProductOrder } from "../models/ProductOrder.ts";

interface OrderDetailsResponse {
    orderId: number;
    products: ProductOrder[];
    totalPrice: number;
}

export function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getOrderDetails(Number(id));
                if (response.status === 200) {
                    setOrderDetails(response.body);
                } else {
                    setError("Failed to load order details");
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ padding: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ padding: 4 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!orderDetails) {
        return (
            <Container sx={{ padding: 4 }}>
                <Typography>No order details available.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ padding: 4, marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Order #{orderDetails.orderId}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
                Total Price: {orderDetails.totalPrice.toFixed(2)} zł
            </Typography>

            {orderDetails.products.map((productOrder: ProductOrder) => (
                <Box key={productOrder.productId} sx={{ marginBottom: 3 }}>
                    <ProductOrderCard productOrder={productOrder} />
                </Box>
            ))}
        </Container>
    );
}
