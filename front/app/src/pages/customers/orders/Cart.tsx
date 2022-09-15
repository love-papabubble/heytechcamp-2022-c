import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Item } from '../../../components/Items/index';

export interface CartProps {
  cartDetails: {
    item: Item;
    quantity: number;
  }[];
}

const Cart: FC<CartProps> = (props: CartProps) => {
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(null);
  const [timePickerValue, setTimePickerValue] = useState<Dayjs | null>(null);
  const router = useRouter();

  const order = () => {
    //validate that the date and time are not null
    if (datePickerValue == null || timePickerValue == null) {
      alert('予約日時を入力してください');
      return;
    }
    //validate that the date and time are not in the past
    const now = new Date();
    const inputTime = new Date(
      datePickerValue.year(),
      datePickerValue.month(),
      datePickerValue.date(),
      timePickerValue.hour(),
      timePickerValue.minute()
    );
    if (inputTime.getTime() < now.getTime()) {
      alert('過去の日時は指定できません');
      return;
    }
    //inputTime must be YYYY-mm-dd HH:MM
    const deliveryTime =
      inputTime.getFullYear() +
      '-' +
      (inputTime.getMonth() + 1) +
      '-' +
      inputTime.getDate() +
      ' ' +
      inputTime.getHours() +
      ':' +
      inputTime.getMinutes();
    const items = props.cartDetails.map((cartDetail) => {
      return {
        item_id: cartDetail.item.id,
        amount: cartDetail.quantity,
      };
    });
    fetch('http://localhost:3000/customers/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: { delivery_time: deliveryTime },
        items: items,
      }),
    }).then(() => {
      router.push('/customers');
      alert('注文が完了しました。');
    });
  };

  return (
    <>
      <Container fixed style={{ flexBasis: '30%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <Typography variant='h5' component='div'>
              受け取り日
            </Typography>
            <DatePicker
              value={datePickerValue}
              onChange={(newValue) => setDatePickerValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography variant='h5' component='div'>
              受け取り時間
            </Typography>
            <TimePicker
              value={timePickerValue}
              onChange={(newValue) => setTimePickerValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            選択中の商品:
            {props.cartDetails.length > 0 ? (
              props.cartDetails.map((cartDetail, index) => {
                return (
                  <>
                    <Typography variant='h5' component='div' key={index}>
                      {cartDetail.item.title} x {cartDetail.quantity}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      小計:{cartDetail.item.price * cartDetail.quantity}円
                    </Typography>
                  </>
                );
              })
            ) : (
              <Typography variant='h5' component='div'>
                なし
              </Typography>
            )}
            {/*display total sum*/}
            <Typography variant='h5' component='div'>
              合計:
              {props.cartDetails.reduce((sum, cartDetail) => {
                return sum + cartDetail.item.price * cartDetail.quantity;
              }, 0)}
              円
            </Typography>
            {/*disabled when cart is empty*/}
            <Button
              variant='contained'
              disabled={props.cartDetails.length === 0}
              onClick={() => {
                order();
              }}>
              予約
            </Button>
          </Stack>
        </LocalizationProvider>
      </Container>
    </>
  );
};

export default Cart;
