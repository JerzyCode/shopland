import {SetStateAction, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {CircularProgress, List, ListItem, Popover} from "@mui/material";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import {ProductCart} from "../models/ProductCart.ts";
import Box from "@mui/material/Box";
import {Cart} from "../models/Cart.ts";
import {deleteProductFromCart, getCartForUser} from "../services/CartService.ts";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";


interface ProductCartProps {
    product: ProductCart;
    onDeleteProduct: (productId: number) => void;
}

interface ShoppingCartProps {
    openSnackBar: (message: string, severity: SetStateAction<"error" | "success" | "info" | "warning">) => void;
}

function CartItem({product, onDeleteProduct}: ProductCartProps) {
    const navigate = useNavigate();


    const handleDelete = () => {
        onDeleteProduct(product.productId)
    }

    const handleProductNameClick = () => {
        navigate(`/shopland/product/${product.productId}`);
    }

    return (
        <ListItem sx={{position: 'relative', borderBottom: '1px solid #ccc'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            color: '#6a1b9a',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#3e1a69',
                                textDecoration: 'underline',
                            }
                        }}
                        onClick={handleProductNameClick}
                    >
                        {product.productName}
                    </Typography>
                    <IconButton
                        onClick={handleDelete}
                        sx={{
                            color: '#9a1b32',
                            '&:hover': {
                                color: '#3e1a69',
                            },
                        }}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Typography variant="body2" sx={{flexGrow: 1}}>
                        Quantity: {product.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{textAlign: 'right'}}>
                        Price: {(product.quantity * product.price).toFixed(2)} $
                    </Typography>
                </Box>
            </Box>
        </ListItem>
    );
}

export function ShoppingCart({openSnackBar}: ShoppingCartProps) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isOpen = Boolean(anchorEl);
    const navigate = useNavigate();


    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
        fetchCart()
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleGoToPayment = () => {
        navigate(`/shopland/payment`);
    }

    const handleDeleteProduct = async (productId: number) => {
        try {
            const response = await deleteProductFromCart(productId)
            if (response.status === 200) {
                setCart((prevCart) => {
                    if (prevCart) {
                        const updatedProducts = prevCart.products.filter(product => product.productId !== productId);
                        const updatedPrice = calculateTotalPrice(updatedProducts);
                        openSnackBar('Successfully removed product from cart.', 'success');
                        return new Cart(updatedProducts, updatedPrice);
                    } else {
                        return prevCart;
                    }
                });
            }
        } catch (err) {
            console.log(err);
            openSnackBar('An error occurred deleting product from cart :(', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    const calculateTotalPrice = (products: ProductCart[] | undefined) => {
        let total = 0;
        if (!products) {
            return 0;
        }
        products.forEach(product => {
            const price = parseFloat(product.price.toString());
            const quantity = parseFloat(product.quantity.toString());
            total += price * quantity;
        })

        return parseFloat(total.toFixed(2));
    };


    const fetchCart = async () => {
        setIsLoading(true)
        try {
            const response = await getCartForUser();
            if (response.status === 200) {
                setCart(response.body);
            }
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
                                <CartItem key={index} product={item} onDeleteProduct={handleDeleteProduct}/>
                            ))

                        ) : (
                            <Typography sx={{p: 2}}>Your cart is empty.</Typography>
                        )}
                    </List>
                )}

                <div style={{padding: "16px", borderTop: "1px solid #ccc"}}>
                    <Typography sx={{pb: 2}}
                                variant="body2">Summary: {calculateTotalPrice(cart?.products)} $</Typography>
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
