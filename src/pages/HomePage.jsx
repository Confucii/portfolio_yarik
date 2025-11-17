import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CategorySection from '../components/CategorySection';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data.json')
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
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Explore my creative work across various disciplines
          </Typography>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'background.paper',
                borderColor: 'primary.main',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            About Me
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Browse by Category
        </Typography>

        {/* Render each category as a horizontal section, sorted by project count */}
        {data?.categories
          ?.sort((a, b) => b.projectCount - a.projectCount)
          .map((category) => {
            // Get projects for this category
            const categoryProjects = data.projects.filter(p => p.category === category.name);

            return (
              <CategorySection
                key={category.name}
                category={category}
                projects={categoryProjects}
              />
            );
          })}
      </Container>
    </>
  );
}

export default HomePage;
