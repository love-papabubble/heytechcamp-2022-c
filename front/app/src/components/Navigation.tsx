import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Navigation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/*    <IconButton*/}
          {/*        size="large"*/}
          {/*        edge="start"*/}
          {/*        color="inherit"*/}
          {/*        aria-label="menu"*/}
          {/*        sx={{mr: 2}}*/}
          {/*        onClick={() => {*/}
          {/*            console.log("clicked")*/}
          {/*        }*/}
          {/*        }*/}
          {/*    >*/}
          {/*        <MenuIcon/>*/}
          {/*    </IconButton>*/}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            STORES Bypass
          </Typography>
          {/*<Button color="inherit">Login</Button>*/}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
