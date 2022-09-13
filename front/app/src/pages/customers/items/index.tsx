import {Card, CardContent, Container, Typography} from "@mui/material";
import type {NextPage} from 'next';
import {useEffect, useState} from "react";
import {Menu} from "../../../components/Menu";
import Navigation from "../../../components/Navigation";
import {Item} from "./index";

const ItemsView: NextPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/customers/items', {method: 'GET'})
            .then(res => res.json())
            .then(datum => {
                setItems(datum);
            });
    }, [])

    return (
        <>
            <Navigation/>
            <Menu/>
            <Container fixed>
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
                                </CardContent>
                            </Card>
                        );
                    })}
            </Container>
        </>
    );
};

export default ItemsView;
