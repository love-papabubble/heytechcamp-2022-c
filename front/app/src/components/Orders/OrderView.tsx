import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import React from 'react';
import { Order } from '@/components/Orders/index';
import { formatDateTime } from '@/utils/datetime';

export interface OrderViewProps {
  orders: Order[];
}

/** 注文を表示するカード **/
export default function OrderView(props: OrderViewProps) {
  return (
    <>
      <Container fixed>
        {props.orders &&
          props.orders.map((order, index) => {
            return (
              <Card
                sx={{ minWidth: 275 }}
                key={index}
                variant={'outlined'}
                style={{ marginBottom: '5px' }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 21 }}
                    color='text.secondary'
                    gutterBottom>
                    受取日時:{' '}
                    {order.delivery_time && formatDateTime(order.delivery_time)}
                  </Typography>
                  <Typography variant='h5' component='div'></Typography>
                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    受け取りステータス:{' '}
                    {order.is_delivered ? '受け取り済み' : '未受け取り'}
                  </Typography>
                  <Typography variant='body2'>
                    受け取り場所: コージーコーナー銀座店
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' href={`/customers/orders/${order.id}`}>
                    予約詳細へ
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Container>
    </>
  );
}
