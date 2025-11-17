import { Box } from '@mui/material';

function YouTubeEmbed({ url }) {
  if (!url) return null;

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    // Handle different YouTube URL formats:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    // - https://www.youtube.com/embed/VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    console.error('Invalid YouTube URL:', url);
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: 'background.default',
      }}
    >
      <Box
        component="iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}

export default YouTubeEmbed;
