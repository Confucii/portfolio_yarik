import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: '3D', path: '/category/3D' },
    { name: 'Physical', path: '/category/physical' },
    { name: 'Works You Might Have Seen', path: '/category/works_you_might_have_seen' },
    { name: 'About', path: '/about' },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

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

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 2,
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
                fontSize: '1.25rem',
                px: 2.5,
                py: 1.25,
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

        {/* Mobile Menu Button */}
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            ml: 'auto',
            color: 'text.primary',
          }}
          onClick={handleMobileMenuToggle}
          aria-label="menu"
        >
          <MenuIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.default',
          },
        }}
      >
        <List sx={{ pt: 4 }}>
          {categories.map((category) => (
            <ListItem key={category.path} disablePadding>
              <ListItemButton
                component={Link}
                to={category.path}
                onClick={handleMobileMenuClose}
                selected={location.pathname === category.path}
                sx={{
                  py: 2,
                  px: 3,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(224, 145, 204, 0.12)',
                    borderLeft: 4,
                    borderColor: 'primary.main',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(224, 145, 204, 0.08)',
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    fontSize: '1.125rem',
                    fontWeight: location.pathname === category.path ? 700 : 500,
                    color: location.pathname === category.path ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
