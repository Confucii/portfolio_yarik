# CLAUDE.md - AI Assistant Guide for portfolio_yarik

## Repository Overview

**Project Type:** Personal Portfolio Website
**Current State:** Initial setup - repository is in early development stage
**Primary Branch:** `main`
**Development Branch Pattern:** `claude/claude-md-*` for AI-assisted development
**Deployment URL:** https://yar-vol.github.io/portfolio/
**Base Path:** `/portfolio/` (GitHub Pages subpath deployment)

This is a personal portfolio repository for Yarik. The project is in its initial stages and ready for technology stack selection and implementation.

**IMPORTANT:** This portfolio is deployed to GitHub Pages at a subpath (`/portfolio/`), not at the root. All configurations must account for this base path to ensure assets, routing, and links work correctly.

---

## Repository Structure

### Current Structure
```
portfolio_yarik/
├── .git/              # Git version control
├── README.md          # Project readme
└── CLAUDE.md          # This file - AI assistant guide
```

### Expected Future Structure

When the technology stack is chosen, the structure will likely evolve to:

```
portfolio_yarik/
├── .github/           # GitHub workflows and configs
│   └── workflows/     # CI/CD pipelines
├── public/            # Static assets (images, fonts, etc.)
├── src/               # Source code
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── styles/        # CSS/styling files
│   ├── assets/        # Images, icons, etc.
│   ├── utils/         # Helper functions
│   └── data/          # Portfolio content (projects, experience, etc.)
├── tests/             # Test files
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts (if Node.js based)
├── README.md          # Project documentation
└── CLAUDE.md          # This file
```

---

## Technology Stack Considerations

### Recommended Options

#### Option 1: Next.js (React) Portfolio
**Best for:** Modern, SEO-friendly portfolio with server-side rendering
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS or CSS Modules
- **Deployment:** Vercel, Netlify
- **Key Features:** SSR/SSG, Image optimization, Fast page loads

#### Option 2: React + Vite
**Best for:** Fast development, simple deployment
- **Framework:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS or Styled Components
- **Deployment:** Vercel, Netlify, GitHub Pages

#### Option 3: Static HTML/CSS/JS
**Best for:** Simplicity, learning fundamentals
- **Languages:** HTML5, CSS3, Vanilla JavaScript
- **No build process needed
- **Deployment:** GitHub Pages, Netlify
- **Easy to understand and maintain

### Technology Decision Process

When a user requests to set up the portfolio, AI assistants should:

1. **Ask about preferences** if not specified:
   - What technologies are you comfortable with?
   - Do you need SEO optimization?
   - What hosting platform do you prefer?
   - Do you want a blog section?
   - What's your experience level?

2. **Propose appropriate stack** based on responses

3. **Set up complete project structure** with all necessary files

---

## GitHub Pages Subpath Configuration

**CRITICAL:** This portfolio deploys to `https://yar-vol.github.io/portfolio/`, which uses the `/portfolio/` base path. All frameworks must be configured to handle this subpath correctly.

### Why This Matters

When deploying to a GitHub Pages subpath (e.g., `/portfolio/`), the following issues occur without proper configuration:
- ❌ Assets (CSS, JS, images) fail to load (404 errors)
- ❌ Client-side routing breaks (incorrect URLs)
- ❌ Internal links point to wrong paths
- ❌ API calls use incorrect base URLs

### Configuration by Framework

#### Next.js Configuration

For Next.js, configure the base path in `next.config.js` or `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for GitHub Pages subpath deployment
  basePath: '/portfolio',
  assetPrefix: '/portfolio',

  // For static export (required for GitHub Pages)
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Optional: trailing slash for better compatibility
  trailingSlash: true,
}

module.exports = nextConfig
```

**Key points:**
- `basePath`: Adds `/portfolio` prefix to all pages and routes
- `assetPrefix`: Ensures all assets load from `/portfolio/` path
- `output: 'export'`: Generates static HTML (required for GitHub Pages)
- `images.unoptimized`: Disables Next.js Image Optimization (not available on static hosting)

**Testing locally with base path:**
```bash
npm run build
npm run start
# Visit http://localhost:3000/portfolio
```

#### Vite (React) Configuration

For Vite projects, configure the base path in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Required for GitHub Pages subpath deployment
  base: '/portfolio/',

  // Optional: build output directory
  build: {
    outDir: 'dist',
  },
})
```

**Key points:**
- `base`: Sets the public base path for all assets and routes
- Must include trailing slash: `/portfolio/`

**Using base path in code:**
```typescript
// For router (react-router-dom)
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter basename="/portfolio">
  <App />
</BrowserRouter>

// For asset imports
// Vite automatically handles this with the base config
import logo from './assets/logo.png' // Will resolve to /portfolio/assets/logo.png
```

**Testing locally with base path:**
```bash
npm run build
npm run preview
# Visit http://localhost:4173/portfolio
```

#### Static HTML/CSS/JS Configuration

For static sites without a build tool, manually prefix all paths:

**HTML file paths:**
```html
<!-- ❌ Wrong - Root-relative paths -->
<link rel="stylesheet" href="/styles/main.css">
<script src="/js/app.js"></script>
<img src="/images/logo.png" alt="Logo">

<!-- ✅ Correct - With base path -->
<link rel="stylesheet" href="/portfolio/styles/main.css">
<script src="/portfolio/js/app.js"></script>
<img src="/portfolio/images/logo.png" alt="Logo">

<!-- ✅ Alternative - Relative paths (preferred for static sites) -->
<link rel="stylesheet" href="./styles/main.css">
<script src="./js/app.js"></script>
<img src="./images/logo.png" alt="Logo">
```

**JavaScript paths:**
```javascript
// ❌ Wrong
fetch('/api/data.json')

// ✅ Correct - With base path
fetch('/portfolio/api/data.json')

// ✅ Best - Use relative paths or base URL variable
const BASE_PATH = '/portfolio'
fetch(`${BASE_PATH}/api/data.json`)
```

**CSS asset paths:**
```css
/* ❌ Wrong */
background-image: url('/images/bg.jpg');

/* ✅ Correct - With base path */
background-image: url('/portfolio/images/bg.jpg');

/* ✅ Best - Relative paths */
background-image: url('../images/bg.jpg');
```

### Router Configuration

If using client-side routing, configure the base path:

**React Router:**
```typescript
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      {/* Routes */}
    </BrowserRouter>
  )
}
```

**Vue Router:**
```javascript
const router = createRouter({
  history: createWebHistory('/portfolio/'),
  routes,
})
```

### GitHub Pages Deployment Setup

**1. Configure GitHub Pages:**
- Go to repository Settings → Pages
- Source: Deploy from a branch
- Branch: `main` (or `gh-pages`)
- Folder: `/ (root)` or `/docs` depending on build output location

**2. Build and Deploy Workflow:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist  # or ./out for Next.js

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Testing Base Path Configuration

**Checklist before deployment:**
- [ ] All assets load correctly (check browser DevTools Network tab)
- [ ] Navigation/routing works (no 404s)
- [ ] Images display properly
- [ ] CSS and JS files load
- [ ] Internal links work correctly
- [ ] Test with `npm run build` and preview locally

**Local testing:**
```bash
# Build the project
npm run build

# Preview the build (tests production build locally)
npm run preview  # Vite
# or
npm run start    # Next.js

# Visit http://localhost:XXXX/portfolio (note the /portfolio path)
```

### Common Path Issues & Solutions

**Issue 1: Assets return 404**
```
Problem: GET https://yar-vol.github.io/assets/logo.png → 404
Solution: Add base path → /portfolio/assets/logo.png
```

**Issue 2: Routing doesn't work**
```
Problem: Clicking links leads to 404 pages
Solution: Configure router basename to '/portfolio'
```

**Issue 3: Homepage shows blank page**
```
Problem: App loads but shows blank screen
Solution: Check console for asset loading errors, ensure base path is set
```

**Issue 4: Works locally but not on GitHub Pages**
```
Problem: Everything works on localhost but breaks on deployment
Solution: Test with npm run preview and visit localhost:XXXX/portfolio
```

### Environment-Specific Configuration

For applications that need different base paths in development vs production:

```typescript
// vite.config.ts
const base = process.env.NODE_ENV === 'production' ? '/portfolio/' : '/'

export default defineConfig({
  base,
  // ... other config
})
```

```javascript
// next.config.js
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio' : '',
  // ... other config
}
```

### Package.json Scripts

Add these scripts to make deployment easier:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

**Note:** The `gh-pages` package can automate deployment but requires additional setup. GitHub Actions (shown above) is the recommended approach.

---

## Development Workflows

### Git Workflow

#### Branch Strategy
- **Main branch:** `main` - production-ready code
- **Development branches:** `claude/claude-md-*` - AI-assisted feature development
- **Feature branches:** `feature/*` - specific feature development
- **Bug fixes:** `fix/*` - bug fix branches

#### Commit Message Conventions
Follow conventional commits format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples:**
```
feat(portfolio): add projects showcase section
fix(navbar): resolve mobile menu toggle issue
docs(readme): update installation instructions
style(components): format code with prettier
```

#### Push Protocol
Always push to the designated branch:
```bash
git push -u origin claude/claude-md-<session-id>
```

Network failures should be retried up to 4 times with exponential backoff (2s, 4s, 8s, 16s).

---

## Key Conventions for AI Assistants

### 1. Code Quality Standards

#### TypeScript/JavaScript
- Use TypeScript when possible for type safety
- Follow ESLint and Prettier configurations
- Prefer functional components over class components (React)
- Use modern ES6+ syntax
- Implement proper error handling
- Add JSDoc comments for complex functions

#### CSS/Styling
- Use consistent naming conventions (BEM, CSS Modules, or Tailwind)
- Ensure responsive design (mobile-first approach)
- Maintain accessibility standards (WCAG 2.1 AA)
- Optimize for performance (avoid unnecessary re-renders)

#### File Naming
- Components: PascalCase (e.g., `Header.tsx`, `ProjectCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`, `apiHelpers.ts`)
- Styles: kebab-case or match component (e.g., `header.module.css`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### 2. Portfolio-Specific Guidelines

#### Essential Sections
A portfolio should typically include:
1. **Hero/Landing** - Introduction and call-to-action
2. **About** - Personal background and skills
3. **Projects** - Showcase of work with descriptions and links
4. **Experience/Resume** - Work history and education
5. **Contact** - Contact form or information
6. **Footer** - Links and copyright

#### Content Structure
Store portfolio content in structured data files:
```typescript
// src/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  // Project data
];
```

#### Performance Considerations
- Optimize images (use WebP, lazy loading)
- Minimize bundle size
- Implement code splitting
- Use CDN for static assets
- Add loading states for dynamic content

### 3. Accessibility Requirements

All implementations must follow accessibility best practices:
- Semantic HTML elements
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- ARIA labels where necessary
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators for interactive elements

### 4. Responsive Design

Support these breakpoints:
```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
```

Test layouts at common device sizes:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

### 5. Security Best Practices

- Never commit sensitive data (.env files should be in .gitignore)
- Sanitize user inputs (contact forms)
- Use HTTPS for all external resources
- Implement Content Security Policy (CSP)
- Validate and sanitize data on both client and server
- Keep dependencies updated (use Dependabot)

### 6. Testing Strategy

When implementing features:
1. **Unit tests** for utilities and helpers
2. **Component tests** for UI components
3. **Integration tests** for user flows
4. **E2E tests** for critical paths (optional)
5. **Accessibility tests** with tools like axe-core

### 7. Documentation Standards

When making changes:
- Update README.md with setup instructions
- Document new components with comments
- Add inline comments for complex logic
- Update this CLAUDE.md when changing conventions
- Include examples in documentation

---

## Common Tasks & Workflows

### Setting Up a New Portfolio

When user requests to set up the portfolio:

1. **Confirm technology stack** (see Technology Stack Considerations)
2. **Create project structure**:
   ```bash
   # For Next.js
   npx create-next-app@latest . --typescript --tailwind --app

   # For React + Vite
   npm create vite@latest . -- --template react-ts
   ```
3. **Set up essential files**:
   - `.gitignore`
   - `tsconfig.json` (if TypeScript)
   - `.prettierrc` and `.eslintrc.json`
   - `README.md` with setup instructions
4. **CRITICAL: Configure base path for GitHub Pages** (see GitHub Pages Subpath Configuration section)
   - For Next.js: Add `basePath` and `assetPrefix` to `next.config.js`
   - For Vite: Add `base: '/portfolio/'` to `vite.config.ts`
   - For static sites: Use relative paths or prefix all paths with `/portfolio/`
5. **Create initial components** (Header, Footer, Layout)
6. **Set up basic routing** and pages (with basename if using router)
7. **Configure deployment** workflow (GitHub Actions)
8. **Test locally with base path** before committing (use `npm run preview`)

### Adding a New Section

1. **Create component** in `src/components/`
2. **Add data structure** in `src/data/` if needed
3. **Implement responsive design**
4. **Test accessibility**
5. **Update navigation** if new page
6. **Add to main layout** or route
7. **Test on multiple devices**
8. **Commit with descriptive message**

### Styling a Component

1. **Follow existing pattern** (Tailwind/CSS Modules/Styled Components)
2. **Mobile-first approach**
3. **Use design tokens** (colors, spacing) from config
4. **Test responsiveness** at all breakpoints
5. **Verify accessibility** (contrast, focus states)
6. **Optimize for performance** (avoid heavy animations)

### Optimizing Performance

1. **Analyze bundle size**: `npm run build -- --analyze` (if supported)
2. **Optimize images**: Convert to WebP, add lazy loading
3. **Code splitting**: Dynamic imports for large components
4. **Minimize CSS**: Remove unused styles
5. **Cache static assets**: Configure headers
6. **Test with Lighthouse**: Aim for 90+ scores

---

## Deployment Guidelines

### Pre-Deployment Checklist

Before deploying to production:
- [ ] **Base path configured** for `/portfolio/` (CRITICAL!)
  - [ ] Next.js: `basePath` and `assetPrefix` in next.config.js
  - [ ] Vite: `base: '/portfolio/'` in vite.config.ts
  - [ ] Router: `basename="/portfolio"` configured
- [ ] **Tested production build locally** with `npm run preview` at `/portfolio/` path
- [ ] All assets load correctly (check Network tab)
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Responsive on all device sizes
- [ ] Accessibility audit passed (Lighthouse)
- [ ] SEO meta tags configured
- [ ] Performance optimized (Lighthouse score 90+)
- [ ] Environment variables configured
- [ ] Analytics set up (if required)
- [ ] Contact form tested (if applicable)
- [ ] Cross-browser testing completed

### Recommended Hosting Platforms

**For Next.js:**
- **Vercel** (recommended) - Zero config deployment
- Netlify - Good alternative with edge functions

**For Static Sites:**
- **GitHub Pages** - Free for public repos
- Netlify - Excellent for static sites
- Vercel - Also supports static sites

### Continuous Deployment

Set up automatic deployments:
1. Connect repository to hosting platform
2. Configure build settings
3. Set environment variables
4. Enable automatic deployments on push to `main`
5. Configure preview deployments for PRs

---

## Content Guidelines

### Portfolio Projects

Each project should include:
- **Clear title** and brief description
- **Technologies used** (with icons if possible)
- **Your role** and contribution
- **Key features** or achievements
- **Live demo link** (if available)
- **GitHub repository** (if public)
- **Screenshot or demo video**
- **Challenges overcome** (optional)

### About Section

Should convey:
- Professional background
- Technical skills and expertise
- Personal interests (relevant to career)
- Current status (looking for work, open to opportunities, etc.)
- Contact preferences

### Contact Information

Provide multiple channels:
- Email address
- LinkedIn profile
- GitHub profile
- Twitter/X (optional)
- Contact form (recommended)

---

## Performance Benchmarks

Target metrics (Lighthouse):
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

Core Web Vitals:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## Troubleshooting Common Issues

### Build Failures
1. Check Node.js version compatibility
2. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Clear build cache
4. Check for TypeScript errors
5. Verify all imports are correct

### Styling Issues
1. Check CSS module naming
2. Verify Tailwind config if using Tailwind
3. Check for CSS specificity conflicts
4. Inspect element in browser DevTools
5. Test in different browsers

### Deployment Issues
1. Verify build command in platform settings
2. Check environment variables are set
3. Review build logs for errors
4. Ensure all dependencies are in package.json
5. Check Node.js version matches local

### Path Configuration Issues (GitHub Pages Subpath)
**Most common issue for this portfolio!**

1. **Assets not loading (404 errors)**
   - Check base path is configured (`/portfolio/`)
   - For Next.js: Verify `basePath` and `assetPrefix` in next.config.js
   - For Vite: Verify `base` in vite.config.ts
   - Check browser DevTools Network tab for failed requests

2. **Blank page after deployment**
   - Open browser console for errors
   - Usually caused by missing base path configuration
   - Test locally with `npm run preview` and visit `localhost:XXXX/portfolio`

3. **Router/Navigation not working**
   - Configure router basename: `<BrowserRouter basename="/portfolio">`
   - Verify all internal links include base path

4. **Works locally but breaks on GitHub Pages**
   - Development uses `/` but production needs `/portfolio/`
   - Test production build locally before deploying
   - Use environment-specific config (see GitHub Pages Subpath Configuration)

5. **Images/CSS showing but JS not working**
   - Check script tags have correct path
   - For static sites: verify all `<script src>` paths include `/portfolio/`
   - For bundled apps: check build output directory structure

---

## Future Enhancements Roadmap

Consider implementing:
- [ ] Dark mode toggle
- [ ] Blog section with CMS integration
- [ ] Animations and transitions (Framer Motion)
- [ ] Multi-language support (i18n)
- [ ] Advanced filtering for projects
- [ ] Testimonials section
- [ ] Skills visualization (charts/graphs)
- [ ] Download resume functionality
- [ ] Analytics integration (Google Analytics, Plausible)
- [ ] SEO optimization (schema.org markup)
- [ ] RSS feed for blog
- [ ] Newsletter signup
- [ ] Case studies for featured projects

---

## AI Assistant Best Practices

### Before Making Changes

1. **Understand the request fully** - Ask clarifying questions if needed
2. **Check existing code** - Read relevant files before making changes
3. **Follow established patterns** - Maintain consistency with existing code
4. **Plan the approach** - Use TodoWrite tool for complex tasks

### During Implementation

1. **Write clean code** - Follow conventions outlined in this document
2. **Test thoroughly** - Verify changes work as expected
3. **Consider edge cases** - Handle errors and unusual inputs
4. **Maintain accessibility** - Always test with keyboard and screen readers
5. **Optimize performance** - Avoid unnecessary re-renders and heavy computations

### After Implementation

1. **Review your code** - Check for issues before committing
2. **Test responsiveness** - Verify on different screen sizes
3. **Update documentation** - Modify README or this file if needed
4. **Write clear commit messages** - Follow conventional commits format
5. **Push to correct branch** - Use the designated development branch

### Code Review Self-Checklist

Before committing, verify:
- [ ] Code follows project conventions
- [ ] No unused imports or variables
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Component is responsive
- [ ] Accessibility requirements met
- [ ] Performance is acceptable
- [ ] Code is well-commented where needed
- [ ] No security vulnerabilities introduced
- [ ] Tests added/updated if applicable

---

## Resources & References

### Documentation
- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accessibility testing
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Bundlephobia](https://bundlephobia.com/) - Package size analysis

### Design Inspiration
- [Awwwards](https://www.awwwards.com/websites/portfolio/)
- [Dribbble](https://dribbble.com/tags/portfolio)
- [Behance](https://www.behance.net/search/projects?search=portfolio)

---

## Contact & Maintenance

**Repository Owner:** Yarik
**Last Updated:** 2025-11-18
**Next Review:** When major technology decisions are made

---

## Changelog

### 2025-11-18
- **CRITICAL UPDATE:** Added comprehensive GitHub Pages subpath configuration section
- Documented `/portfolio/` base path requirement for deployment
- Added framework-specific configuration (Next.js, Vite, Static HTML)
- Added router configuration examples (React Router, Vue Router)
- Added GitHub Actions deployment workflow example
- Updated troubleshooting section with path-related issues
- Updated pre-deployment checklist with base path verification
- Added common path issues and solutions
- Updated repository overview with deployment URL

### 2025-11-17
- Initial CLAUDE.md creation
- Established development guidelines and conventions
- Defined project structure and technology stack options
- Set up Git workflow and commit conventions
- Added AI assistant best practices
