import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const PORTFOLIO_DIR = 'portfolio';
const OUTPUT_FILE = 'data.json';
const GITHUB_REPO = 'Confucii/portfolio_yarik'; // Will be used for release URLs

async function generateData() {
  console.log('📊 Scanning portfolio folders...\n');

  const categories = new Map();
  const projects = [];

  // Find all metadata.json files
  const metadataFiles = await glob(`${PORTFOLIO_DIR}/*/*/metadata.json`);

  console.log(`Found ${metadataFiles.length} projects\n`);

  for (const metadataPath of metadataFiles) {
    try {
      // Read metadata
      const content = await fs.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(content);

      // Extract category and project path
      const parts = metadataPath.split(path.sep);
      const category = parts[1]; // portfolio/CATEGORY/project
      const projectFolder = parts[2];

      // Find all images in project
      const imagePatterns = [
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.webp`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.png`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.jpg`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/*.jpeg`
      ];

      let images = [];
      for (const pattern of imagePatterns) {
        const found = await glob(pattern);
        images.push(...found);
      }

      // Prefer WebP versions
      images = images.filter((img, idx, arr) => {
        const basename = path.basename(img, path.extname(img));
        const webpVersion = arr.find(i => i.includes(`${basename}.webp`));
        if (webpVersion && !img.endsWith('.webp')) {
          return false;
        }
        return true;
      });

      // Check for thumbnail
      const thumbnailPatterns = [
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/thumbnail.webp`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/thumbnail.jpg`,
        `${PORTFOLIO_DIR}/${category}/${projectFolder}/thumbnail.png`
      ];

      let thumbnail = null;
      for (const pattern of thumbnailPatterns) {
        try {
          await fs.access(pattern);
          thumbnail = pattern;
          break;
        } catch {
          continue;
        }
      }

      // Build project object
      const project = {
        id: projectFolder,
        title: metadata.title || projectFolder,
        description: metadata.description || '',
        category: category,
        path: `${PORTFOLIO_DIR}/${category}/${projectFolder}`,
        thumbnail: thumbnail || (images.length > 0 ? images[0] : null),
        images: images.map(img => ({
          path: img,
          // For GitHub Releases: use placeholder that will be replaced
          url: `/portfolio_yarik/${img}`
        })),
        // Support for GitHub Releases URLs (can be updated later)
        releaseVersion: metadata.releaseVersion || null
      };

      projects.push(project);

      // Track category
      if (!categories.has(category)) {
        categories.set(category, {
          name: category,
          displayName: formatCategoryName(category),
          projectCount: 0
        });
      }
      categories.get(category).projectCount++;

      console.log(`✓ ${category}/${projectFolder} - ${metadata.title}`);
    } catch (error) {
      console.error(`✗ Error processing ${metadataPath}:`, error.message);
    }
  }

  // Build final data structure
  const data = {
    generated: new Date().toISOString(),
    categories: Array.from(categories.values()),
    projects: projects.sort((a, b) => a.title.localeCompare(b.title))
  };

  // Write data.json
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2));

  console.log(`\n✨ Generated ${OUTPUT_FILE}`);
  console.log(`   Categories: ${categories.size}`);
  console.log(`   Projects: ${projects.length}`);
}

function formatCategoryName(category) {
  // Convert folder names to display names
  // e.g., "3D" → "3D", "web-design" → "Web Design"
  return category
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

generateData().catch(console.error);
