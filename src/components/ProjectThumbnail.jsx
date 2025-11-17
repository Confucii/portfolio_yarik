import { Link } from 'react-router-dom';
import { Box, Card, CardMedia, Typography } from '@mui/material';

function ProjectThumbnail({ project }) {
  // Use the project's thumbnail
  if (!project.thumbnail) return null;

  return (
    <Card
      component={Link}
      to={`/category/${project.category}#${project.id}`}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1', // Creates a 1:1 aspect ratio
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(224, 145, 204, 0.3)',
        },
      }}
    >
      {/* Static thumbnail image */}
      <CardMedia
        component="img"
        image={`${import.meta.env.BASE_URL}${project.thumbnail}`}
        alt={project.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 1, // Match Card's borderRadius to keep corners rounded
        }}
        loading="lazy"
      />

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
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          {project.title}
        </Typography>
      </Box>
    </Card>
  );
}

export default ProjectThumbnail;
