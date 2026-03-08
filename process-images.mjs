import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/mhmda/OneDrive/Desktop/website.mo/public/assets/team/';
const files = ['ceo.png', 'chairman.png', 'dr-omer.jpg', 'manager.png'];

async function processImages() {
    for (const file of files) {
        console.log(`Processing ${file}...`);
        try {
            const inputPath = path.join(dir, file);
            // Ensure we specify the absolute path using file:// protocol for local access in this library
            const blob = await removeBackground('file://' + inputPath);
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const newName = file.split('.')[0] + '-nobg.png';
            fs.writeFileSync(path.join(dir, newName), buffer);
            console.log(`Saved ${newName}`);
        } catch (e) {
            console.error(`Failed ${file}`, e);
        }
    }
}

processImages();
