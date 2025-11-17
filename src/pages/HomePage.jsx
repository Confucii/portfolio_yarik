import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/portfolio_yarik/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load portfolio data');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #261F31 0%, #1A1522 100%)',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(135deg, #E091CC 0%, #F0A1DC 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' },
            }}
          >
            Welcome to My Portfolio
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Explore my creative work across various disciplines
          </Typography>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Browse by Category
        </Typography>

        <Grid container spacing={4}>
          {data?.categories?.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.name}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/category/${category.name}`}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 4,
                      backgroundColor: 'background.default',
                    }}
                  >
                    <FolderIcon sx={{ fontSize: 80, color: 'primary.main' }} />
                  </Box>
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {category.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.projectCount} {category.projectCount === 1 ? 'project' : 'projects'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;
