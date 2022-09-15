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
    <Paper
      sx={{
        maxWidth: '100%',
        marginBottom: '21px',
      }}>
      <MenuList style={{ display: 'flex', justifyContent: 'center' }}>
        <MenuItem>
          <ListItemIcon>
            <RoomService fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Link href={'/customers'}>
              <a>予約一覧</a>
            </Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Search fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Link href={'/customers/items'}>
              <a>商品を探す</a>
            </Link>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
