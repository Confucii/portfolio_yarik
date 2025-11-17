# GitHub Releases Workflow - Complete Guide

This portfolio uses **GitHub Releases** to host large image files, keeping the repository lightweight while providing fast CDN delivery for your portfolio images.

## Overview

### What Gets Stored Where

| Content | Location | Size |
|---------|----------|------|
| **Thumbnails** | Git Repository | Small (~50-100KB each) |
| **Metadata** | Git Repository | Tiny (~1KB each) |
| **Full Images** | GitHub Releases | Large (your original files) |
| **Website Code** | Git Repository | Small |

### Benefits

✅ **Small repository** - Fast clones, easy backups
✅ **Fast loading** - Thumbnails load instantly, full images on demand
✅ **Free hosting** - GitHub provides CDN for release assets
✅ **Easy updates** - Just upload new releases when you add projects
✅ **No backend needed** - 100% static, works with GitHub Pages

---

## Initial Setup (One-Time)

### Step 1: Organize Your Portfolio Files

Create this structure locally:

```
my-portfolio/
├── 3D/
│   ├── book_of_the_damned/
│   │   ├── metadata.json
│   │   └── images/
│   │       ├── image1.png
│   │       ├── image2.png
│   │       └── image3.png
│   ├── another_project/
│   │   ├── metadata.json
│   │   └── images/
│   │       └── ...
├── WebDesign/
│   └── ...
└── Photography/
    └── ...
```

### Step 2: Create metadata.json Files

Each project needs a `metadata.json`:

```json
{
  "title": "Book of the Damned",
  "description": "My first 3D I've ever made. Starting from objects and materials, i made full scene.",
  "category": "3D"
}
```

**Important:** Do NOT add `releaseVersion` or `images` fields yet - these will be added later.

### Step 3: Copy Projects to Repository

```bash
# Copy your organized folders to the portfolio directory
cp -r my-portfolio/* portfolio/
```

Or use GitHub web UI:
1. Go to your repo → `portfolio/` folder
2. Upload each category folder with its projects

### Step 4: Optimize Images and Create Thumbnails

```bash
npm install
npm run optimize-images
```

This will:
- Convert PNG/JPG → WebP (50-80% smaller)
- Create square thumbnails for each project
- Keep original files intact

### Step 5: Prepare Files for GitHub Release

```bash
npm run prepare-release
```

This creates a `releases/` folder with:
- All your images renamed for GitHub Releases
- `UPLOAD_INSTRUCTIONS.md` - How to upload
- `UPDATE_METADATA.md` - How to update metadata files
- `release-info.json` - List of all files

**File naming:** Images are renamed from `image1.png` to `3D_book_of_the_damned_image1.png` so they're unique across all projects.

### Step 6: Upload to GitHub Releases

#### Option A: Web UI (Recommended)

1. Go to https://github.com/Confucii/portfolio_yarik/releases
2. Click "Draft a new release"
3. Fill in:
   - Tag: `v20250117` (date format: YYYYMMDD)
   - Title: "Portfolio Images v20250117"
   - Description: "Initial portfolio images"
4. Drag all files from `releases/` folder into the upload area
5. Click "Publish release"

####  Option B: GitHub CLI

```bash
gh release create v20250117 \
  --title "Portfolio Images v20250117" \
  --notes "Initial portfolio images" \
  releases/*.{png,jpg,jpeg}
```

### Step 7: Update Metadata Files

Open the generated `releases/UPDATE_METADATA.md` file - it will have exact instructions for each project.

For each project, update `metadata.json` to add:

```json
{
  "title": "Book of the Damned",
  "description": "...",
  "category": "3D",
  "releaseVersion": "v20250117",
  "images": [
    "image1.png",
    "image2.png",
    "image3.png"
  ]
}
```

**Key points:**
- `releaseVersion`: Must match your GitHub Release tag exactly
- `images`: List filenames (original names, not the renamed ones)

### Step 8: Commit Everything

```bash
# Add thumbnail files and metadata
git add portfolio/
git commit -m "Add portfolio projects with GitHub Releases integration"
git push
```

**Note:** Original full-size images are NOT committed (they're in .gitignore). Only thumbnails and metadata are committed.

### Step 9: Deploy

Merge to `main` branch - GitHub Actions will:
1. Run `npm run generate-data`
2. Build the site
3. Deploy to GitHub Pages

Your site will now load:
- Thumbnails from the repository (fast)
- Full images from GitHub Releases (CDN)

---

## Adding New Projects Later

When you want to add a new project:

### Method 1: Quick Update (Recommended for Single Projects)

1. **Create project folder locally**
   ```
   portfolio/3D/my_new_project/
   ├── metadata.json (without releaseVersion yet)
   └── images/
       ├── img1.png
       └── img2.png
   ```

2. **Upload thumbnail + metadata to repo**
   ```bash
   npm run optimize-images  # Creates thumbnail
   git add portfolio/3D/my_new_project/metadata.json
   git add portfolio/3D/my_new_project/thumbnail.webp
   git commit -m "Add new project metadata"
   git push
   ```

3. **Prepare and upload images to SAME release**
   ```bash
   npm run prepare-release
   ```

   Then:
   - Go to your existing release (e.g., v20250117)
   - Click "Edit release"
   - Upload the new image files from `releases/`
   - Save

4. **Update metadata with release info**
   ```json
   {
     "title": "My New Project",
     "description": "...",
     "category": "3D",
     "releaseVersion": "v20250117",  ← Same release
     "images": ["img1.png", "img2.png"]
   }
   ```

5. **Commit and push**
   ```bash
   git add portfolio/3D/my_new_project/metadata.json
   git commit -m "Update metadata for new project"
   git push
   ```

### Method 2: Bulk Update (Multiple Projects)

If adding many projects at once, create a new release:

1. Add all projects to `portfolio/`
2. Run `npm run prepare-release`
3. Create NEW release with new version (e.g., `v20250118`)
4. Upload all files
5. Update all new projects to use new `releaseVersion`

---

## Folder Structure Explained

```
portfolio_yarik/
├── portfolio/                      # Your projects (in repo)
│   ├── 3D/
│   │   ├── book_of_the_damned/
│   │   │   ├── metadata.json      # ✅ IN REPO (small)
│   │   │   ├── thumbnail.webp     # ✅ IN REPO (auto-generated)
│   │   │   └── images/
│   │   │       ├── img1.png       # ❌ NOT IN REPO (in releases)
│   │   │       └── img1.webp      # ❌ NOT IN REPO (generated, ignored)
├── releases/                       # ❌ NOT IN REPO (local only)
│   ├── 3D_book_of_the_damned_img1.png  # Files ready for upload
│   ├── UPLOAD_INSTRUCTIONS.md
│   └── UPDATE_METADATA.md
└── data.json                       # ❌ NOT IN REPO (auto-generated)
```

---

## How It Works

### 1. User Visits Homepage

```
Homepage → Loads data.json
         → Shows category cards
```

### 2. User Clicks Category

```
Category Page → Loads data.json
              → Displays project thumbnails (from repo, fast!)
```

### 3. User Clicks Project

```
Project Page → Loads data.json
             → Reads project.images array
             → Each image.url points to GitHub Release
             → Images load from:
               https://github.com/Confucii/portfolio_yarik/releases/download/v20250117/3D_project_image1.png
```

### Data Flow

```json
// data.json structure
{
  "projects": [
    {
      "id": "book_of_the_damned",
      "title": "Book of the Damned",
      "category": "3D",
      "thumbnail": "/portfolio_yarik/portfolio/3D/book_of_the_damned/thumbnail.webp",
      "images": [
        {
          "name": "image1.png",
          "url": "https://github.com/Confucii/portfolio_yarik/releases/download/v20250117/3D_book_of_the_damned_image1.png",
          "source": "release"
        }
      ],
      "releaseVersion": "v20250117",
      "imageSource": "release"
    }
  ]
}
```

---

## Troubleshooting

### Images not loading (404 errors)

**Check:**
1. Release is published (not draft)
2. `releaseVersion` in metadata matches release tag exactly
3. Image filenames in `images` array match original names
4. Files were uploaded with correct naming convention

**Test URL manually:**
```
https://github.com/Confucii/portfolio_yarik/releases/download/v20250117/3D_projectname_imagename.png
```

### Thumbnails not showing

**Check:**
1. Did you run `npm run optimize-images`?
2. Did you commit `thumbnail.webp` files?
3. Check browser console for errors

### "No images found" when running scripts

**Check:**
1. Images are in `portfolio/CATEGORY/PROJECT/images/` folder
2. Image extensions are lowercase (.png, not .PNG)
3. `metadata.json` exists in project folder

### Release upload fails

**Solutions:**
- Upload in smaller batches (e.g., 20-30 files at a time)
- Use GitHub CLI instead of web UI
- Check file size limits (2GB per file max)

---

## Tips & Best Practices

### Image Management

1. **Keep originals safe** - Store originals outside the repo
2. **Optimize before uploading** - Run optimize-images first
3. **Use consistent naming** - Lowercase, no spaces
4. **Reasonable sizes** - Max 5MB per image recommended

### Release Management

1. **One release for all projects** - Unless you're updating frequently
2. **Date-based versions** - v20250117 (YYYYMMDD) is clear
3. **Don't delete old releases** - Projects may reference them
4. **Document changes** - Use release descriptions to note what's new

### Repository Management

1. **Commit thumbnails** - They're small and load fast
2. **Don't commit full images** - They're in .gitignore
3. **Generate data before pushing** - Run `npm run generate-data`
4. **Test locally first** - Use `npm run dev` to preview

---

## Advanced: CI/CD Automation

For advanced users, you can automate release creation:

```yaml
# .github/workflows/upload-to-release.yml
name: Upload Images to Release

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Release version (e.g., v20250117)'
        required: true

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run prepare-release
      - name: Create Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh release create ${{ inputs.version }} \
            --title "Portfolio Images ${{ inputs.version }}" \
            --notes "Automated release" \
            releases/*.{png,jpg,jpeg}
```

---

## Summary

**Simple workflow:**
1. Create project folders with metadata.json + images
2. Run `npm run optimize-images` → creates thumbnails
3. Run `npm run prepare-release` → prepares files
4. Upload files to GitHub Release
5. Update metadata.json with releaseVersion + images list
6. Commit metadata + thumbnails
7. Push → automatic deployment

**Result:** Fast, scalable portfolio with free hosting and CDN delivery!

---

## Need Help?

- See `releases/UPLOAD_INSTRUCTIONS.md` after running prepare-release
- See `releases/UPDATE_METADATA.md` for exact metadata formats
- Check main `README.md` for general documentation
- See `QUICK_START.md` for non-technical guide

**Questions?** Open an issue on GitHub.
