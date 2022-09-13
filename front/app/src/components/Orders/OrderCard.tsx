import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from 'react';
import {Order} from "@/components/Orders/index";

export interface OrderViewProps {
    orders: Order[];
}

/** 注文を表示するカード **/
export default function OrderView(props: OrderViewProps) {
    return (
        props.orders &&
                props.orders.map((order, index) => {
                    return (
                        <Card sx={{minWidth: 275}} key={index}>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography variant="h5" component="div">
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    受け取りステータス: {order.is_delivered ? "受け取り済み" : "未受け取り"}
                                </Typography>
                                <Typography variant="body2">
                                    well meaning and kindly.
                                    <br/>
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href={`/customers/orders/${order.id}`}>予約詳細へ</Button>
                            </CardActions>
                        </Card>
                    );
                })
    );
}
