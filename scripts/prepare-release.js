import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const PORTFOLIO_DIR = 'portfolio';
const RELEASES_DIR = 'releases';

async function prepareRelease() {
  console.log('📦 Preparing images for GitHub Releases...\n');

  // Create releases directory
  await fs.mkdir(RELEASES_DIR, { recursive: true });

  // Suggested release version (today's date)
  const releaseVersion = `v${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;

  const releaseInfo = {
    version: releaseVersion,
    files: [],
    projects: []
  };

  // Get all projects
  const metadataFiles = await glob(`${PORTFOLIO_DIR}/*/*/metadata.json`);

  console.log(`Found ${metadataFiles.length} projects\n`);

  for (const metadataPath of metadataFiles) {
    try {
      // Read metadata
      const content = await fs.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(content);

      // Extract category and project path
      const parts = metadataPath.split(path.sep);
      const category = parts[1];
      const projectFolder = parts[2];

      console.log(`\n📂 Processing: ${category}/${projectFolder}`);

      // Find all images (PNG/JPG and optionally WebP if optimized)
      const imagePatterns = [
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.png`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.jpg`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.jpeg`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.webp`
      ];

      let images = [];
      for (const pattern of imagePatterns) {
        const found = await glob(pattern);
        images.push(...found);
      }

      if (images.length === 0) {
        console.log(`  ⚠ No images found`);
        continue;
      }

      const projectFiles = [];

      // Copy each image with release naming convention
      for (const imagePath of images) {
        const ext = path.extname(imagePath);
        const basename = path.basename(imagePath, ext);

        // Release filename: CATEGORY_PROJECT_originalname.ext
        const releaseFilename = `${category}_${projectFolder}_${basename}${ext}`;
        const releasePath = path.join(RELEASES_DIR, releaseFilename);

        // Copy file
        await fs.copyFile(imagePath, releasePath);

        const stats = await fs.stat(releasePath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

        console.log(`  ✓ ${releaseFilename} (${sizeMB} MB)`);

        projectFiles.push({
          original: path.basename(imagePath),
          release: releaseFilename,
          sizeMB: parseFloat(sizeMB)
        });

        releaseInfo.files.push({
          filename: releaseFilename,
          project: `${category}/${projectFolder}`,
          sizeMB: parseFloat(sizeMB)
        });
      }

      // Track project info
      releaseInfo.projects.push({
        category,
        name: projectFolder,
        title: metadata.title,
        imageCount: images.length,
        files: projectFiles,
        totalSizeMB: projectFiles.reduce((sum, f) => sum + f.sizeMB, 0).toFixed(2)
      });

    } catch (error) {
      console.error(`✗ Error processing ${metadataPath}:`, error.message);
    }
  }

  // Calculate totals
  const totalFiles = releaseInfo.files.length;
  const totalSizeMB = releaseInfo.files.reduce((sum, f) => sum + f.sizeMB, 0).toFixed(2);

  releaseInfo.summary = {
    totalProjects: releaseInfo.projects.length,
    totalFiles,
    totalSizeMB: parseFloat(totalSizeMB)
  };

  // Write release info JSON
  await fs.writeFile(
    path.join(RELEASES_DIR, 'release-info.json'),
    JSON.stringify(releaseInfo, null, 2)
  );

  // Generate upload instructions
  const instructions = generateInstructions(releaseInfo);
  await fs.writeFile(
    path.join(RELEASES_DIR, 'UPLOAD_INSTRUCTIONS.md'),
    instructions
  );

  // Generate metadata update instructions
  const metadataInstructions = generateMetadataInstructions(releaseInfo);
  await fs.writeFile(
    path.join(RELEASES_DIR, 'UPDATE_METADATA.md'),
    metadataInstructions
  );

  console.log(`\n✨ Release preparation complete!`);
  console.log(`   Version: ${releaseVersion}`);
  console.log(`   Projects: ${releaseInfo.projects.length}`);
  console.log(`   Files: ${totalFiles}`);
  console.log(`   Total size: ${totalSizeMB} MB`);
  console.log(`\n📁 All files are in the releases/ folder`);
  console.log(`📖 See releases/UPLOAD_INSTRUCTIONS.md for next steps`);
}

function generateInstructions(releaseInfo) {
  return `# GitHub Release Upload Instructions

## Release Information

**Version:** \`${releaseInfo.version}\`
**Projects:** ${releaseInfo.summary.totalProjects}
**Files:** ${releaseInfo.summary.totalFiles}
**Total Size:** ${releaseInfo.summary.totalSizeMB} MB

---

## Upload Methods

### Option 1: GitHub Web UI (Recommended)

1. **Go to your repository:**
   - Navigate to https://github.com/Confucii/portfolio_yarik

2. **Create a new release:**
   - Click "Releases" (right sidebar)
   - Click "Draft a new release"

3. **Configure the release:**
   - **Tag version:** \`${releaseInfo.version}\`
   - **Release title:** Portfolio Images ${releaseInfo.version}
   - **Description:**
     \`\`\`
     Portfolio project images - ${releaseInfo.summary.totalProjects} projects
     Total: ${releaseInfo.summary.totalFiles} images (${releaseInfo.summary.totalSizeMB} MB)

     ## Projects included:
${releaseInfo.projects.map(p => `     - ${p.category}/${p.name}: ${p.imageCount} images (${p.totalSizeMB} MB)`).join('\n')}
     \`\`\`

4. **Upload files:**
   - Click "Attach binaries by dropping them here or selecting them"
   - Select ALL files from the \`releases/\` folder
   - **Important:** Upload all ${releaseInfo.summary.totalFiles} files at once
   - Wait for upload to complete (may take several minutes)

5. **Publish:**
   - Click "Publish release"
   - Done! ✓

### Option 2: GitHub CLI (For Technical Users)

\`\`\`bash
# Create release and upload all files
gh release create ${releaseInfo.version} \\
  --title "Portfolio Images ${releaseInfo.version}" \\
  --notes "Portfolio images for ${releaseInfo.summary.totalProjects} projects" \\
  releases/*.{png,jpg,jpeg}

# Verify upload
gh release view ${releaseInfo.version}
\`\`\`

---

## Files to Upload

Total: ${releaseInfo.summary.totalFiles} files

${releaseInfo.projects.map(p => `
### ${p.category} - ${p.title}

Files (${p.imageCount} images, ${p.totalSizeMB} MB):
${p.files.map(f => `- \`${f.release}\` (${f.sizeMB} MB)`).join('\n')}
`).join('\n')}

---

## After Upload - Update Metadata

**IMPORTANT:** After uploading to releases, you need to update your project metadata files.

See \`UPDATE_METADATA.md\` for detailed instructions on updating each project's \`metadata.json\` file.

Quick summary: Add these fields to each metadata.json:
\`\`\`json
{
  "title": "Your Project",
  "description": "...",
  "category": "3D",
  "releaseVersion": "${releaseInfo.version}",
  "images": ["image1.png", "image2.png", ...]
}
\`\`\`

---

## Verification

After publishing the release, verify your files are accessible:

\`\`\`
https://github.com/Confucii/portfolio_yarik/releases/download/${releaseInfo.version}/[FILENAME]
\`\`\`

Example:
\`\`\`
https://github.com/Confucii/portfolio_yarik/releases/download/${releaseInfo.version}/${releaseInfo.files[0]?.filename || 'FILENAME'}
\`\`\`

---

## Troubleshooting

### Upload fails
- Files too large? Try uploading in smaller batches
- Network timeout? Try again or use GitHub CLI

### Files not showing
- Wait a few minutes for GitHub to process
- Check you used the exact tag: \`${releaseInfo.version}\`

### Wrong files uploaded
- Delete the release and start over
- Or create a new release with a new version number

---

**Need help?** See the main README.md or open an issue.
`;
}

function generateMetadataInstructions(releaseInfo) {
  return `# Update Metadata Files for GitHub Releases

After uploading images to GitHub Releases, you need to update each project's \`metadata.json\` file to point to the release.

## Quick Reference

**Release Version:** \`${releaseInfo.version}\`

---

## Projects to Update

${releaseInfo.projects.map(p => `
### ${p.category}/${p.name}

**File:** \`portfolio/${p.category}/${p.name}/metadata.json\`

**Add these fields:**
\`\`\`json
{
  "title": "${p.title}",
  "description": "...",
  "category": "${p.category}",
  "releaseVersion": "${releaseInfo.version}",
  "images": [
${p.files.map(f => `    "${f.original}"`).join(',\n')}
  ]
}
\`\`\`

**How to update:**
1. Open \`portfolio/${p.category}/${p.name}/metadata.json\`
2. Add the \`releaseVersion\` field: \`"${releaseInfo.version}"\`
3. Add the \`images\` array with the filenames above
4. Save the file
5. Commit and push to your repository
`).join('\n')}

---

## Automated Update (Alternative)

If you want to update all metadata files at once, you can use this script:

\`\`\`bash
# Run this in your terminal
npm run update-metadata-releases -- ${releaseInfo.version}
\`\`\`

This will automatically update all metadata.json files with the release version.

---

## After Updating

1. **Commit changes:**
   \`\`\`bash
   git add portfolio/
   git commit -m "Update metadata to use GitHub Releases ${releaseInfo.version}"
   git push
   \`\`\`

2. **Rebuild site:**
   \`\`\`bash
   npm run generate-data
   npm run build
   \`\`\`

3. **Deploy:**
   - Push to main branch
   - GitHub Actions will auto-deploy

Your portfolio will now load images from GitHub Releases!

---

## Verification

After deploying, check that:
- Thumbnails load (from repo)
- Full images load when clicking projects (from releases)
- Browser console shows no 404 errors

Test URL format:
\`\`\`
https://github.com/Confucii/portfolio_yarik/releases/download/${releaseInfo.version}/[CATEGORY]_[PROJECT]_[FILENAME]
\`\`\`
`;
}

prepareRelease().catch(console.error);
