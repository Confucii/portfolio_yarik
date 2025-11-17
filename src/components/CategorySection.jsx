import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ProjectThumbnail from "./ProjectThumbnail";

function CategorySection({ category, projects }) {
  return (
    <Box sx={{ mb: 8 }}>
      {/* Divider */}
      <Box
        sx={{
          height: 2,
          backgroundColor: "primary.main",
          mb: 4,
        }}
      />

      {/* Category Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" sx={{ color: "primary.main" }}>
          {category.displayName}
        </Typography>
      </Box>

      {/* Horizontal scrolling container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        {/* Projects row */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            padding: "20px",
            pb: 2,
            mb: 3,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(224, 145, 204, 0.1)",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "primary.light",
              },
            },
          }}
        >
          {projects.map((project) => (
            <ProjectThumbnail key={project.id} project={project} />
          ))}
        </Box>

        {/* See More Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            to={`/category/${category.name}`}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "background.paper",
                borderColor: "primary.main",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            See More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CategorySection;
