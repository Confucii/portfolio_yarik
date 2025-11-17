import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  IconButton,
  Card,
  CardMedia,
} from '@mui/material';
import { ArrowBack, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import YouTubeEmbed from '../components/YouTubeEmbed';

function ProjectPage() {
  const { categoryName, projectId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % project.images.length);
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

  const project = data?.projects?.find((p) => p.id === projectId && p.category === categoryName);

  if (!project) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">Project not found</Alert>
        <Button component={Link} to={`/category/${categoryName}`} startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to Category
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Header */}
      <Box sx={{ backgroundColor: 'secondary.main', py: { xs: 4, md: 6 } }}>
        <Container>
          <Button component={Link} to={`/category/${categoryName}`} startIcon={<ArrowBack />} sx={{ mb: 2 }}>
            Back to {categoryName}
          </Button>
          <Typography variant="h2" gutterBottom>
            {project.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {project.description}
          </Typography>
        </Container>
      </Box>

      {/* Gallery */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
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
                    height: imageCount <= 4 ? 400 : 200,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.2s',
                    },
                  }}
                  onClick={() => handleOpenLightbox(index)}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    image={image.url}
                    alt={`${project.title} - Image ${index + 1}`}
                    loading="lazy"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {project.images.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No images available for this project
            </Typography>
          </Box>
        )}
      </Container>

      {/* Video Section */}
      {project.video && (
        <Container sx={{ py: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Video
          </Typography>
          <YouTubeEmbed url={project.video} />
        </Container>
      )}

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(26, 21, 34, 0.98)',
            backgroundImage: 'none',
          },
        }}
      >
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

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
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
              src={project.images[lightboxIndex]?.url}
              alt={`${project.title} - Image ${lightboxIndex + 1}`}
              sx={{
                maxWidth: '100%',
                maxHeight: '80vh',
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
            {lightboxIndex + 1} / {project.images.length}
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}

export default ProjectPage;
