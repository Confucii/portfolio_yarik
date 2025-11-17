import { Link } from "react-router-dom";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { escapeProjectId } from "../utils/projectId";

function ProjectThumbnail({ project }) {
  // Use the project's thumbnail
  if (!project.thumbnail) return null;

  return (
    <Card
      component={Link}
      to={`/category/${project.category}#${escapeProjectId(project.id)}`}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1", // Creates a 1:1 aspect ratio
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* Static thumbnail image */}
      <CardMedia
        component="img"
        image={`${import.meta.env.BASE_URL}${project.thumbnail}`}
        alt={project.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 1, // Match Card's borderRadius to keep corners rounded
        }}
        loading="lazy"
      />

      {/* Project title overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 1,
          background:
            "linear-gradient(to top, rgba(26, 21, 34, 0.95) 0%, rgba(26, 21, 34, 0.8) 50%, transparent 100%)",
          color: "primary.main",
          p: 2,
          paddingTop: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.6)",
          }}
        >
          {project.title}
        </Typography>
      </Box>
    </Card>
  );
}

export default ProjectThumbnail;
