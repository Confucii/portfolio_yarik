import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProjectThumbnail from "./ProjectThumbnail";

function CategorySection({ category, projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 600) return 1; // mobile
    if (width < 960) return 2; // tablet
    if (width < 1280) return 3; // small desktop
    return 4; // large desktop
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Update items per view on window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return projects.length - 1; // Loop to last item
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev === projects.length - 1) {
        return 0; // Loop to first item
      }
      return prev + 1;
    });
  };

  // Calculate the transform offset
  const itemWidth = `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`;
  const gapWidth = 24; // 3 * 8px (theme spacing)
  const offset = currentIndex * (100 / itemsPerView + (gapWidth * 100) / (itemsPerView * 100));

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

      {/* Carousel Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: -20,
            top: "40%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(38, 31, 49, 0.9)",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(38, 31, 49, 0.95)",
            },
          }}
        >
          <ChevronLeft sx={{ fontSize: "2rem" }} />
        </IconButton>

        {/* Projects carousel */}
        <Box
          sx={{
            overflow: "hidden",
            padding: "20px",
            pb: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              transform: `translateX(calc(-${currentIndex} * (${itemWidth} + 24px)))`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {projects.map((project, index) => (
              <Box
                key={project.id}
                sx={{
                  flex: `0 0 calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`,
                  minWidth: 0,
                }}
              >
                <ProjectThumbnail project={project} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: -20,
            top: "40%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(38, 31, 49, 0.9)",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(38, 31, 49, 0.95)",
            },
          }}
        >
          <ChevronRight sx={{ fontSize: "2rem" }} />
        </IconButton>

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
