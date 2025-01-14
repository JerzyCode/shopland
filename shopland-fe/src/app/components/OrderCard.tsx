import { Card, CardContent, Typography } from "@mui/material";
import { Order } from "../models/Order";

interface OrderCardProps {
    order: Order;
    onOrderClick: (orderId: number) => void;
}

export function OrderCard({ order, onOrderClick }: OrderCardProps) {
    return (
        <Card
            onClick={() => onOrderClick(order.id)}
            sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
                minWidth: '60vw',
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 2,
                width: '100%',
                minHeight: '50px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Date: {new Date(order.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    Total Price: ${order.orderPrice.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
}
