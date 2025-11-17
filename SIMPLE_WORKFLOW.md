# Simple Portfolio Workflow

Everything is stored in the GitHub repository. No external services, no complex setups - just Git!

---

## Quick Start

### 1. Organize Your Portfolio

Create this structure:

```
portfolio/
├── 3D/
│   ├── book_of_the_damned/
│   │   ├── metadata.json
│   │   └── images/
│   │       ├── render1.png
│   │       ├── render2.png
│   │       └── render3.png
│   └── another_project/
│       └── ...
├── WebDesign/
│   └── ...
└── Photography/
    └── ...
```

### 2. Create metadata.json

Each project needs one file:

```json
{
  "title": "Book of the Damned",
  "description": "My first 3D I've ever made. Starting from objects and materials, i made full scene.",
  "category": "3D"
}
```

**Optional field:**
```json
{
  "title": "Book of the Damned",
  "description": "...",
  "category": "3D",
  "thumbnail": "render2.png"
}
```

If you don't specify `thumbnail`, the first image (alphabetically) is used.

### 3. Add Everything to Git

```bash
git add portfolio/
git commit -m "Add new portfolio projects"
git push
```

That's it! GitHub Actions will:
1. Scan your folders
2. Generate data.json
3. Build the site
4. Deploy to GitHub Pages

---

## Optional: Optimize Images

Want smaller file sizes? Run this **before committing**:

```bash
npm install
npm run optimize-images
```

This converts PNG/JPG → WebP (50-80% smaller).

**You can commit:**
- Just original files (PNG/JPG)
- Just WebP files
- Both (site will use WebP, with PNG/JPG as fallback)

---

## File Size Limits

**GitHub Repository:**
- Total repo size: Up to 5GB
- Individual file: Up to 100MB
- Your 126MB total: ✅ Perfect!

**Recommendations:**
- Keep individual images under 10MB each
- Optimize large PNGs with `npm run optimize-images`
- Use JPG for photos, PNG for graphics with transparency

---

## Updating Your Portfolio

### Add a New Project

1. Create folder structure:
   ```
   portfolio/Photography/sunset_series/
   ├── metadata.json
   └── images/
       ├── sunset1.jpg
       └── sunset2.jpg
   ```

2. Commit and push:
   ```bash
   git add portfolio/Photography/sunset_series/
   git commit -m "Add sunset series project"
   git push
   ```

3. Done! Auto-deploys in ~2 minutes.

### Update Existing Project

1. Edit metadata.json or add/remove images
2. Commit and push
3. Done!

### Delete a Project

1. Delete the project folder
2. Commit and push
3. Done!

---

## Non-Technical Users: GitHub Web UI

Don't want to use Git commands? Use GitHub's website:

### Upload New Project

1. Go to https://github.com/Confucii/portfolio_yarik
2. Navigate to `portfolio/` → your category folder
3. Click "Add file" → "Upload files"
4. Drag your entire project folder
5. Write commit message: "Add new project: [name]"
6. Click "Commit changes"
7. Wait 2-3 minutes → Site updates!

### Edit Metadata

1. Navigate to the metadata.json file
2. Click the pencil icon (Edit)
3. Make your changes
4. Click "Commit changes"
5. Done!

---

## How It Works

### Build Process

```
Push to GitHub
    ↓
GitHub Actions runs
    ↓
npm run generate-data (scans folders)
    ↓
vite build (builds site)
    ↓
Deploy to GitHub Pages
    ↓
Live at: https://confucii.github.io/portfolio_yarik/
```

### Data Generation

The `generate-data` script:
1. Finds all `metadata.json` files
2. Scans each project's `images/` folder
3. Creates `data.json` with all project info
4. Site reads `data.json` to display portfolio

### Image Loading

- **Thumbnails**: First image from each project (or specified in metadata)
- **Full images**: Loaded from the same repo
- **CDN**: GitHub Pages uses CDN for fast delivery worldwide
- **Caching**: Browsers cache images for repeat visits

---

## Folder Structure

```
portfolio_yarik/
├── portfolio/                   # Your projects
│   ├── 3D/
│   │   └── book_of_the_damned/
│   │       ├── metadata.json    ✅ Committed
│   │       └── images/          ✅ Committed (all images!)
│   │           ├── img1.png     ✅ Committed
│   │           └── img2.png     ✅ Committed
│   ├── WebDesign/
│   └── Photography/
├── scripts/
│   ├── generate-data.js         # Scans portfolio folders
│   └── optimize-images.js       # Optional: PNG→WebP
├── index.html                   # Homepage
├── category.html                # Category page template
├── project.html                 # Project detail page
├── about.html                   # About page
├── styles.css                   # Styling
└── data.json                    # Auto-generated (not committed)
```

---

## Scripts Reference

### `npm run generate-data`

Scans `portfolio/` folders and creates `data.json`.

**Automatically runs** during `npm run build` (GitHub Actions).

**Manually run** if you want to test locally:
```bash
npm run generate-data
npm run dev
```

### `npm run optimize-images`

Converts PNG/JPG to WebP format (optional).

**Run before committing** if you want smaller files:
```bash
npm run optimize-images
git add portfolio/
git commit -m "Optimize images to WebP"
git push
```

### `npm run dev`

Start local development server:
```bash
npm install
npm run generate-data
npm run dev
```

Visit: http://localhost:3000

### `npm run build`

Build for production (same as GitHub Actions):
```bash
npm run build
npm run preview  # Preview built site
```

---

## Common Questions

### Do I need to run any scripts?

**No!** Just commit your files. GitHub Actions runs everything automatically.

**Optional:** Run `npm run optimize-images` locally before committing if you want smaller file sizes.

### What if my images are huge?

**Optimize them:**
```bash
npm run optimize-images
```

Or use external tools:
- [TinyPNG](https://tinypng.com/) - Online compression
- Photoshop/GIMP - Save for web
- ImageOptim (Mac) / FileOptimizer (Windows)

### Can I organize images in subfolders?

Currently no - all images must be directly in the `images/` folder:

```
✅ portfolio/3D/project/images/img1.png
❌ portfolio/3D/project/images/renders/img1.png
```

(Could be added if needed - let me know!)

### How do I specify thumbnail?

Add to `metadata.json`:
```json
{
  "title": "My Project",
  "description": "...",
  "category": "3D",
  "thumbnail": "best_render.png"
}
```

Otherwise, the first image (alphabetically) is used.

### What image formats are supported?

- PNG
- JPG / JPEG
- WebP (if you run optimize-images)

---

## Troubleshooting

### "File is too large" error

Individual files can't exceed 100MB.

**Solutions:**
1. Compress the image
2. Run `npm run optimize-images` to convert to WebP
3. Use lower quality JPG export
4. Split very large images

### Images not loading

**Check:**
1. Files are in `images/` folder (not subfolder)
2. Filenames don't have special characters or spaces
3. Extensions are lowercase (.png not .PNG)
4. metadata.json is valid JSON (use JSONLint.com to validate)

### Site not updating after push

**Wait 2-3 minutes** for GitHub Actions to complete.

**Check:**
1. Go to "Actions" tab on GitHub
2. See if workflow is running or failed
3. If failed, click to see error message

**Common fixes:**
- Invalid JSON in metadata.json
- Missing metadata.json file
- Typo in category name

---

## Benefits of This Approach

✅ **Super simple** - Just commit files, no external services
✅ **Fast** - GitHub Pages CDN is worldwide
✅ **Free** - Forever (for public repos)
✅ **Reliable** - GitHub's 99.9% uptime
✅ **No maintenance** - No external accounts to manage
✅ **Version controlled** - Full history of all changes
✅ **Easy rollback** - Revert any change via Git
✅ **Non-technical friendly** - Upload via web UI

---

## Next Steps

1. **Organize your 126MB** into the portfolio structure
2. **Create metadata.json** for each project
3. **Commit everything** to your repository
4. **Push** to GitHub
5. **Wait 2-3 minutes** for deployment
6. **Visit** your live portfolio!

Need help? See README.md for more details or ask questions in GitHub Issues!
