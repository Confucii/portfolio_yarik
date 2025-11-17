# Portfolio Workflow - Simple Guide

Your portfolio uses **GitHub Releases** to host ALL images. The repository only contains `metadata.json` files - no images!

---

## Quick Overview

**What goes where:**
- ✅ **GitHub Releases** - ALL your images (126MB)
- ✅ **Git Repository** - Only metadata.json files (~1KB each)
- ✅ **GitHub Pages** - Built website (HTML/CSS/JS)

**Benefits:**
- Repository stays tiny (only JSON files)
- Free unlimited bandwidth from GitHub CDN
- Easy to manage with your 126MB of materials
- No complex build process

---

## Initial Setup (First Time)

### Step 1: Organize Your Folders

Take your 3 folders with subfolders and organize them:

```
portfolio/
├── 3D/                          ← Your first category
│   ├── book_of_the_damned/
│   │   ├── metadata.json
│   │   └── images/
│   │       ├── image1.png
│   │       ├── image2.png
│   │       └── image3.png
│   └── another_project/
│       └── ...
├── WebDesign/                   ← Your second category
│   └── ...
└── Photography/                 ← Your third category
    └── ...
```

### Step 2: Create metadata.json Files

Convert your `.txt` metadata to `.json` format:

**Before (metadata.txt):**
```
{ "title":"Book of the damned", "description":"My first 3D I've ever made...", "path":"book_of_the_damned", "category":"3D", }
```

**After (metadata.json):**
```json
{
  "title": "Book of the damned",
  "description": "My first 3D I've ever made. Starting from objects and materials, i made full scene. Sure now i can make this project better, but this work is important to me as a reminder of where i started.",
  "category": "3D"
}
```

**Important:** Don't add `releaseVersion` or `images` yet - those come in Step 5.

### Step 3 (Optional): Optimize Images

If you want smaller file sizes for faster loading:

```bash
npm install
npm run optimize-images
```

This converts PNG/JPG → WebP (50-80% smaller). **This is optional!**

You can choose to upload:
- Original PNG/JPG files (maximum quality)
- Optimized WebP files (smaller, faster)
- Both (best of both worlds)

### Step 4: Prepare for Upload

```bash
npm run prepare-release
```

This creates a `releases/` folder with:
- All your images renamed: `3D_book_of_the_damned_image1.png`
- `UPLOAD_INSTRUCTIONS.md` - How to upload
- `UPDATE_METADATA.md` - What to add to each metadata.json
- `release-info.json` - Full manifest

### Step 5: Upload to GitHub Releases

#### Option A: Web UI (Easiest)

1. Go to https://github.com/Confucii/portfolio_yarik/releases
2. Click "Draft a new release"
3. Fill in:
   - **Tag:** `v20250117` (today's date: YYYYMMDD)
   - **Title:** "Portfolio Images v20250117"
   - **Description:** "Initial portfolio images - 126MB across all projects"
4. **Drag ALL files** from the `releases/` folder
5. Click "Publish release"
6. Done! ✅

#### Option B: GitHub CLI

```bash
gh release create v20250117 \
  --title "Portfolio Images v20250117" \
  --notes "Initial portfolio images" \
  releases/*
```

### Step 6: Update Metadata Files

Open `releases/UPDATE_METADATA.md` - it has exact formats for each project.

Update each `metadata.json` to add:

```json
{
  "title": "Book of the damned",
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

**Optional - Specify thumbnail:**

```json
{
  "title": "Book of the damned",
  "description": "...",
  "category": "3D",
  "releaseVersion": "v20250117",
  "thumbnail": "image2.png",
  "images": [
    "image1.png",
    "image2.png",
    "image3.png"
  ]
}
```

If you don't specify `thumbnail`, the first image is used.

### Step 7: Commit Only Metadata

```bash
# Add only metadata.json files (images are ignored)
git add portfolio/

# Verify - should only show metadata.json files
git status

# Commit
git commit -m "Add portfolio projects with GitHub Releases"

# Push
git push
```

**Note:** Your images are NOT committed - they're in `.gitignore` and hosted on GitHub Releases!

### Step 8: Deploy

Merge to `main` → GitHub Actions automatically:
1. Runs `npm run generate-data`
2. Builds site with Vite
3. Deploys to GitHub Pages

Your portfolio is now live! 🎉

---

## How It Works

### When a user visits your site:

1. **Homepage** → Loads `data.json`
2. **Category page** → Shows project cards with thumbnails from releases
3. **Project page** → Loads full images from GitHub Releases

### The URLs:

**Thumbnail (first image):**
```
https://github.com/Confucii/portfolio_yarik/releases/download/v20250117/3D_book_of_the_damned_image1.png
```

**Full images:**
```
https://github.com/Confucii/portfolio_yarik/releases/download/v20250117/3D_book_of_the_damned_image2.png
https://github.com/Confucii/portfolio_yarik/releases/download/v20250117/3D_book_of_the_damned_image3.png
```

All served via GitHub's fast CDN!

---

## Adding New Projects

### Method 1: Add to Existing Release

Perfect for adding 1-2 new projects:

1. **Create project folder locally:**
   ```
   portfolio/Photography/sunset_series/
   ├── metadata.json (without releaseVersion yet)
   └── images/
       ├── sunset1.jpg
       └── sunset2.jpg
   ```

2. **Prepare for upload:**
   ```bash
   npm run prepare-release
   ```

3. **Add to SAME release:**
   - Go to your release (e.g., v20250117)
   - Click "Edit release"
   - Upload new files from `releases/`
   - Save

4. **Update metadata.json:**
   ```json
   {
     "title": "Sunset Series",
     "description": "...",
     "category": "Photography",
     "releaseVersion": "v20250117",  ← Same version!
     "images": ["sunset1.jpg", "sunset2.jpg"]
   }
   ```

5. **Commit and push:**
   ```bash
   git add portfolio/Photography/sunset_series/metadata.json
   git commit -m "Add sunset series project"
   git push
   ```

### Method 2: New Release

For many new projects or major updates:

1. Add all new projects to `portfolio/`
2. Run `npm run prepare-release`
3. Create **NEW** release: `v20250118`
4. Upload all files
5. Update metadata with new `releaseVersion`
6. Commit and push

---

## Repository Structure

```
portfolio_yarik/
├── portfolio/
│   ├── 3D/
│   │   ├── book_of_the_damned/
│   │   │   ├── metadata.json      ✅ IN REPO (committed)
│   │   │   └── images/            ❌ NOT IN REPO (ignored)
│   │   │       ├── img1.png       ❌ Only on GitHub Releases
│   │   │       └── img2.png       ❌ Only on GitHub Releases
│   ├── WebDesign/
│   └── Photography/
├── releases/                       ❌ NOT IN REPO (local only)
│   ├── 3D_book_of_the_damned_img1.png
│   ├── UPLOAD_INSTRUCTIONS.md
│   └── UPDATE_METADATA.md
├── index.html                      ✅ IN REPO
├── styles.css                      ✅ IN REPO
└── data.json                       ❌ NOT IN REPO (auto-generated)
```

---

## Common Questions

### Do I need to optimize images?

**No!** It's optional. You can upload original PNG/JPG files directly.

`npm run optimize-images` is only if you want smaller file sizes (WebP format).

### What if I have different file formats?

The scripts support:
- `.png`
- `.jpg` / `.jpeg`
- `.webp`

All will be processed and uploaded to releases.

### Can I organize images in subfolders?

Currently, all images must be in the `images/` folder directly. Subfolders are not supported (but could be added if needed).

### How do I specify which image to use as thumbnail?

Add `"thumbnail": "filename.png"` to your metadata.json. Otherwise, the first image in the `images` array is used.

### Can I use this with private repositories?

Yes! GitHub Releases work with private repos too. Just note that release assets for private repos have bandwidth limits.

---

## Troubleshooting

### "No images found" when running prepare-release

**Fix:**
- Images must be in `portfolio/CATEGORY/PROJECT/images/` folder
- Extensions must be lowercase (.png not .PNG)
- metadata.json must exist

### Images not loading on site (404 errors)

**Check:**
1. Release is published (not draft)
2. `releaseVersion` in metadata matches release tag exactly
3. Filenames in `images` array match your actual files
4. Test URL manually in browser

### Repository is too large

**Check:**
- Are images being committed? They shouldn't be!
- Run `git status` - should only show metadata.json files
- Check `.gitignore` includes `portfolio/**/images/`

---

## Summary

**Simple 3-step workflow:**

1. **Organize** - Put images in folders, create metadata.json
2. **Upload** - Run prepare-release → upload to GitHub Releases
3. **Deploy** - Update metadata → commit → auto-deploy

**Result:** Tiny repository, fast loading, free hosting, easy updates!

---

## Need Help?

- **Technical details:** See `GITHUB_RELEASES_WORKFLOW.md`
- **Non-technical guide:** See `QUICK_START.md`
- **General info:** See `README.md`
- **Upload help:** See `releases/UPLOAD_INSTRUCTIONS.md` (after running prepare-release)

Questions? Open an issue on GitHub!
