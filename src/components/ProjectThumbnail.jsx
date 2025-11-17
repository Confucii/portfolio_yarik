import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Fade } from '@mui/material';

function ProjectThumbnail({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images for this project (use thumbnail if no images array)
  const images = project.images && project.images.length > 0
    ? project.images.map(img => img.url)
    : project.thumbnail
    ? [project.thumbnail]
    : [];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <Box
      component={Link}
      to={`/project/${project.category}/${project.id}`}
      sx={{
        position: 'relative',
        width: 300,
        height: 300,
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: 'background.default',
        textDecoration: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(224, 145, 204, 0.3)',
        },
      }}
    >
      {images.map((imageUrl, index) => (
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
              src={imageUrl}
              alt={project.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          </Box>
        </Fade>
      ))}

      {/* Image counter */}
      {images.length > 1 && (
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

      {/* Project title overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(26, 21, 34, 0.9), transparent)',
          color: 'primary.main',
          p: 2,
          fontSize: '1rem',
          fontWeight: 500,
        }}
      >
        {project.title}
      </Box>
    </Box>
  );
}

export default ProjectThumbnail;
