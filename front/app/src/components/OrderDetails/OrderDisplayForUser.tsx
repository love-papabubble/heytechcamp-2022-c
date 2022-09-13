// MUI
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import { Order } from '@/components/Orders/index';
import { formatDateTime } from '@/utils/datetime';

interface OrderDisplayForUserProps {
  id: string | string[] | undefined;
  order: Order | undefined;
  children?: React.ReactNode;
}

export const OrderDisplayForUser: React.FC<OrderDisplayForUserProps> = ({
  id,
  order,
}) => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography m={2} sx={{ fontWeight: 'bold' }}>
          予約番号:{id}
        </Typography>

        <Stack mb={4} mx={2}>
          {order?.is_delivered ? (
            <Alert severity='success' color='info'>
              <strong>この予約はすでに受け取り済みです。</strong>
            </Alert>
          ) : (
            <Alert severity='info'>
              <AlertTitle>
                <strong>まだ受け取りが完了していません。</strong>
              </AlertTitle>
              商品を受け取ったら下記のボタンを押してください。
            </Alert>
          )}
        </Stack>

        <Typography m={2} sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          <small>受け取り日時 : </small>
          {'   '}
          {order?.delivery_time && formatDateTime(order?.delivery_time)}
        </Typography>
      </Box>
    </div>
  );
};
