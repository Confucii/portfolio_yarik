import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const THUMBNAIL_SIZE = 400; // Square thumbnails for grid
const WEBP_QUALITY = 85;

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  // Find all PNG/JPG images in portfolio folders
  const imagePatterns = [
    'portfolio/**/images/*.png',
    'portfolio/**/images/*.jpg',
    'portfolio/**/images/*.jpeg'
  ];

  let totalProcessed = 0;
  let totalSaved = 0;

  for (const pattern of imagePatterns) {
    const images = await glob(pattern, { nodir: true });

    for (const imagePath of images) {
      try {
        const dir = path.dirname(imagePath);
        const ext = path.extname(imagePath);
        const basename = path.basename(imagePath, ext);
        const webpPath = path.join(dir, `${basename}.webp`);

        // Get original size
        const originalStats = await fs.stat(imagePath);
        const originalSize = originalStats.size;

        // Convert to WebP
        await sharp(imagePath)
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpPath);

        const webpStats = await fs.stat(webpPath);
        const webpSize = webpStats.size;
        const saved = originalSize - webpSize;
        const savings = ((saved / originalSize) * 100).toFixed(1);

        console.log(`✓ ${imagePath}`);
        console.log(`  → ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savings}% smaller)\n`);

        totalProcessed++;
        totalSaved += saved;
      } catch (error) {
        console.error(`✗ Error processing ${imagePath}:`, error.message);
      }
    }
  }

  // Generate thumbnails from first image in each project
  console.log('\n📸 Generating project thumbnails...\n');

  const projectDirs = await glob('portfolio/*/*/', { });

  for (const projectDir of projectDirs) {
    try {
      // Find first image in project
      const images = await glob(`${projectDir}/images/*.{png,jpg,jpeg}`, { nodir: true });

      if (images.length === 0) {
        console.log(`⚠ No images found in ${projectDir}`);
        continue;
      }

      const firstImage = images[0];
      const thumbnailPath = path.join(projectDir, 'thumbnail.webp');

      // Create square thumbnail
      await sharp(firstImage)
        .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 90 })
        .toFile(thumbnailPath);

      console.log(`✓ Created thumbnail: ${thumbnailPath}`);
    } catch (error) {
      console.error(`✗ Error creating thumbnail for ${projectDir}:`, error.message);
    }
  }

  console.log(`\n✨ Optimization complete!`);
  console.log(`   Processed: ${totalProcessed} images`);
  console.log(`   Total saved: ${formatBytes(totalSaved)}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

optimizeImages().catch(console.error);
