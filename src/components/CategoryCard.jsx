import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActionArea, Typography, Box, Fade } from '@mui/material';

function CategoryCard({ category, projects }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get one thumbnail from each project in this category
  const images = projects
    .filter(p => p.thumbnail)
    .map(p => ({
      url: p.thumbnail,
      projectTitle: p.title
    }));

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        component={Link}
        to={`/category/${category.name}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Slideshow */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 300,
            overflow: 'hidden',
            backgroundColor: 'background.default',
          }}
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <Fade key={index} in={currentImageIndex === index} timeout={800}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: currentImageIndex === index ? 'block' : 'none',
                  }}
                >
                  <Box
                    component="img"
                    src={image.url}
                    alt={image.projectTitle}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />
                </Box>
              </Fade>
            ))
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography variant="h4">No images</Typography>
            </Box>
          )}

          {/* Image counter */}
          {images.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                backgroundColor: 'rgba(26, 21, 34, 0.8)',
                color: 'primary.main',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              {currentImageIndex + 1} / {images.length}
            </Box>
          )}
        </Box>

        {/* Category Info */}
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
  );
}

export default CategoryCard;
