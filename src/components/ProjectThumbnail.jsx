import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function ProjectThumbnail({ project }) {
  // Use the project's thumbnail
  if (!project.thumbnail) return null;

  return (
    <Box
      component={Link}
      to={`/project/${project.category}/${project.id}`}
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '100%', // Creates a 1:1 aspect ratio
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
      {/* Static thumbnail image */}
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
        alt={project.title}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
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
    </Box>
  );
}

export default ProjectThumbnail;
