# CLAUDE.md - AI Assistant Guide for portfolio_yarik

## Repository Overview

**Project Type:** Personal Portfolio Website
**Current State:** Initial setup - repository is in early development stage
**Primary Branch:** `main`
**Development Branch Pattern:** `claude/claude-md-*` for AI-assisted development

This is a personal portfolio repository for Yarik. The project is in its initial stages and ready for technology stack selection and implementation.

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
4. **Create initial components** (Header, Footer, Layout)
5. **Set up basic routing** and pages
6. **Configure deployment** (Vercel/Netlify)
7. **Test locally** before committing

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
**Last Updated:** 2025-11-17
**Next Review:** When major technology decisions are made

---

## Changelog

### 2025-11-17
- Initial CLAUDE.md creation
- Established development guidelines and conventions
- Defined project structure and technology stack options
- Set up Git workflow and commit conventions
- Added AI assistant best practices
