const ffmpegStatic = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoPath = path.join(__dirname, '..', 'Digital_Earth_rotates_in_space_202606161927.mp4');
const outputDir = path.join(__dirname, '..', 'public', 'earth-sequence');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
} else {
  // Clear existing frames
  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

console.log('Starting frame extraction...');
console.log(`Video path: ${videoPath}`);
console.log(`Output directory: ${outputDir}`);

try {
  // Extract frames as WebP for optimal size/performance
  // Using 15 fps to keep the total number of frames manageable
  const command = `"${ffmpegStatic}" -i "${videoPath}" -vf fps=15 -c:v libwebp -q:v 80 "${path.join(outputDir, 'frame_%03d.webp')}"`;
  
  execSync(command, { stdio: 'inherit' });
  console.log('Frame extraction completed successfully!');
  
  // Count generated frames
  const generatedFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
  console.log(`Total frames generated: ${generatedFiles.length}`);
} catch (error) {
  console.error('Error extracting frames:', error);
  process.exit(1);
}
