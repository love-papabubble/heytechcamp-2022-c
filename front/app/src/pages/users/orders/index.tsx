import {Button, Container} from '@mui/material';
import axios from 'axios';
import type {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {OrderInfo} from '@/components/Orders';
import {OrderList} from '@/components/Orders/users/OrderList';
import {QRCodeReader} from "@/pages/users/orders/QRCodeReader";

const Home: NextPage = () => {
    const [orders, setOrders] = useState<OrderInfo[]>([]);
    const [isQRCameraOpen, setIsQRCameraOpen] = useState(false);

    const openQRCamera = () => {
        setIsQRCameraOpen(true);
    }

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
            <Container maxWidth="md" style={{paddingTop: "1em", paddingBottom: "10em"}}>
                <Button onClick={() => openQRCamera()}>QRコードリーダーを開く</Button>
                {isQRCameraOpen && <QRCodeReader onRead={(r) => {
                    setIsQRCameraOpen(false);
                    window.location.href = r.getText();
                }} setOpen={setIsQRCameraOpen}/>}
            </Container>
            <OrderList ordersInfo={orders}/>
        </>
    );
};

export default Home;
