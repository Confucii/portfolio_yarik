import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const categories = [
    { name: '3D', path: '/category/3D' },
    { name: 'Physical', path: '/category/physical' },
    { name: 'Works You Might Have Seen', path: '/category/works_you_might_have_seen' },
    { name: 'About', path: '/about' },
  ];

  return (
    <AppBar
      position="static"
      color="secondary"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        py: { xs: 1, md: 2 },
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, sm: 72, md: 88 },
          px: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 2, md: 4 },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'text.primary',
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Logo"
            sx={{
              height: { xs: 48, sm: 60, md: 80 },
              width: 'auto',
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, md: 2 },
            ml: 'auto',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.path}
              component={Link}
              to={category.path}
              sx={{
                color: location.pathname === category.path ? 'primary.main' : 'text.primary',
                fontWeight: location.pathname === category.path ? 700 : 500,
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                px: { xs: 1.5, md: 2.5 },
                py: { xs: 1, md: 1.25 },
                textTransform: 'none',
                borderBottom: location.pathname === category.path ? 2 : 0,
                borderColor: 'primary.main',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(224, 145, 204, 0.08)',
                  borderBottom: 2,
                  borderColor: 'primary.main',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
