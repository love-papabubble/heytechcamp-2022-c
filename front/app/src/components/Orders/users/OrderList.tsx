import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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
import Link from 'next/link';
import React from 'react';

import { OrderInfo } from '@/components/Orders/index';
import { formatDateTime } from '@/utils/datetime';

interface OrderListProps {
  ordersInfo: OrderInfo[];
  children?: React.ReactNode;
}

export const OrderList: React.FC<OrderListProps> = ({ ordersInfo }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ width: '70vw', margin: '0 auto' }}>
      <Typography
        textAlign={'center'}
        fontSize={'1.5rem'}
        fontWeight={'bold'}
        margin={3}>
        本日の予約一覧
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>予約番号</TableCell>
              <TableCell>状況</TableCell>
              <TableCell>受け取り日時</TableCell>
              <TableCell>顧客氏名</TableCell>
              <TableCell align='right'>合計金額</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersInfo.map((orderInfo, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>
                    <IconButton
                      aria-label='expand row'
                      size='small'
                      onClick={() => setOpen(!open)}>
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Link href={'/users/orders/' + orderInfo.id}>
                      <a>{orderInfo.id}</a>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {orderInfo.is_delivered ? (
                      <Chip
                        label='受取済'
                        color='success'
                        style={{ fontWeight: 'bold' }}
                      />
                    ) : (
                      <Chip
                        label='未受取'
                        color='primary'
                        variant='outlined'
                        style={{ fontWeight: 'bold' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(orderInfo.delivery_time)}
                  </TableCell>
                  <TableCell>{orderInfo.customer.name}</TableCell>
                  <TableCell align='right'>
                    {orderInfo.sum_price.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      backgroundColor: '#eee',
                    }}
                    colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography>予約商品</Typography>
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
                            {orderInfo.order_details?.map(
                              (orderDetail, index) => (
                                <TableRow key={index}>
                                  <TableCell component='th' scope='row'>
                                    {orderDetail.item.title}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {orderDetail.amount}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {orderDetail.item.price.toLocaleString()}
                                  </TableCell>
                                  <TableCell align='right'>
                                    {(
                                      orderDetail.item.price *
                                      orderDetail.amount
                                    ).toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
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
    </div>
  );
};
