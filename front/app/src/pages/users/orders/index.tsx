import {Container} from '@mui/material';
import axios from 'axios';
import type {NextPage} from 'next';
import Link from "next/link";
import React, {useEffect, useState} from 'react';
import {OrderInfo} from '@/components/Orders';
import {OrderList} from '@/components/Orders/users/OrderList';
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const [orders, setOrders] = useState<OrderInfo[]>([]);

    useEffect(() => {
        getOrders();
    }, []);

    //function to store orders in the localstorage
    const storeOrders = (orders: OrderInfo[]) => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    async function getOrders() {
        try {
            const res = await axios.get(`http://localhost:3000/users/orders/`);
            //if backend access failed, get orders from localstorage
            if (res.status !== 200) {
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                setOrders(orders);
                return;
            }
            console.log(res);
            storeOrders(res.data);
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <OrderList ordersInfo={orders}/>
            <Container maxWidth="md" style={{paddingTop: "1em", paddingBottom: "10em"}}>
                <Link href={"/users/orders/qr-code-reader"}>QRコードを読み取る</Link>
            </Container>
        </>
    );
};

export default Home;
