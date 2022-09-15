import axios from 'axios';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { Menu } from '@/components/Menu';
import { ItemList } from '@/components/OrderDetails/ItemList';
import { OrderDisplay } from '@/components/OrderDetails/OrderDisplay';

import { OrderDetail } from '@/components/OrderDetails/index';
import { Order } from '@/components/Orders/index';

const OrderDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const QRCodeURL = `http://localhost:8000/users/orders/${id}`;
  const [order, setOrder] = useState<Order>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    getOrderDetail();
  }, [id]);

  async function getOrderDetail() {
    try {
      const res = await axios.get(
        `http://localhost:3000/customers/orders/${id}`
      );
      console.log(res);
      setOrder(res.data);
      setOrderDetails(res.data.order_details);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Menu />
      <OrderDisplay id={id} order={order} QRCodeURL={QRCodeURL} />
      <ItemList orderDetails={orderDetails} sumPrice={order?.sum_price} />
    </div>
  );
};

export default OrderDetailPage;
