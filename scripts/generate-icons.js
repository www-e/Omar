const sharp = require('sharp');
const path = require('path');

async function generateIcons() {
  const sizes = [192, 512];
  const inputImage = path.join(process.cwd(), 'public', 'profile.jpg');

  for (const size of sizes) {
    await sharp(inputImage)
      .resize(size, size)
      .toFormat('png')
      .toFile(path.join(process.cwd(), 'public', 'icons', `icon-${size}x${size}.png`));
  }

  console.log('✅ PWA icons generated successfully');
}

generateIcons().catch(console.error); 