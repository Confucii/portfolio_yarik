import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 4 }}>
        Back to Home
      </Button>

      <Typography variant="h2" gutterBottom>
        About Me
      </Typography>

      <Paper elevation={0} sx={{ p: 4, mt: 4, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom color="primary">
          Welcome!
        </Typography>
        <Typography paragraph>
          Hi, I'm Yarik, a creative professional passionate about bringing ideas to life through various mediums.
          This portfolio showcases my work across different disciplines.
        </Typography>

        <Typography variant="h4" gutterBottom color="primary" sx={{ mt: 4 }}>
          What I Do
        </Typography>
        <Typography paragraph>
          I work across multiple creative fields, constantly exploring new techniques and pushing the boundaries
          of what's possible. Each project in my portfolio represents a unique challenge and learning opportunity.
        </Typography>

        <Typography variant="h4" gutterBottom color="primary" sx={{ mt: 4 }}>
          My Approach
        </Typography>
        <Typography paragraph>
          I believe in the power of continuous learning and experimentation. Every project, from my first 3D render
          to my latest work, is a step in an ongoing creative journey. I value both technical excellence and
          artistic expression, striving to balance both in everything I create.
        </Typography>

        <Typography variant="h4" gutterBottom color="primary" sx={{ mt: 4 }}>
          Get in Touch
        </Typography>
        <Typography paragraph>
          Interested in working together or learning more about my projects? Feel free to reach out!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" component={Link} to="/" size="large">
            View My Work
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage;
