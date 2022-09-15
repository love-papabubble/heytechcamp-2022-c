import { Customer } from '@/components/Customers/index';
import { OrderDetail } from '@/components/OrderDetails/index';
export interface Order {
  id: number;
  is_delivered: boolean;
  delivery_time: string;
  customer_id: number;
  sum_price?: number;
}
export interface OrderInfo {
  id: number;
  is_delivered: boolean;
  delivery_time: string;
  sum_price: number;
  customer: Customer;
  order_details: OrderDetail[];
  children?: React.ReactNode;
}
