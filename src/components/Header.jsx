import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="sticky" color="secondary" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'text.primary',
          }}
        >
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Logo"
            sx={{
              height: { xs: 32, sm: 40 },
              width: 'auto',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Portfolio
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
