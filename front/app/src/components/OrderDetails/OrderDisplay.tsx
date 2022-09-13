// MUI
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { QRCodeSVG } from 'qrcode.react';

import { Order } from '@/components/Orders/index';
import { formatDateTime } from '@/utils/datetime';

interface OrderDisplayProps {
  id: string | string[] | undefined;
  order: Order | undefined;
  QRCodeURL: string;
  children?: React.ReactNode;
}

export const OrderDisplay: React.FC<OrderDisplayProps> = ({
  id,
  order,
  QRCodeURL,
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
        <QRCodeSVG value={QRCodeURL} size={200} />

        <Typography m={2} sx={{ fontWeight: 'bold', fontSize: '1.2em' }}>
          <small>受け取り日時 : </small>
          {'   '}
          {order?.delivery_time && formatDateTime(order?.delivery_time)}
        </Typography>

        <Stack mb={4} mx={2}>
          {order?.is_delivered ? (
            <Alert severity='success' color='info'>
              <strong>受け取りが完了しています。</strong>
            </Alert>
          ) : (
            <Alert severity='info'>
              <AlertTitle>
                <strong>まだ受け取りが完了していません。</strong>
              </AlertTitle>
              受け取り日時に店舗に行き、<strong>この画面</strong>
              を見せてください。
            </Alert>
          )}
        </Stack>
      </Box>
    </div>
  );
};
