import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  IconButton,
} from '@mui/material';
import { ArrowBack, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import YouTubeEmbed from '../components/YouTubeEmbed';

function CategoryPage() {
  const { categoryName } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProjectId, setLightboxProjectId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  // Scroll to project if hash is present
  useEffect(() => {
    if (location.hash && !loading) {
      const projectId = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(projectId);
      if (element) {
        // Small delay to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash, loading]);

  const handleOpenLightbox = (projectId, index) => {
    setLightboxProjectId(projectId);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const currentLightboxProject = data?.projects?.find((p) => p.id === lightboxProjectId);

  const handlePrevious = () => {
    if (!currentLightboxProject) return;
    setLightboxIndex((prev) => (prev - 1 + currentLightboxProject.images.length) % currentLightboxProject.images.length);
  };

  const handleNext = () => {
    if (!currentLightboxProject) return;
    setLightboxIndex((prev) => (prev + 1) % currentLightboxProject.images.length);
  };

  const handleKeyPress = (e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') handleCloseLightbox();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

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

      {/* Projects Content */}
      <Container sx={{ pt: 3, pb: 6 }}>
        {projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No projects found in this category
            </Typography>
          </Box>
        ) : (
          projects.map((project, projectIndex) => (
            <Box key={project.id} id={project.id}>
              {/* Divider (same style as HomePage) */}
              <Box sx={{ height: 2, backgroundColor: 'primary.main', mb: 6, mt: projectIndex === 0 ? 0 : 8 }} />

              {/* Project Header */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
                  {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
              </Box>

              {/* Gallery */}
              {project.images.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Gallery
                  </Typography>

                  <Grid container spacing={2} justifyContent={project.images.length <= 2 ? 'center' : 'flex-start'}>
                    {project.images.map((image, index) => {
                      // Dynamically adjust grid sizes based on image count
                      let gridSizes = {};
                      const imageCount = project.images.length;

                      if (imageCount === 1) {
                        // Single image: make it large but not full width
                        gridSizes = { xs: 12, sm: 12, md: 8, lg: 6 };
                      } else if (imageCount === 2) {
                        // Two images: side by side on larger screens
                        gridSizes = { xs: 12, sm: 6, md: 6, lg: 6 };
                      } else if (imageCount <= 4) {
                        // 3-4 images: medium size
                        gridSizes = { xs: 12, sm: 6, md: 6, lg: 4 };
                      } else {
                        // 5+ images: smaller grid
                        gridSizes = { xs: 12, sm: 6, md: 4, lg: 3 };
                      }

                      return (
                        <Grid item {...gridSizes} key={index}>
                          <Card
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                transition: 'transform 0.2s',
                              },
                            }}
                            onClick={() => handleOpenLightbox(project.id, index)}
                          >
                            <CardMedia
                              component="img"
                              image={`${import.meta.env.BASE_URL}${image.url}`}
                              alt={`${project.title} - Image ${index + 1}`}
                              loading="lazy"
                              sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                backgroundColor: 'background.default'
                              }}
                            />
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}

              {/* Video Section */}
              {project.video && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Video
                  </Typography>
                  <YouTubeEmbed url={project.video} />
                </Box>
              )}
            </Box>
          ))
        )}
      </Container>

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgb(26, 21, 34)',
            backgroundImage: 'none',
          },
        }}
      >
        {currentLightboxProject && (
          <Box sx={{ position: 'relative', p: 2 }}>
            <IconButton
              onClick={handleCloseLightbox}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'primary.main',
                zIndex: 1,
              }}
            >
              <Close />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: { xs: '50vh', sm: '70vh' } }}>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: 8,
                  color: 'primary.main',
                }}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>

              <Box
                component="img"
                src={`${import.meta.env.BASE_URL}${currentLightboxProject.images[lightboxIndex]?.url}`}
                alt={`${currentLightboxProject.title} - Image ${lightboxIndex + 1}`}
                sx={{
                  maxWidth: '100%',
                  maxHeight: { xs: '60vh', sm: '80vh' },
                  objectFit: 'contain',
                }}
              />

              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 8,
                  color: 'primary.main',
                }}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </Box>

            <Typography align="center" color="text.secondary" sx={{ mt: 2 }}>
              {lightboxIndex + 1} / {currentLightboxProject.images.length}
            </Typography>
          </Box>
        )}
      </Dialog>
    </>
  );
}

export default CategoryPage;
