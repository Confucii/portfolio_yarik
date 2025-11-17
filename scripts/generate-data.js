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

      // Determine image source strategy
      const releaseVersion = metadata.releaseVersion || null;
      const useReleases = releaseVersion !== null;

      // Build image URLs
      let imageList = [];
      let thumbnailUrl = null;

      if (useReleases) {
        // Images hosted on GitHub Releases
        // Expected URL pattern: https://github.com/USER/REPO/releases/download/VERSION/CATEGORY_PROJECT_filename.ext
        const baseReleaseUrl = `https://github.com/${GITHUB_REPO}/releases/download/${releaseVersion}`;

        // Read image list from metadata if provided, otherwise use found images
        const imageFiles = metadata.images || images.map(img => path.basename(img));

        imageList = imageFiles.map(filename => {
          // If it's already a full path, extract just the filename
          const fname = typeof filename === 'string' ? filename : filename.name || filename;
          const basename = path.basename(fname);
          const releaseFilename = `${category}_${projectFolder}_${basename}`;

          return {
            name: basename,
            url: `${baseReleaseUrl}/${releaseFilename}`,
            source: 'release'
          };
        });

        // Thumbnail from releases: use specified thumbnail or first image
        if (metadata.thumbnail) {
          // User specified a thumbnail filename
          const thumbnailFilename = `${category}_${projectFolder}_${metadata.thumbnail}`;
          thumbnailUrl = `${baseReleaseUrl}/${thumbnailFilename}`;
        } else if (imageList.length > 0) {
          // Use first image as thumbnail
          thumbnailUrl = imageList[0].url;
        }
      } else {
        // Images in repository (development/fallback mode)
        imageList = images.map(img => ({
          name: path.basename(img),
          url: `/portfolio_yarik/${img}`,
          source: 'repo'
        }));

        // Check for local thumbnail
        const thumbnailPatterns = [
          `${PORTFOLIO_DIR}/${category}/${projectFolder}/thumbnail.webp`,
          `${PORTFOLIO_DIR}/${category}/${projectFolder}/thumbnail.jpg`,
          `${PORTFOLIO_DIR}/${category}/${projectFolder}/thumbnail.png`
        ];

        for (const pattern of thumbnailPatterns) {
          try {
            await fs.access(pattern);
            thumbnailUrl = `/portfolio_yarik/${pattern}`;
            break;
          } catch {
            continue;
          }
        }

        // Fallback to first image if no thumbnail found
        if (!thumbnailUrl && imageList.length > 0) {
          thumbnailUrl = imageList[0].url;
        }
      }

      // Build project object
      const project = {
        id: projectFolder,
        title: metadata.title || projectFolder,
        description: metadata.description || '',
        category: category,
        path: `${PORTFOLIO_DIR}/${category}/${projectFolder}`,
        // Thumbnail from releases or repo
        thumbnail: thumbnailUrl,
        images: imageList,
        releaseVersion: releaseVersion,
        imageSource: useReleases ? 'release' : 'repo'
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
