import axios from 'axios';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { Customer } from '@/components/Customers/index';
import { CustomerDisplay } from '@/components/OrderDetails/CustomerDisplay';
import { ItemList } from '@/components/OrderDetails/ItemList';
import { OrderDisplayForUser } from '@/components/OrderDetails/OrderDisplayForUser';

import { OrderDetail } from '@/components/OrderDetails/index';
import { Order } from '@/components/Orders/index';

const OrderDetailForUserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    if (!router.isReady) return;
    getOrderDetail();
  }, [id]);

  async function getOrderDetail() {
    try {
      const res = await axios.get(`http://localhost:3000/users/orders/${id}`);
      console.log(res);
      setOrder(res.data);
      setOrderDetails(res.data.order_details);
      setCustomer(res.data.customer);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <OrderDisplayForUser id={id} order={order} />
      <ItemList orderDetails={orderDetails} sumPrice={order?.sum_price} />
      <CustomerDisplay customer={customer} />
    </div>
  );
};

export default OrderDetailForUserPage;