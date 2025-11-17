import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import CategorySection from '../components/CategorySection';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
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
          backgroundColor: 'secondary.main',
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              color: 'primary.main',
              fontSize: { xs: '2.5rem', md: '4rem' },
            }}
          >
            YarVol
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 700, color: 'text.primary' }}>
            Hi, I'm Yaroslav Volikov. Latvian Art Academy jewelry student and independent 3D artist
          </Typography>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container sx={{ pt: 4, pb: 8 }}>
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
