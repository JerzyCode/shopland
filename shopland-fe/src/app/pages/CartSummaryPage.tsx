import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {Cart} from "../models/Cart.ts";
import {acceptCart, getCartForUser} from "../services/CartService.ts";
import {ProductCart} from "../models/ProductCart.ts";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export function CartSummaryPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState<Cart | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true);
            try {
                const response = await getCartForUser();
                if (response.status === 200) {
                    setCart(response.body);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmPayment = async () => {
        setIsLoading(true);
        try {
            const response = await acceptCart();
            if (response.status === 200) {
                setCart(response.body);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            handleCloseDialog();
            navigate(`/shopland/order-history`);

        }
    };

    const calculateTotalPrice = (products: ProductCart[]) => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };


    return (
        <Container sx={{padding: "64px"}}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: 300, height: 200}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" sx={{marginBottom: "24px", fontWeight: "bold"}}>
                        Your Cart Summary:
                    </Typography>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            maxHeight: 600,
                            overflowY: "auto",
                            '&::-webkit-scrollbar': {width: '8px'},
                            '&::-webkit-scrollbar-thumb': {backgroundColor: '#6a1b9a', borderRadius: '10px'},
                            '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#555'},
                            '&::-webkit-scrollbar-track': {backgroundColor: '#f1f1f1', borderRadius: '10px'},
                        }}
                    >
                        {(cart && cart.products.length > 0) ? (
                            cart.products.map((item, index) => (
                                <Card key={index} sx={{display: 'flex', marginBottom: '16px'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 100,
                                            height: 75,
                                            objectFit: "contain",
                                            display: "block",
                                            margin: "auto",
                                        }}
                                        image={item.imageUrl || "https://via.placeholder.com/100x75?text=No+Image"}
                                        alt={item.productName || "Placeholder Image"}
                                    />
                                    <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: '6px'}}>
                                                {item.productName}
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                gap: '20px'
                                            }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Quantity: {item.quantity}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Price: ${item.price.toFixed(2)}
                                                </Typography>
                                                <Typography variant="body2" color="text.primary"
                                                            sx={{fontWeight: 'bold'}}>
                                                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Card>
                            ))
                        ) : (
                            <Typography sx={{p: 2}}>Your cart is empty.</Typography>
                        )}
                    </List>
                    {cart && cart.products.length > 0 && (
                        <Typography variant="h5" sx={{marginTop: "24px", fontWeight: "bold"}}>
                            Total Price: ${calculateTotalPrice(cart.products)}
                        </Typography>
                    )}
                </>
            )}

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Are you sure you want to proceed with the payment?</DialogTitle>
                <DialogContent>
                    {/* Możesz dodać dodatkowy tekst lub informacje tutaj */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmPayment} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Button
                variant="contained"
                color="primary"
                disabled={(isLoading || !cart?.products || 0 >= cart?.products.length)}
                fullWidth
                sx={{
                    marginTop: '15px',
                    backgroundColor: "#6a1b9a"
                }}
                onClick={handleOpenDialog}
            >
                Pay Now!
            </Button>
        </Container>
    );
}
