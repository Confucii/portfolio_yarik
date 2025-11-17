import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function CategoryPage() {
  const { categoryName } = useParams();
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

  const category = data?.categories?.find((cat) => cat.name === categoryName);
  const projects = data?.projects?.filter((project) => project.category === categoryName) || [];

  if (!category) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">Category not found</Alert>
        <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Header */}
      <Box sx={{ backgroundColor: 'secondary.main', py: { xs: 4, md: 6 } }}>
        <Container>
          <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
            Back to Home
          </Button>
          <Typography variant="h2" gutterBottom>
            {category.displayName}
          </Typography>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                <CardActionArea component={Link} to={`/project/${categoryName}/${project.id}`}>
                  {project.thumbnail && (
                    <CardMedia
                      component="img"
                      height="250"
                      image={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        backgroundColor: 'background.default',
                      }}
                      loading="lazy"
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No projects found in this category
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default CategoryPage;
