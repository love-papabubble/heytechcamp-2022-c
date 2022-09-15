import type {NextPage} from 'next';
import React, {useEffect, useState} from "react";
import OrderView from "../../components/Orders/OrderView";
import {Order} from "@/components/Orders";

const Home: NextPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/customers/orders', {method: 'GET'})
            .then(res => res.json())
            .then(datum => {
                //sort so that the latest order is on top
                datum.sort((a: Order, b: Order) => {
                    return new Date(b.delivery_time).getTime() - new Date(a.delivery_time).getTime();
                });
                setOrders(datum);
            });
    }, [])

    return (
        <>
            <OrderView orders={orders}/>
        </>
    );
};

export default Home;
