import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProjectThumbnail from "./ProjectThumbnail";

function CategorySection({ category, projects }) {
  // Responsive carousel
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();

  const needsCarousel = projects.length > 1;

  return (
    <Box sx={{ mb: 8 }}>
      {/* Divider */}
      <Box sx={{ height: 2, backgroundColor: "primary.main", mb: 4 }} />

      {/* Title */}
      <Typography variant="h3" sx={{ color: "primary.main", mb: 3 }}>
        {category.displayName}
      </Typography>

      {/* Carousel Wrapper */}
      <Box sx={{ position: "relative", width: "100%" }}>
        {needsCarousel && (
          <IconButton
            onClick={scrollPrev}
            sx={{
              position: "absolute",
              left: -20,
              top: "40%",
              zIndex: 2,
              backgroundColor: "rgba(38, 31, 49, 0.9)",
              color: "primary.main",
              "&:hover": { backgroundColor: "rgba(38, 31, 49, 0.95)" },
            }}
          >
            <ChevronLeft sx={{ fontSize: "2rem" }} />
          </IconButton>
        )}

        {/* Embla Viewport */}
        <Box
          ref={emblaRef}
          sx={{
            overflow: "hidden",
            width: "100%",
            pb: 2,
            mb: 3,
            pl: 2,
            pr: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: 3, // keeps gaps between real items
              paddingRight: 3, // adds the missing gap at the end
              paddingLeft: 3, // adds the missing gap at the start
            }}
          >
            {projects.map((project, i) => (
              <Box
                key={project.id}
                sx={{
                  flex: "0 0 calc(100% / 4)", // 4 items desktop
                  "@media(max-width:1280px)": { flex: "0 0 calc(100% / 3)" },
                  "@media(max-width:960px)": { flex: "0 0 calc(100% / 2)" },
                  "@media(max-width:600px)": { flex: "0 0 100%" },
                }}
              >
                <ProjectThumbnail project={project} />
              </Box>
            ))}
          </Box>
        </Box>

        {needsCarousel && (
          <IconButton
            onClick={scrollNext}
            sx={{
              position: "absolute",
              right: -20,
              top: "40%",
              zIndex: 2,
              backgroundColor: "rgba(38, 31, 49, 0.9)",
              color: "primary.main",
              "&:hover": { backgroundColor: "rgba(38, 31, 49, 0.95)" },
            }}
          >
            <ChevronRight sx={{ fontSize: "2rem" }} />
          </IconButton>
        )}

        {/* See More */}
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
