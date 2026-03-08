import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
// limit to 50mb because base64 images can be large
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/save', (req, res) => {
    const { name, base64 } = req.body;
    if (!name || !base64) return res.status(400).send('Missing name or base64');

    // remove data:image/png;base64,
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");

    const outPath = path.join('C:/Users/mhmda/OneDrive/Desktop/website.mo/public/assets/team', name);
    fs.writeFileSync(outPath, base64Data, 'base64');
    console.log('Saved:', name);
    res.send('Saved: ' + name);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
