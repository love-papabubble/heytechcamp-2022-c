import type {NextPage} from 'next';
import React, {useEffect, useState} from "react";
import Navigation from "../../components/Navigation";
import OrderView from "../../components/Orders/OrderView";
import {Menu} from "@/components/Menu";
import {Order} from "@/components/Orders";

const Home: NextPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/customers/orders', {method: 'GET'})
            .then(res => res.json())
            .then(datum => {
                console.log("passed");
                //sort so that the latest order is on top
                datum.sort((a: Order, b: Order) => {
                    return new Date(b.delivery_time).getTime() - new Date(a.delivery_time).getTime();
                });
                setOrders(datum);
            });
    },[])

    return (
        <>
            <Navigation/>
            <Menu/>
            <OrderView orders={orders}/>
        </>
    );
};

export default Home;
