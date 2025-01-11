import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, List, ListItem, Typography } from "@mui/material";
import { getOrderHistory } from "../services/OrderService";
import { Order } from "../models/Order";
import { OrderCard } from "../components/OrderCard";
import {useNavigate} from "react-router-dom";

export function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getOrderHistory();
                if (response.status === 200) {
                    setOrders(response.body.orders);
                } else {
                    setError(response.body?.message || "Failed to load order history");
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const onOrderClick = (orderId: number) => {
        navigate(`/shopland/order/${orderId}`)
    }

    return (
        <Container sx={{ padding: "64px" }}>
            <Typography variant="h4" gutterBottom>
                Your Orders:
            </Typography>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" variant="h6" mt={4}>
                    {error}
                </Typography>
            )}

            {!loading && !error && orders.length === 0 && (
                <Typography variant="body1" mt={4}>You have not placed any orders yet.</Typography>
            )}

            {!loading && orders.length > 0 && (
                <List>
                    {orders.map((order) => (
                        <ListItem key={order.id} sx={{ padding: 0 }}>
                            <OrderCard
                                order={order}
                                onOrderClick={onOrderClick}
                            />
                            <div style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}
