import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E091CC', // Pink accent color
      light: '#F0A1DC',
      dark: '#C080B0',
    },
    secondary: {
      main: '#261F31', // Dark purple background
      light: '#332A3F',
      dark: '#1A1522',
    },
    background: {
      default: '#261F31',
      paper: '#332A3F',
    },
    text: {
      primary: '#E091CC',
      secondary: '#B080A0',
    },
  },
  typography: {
    fontFamily: [
      'SF Pro Display',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(224, 145, 204, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
