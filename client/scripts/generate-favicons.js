const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Make sure you have ImageMagick installed on your system
// For Ubuntu: sudo apt-get install imagemagick
// For macOS: brew install imagemagick
// For Windows: https://imagemagick.org/script/download.php

const publicDir = path.join(__dirname, '../client/public');
const faviconSvg = path.join(publicDir, 'favicon.svg');
const outputDir = publicDir;

// Create necessary directories if they don't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating favicons from SVG...');

// Generate favicon.ico (multiple sizes in one file)
exec(`convert -background none -density 256x256 ${faviconSvg} -define icon:auto-resize=64,48,32,16 ${path.join(outputDir, 'favicon.ico')}`, (error) => {
  if (error) {
    console.error(`Error generating favicon.ico: ${error}`);
    return;
  }
  console.log('favicon.ico generated successfully');
});

// Generate logo192.png
exec(`convert -background none -density 384x384 ${faviconSvg} -resize 192x192 ${path.join(outputDir, 'logo192.png')}`, (error) => {
  if (error) {
    console.error(`Error generating logo192.png: ${error}`);
    return;
  }
  console.log('logo192.png generated successfully');
});

// Generate logo512.png
exec(`convert -background none -density 1024x1024 ${faviconSvg} -resize 512x512 ${path.join(outputDir, 'logo512.png')}`, (error) => {
  if (error) {
    console.error(`Error generating logo512.png: ${error}`);
    return;
  }
  console.log('logo512.png generated successfully');
});

// Generate apple-touch-icon.png
exec(`convert -background none -density 384x384 ${faviconSvg} -resize 180x180 ${path.join(outputDir, 'apple-touch-icon.png')}`, (error) => {
  if (error) {
    console.error(`Error generating apple-touch-icon.png: ${error}`);
    return;
  }
  console.log('apple-touch-icon.png generated successfully');
});

// Generate og-image.jpg
exec(`convert -background "#3B82F6" -density 1024x1024 ${faviconSvg} -resize 1200x630 -gravity center -extent 1200x630 ${path.join(outputDir, 'og-image.jpg')}`, (error) => {
  if (error) {
    console.error(`Error generating og-image.jpg: ${error}`);
    return;
  }
  console.log('og-image.jpg generated successfully');
});

console.log('Favicon generation complete!');