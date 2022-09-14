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
    delivery_time: boolean;
    is_delivered: string;
    sum_price: number;
    customer: Customer;
    orderDetails: OrderDetail[];
    children?: React.ReactNode;
}