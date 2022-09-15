import Button from '@mui/material/Button';

import Link from 'next/link';
import React from 'react';

export const OrderListButton: React.FC = () => {
  return (
    <div>
      <Link href={'/users/orders'}>
        <a style={{ textDecoration: 'none' }}>
          <Button variant='outlined'>予約一覧画面へ</Button>
        </a>
      </Link>
    </div>
  );
};
