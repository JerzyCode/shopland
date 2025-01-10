import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {CircularProgress, List, ListItem, Popover} from "@mui/material";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import {ProductCart} from "../models/ProductCart.ts";
import Box from "@mui/material/Box";
import {Cart} from "../models/Cart.ts";
import {getCartForUser} from "../services/CartService.ts";


interface ProductCartProps {
    product: ProductCart;
}

function CartItem({product}: ProductCartProps) {

    return <ListItem>
        <Box>
            <Typography variant="subtitle1" fontWeight="bold">
                {product.productName}
            </Typography>
            <div style={{
                display: "flex", gap: 10,
                justifyContent: 'space-between',
                width: '250px',
                borderBottom: "1px solid #ccc"
            }}>
                <Typography variant="body2">Price: {product.price} $</Typography>
                <Typography variant="body2">Quantity: {product.quantity}</Typography>
            </div>
        </Box>
    </ListItem>
}

export function ShoppingCart() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isOpen = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        fetchCart()
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleGoToPayment = () => {
        console.log('Go To Payment')
    }

    const fetchCart = async () => {
        setIsLoading(true)
        try {
            const response = await getCartForUser();
            setCart(response.body);
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div>
            <IconButton onClick={handleOpen}>
                <ShoppingCartIcon sx={{color: "white"}}/>
            </IconButton>

            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div style={{padding: "5px", borderBottom: "1px solid #ccc"}}>
                    <Typography variant="h6" sx={{p: 1}}>
                        Your Cart:
                    </Typography>
                </div>


                {isLoading ? (
                    <Box display="flex"
                         justifyContent="center"
                         alignItems="center"
                         sx={{width: 300, height: 200}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <List sx={{
                        width: 300,
                        maxHeight: 400,
                        overflowY: "auto",
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#6a1b9a',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#f1f1f1',
                            borderRadius: '10px',
                        },
                    }}>
                        {(cart && cart?.products.length > 0) ? (
                            cart?.products.map((item, index) => (
                                <CartItem key={index} product={item}/>
                            ))

                        ) : (
                            <Typography sx={{p: 2}}>Your cart is empty.</Typography>
                        )}
                    </List>
                )}

                <div style={{padding: "16px", borderTop: "1px solid #ccc"}}>
                    <Typography sx={{pb: 2}} variant="body2">Summary: {cart?.totalPrice} $</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        fullWidth
                        sx={{
                            backgroundColor: "#6a1b9a"
                        }}
                        onClick={handleGoToPayment}
                    >
                        Go To Payment
                    </Button>
                </div>
            </Popover>
        </div>
    );
}
