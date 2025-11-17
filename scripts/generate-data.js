import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const PORTFOLIO_DIR = 'portfolio';
const OUTPUT_FILE = 'data.json';

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

      // Prefer WebP versions if they exist
      images = images.filter((img, idx, arr) => {
        const basename = path.basename(img, path.extname(img));
        const webpVersion = arr.find(i => i.includes(`${basename}.webp`));
        if (webpVersion && !img.endsWith('.webp')) {
          return false;
        }
        return true;
      });

      // Sort images by filename
      images.sort();

      // Build image URLs
      const imageList = images.map(img => ({
        name: path.basename(img),
        url: `/${img}`,
        path: img
      }));

      // Determine thumbnail
      let thumbnailUrl = null;
      if (metadata.thumbnail) {
        // User specified thumbnail
        const thumbnailPath = `${PORTFOLIO_DIR}/${category}/${projectFolder}/images/${metadata.thumbnail}`;
        thumbnailUrl = `/${thumbnailPath}`;
      } else if (imageList.length > 0) {
        // Use first image as thumbnail
        thumbnailUrl = imageList[0].url;
      }

      // Build project object
      const project = {
        id: projectFolder,
        title: metadata.title || projectFolder,
        description: metadata.description || '',
        category: category,
        path: `${PORTFOLIO_DIR}/${category}/${projectFolder}`,
        thumbnail: thumbnailUrl,
        images: imageList,
        imageCount: imageList.length,
        video: metadata.video || null
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

      console.log(`✓ ${category}/${projectFolder} - ${metadata.title} (${imageList.length} images)`);
    } catch (error) {
      console.error(`✗ Error processing ${metadataPath}:`, error.message);
    }
  }

  // Build final data structure
  const data = {
    generated: new Date().toISOString(),
    categories: Array.from(categories.values()),
    projects: projects.sort((a, b) => a.title.localeCompare(b.title)),
    totalProjects: projects.length,
    totalImages: projects.reduce((sum, p) => sum + p.imageCount, 0)
  };

  // Write data.json
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2));

  console.log(`\n✨ Generated ${OUTPUT_FILE}`);
  console.log(`   Categories: ${categories.size}`);
  console.log(`   Projects: ${projects.length}`);
  console.log(`   Total images: ${data.totalImages}`);
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
