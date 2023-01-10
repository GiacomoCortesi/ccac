import React, {Fragment, useState} from "react";
import {Divider, List, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useGetCart} from "../../services/api-cart-service";
import {ICart, ICartItem} from "../../models/cart";
import CartItem from "../CartItem/CartItem";
import Loading from "../Loading/Loading";
import AppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Shipping from "../Shipping/Shipping";

export default function Cart() {
    const { data, error, isLoading } = useGetCart()

    let cartItems = data?.items?.map((cartItem: ICartItem, index:number) => {
        return (<Fragment key={index}>
                    <CartItem total={cartItem.total} product_id={cartItem.product_id} quantity={cartItem.quantity} sku={cartItem.sku}/>
                    <Divider/>
                </Fragment>)})

    const navigate = useNavigate();
    const [shippingMethod, setShippingMethod] = useState('Ritiro');

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

    const fromShippingComponent = (shippingMethod: string) => {
        setShippingMethod(shippingMethod)
        console.log("selected shipping method: ", shippingMethod)
    };

    const isEmptyCart = (cart: ICart|undefined) => {
        return cart?.items && cart?.items?.length == 0
    };

    const handleClick = () => {
        navigate('/pay', {state: {shippingMethod: shippingMethod}});
    };

    return <Fragment>
        <AppBar/>
        {isLoading && <Loading/>}
        {data && <Box sx={{marginLeft: 2, marginRight: 2}}>
            {isLoading && <Loading/>}
            {isEmptyCart(data) ?
                <Box sx={{minHeight: 225, display: "flex", justifyContent: "center", alignItems:"center"}}>
                    <Typography variant={matchesMD ? 'h6' : 'h4'}>non hai ancora messo nulla nel carrello, cosa aspetti?</Typography>
                </Box>
                :
                <List>{cartItems}</List>
            }
        <Box margin={3}>
            {
                data?.shipping_options &&
                <Shipping shippingMethod={shippingMethod}
                          shippingOptions={data.shipping_options}
                          fromShippingComponent={fromShippingComponent}
                />
            }
        <Typography marginBottom={3}>Totale: {data?.total?.value} {data?.total?.currency}</Typography>
        </Box>
            <Button disabled={isEmptyCart(data)} sx={{marginLeft: 1.75}} onClick={handleClick}>
                <Typography variant={"h5"}>Paga con Paypal</Typography>
            </Button>
        </Box>}
    </Fragment>
}
