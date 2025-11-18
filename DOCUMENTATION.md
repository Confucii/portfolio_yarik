# Technical Documentation - YarVol Portfolio

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Component Documentation](#component-documentation)
6. [Data Flow](#data-flow)
7. [Build Process](#build-process)
8. [Deployment Pipeline](#deployment-pipeline)
9. [Development Workflow](#development-workflow)
10. [Styling and Theming](#styling-and-theming)
11. [Performance Optimizations](#performance-optimizations)
12. [Known Issues and Limitations](#known-issues-and-limitations)
13. [Future Improvements](#future-improvements)

---

## Project Overview

**Project Name:** YarVol Portfolio
**Developer:** Yaroslav Volikov
**Purpose:** Personal portfolio website showcasing 3D art, physical art, and design work
**Live URL:** https://confucii.github.io/portfolio_yarik/
**Repository:** https://github.com/Confucii/portfolio_yarik

### Key Features

- **Dynamic Portfolio System**: Projects are organized in categories and automatically discovered from the file system
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Dark Theme**: Custom dark color scheme with pink accents
- **Image Carousel**: Embla Carousel integration for smooth project image browsing
- **Automated Build**: GitHub Actions automatically builds and deploys on push to main
- **Data Generation**: Automatic scanning of portfolio folders to generate project data
- **SEO Optimized**: Proper meta tags and semantic HTML structure

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Portfolio Files (public/portfolio/*)                  │  │
│  │  - Category folders (3D, physical, etc.)               │  │
│  │  - Project folders with metadata.json                  │  │
│  │  - Images                                               │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Build Scripts                                         │  │
│  │  1. generate-data.js → Scans folders, creates data.json│  │
│  │  2. optimize-images.js → Converts images to WebP       │  │
│  │  3. vite build → Compiles React app                    │  │
│  └───────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  GitHub Actions (deploy.yml)                           │  │
│  │  - Runs on push to main                                │  │
│  │  - Executes build process                              │  │
│  │  - Deploys to GitHub Pages                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages                             │
│  - Serves static files from /dist                           │
│  - URL: https://confucii.github.io/portfolio_yarik/         │
└─────────────────────────────────────────────────────────────┘
```

### Application Architecture

The application follows a **Single Page Application (SPA)** architecture using React Router:

```
┌──────────────────────────────────────────────────────────┐
│                         App.jsx                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Header (Navigation)                                │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  React Router Routes:                               │  │
│  │  - / → HomePage                                     │  │
│  │  - /category/:categoryName → CategoryPage           │  │
│  │  - /about → AboutPage                               │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Footer (Contact Links)                             │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Framework
- **React 18.2.0**: Component-based UI library
- **React Router DOM 6.20.0**: Client-side routing
- **Vite 5.0.0**: Build tool and development server

### UI Library
- **Material-UI (MUI) 5.14.0**: Component library
  - `@mui/material`: Core components
  - `@mui/icons-material`: Icon components
  - `@emotion/react` & `@emotion/styled`: CSS-in-JS styling

### Third-Party Components
- **Embla Carousel React 8.6.0**: Touch-enabled image carousel

### Build Tools
- **Vite**: Fast build tool with Hot Module Replacement (HMR)
- **@vitejs/plugin-react**: Vite plugin for React support
- **Sharp 0.33.0**: High-performance image processing (Node.js)
- **Glob 10.3.0**: File pattern matching for build scripts

### Deployment
- **GitHub Actions**: CI/CD pipeline
- **GitHub Pages**: Static site hosting

### Font
- **Titillium Web**: Primary font loaded from Google Fonts
  - Weights: 200, 300, 400, 600, 700, 900 (regular and italic)

---

## Project Structure

```
portfolio_yarik/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment workflow
│
├── public/
│   └── portfolio/               # Portfolio content (auto-scanned)
│       ├── 3D/                  # 3D art category
│       │   ├── project_name/
│       │   │   ├── metadata.json
│       │   │   └── images/
│       │   │       └── *.jpg/png
│       ├── physical/            # Physical art category
│       └── works_you_might_have_seen/
│
├── scripts/
│   ├── generate-data.js         # Scans portfolio folders → data.json
│   └── optimize-images.js       # Image optimization (future use)
│
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navigation header
│   │   ├── Footer.jsx           # Footer with contact links
│   │   ├── CategorySection.jsx  # Horizontal scrolling category
│   │   ├── ProjectThumbnail.jsx # Project card component
│   │   └── YouTubeEmbed.jsx     # YouTube video embed (if needed)
│   │
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page with all categories
│   │   ├── CategoryPage.jsx     # Full category view with lightbox
│   │   └── AboutPage.jsx        # About/contact page
│   │
│   ├── utils/
│   │   └── projectId.js         # Project ID escaping utilities
│   │
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # App entry point
│   ├── theme.js                 # Material-UI theme configuration
│   └── fonts.css                # Font imports
│
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
├── CLAUDE.md                    # AI assistant guidelines
├── README.md                    # User documentation
├── QUICK_START.md               # Quick start guide
├── SIMPLE_WORKFLOW.md           # Workflow documentation
└── DOCUMENTATION.md             # This file - technical docs
```

---

## Component Documentation

### Core Components

#### **App.jsx** (src/App.jsx:1)
Main application component that sets up routing and layout structure.

**Responsibilities:**
- Wraps entire app in Material-UI Box with flex layout
- Renders Header, main content area, and Footer
- Configures React Router with three routes

**Routes:**
- `/` - HomePage
- `/category/:categoryName` - CategoryPage
- `/about` - AboutPage

**Props:** None

---

#### **Header.jsx** (src/components/Header.jsx)
Navigation header with logo and menu links.

**Features:**
- Responsive AppBar with sticky positioning
- Logo/brand name ("YarVol")
- Navigation links: Home, About
- Mobile-responsive design

**Key Styling:**
- Dark background (`secondary.main`)
- Pink text (`primary.main`)
- Sticky top positioning

---

#### **Footer.jsx** (src/components/Footer.jsx)
Footer with contact information and social links.

**Content:**
- Email: yarvol3d@gmail.com
- Instagram: @yarvol
- Copyright notice

**Styling:**
- Centered layout
- Subtle background color
- Compact padding

---

#### **HomePage.jsx** (src/pages/HomePage.jsx:1)
Landing page displaying all portfolio categories.

**Data Flow:**
1. Fetches `data.json` on mount (src/pages/HomePage.jsx:17)
2. Displays loading spinner while fetching (src/pages/HomePage.jsx:32-38)
3. Shows error alert if fetch fails (src/pages/HomePage.jsx:40-46)
4. Renders hero section with introduction (src/pages/HomePage.jsx:50-73)
5. Renders CategorySection for each category, sorted by project count (src/pages/HomePage.jsx:76-92)

**State:**
- `data` - Loaded portfolio data
- `loading` - Loading state
- `error` - Error message if any

**Hero Section:**
- Title: "YarVol"
- Subtitle: "Hi, I'm Yaroslav Volikov. Latvian Art Academy jewelry student and independent 3D artist"

---

#### **CategorySection.jsx** (src/components/CategorySection.jsx)
Horizontal scrolling section displaying projects in a category.

**Props:**
- `category` - Category object with name and project count
- `projects` - Array of project objects for this category

**Features:**
- Horizontal scroll container
- "View All" link to category page
- Grid of ProjectThumbnail components
- Responsive grid layout

**Layout:**
- Mobile: 2 columns
- Tablet (sm): 3 columns
- Desktop (md): 4 columns
- Large (lg): 5 columns

---

#### **ProjectThumbnail.jsx** (src/components/ProjectThumbnail.jsx)
Individual project card with thumbnail and title.

**Props:**
- `project` - Project object with id, title, category, thumbnail

**Features:**
- Material-UI Card component
- Hover effect with shadow
- Click navigation to category page with project focus
- Responsive sizing

**Behavior:**
- On click: Navigates to `/category/:categoryName#:projectId`
- Hover: Displays pink glow shadow

**Styling:**
- Card with rounded corners
- Thumbnail image with aspect ratio preservation
- Title overlay with gradient background

---

#### **CategoryPage.jsx** (src/pages/CategoryPage.jsx)
Full category view with image lightbox functionality.

**Features:**
- Displays all projects in a category
- Click project to open lightbox
- Lightbox disabled on mobile (breakpoint: sm)
- Image carousel in lightbox using Embla Carousel

**URL Parameters:**
- `:categoryName` - Category to display
- Hash (`#projectId`) - Optional project to focus/open

**State:**
- `data` - Portfolio data
- `loading` - Loading state
- `error` - Error message
- `lightboxOpen` - Lightbox visibility
- `selectedProject` - Currently selected project
- `emblaRef` - Carousel reference

**Lightbox Features:**
- Full-screen overlay
- Image carousel with navigation
- Close button
- Desktop-only (disabled on mobile for better UX)

---

#### **AboutPage.jsx** (src/pages/AboutPage.jsx)
Static about/contact page.

**Content:**
- Personal introduction
- Skills and background
- Contact information
- Social media links

**Layout:**
- Centered container
- Typography components for structured content
- Links to email and Instagram

---

### Utility Functions

#### **projectId.js** (src/utils/projectId.js)
Utilities for safely escaping project IDs for use in URLs and HTML.

**Functions:**
- `escapeProjectId(id)` - Escapes special characters for safe HTML/URL usage
- `unescapeProjectId(id)` - Decodes escaped project IDs back to original

**Why needed:**
Project folder names may contain special characters that need escaping for:
- URL hash fragments
- HTML id attributes
- Safe DOM queries

---

## Data Flow

### Data Generation Process

**1. Build Time (scripts/generate-data.js)**

The `generate-data.js` script runs during the build process:

```javascript
// Simplified flow
1. Scan public/portfolio/ directory
2. Find all category folders (3D, physical, etc.)
3. For each category:
   a. Find all project folders
   b. Read metadata.json from each project
   c. Find thumbnail image (thumbnail.webp or first image)
   d. Collect project data
4. Generate data.json with structure:
   {
     categories: [
       { name: "3D", projectCount: 5, ... },
       { name: "physical", projectCount: 7, ... }
     ],
     projects: [
       {
         id: "project-name",
         title: "Project Title",
         description: "...",
         category: "3D",
         thumbnail: "/portfolio_yarik/portfolio/3D/project-name/thumbnail.webp",
         images: ["img1.jpg", "img2.jpg"]
       },
       ...
     ]
   }
5. Write to public/data.json
```

**2. Runtime (React App)**

```
User loads page
      ↓
React app mounts
      ↓
HomePage fetches data.json
      ↓
Parse JSON
      ↓
Render categories sorted by project count
      ↓
Render CategorySection for each category
      ↓
Render ProjectThumbnail for each project
      ↓
User clicks project
      ↓
Navigate to CategoryPage
      ↓
CategoryPage opens lightbox with project images
```

### Metadata Structure

Each project must have a `metadata.json` file:

```json
{
  "title": "Project Title",
  "description": "Detailed description of the project...",
  "category": "3D"
}
```

**Optional fields:**
- `releaseVersion` - If using GitHub Releases for large files
- `youtubeUrl` - Embed YouTube video
- `externalLink` - Link to external portfolio site

---

## Build Process

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Generate data.json from portfolio folders
npm run generate-data

# 3. Start development server
npm run dev
# → Opens http://localhost:3000
# → Hot Module Replacement (HMR) enabled
```

### Production Build

```bash
# 1. Generate data.json
npm run generate-data

# 2. Build for production
npm run build
# → Compiles React app
# → Bundles assets
# → Outputs to dist/

# 3. Preview production build
npm run preview
```

### Build Configuration (vite.config.js)

```javascript
{
  base: '/portfolio_yarik/',  // GitHub Pages base path
  build: {
    outDir: 'dist'             // Output directory
  },
  server: {
    port: 3000,                // Dev server port
    open: true                 // Auto-open browser
  }
}
```

---

## Deployment Pipeline

### GitHub Actions Workflow (.github/workflows/deploy.yml)

**Trigger:**
- Push to `main` branch
- Manual workflow dispatch

**Jobs:**

**1. Build Job**
```yaml
- Checkout code
- Setup Node.js 20
- Install dependencies (npm ci)
- Generate portfolio data (npm run generate-data)
- Build site (npm run build)
- Upload dist/ artifact
```

**2. Deploy Job**
```yaml
- Download build artifact
- Deploy to GitHub Pages
```

**Permissions:**
- `contents: read` - Read repository
- `pages: write` - Write to GitHub Pages
- `id-token: write` - OIDC token for deployment

**Concurrency:**
- Only one deployment at a time
- Cancel in-progress deployments if new push

---

## Development Workflow

### Adding a New Project

**Option 1: Via GitHub Web UI (Non-technical)**

1. Go to repository on GitHub.com
2. Navigate to `public/portfolio/[category]/`
3. Click "Add file" → "Upload files"
4. Upload project folder with:
   - `metadata.json`
   - `images/` folder with images
5. Commit changes
6. Wait ~2-3 minutes for automatic deployment

**Option 2: Local Development (Technical)**

```bash
# 1. Create project folder
mkdir -p public/portfolio/3D/new-project/images

# 2. Create metadata.json
cat > public/portfolio/3D/new-project/metadata.json << EOF
{
  "title": "New Project",
  "description": "Description here",
  "category": "3D"
}
EOF

# 3. Add images to images/ folder

# 4. Generate data
npm run generate-data

# 5. Test locally
npm run dev

# 6. Commit and push
git add .
git commit -m "feat(portfolio): add new 3D project"
git push origin main
```

### Making Code Changes

**Branch Strategy:**
- `main` - Production branch (auto-deploys)
- `claude/[feature]-[session-id]` - AI-assisted development branches
- `feature/[name]` - Manual feature branches

**Commit Convention:**
```
<type>(<scope>): <subject>

Examples:
feat(components): add image zoom functionality
fix(navigation): resolve mobile menu issue
style(theme): update color palette
refactor(pages): simplify data fetching logic
docs(readme): update installation steps
```

**Pull Request Process:**
1. Create feature branch
2. Make changes
3. Test locally
4. Push to GitHub
5. Create PR to `main`
6. Wait for review
7. Merge to `main`
8. Automatic deployment

---

## Styling and Theming

### Theme Configuration (src/theme.js)

**Color Palette:**
```javascript
palette: {
  mode: "dark",
  primary: {
    main: "#E091CC",    // Pink accent
    light: "#F0A1DC",
    dark: "#C080B0"
  },
  secondary: {
    main: "#261F31",    // Dark purple background
    light: "#332A3F",
    dark: "#1A1522"
  },
  background: {
    default: "#261F31", // Page background
    paper: "#332A3F"    // Card background
  },
  text: {
    primary: "#E091CC",   // Primary text (pink)
    secondary: "#B080A0"  // Secondary text (muted pink)
  }
}
```

**Typography:**
- **Font Family:** Titillium Web (Google Fonts)
- **Fallbacks:** -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Headings:** Bold weights (600-700)
- **Body:** Regular weight (400)

**Component Overrides:**

**MuiCard:**
- Smooth box-shadow transition on hover
- Pink glow effect on hover: `rgba(224, 145, 204, 0.3)`

**MuiButton:**
- No text transform (preserves case)
- Font weight: 600

**Shape:**
- Border radius: 8px

### Responsive Breakpoints

Material-UI default breakpoints:
- **xs:** 0px - 600px (mobile)
- **sm:** 600px - 900px (tablet)
- **md:** 900px - 1200px (small desktop)
- **lg:** 1200px - 1536px (desktop)
- **xl:** 1536px+ (large desktop)

**Usage Example:**
```javascript
sx={{
  fontSize: { xs: '2rem', md: '4rem' },  // Responsive font size
  pt: { xs: 8, md: 12 }                   // Responsive padding
}}
```

---

## Performance Optimizations

### Implemented Optimizations

**1. Image Optimization**
- Future: Convert images to WebP format (script ready: optimize-images.js)
- Lazy loading via browser native loading="lazy"
- Responsive images with srcset (future enhancement)

**2. Code Splitting**
- Vite automatically splits code by route
- React Router lazy loading (can be implemented)

**3. Build Optimizations**
- Vite's fast HMR in development
- Tree-shaking unused code
- Minification of JS/CSS in production

**4. Data Loading**
- Single data.json fetch on HomePage
- Data cached in component state
- No redundant API calls

**5. GitHub Pages Optimizations**
- Static file serving (fast CDN)
- Gzip compression enabled by default
- Browser caching of assets

### Performance Metrics (Target)

From CLAUDE.md guidelines:
- **Lighthouse Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## Known Issues and Limitations

### Current Limitations

**1. Lightbox Mobile Experience**
- Lightbox is **disabled on mobile devices** (breakpoint: sm < 600px)
- Reason: Better UX on small screens to avoid touch conflicts
- Mobile users see projects but cannot open lightbox
- See: src/pages/CategoryPage.jsx (lightbox detection logic)

**2. Image Format**
- Images are currently served as uploaded (JPG/PNG)
- WebP conversion script exists but not integrated into CI/CD
- Future improvement: Auto-convert during build

**3. No Image Upload UI**
- Projects must be added via file system (GitHub UI or local)
- No CMS or admin panel
- Intended for technical/semi-technical users

**4. Search Functionality**
- No search or filter functionality
- Users must browse categories
- Could be added in future

**5. No Analytics**
- No visitor tracking or analytics
- Could add Google Analytics or privacy-friendly alternative

**6. Limited Metadata**
- metadata.json has minimal fields
- No tags, date, client info, etc.
- Could be expanded for richer data

### Git History Notes

Recent font changes (commits 5f35dc0 - 083fd2b):
- Multiple font experiments: Anton → Space Grotesk → PT Sans → Titillium Web
- Final choice: **Titillium Web** (current)

---

## Future Improvements

### Planned Enhancements

**1. Image Optimization Pipeline**
- Integrate optimize-images.js into GitHub Actions workflow
- Auto-convert all images to WebP on build
- Generate multiple sizes for responsive images
- Priority: High

**2. Project Filtering & Search**
- Add search bar to filter projects by title/description
- Tag system for projects
- Filter by category, tags, year
- Priority: Medium

**3. Blog/News Section**
- Add blog posts or news updates
- CMS integration (e.g., markdown files)
- RSS feed
- Priority: Low

**4. Enhanced About Page**
- Timeline of work/education
- Skills with proficiency levels
- Downloadable CV/resume
- Priority: Medium

**5. Contact Form**
- Form for visitors to send messages
- Email integration (Formspree, EmailJS, etc.)
- Spam protection
- Priority: Medium

**6. Accessibility Improvements**
- Keyboard navigation for lightbox
- Screen reader optimization
- Focus indicators
- ARIA labels audit
- Priority: High

**7. Performance Enhancements**
- Implement React.lazy() for route-based code splitting
- Service worker for offline support
- Prefetch/preload critical resources
- Priority: Medium

**8. Analytics & SEO**
- Add Google Analytics or Plausible
- Schema.org markup for projects
- Open Graph tags for social sharing
- Sitemap generation
- Priority: Medium

**9. Dark/Light Mode Toggle**
- User preference for theme
- System preference detection
- Smooth theme transition
- Priority: Low

**10. Internationalization (i18n)**
- Multi-language support
- Latvian + English
- Language switcher
- Priority: Low

---

## Troubleshooting Guide

### Common Development Issues

**Issue: "npm run dev" fails**
```bash
# Solution 1: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 2: Check Node.js version
node -v  # Should be 20+
```

**Issue: "No projects found" on homepage**
```bash
# Solution: Regenerate data.json
npm run generate-data

# Check if data.json exists
ls public/data.json

# Verify metadata.json files exist in project folders
find public/portfolio -name "metadata.json"
```

**Issue: Images not loading**
- Check image paths in browser console
- Verify images are in `project/images/` folder
- Ensure file extensions are lowercase
- Check vite.config.js base path matches deployment

**Issue: Build fails in GitHub Actions**
- Check Actions tab for error logs
- Common causes:
  - Missing metadata.json
  - Invalid JSON syntax
  - Missing portfolio/ folder
  - Node.js version mismatch

**Issue: Changes not deploying**
- Wait 2-3 minutes for deployment
- Check Actions tab for workflow status
- Clear browser cache (Ctrl+Shift+R)
- Verify push went to `main` branch

---

## API Reference

### Data Structure

**data.json Format:**

```typescript
interface PortfolioData {
  categories: Category[];
  projects: Project[];
}

interface Category {
  name: string;           // e.g., "3D"
  projectCount: number;   // Number of projects in category
}

interface Project {
  id: string;             // Folder name (unique identifier)
  title: string;          // From metadata.json
  description: string;    // From metadata.json
  category: string;       // From metadata.json
  thumbnail: string;      // Path to thumbnail image
  images: string[];       // Array of image filenames (not full paths)
}
```

**metadata.json Format:**

```typescript
interface ProjectMetadata {
  title: string;              // Required
  description: string;        // Required
  category: string;           // Required (must match folder name)
  releaseVersion?: string;    // Optional: GitHub release version
  youtubeUrl?: string;        // Optional: YouTube embed URL
  externalLink?: string;      // Optional: External link
}
```

---

## Environment Variables

Currently, the app uses no custom environment variables. Configuration is handled through:

- **vite.config.js** - Build configuration
- **src/theme.js** - Theme configuration
- **package.json** - Dependencies and scripts

**Vite Built-in Variables:**
- `import.meta.env.BASE_URL` - Base path ('/portfolio_yarik/')
- `import.meta.env.MODE` - 'development' or 'production'
- `import.meta.env.DEV` - Boolean, true in dev mode
- `import.meta.env.PROD` - Boolean, true in production

---

## Testing Strategy

### Current State
- No automated tests implemented yet
- Manual testing for each feature/change

### Recommended Testing Approach

**Unit Tests:**
- Component rendering (Jest + React Testing Library)
- Utility functions (projectId.js)
- Theme configuration

**Integration Tests:**
- Data fetching and rendering
- Navigation between pages
- Lightbox functionality

**E2E Tests:**
- User flows (Cypress or Playwright)
- Homepage → Category → Project flow
- Mobile responsiveness

**Accessibility Tests:**
- axe-core integration
- Keyboard navigation
- Screen reader compatibility

**Visual Regression:**
- Percy or Chromatic
- Detect unintended UI changes

---

## Contributing Guidelines

### Code Style

**JavaScript/React:**
- Use functional components (no class components)
- Use hooks for state and effects
- Prefer const over let
- Use arrow functions
- Destructure props

**File Naming:**
- Components: PascalCase (e.g., `HomePage.jsx`)
- Utilities: camelCase (e.g., `projectId.js`)
- Configs: kebab-case (e.g., `vite.config.js`)

**Component Structure:**
```javascript
// 1. Imports
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

// 2. Component definition
function MyComponent({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState(null);

  // 4. Event handlers
  const handleClick = () => { ... };

  // 5. Render
  return (
    <Box>
      <Typography>{prop1}</Typography>
    </Box>
  );
}

// 6. Export
export default MyComponent;
```

**Styling:**
- Use Material-UI's `sx` prop for component-specific styles
- Use theme tokens (colors, spacing) instead of hardcoded values
- Mobile-first responsive design

---

## Changelog

### Recent Changes

**2025-11-18:**
- Switched to Titillium Web font (commit 5f35dc0)
- Removed unused code and components (PR #17, commit 38e705f)

**2025-11-17:**
- Disabled lightbox on mobile devices (PR #16)
- Added contact information to footer (Instagram, email)
- Improved project ID escaping for safe URLs
- Enhanced text visibility on project thumbnails

**2025-11-16:**
- Switched from Card overflow to proper shadow handling
- Fixed animation issues
- Updated ProjectThumbnail to use Material-UI Card

**Earlier:**
- Initial project setup with React + Vite
- Material-UI integration
- Portfolio data generation system
- GitHub Pages deployment
- Category and project page implementation

---

## Support and Contact

**Developer:** Yaroslav Volikov
**Email:** yarvol3d@gmail.com
**Instagram:** @yarvol
**GitHub:** https://github.com/Confucii

**Resources:**
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Last Updated:** 2025-11-18
**Documentation Version:** 1.0.0
