import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

const PORTFOLIO_DIR = 'portfolio';
const RELEASES_DIR = 'releases';

async function prepareRelease() {
  console.log('📦 Preparing images for GitHub Releases...\n');

  // Create releases directory
  await fs.mkdir(RELEASES_DIR, { recursive: true });

  // Get all categories
  const categories = await glob(`${PORTFOLIO_DIR}/*/`, { });

  const releaseInfo = {
    version: new Date().toISOString().split('T')[0].replace(/-/g, ''),
    archives: []
  };

  for (const categoryPath of categories) {
    const category = path.basename(categoryPath);

    console.log(`\n📂 Processing category: ${category}`);

    // Get all projects in category
    const projects = await glob(`${categoryPath}/*/`, { });

    for (const projectPath of projects) {
      const projectName = path.basename(projectPath);

      // Find all original images (PNG/JPG)
      const images = await glob(`${projectPath}/images/*.{png,jpg,jpeg}`, { nodir: true });

      if (images.length === 0) {
        console.log(`  ⚠ No images in ${category}/${projectName}`);
        continue;
      }

      // Create zip archive for this project
      const archiveName = `${category}_${projectName}.zip`;
      const archivePath = path.join(RELEASES_DIR, archiveName);

      await createZip(images, archivePath, projectPath);

      // Get archive size
      const stats = await fs.stat(archivePath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

      console.log(`  ✓ Created ${archiveName} (${sizeMB} MB)`);

      releaseInfo.archives.push({
        category,
        project: projectName,
        archive: archiveName,
        imageCount: images.length,
        sizeMB: parseFloat(sizeMB)
      });
    }
  }

  // Write release info
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

  console.log(`\n✨ Release preparation complete!`);
  console.log(`   Archives created: ${releaseInfo.archives.length}`);
  console.log(`   Total size: ${releaseInfo.archives.reduce((sum, a) => sum + a.sizeMB, 0).toFixed(2)} MB`);
  console.log(`\n📖 See releases/UPLOAD_INSTRUCTIONS.md for next steps`);
}

async function createZip(files, outputPath, basePath) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);

    // Add files to archive
    for (const file of files) {
      const relativePath = path.relative(basePath, file);
      archive.file(file, { name: relativePath });
    }

    archive.finalize();
  });
}

function generateInstructions(releaseInfo) {
  return `# GitHub Releases Upload Instructions

## Overview

This release contains ${releaseInfo.archives.length} image archives for your portfolio projects.

**Release Version:** v${releaseInfo.version}

## Upload Steps

### Option 1: GitHub Web UI (Recommended for non-technical users)

1. Go to your repository on GitHub: https://github.com/Confucii/portfolio_yarik

2. Click on "Releases" (right sidebar)

3. Click "Draft a new release"

4. Fill in the release form:
   - **Tag version:** \`v${releaseInfo.version}\`
   - **Release title:** Portfolio Images v${releaseInfo.version}
   - **Description:**
     \`\`\`
     Portfolio project images
     - ${releaseInfo.archives.length} projects
     - ${releaseInfo.archives.reduce((sum, a) => sum + a.sizeMB, 0).toFixed(2)} MB total
     \`\`\`

5. Drag and drop ALL zip files from the \`releases/\` folder into the "Attach binaries" section

6. Click "Publish release"

7. Done! ✓

### Option 2: GitHub CLI (For technical users)

\`\`\`bash
# Create release
gh release create v${releaseInfo.version} \\
  --title "Portfolio Images v${releaseInfo.version}" \\
  --notes "Portfolio project images" \\
  releases/*.zip
\`\`\`

## Archives in this release

${releaseInfo.archives.map(a =>
  `- **${a.archive}** - ${a.project} (${a.imageCount} images, ${a.sizeMB} MB)`
).join('\n')}

## After Upload

Once uploaded, images will be available at:
\`\`\`
https://github.com/Confucii/portfolio_yarik/releases/download/v${releaseInfo.version}/[archive-name].zip
\`\`\`

Your website will automatically fetch images from these URLs!

---

**Need help?** See the main README.md for more information.
`;
}

// Check if archiver is available, if not provide helpful error
try {
  await import('archiver');
  prepareRelease().catch(console.error);
} catch (error) {
  console.error('❌ Error: archiver package not found');
  console.log('\n📦 Please install archiver:');
  console.log('   npm install --save-dev archiver');
  console.log('\nThen run this script again.');
  process.exit(1);
}
