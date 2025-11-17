import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProjectThumbnail from "./ProjectThumbnail";

function CategorySection({ category, projects }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start"
  });

  const [canScroll, setCanScroll] = useState(false);

  // Calculate if scrolling is possible even with loop on
  useEffect(() => {
    if (!embla) return;

    const checkScrollAbility = () => {
      const scrollSnapList = embla.scrollSnapList();
      const slideCount = scrollSnapList.length;

      // Scrolling is only meaningful when >1 slides
      setCanScroll(slideCount > 1);
    };

    embla.on("init", checkScrollAbility);
    embla.on("reInit", checkScrollAbility);
    checkScrollAbility();
  }, [embla]);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <Box sx={{ mb: 8 }}>
      {/* Divider */}
      <Box sx={{ height: 2, backgroundColor: "primary.main", mb: 4 }} />

      {/* Title */}
      <Typography variant="h3" sx={{ color: "primary.main", mb: 3 }}>
        {category.displayName}
      </Typography>

      {/* Embla Carousel Container */}
      <Box sx={{ position: "relative", width: "100%", mb: 3 }}>
        {/* Embla Viewport */}
        <Box
          ref={emblaRef}
          sx={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3, // 24px gap between items
            }}
          >
            {projects.map((project) => (
              <Box
                key={project.id}
                sx={{
                  flex: "0 0 calc((100% - 72px) / 4)", // (100% - (3 gaps * 24px)) / 4 items
                  minWidth: 0,
                  "@media(max-width:1280px)": {
                    flex: "0 0 calc((100% - 48px) / 3)" // (100% - (2 gaps * 24px)) / 3 items
                  },
                  "@media(max-width:960px)": {
                    flex: "0 0 calc((100% - 24px) / 2)" // (100% - (1 gap * 24px)) / 2 items
                  },
                  "@media(max-width:600px)": {
                    flex: "0 0 100%" // Full width, no gaps needed
                  },
                }}
              >
                <ProjectThumbnail project={project} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Navigation Buttons - positioned relative to embla viewport */}
        {canScroll && (
          <>
            <IconButton
              onClick={scrollPrev}
              sx={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                backgroundColor: "rgba(38, 31, 49, 0.9)",
                color: "primary.main",
                "&:hover": { backgroundColor: "rgba(38, 31, 49, 0.95)" },
              }}
            >
              <ChevronLeft sx={{ fontSize: "2rem" }} />
            </IconButton>
            <IconButton
              onClick={scrollNext}
              sx={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                backgroundColor: "rgba(38, 31, 49, 0.9)",
                color: "primary.main",
                "&:hover": { backgroundColor: "rgba(38, 31, 49, 0.95)" },
              }}
            >
              <ChevronRight sx={{ fontSize: "2rem" }} />
            </IconButton>
          </>
        )}
      </Box>

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
  );
}

export default CategorySection;
