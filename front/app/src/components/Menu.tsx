import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  RoomService,
  Search,
} from '@mui/icons-material';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export const Menu = () => {
  return (
    <Paper sx={{ width: 290, maxWidth: '100%', marginTop: '21px' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <RoomService fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Link href={'/customers'}>予約一覧</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Search fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Link href={'/customers/items'}>商品を探す</Link>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
