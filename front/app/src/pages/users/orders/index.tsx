import axios from 'axios';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { OrderInfo } from '@/components/Orders/index';
import { OrderList } from '@/components/Orders/users/OrderList';

const Home: NextPage = () => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const res = await axios.get(`http://localhost:3000/users/orders/`);
      console.log(res);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <OrderList ordersInfo={orders} />
    </>
  );
};

export default Home;
