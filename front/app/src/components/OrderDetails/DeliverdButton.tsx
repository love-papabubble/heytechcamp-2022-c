import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface DeliverdButtonProps {
  handleDeliverd: (event: React.MouseEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export const DeliverdButton: React.FC<DeliverdButtonProps> = ({
  handleDeliverd,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button variant='outlined' onClick={handleClickOpen}>
          受け取り確認をする
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            {'受け取り済みにしますか？'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button onClick={handleDeliverd}>更新</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
