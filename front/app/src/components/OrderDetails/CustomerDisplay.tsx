// MUI
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import { Customer } from '@/components/Customers/index';

interface CustomerDisplayProps {
  customer: Customer | undefined;
  children?: React.ReactNode;
}

export const CustomerDisplay: React.FC<CustomerDisplayProps> = ({
  customer,
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
          顧客情報
        </Typography>
        <Divider component='li' />
        <Box px={3} my={1}>
          <Typography sx={{ fontSize: '1.2em', width: '60%' }}>
            {customer?.name}
          </Typography>
          <Typography>{customer?.email}</Typography>
        </Box>
        <Divider component='li' />
      </List>
    </div>
  );
};
