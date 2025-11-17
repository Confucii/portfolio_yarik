# Yarik's Portfolio

A clean, modern portfolio website built with vanilla HTML/CSS/JS and hosted on GitHub Pages. Features automatic image optimization, GitHub Releases integration for large files, and a simple update workflow for non-technical users.

## Live Site

🌐 **[View Portfolio](https://confucii.github.io/portfolio_yarik/)**

## Features

- ✨ Clean, modern design with custom color scheme
- 📱 Fully responsive (mobile, tablet, desktop)
- 🖼️ Automatic image optimization (PNG → WebP)
- 🚀 GitHub Releases integration for hosting large files
- 📊 Automatic project scanning and data generation
- 🎨 Lightbox gallery for project images
- 🔄 Simple update workflow via GitHub web UI
- ⚡ Fast loading with lazy image loading
- 🎯 SEO-friendly structure

## Project Structure

```
portfolio_yarik/
├── portfolio/              # Your portfolio projects
│   ├── 3D/                # Category folders
│   │   ├── project1/      # Individual project folders
│   │   │   ├── metadata.json
│   │   │   ├── thumbnail.webp (auto-generated)
│   │   │   └── images/
│   │   │       ├── img1.png
│   │   │       ├── img1.webp (auto-generated)
│   │   │       └── ...
│   ├── WebDesign/
│   └── Photography/
├── public/                 # Static assets
│   ├── logo.svg
│   └── fonts/
├── scripts/                # Build scripts
│   ├── optimize-images.js
│   ├── generate-data.js
│   └── prepare-release.js
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml
├── index.html             # Homepage
├── category.html          # Category page template
├── project.html           # Project detail page
├── about.html             # About page
├── styles.css             # Stylesheet
└── data.json              # Auto-generated project index
```

## Getting Started

### Prerequisites

- Node.js 20+ installed
- Git installed
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Confucii/portfolio_yarik.git
   cd portfolio_yarik
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate data and start dev server**
   ```bash
   npm run generate-data
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`

## Adding New Projects (Non-Technical Guide)

### Step 1: Prepare Your Project Folder

1. Create a folder structure like this:
   ```
   portfolio/3D/my-new-project/
   ├── metadata.json
   └── images/
       ├── image1.png
       ├── image2.png
       └── image3.png
   ```

2. Create a `metadata.json` file with this content:
   ```json
   {
     "title": "My Awesome Project",
     "description": "A detailed description of what this project is about...",
     "category": "3D"
   }
   ```

### Step 2: Upload via GitHub Web UI

1. Go to your repository on GitHub.com
2. Navigate to the `portfolio/` folder
3. Click your category folder (e.g., `3D/`)
4. Click "Add file" → "Upload files"
5. Drag your entire project folder
6. Scroll down and write a commit message: "Add new project: [project name]"
7. Click "Commit changes"

### Step 3: Wait for Deployment

- GitHub Actions will automatically:
  - Optimize your images
  - Generate thumbnails
  - Update the website
  - Deploy to GitHub Pages
- This takes ~2-3 minutes
- Check the "Actions" tab to see progress

### Step 4: (Optional) Upload Large Files to Releases

If your images are very large (total > 50MB per project):

1. Run locally:
   ```bash
   npm run prepare-release
   ```

2. Follow instructions in `releases/UPLOAD_INSTRUCTIONS.md`

3. Go to GitHub → Releases → "Draft a new release"

4. Upload the ZIP files from `releases/` folder

5. Publish the release

## Available Scripts

### `npm run dev`
Starts local development server at `http://localhost:3000`

### `npm run build`
Builds the site for production to `dist/` folder

### `npm run generate-data`
Scans `portfolio/` folders and generates `data.json`

### `npm run optimize-images`
Converts PNGs to WebP and generates thumbnails

### `npm run prepare-release`
Packages images for GitHub Releases upload

## Metadata Format

Each project folder must contain a `metadata.json` file:

```json
{
  "title": "Project Title",
  "description": "Project description that appears on cards and project page",
  "category": "3D"
}
```

**Required fields:**
- `title`: Project name
- `description`: Brief description
- `category`: Must match the folder name (case-sensitive)

**Optional fields:**
- `releaseVersion`: If using GitHub Releases (e.g., "v20250117")

## Customization

### Changing Colors

Edit `styles.css`:
```css
:root {
  --color-primary: #261F31;    /* Dark purple background */
  --color-accent: #E091CC;     /* Pink accent */
  /* ... other colors */
}
```

### Changing Font

Replace SF Pro font references in `styles.css` with your preferred font.

### Updating About Page

Edit `about.html` directly - no build step needed!

### Adding Social Links

Edit footer section in each HTML file:
```html
<footer>
  <div class="container">
    <ul class="social-links">
      <li><a href="https://github.com/yourname">GitHub</a></li>
      <li><a href="https://linkedin.com/in/yourname">LinkedIn</a></li>
    </ul>
    <p>&copy; 2025 Yarik. All rights reserved.</p>
  </div>
</footer>
```

## GitHub Pages Setup

### First-Time Setup

1. Go to your repository settings
2. Navigate to "Pages" (left sidebar)
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Save changes

### Enable GitHub Actions

1. Go to "Settings" → "Actions" → "General"
2. Under "Workflow permissions":
   - Select **"Read and write permissions"**
3. Save

Your site will now deploy automatically on every push to `main`!

## Image Optimization

The build process automatically:

- **Converts** PNGs/JPGs → WebP (50-80% smaller)
- **Generates** square thumbnails (400x400px) for grid display
- **Preserves** original files for GitHub Releases
- **Lazy loads** images for faster page loading

### Manual Optimization

```bash
npm run optimize-images
```

This will:
- Create `.webp` versions of all images
- Generate `thumbnail.webp` for each project (uses first image)

## Troubleshooting

### "No projects found"

- Make sure `metadata.json` exists in each project folder
- Check that category names match folder names exactly
- Run `npm run generate-data` to rebuild data.json

### Images not loading

- Check file paths in browser console
- Ensure images are in `project/images/` folder
- Run `npm run optimize-images` if WebP files are missing
- Check that image file extensions are lowercase

### Build fails on GitHub Actions

- Check "Actions" tab for error messages
- Common issues:
  - Missing `metadata.json`
  - Invalid JSON syntax
  - Missing `portfolio/` folder

### Site not updating after push

- Wait 2-3 minutes for deployment
- Check "Actions" tab - workflow should be running
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Pages settings are correct

## Performance

### Lighthouse Scores (Target)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 95+

### Optimization Tips

1. **Keep images reasonable size**
   - Thumbnails: ~200KB max
   - Full images: ~500KB max
   - Use WebP format (auto-generated)

2. **Limit images per project**
   - Recommended: 5-15 images
   - More than 20 may slow loading

3. **Use GitHub Releases for large files**
   - Keeps repository size small
   - Faster cloning and builds

## Contributing

This is a personal portfolio, but suggestions and bug reports are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

© 2025 Yarik. All rights reserved.

## Support

Need help? Check:
- [GitHub Issues](https://github.com/Confucii/portfolio_yarik/issues)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Documentation](https://vitejs.dev)

---

**Built with ❤️ using HTML, CSS, JavaScript, and GitHub Pages**
