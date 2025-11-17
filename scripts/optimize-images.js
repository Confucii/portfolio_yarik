import sharp from "sharp";
import { glob } from "glob";
import path from "path";
import fs from "fs/promises";

const WEBP_QUALITY = 85;

async function optimizeImages() {
  console.log("🖼️  Optimizing images to WebP format...\n");
  console.log(
    "ℹ️  This is OPTIONAL - run only if you want smaller file sizes for releases.\n"
  );
  console.log("   Original PNG/JPG files will be preserved.\n");

  // Find all PNG/JPG images in portfolio folders
  const imagePatterns = [
    "public/portfolio/**/images/*.png",
    "public/portfolio/**/images/*.jpg",
    "public/portfolio/**/images/*.jpeg",
  ];

  let totalProcessed = 0;
  let totalSaved = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const pattern of imagePatterns) {
    const images = await glob(pattern, { nodir: true });

    for (const imagePath of images) {
      // Skip if WebP version already exists
      const ext = path.extname(imagePath);
      const basename = path.basename(imagePath, ext);
      const webpPath = path.join(path.dirname(imagePath), `${basename}.webp`);

      try {
        // Check if WebP already exists
        try {
          await fs.access(webpPath);
          console.log(`⏭  Skipping ${imagePath} (WebP exists)`);
          continue;
        } catch {
          // WebP doesn't exist, proceed with conversion
        }

        // Get original size
        const originalStats = await fs.stat(imagePath);
        const originalSize = originalStats.size;

        // Convert to WebP
        await sharp(imagePath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

        const webpStats = await fs.stat(webpPath);
        const webpSize = webpStats.size;
        const saved = originalSize - webpSize;
        const savings = ((saved / originalSize) * 100).toFixed(1);

        console.log(`✓ ${imagePath}`);
        console.log(
          `  → ${formatBytes(originalSize)} → ${formatBytes(
            webpSize
          )} (${savings}% smaller)\n`
        );

        totalProcessed++;
        totalSaved += saved;
        totalOriginalSize += originalSize;
        totalWebpSize += webpSize;
      } catch (error) {
        console.error(`✗ Error processing ${imagePath}:`, error.message);
      }
    }
  }

  if (totalProcessed === 0) {
    console.log(
      "\n⚠️  No images to optimize (all WebP versions already exist)"
    );
    console.log("   Delete .webp files if you want to regenerate them.\n");
    return;
  }

  console.log(`\n✨ Optimization complete!`);
  console.log(`   Images processed: ${totalProcessed}`);
  console.log(`   Original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`   WebP size: ${formatBytes(totalWebpSize)}`);
  console.log(
    `   Total saved: ${formatBytes(totalSaved)} (${(
      (totalSaved / totalOriginalSize) *
      100
    ).toFixed(1)}%)\n`
  );
  console.log("💡 Next steps:");
  console.log("   1. Review the .webp files to ensure quality is acceptable");
  console.log("   2. Decide which format to upload to GitHub Releases:");
  console.log("      - Upload WebP files (smaller, faster loading)");
  console.log("      - Upload original PNG/JPG files (maximum quality)");
  console.log("      - Upload both (users get WebP, fallback to original)\n");
  console.log("   3. Run: npm run prepare-release");
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

optimizeImages().catch(console.error);
