import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Email, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'secondary.main',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          {/* Contact Links */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Link
              href="mailto:yarik14yarik14@gmail.com"
              color="primary.main"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Email fontSize="small" />
              <Typography variant="body2">yarik14yarik14@gmail.com</Typography>
            </Link>

            <Link
              href="https://instagram.com/dreddbutnotjudje"
              target="_blank"
              rel="noopener noreferrer"
              color="primary.main"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Instagram fontSize="small" />
              <Typography variant="body2">@dreddbutnotjudje</Typography>
            </Link>
          </Stack>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} YarVol. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
