// Génère un QR code PNG par vignoble dans /qr.
// Changez BASE_URL quand le site est en ligne (ou : BASE_URL=https://… node generate-qr.js).
const BASE_URL = process.env.BASE_URL || 'https://xjamie007.github.io/vinea';

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const vineyards = require('./data/vineyards.json');
const outDir = path.join(__dirname, 'qr');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const id of Object.keys(vineyards)) {
    const url = `${BASE_URL.replace(/\/$/, '')}/vineyard.html?id=${encodeURIComponent(id)}`;
    const file = path.join(outDir, `${id}.png`);
    await QRCode.toFile(file, url, {
      width: 800,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#234A3A', light: '#FFFFFF' },
    });
    console.log(`${file}  →  ${url}`);
  }
})();
