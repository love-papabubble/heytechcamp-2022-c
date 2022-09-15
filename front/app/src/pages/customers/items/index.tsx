import {Card, CardContent, Container, IconButton, Typography} from "@mui/material";
import type {NextPage} from 'next';
import {useEffect, useState} from "react";
import {Menu} from "../../../components/Menu";
import Navigation from "../../../components/Navigation";
import Cart from "../orders/Cart";
import {Item} from "./index";

const ItemsView: NextPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [cart, setCart] = useState<{ item: Item, quantity: number }[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/customers/items', {method: 'GET'})
            .then(res => res.json())
            .then(datum => {
                setItems(datum);
            });
    }, [])

    return (
        <>
            <Container>
                {items &&
                    items.map((item, index) => {
                        return (
                            <Card sx={{minWidth: 275}} key={index} variant={"outlined"} style={{marginBottom: "5px"}}>
                                <CardContent>
                                    <Typography sx={{fontSize: 21}} color="text.secondary" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {item.price}円
                                    </Typography>
                                    {/*<Typography sx={{mb: 1.5}} color="text.secondary">*/}
                                    {/*    受け取りステータス: {item.is_delivered ? "受け取り済み" : "未受け取り"}*/}
                                    {/*</Typography>*/}
                                    <Typography variant="body2">
                                        {item.description}
                                    </Typography>
                                    {/*    plus icon button*/}
                                    <IconButton onClick={() => {
                                        // if the item is already in the cart, increase the quantity
                                        const index = cart.findIndex((cartItem) => cartItem.item.id === item.id);
                                        if (index !== -1) {
                                            cart[index].quantity += 1;
                                            setCart([...cart]);
                                        }
                                        // if the item is not in the cart, add the item to the cart
                                        else {
                                            setCart([...cart, {item: item, quantity: 1}]);
                                        }
                                    }
                                    }>
                                        +
                                    </IconButton>
                                    {/*    minus icon button*/}
                                    <IconButton onClick={() => {
                                        // if the item is already in the cart, decrease the quantity
                                        const index = cart.findIndex((cartItem) => cartItem.item.id === item.id);
                                        if (index !== -1) {
                                            // if the quantity is 1, remove the item from the cart
                                            if (cart[index].quantity === 1) {
                                                cart.splice(index, 1);
                                                setCart([...cart]);
                                                return
                                            }
                                            cart[index].quantity -= 1;
                                            setCart([...cart]);
                                        }
                                        // if the item is not in the cart, add the item to the cart
                                        else {
                                            setCart([...cart, {item: item, quantity: 1}]);
                                        }
                                    }
                                    }>
                                        -
                                    </IconButton>
                                </CardContent>
                            </Card>
                        );
                    })}
            </Container>
            <Cart cartDetails={cart}/>
        </>
    );
};

export default ItemsView;
