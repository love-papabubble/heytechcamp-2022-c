export interface Order {
    id: number;
    is_delivered: boolean;
    delivery_time: string;
    customer_id: number;
    sum_price?: number;
}