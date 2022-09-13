import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import React from 'react';
import { OrderDetail } from '@/components/OrderDetails/index';

interface ItemListProps {
  orderDetails: OrderDetail[];
  sumPrice: number | undefined;
  children?: React.ReactNode;
};

export const ItemList: React.FC<ItemListProps> = ({
  orderDetails,
  sumPrice,
}) => {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: '90vw',
          margin: '0 auto',
        }}>
        <Typography sx={{ fontWeight: 'bold' }} m={1}>
          予約した商品
        </Typography>
        {orderDetails.map((orderDetail) => {
          let itemPrice = orderDetail.item.price * orderDetail.amount;
          return (
            <div key={orderDetail.item.id}>
              <Divider component='li' />
              <Box px={3} my={1}>
                <Box>
                  <Typography sx={{ fontSize: '1.2em', width: '60%' }}>
                    {orderDetail.item.title}
                  </Typography>
                  <Typography>{orderDetail.item.description}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography>数量 {orderDetail.amount}</Typography>
                  <Typography>¥ {itemPrice.toLocaleString()}</Typography>
                </Box>
              </Box>
            </div>
          );
        })}
        <Divider component='li' />
        <Box
          m={2}
          sx={{ fontSize: '1.2em', fontWeight: 'bold', textAlign: 'right' }}>
          合計金額　¥ {sumPrice?.toLocaleString()}
        </Box>
      </List>
    </div>
  );
};
