import React from 'react';

import { OrderInfo } from '@/components/Orders/index';

interface OrderListProps {
  ordersInfo: OrderInfo[];
  children?: React.ReactNode;
}

export const OrderList: React.FC<OrderListProps> = ({ ordersInfo }) => {
  return <div>オーダーリスト</div>;
};
