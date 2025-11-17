import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProjectThumbnail from "./ProjectThumbnail";

function CategorySection({ category, projects }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const containerRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Calculate slide width in pixels based on container width and slides per view
  const updateSlideWidth = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    let slidesPerView = 4;
    if (containerWidth <= 600) slidesPerView = 1;
    else if (containerWidth <= 960) slidesPerView = 2;
    else if (containerWidth <= 1280) slidesPerView = 3;
    const gap = 48; // gap between slides in px (increased for shadow visibility)
    const horizontalPadding = 96; // px * 2 (48px on each side)
    setSlideWidth((containerWidth - gap * (slidesPerView - 1) - horizontalPadding) / slidesPerView);
    emblaApi?.reInit(); // reinitialize to recalc loop
  }, [emblaApi]);

  // Update buttons visibility
  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Initial setup + window resize
  useEffect(() => {
    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, [updateSlideWidth]);

  // Embla event listeners
  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    emblaApi.on("init", updateButtons);
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
      emblaApi.off("init", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Box sx={{ mb: 8 }}>
      {/* Divider */}
      <Box sx={{ height: 2, backgroundColor: "primary.main", mb: 4 }} />

      {/* Title */}
      <Typography variant="h3" sx={{ color: "primary.main", mb: 3 }}>
        {category.displayName}
      </Typography>

      {/* Carousel */}
      <Box
        ref={containerRef}
        sx={{ position: "relative", width: "100%", mb: 3 }}
      >
        {/* Embla container */}
        <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              gap: "48px", // Increased gap for shadow visibility
              px: "48px", // Increased horizontal padding for shadows
              py: "40px", // Extra padding for hover shadow visibility
            }}
          >
            {projects.map((project) => (
              <Box
                key={project.id}
                sx={{
                  flex: `0 0 ${slideWidth}px`,
                  overflow: 'visible', // Allow shadows to extend beyond slide bounds
                }}
              >
                <ProjectThumbnail project={project} />
              </Box>
            ))}
          </Box>
        </Box>

        {canScrollPrev && (
          <IconButton
            onClick={scrollPrev}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              backgroundColor: "rgba(38,31,49,0.9)", // semi-transparent bg
              color: "primary.main",
              border: "2px solid", // add outline
              borderColor: "primary.main", // same color as arrow
              "&:hover": {
                backgroundColor: "rgba(38,31,49,0.95)",
              },
            }}
          >
            <ChevronLeft sx={{ fontSize: "2rem" }} />
          </IconButton>
        )}

        {canScrollNext && (
          <IconButton
            onClick={scrollNext}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translate(50%, -50%)",
              zIndex: 10,
              backgroundColor: "rgba(38,31,49,0.9)",
              color: "primary.main",
              border: "2px solid",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "rgba(38,31,49,0.95)",
              },
            }}
          >
            <ChevronRight sx={{ fontSize: "2rem" }} />
          </IconButton>
        )}
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
  );
}

export default CategorySection;
