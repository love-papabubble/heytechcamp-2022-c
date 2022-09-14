import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';

import { OrderInfo } from '@/components/Orders/index';

interface OrderListProps {
  ordersInfo: OrderInfo[];
  children?: React.ReactNode;
}

export const OrderList: React.FC<OrderListProps> = ({ ordersInfo }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <TableContainer
      component={Paper}
      style={{ width: '70vw', margin: '0 auto' }}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>予約番号</TableCell>
            <TableCell align='right'>受け取りステータス</TableCell>
            <TableCell align='right'>受け取り日時</TableCell>
            <TableCell align='right'>合計金額</TableCell>
            <TableCell align='right'>顧客指名</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersInfo.map((orderInfo) => (
            <React.Fragment key={orderInfo.id}>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {orderInfo.id}
                </TableCell>
                <TableCell align='right'>{orderInfo.is_delivered}</TableCell>
                <TableCell align='right'>{orderInfo.delivery_time}</TableCell>
                <TableCell align='right'>{orderInfo.sum_price}</TableCell>
                <TableCell align='right'>{orderInfo.customer.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}>
                  <Collapse in={open} timeout='auto' unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant='h6' gutterBottom component='div'>
                        予約商品
                      </Typography>
                      <Table size='small' aria-label='purchases'>
                        <TableHead>
                          <TableRow>
                            <TableCell>商品名</TableCell>
                            <TableCell align='right'>数量</TableCell>
                            <TableCell align='right'>単価</TableCell>
                            <TableCell align='right'>小計</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderInfo.order_details?.map((orderDetail) => (
                            <TableRow key={orderDetail.id}>
                              <TableCell component='th' scope='row'>
                                {orderDetail.item.title}
                              </TableCell>
                              <TableCell align='right'>
                                {orderDetail.amount}
                              </TableCell>
                              <TableCell align='right'>
                                {orderDetail.item.price}
                              </TableCell>
                              <TableCell align='right'>
                                {orderDetail.item.price * orderDetail.amount}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
