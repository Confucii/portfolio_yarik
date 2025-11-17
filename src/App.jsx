import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/project/:categoryName/:projectId" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
