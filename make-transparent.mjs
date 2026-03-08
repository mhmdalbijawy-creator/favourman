import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

// Run with: node make-transparent.mjs
async function execute() {
    try {
        const inputPath = 'public/logo.png';
        const outputPath = 'public/logo.png';

        const image = await loadImage(inputPath);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Loop through pixels and make white/near-white transparent
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Very bright pixels (near white) will be made transparent
            // but we can preserve the gold which is usually around (212, 175, 55) or similar mid-tones
            if (r > 240 && g > 240 && b > 240) {
                // Completely transparent
                data[i + 3] = 0;
            } else if (r > 200 && g > 200 && b > 200) {
                // Soft edge: fade out pixels that are light but not pure white (anti-aliasing)
                const brightness = (r + g + b) / 3;
                // If brightness is 240 -> alpha 0, if 200 -> alpha 255
                // Map [200, 240] to [255, 0]
                const factor = Math.max(0, Math.min(1, (240 - brightness) / 40));
                data[i + 3] = Math.floor(255 * factor);
            }
        }

        ctx.putImageData(imageData, 0, 0);

        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputPath, buffer);
        console.log("Successfully removed white background and updated logo.png");
    } catch (err) {
        console.error("Error processing image:", err);
    }
}

execute();
