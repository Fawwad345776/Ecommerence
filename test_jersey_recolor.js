const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
  const imgB64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'pk_cricket_tee.jpg')).toString('base64');
  const imgUri = `data:image/jpeg;base64,${imgB64}`;

  const res = await page.evaluate(async (uri) => {
    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = uri;
    });

    const w = img.naturalWidth || 1024;
    const h = img.naturalHeight || 1024;

    function process(mode) {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        // Is this pixel the emerald green jersey fabric?
        // In green fabric: g is significantly higher than r and b, and not neutral grey (diff > 15)
        const isGreenFabric = (g > r * 1.15 && g > b * 1.08 && (g - r) > 18);

        if (isGreenFabric) {
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (mode === 'black') {
            // Convert green to sleek deep onyx black, preserving shadow/highlights
            const v = Math.min(255, Math.max(12, Math.round(lum * 0.28)));
            d[i] = v;
            d[i + 1] = v;
            d[i + 2] = v + 2; // subtle cool undertone
          } else if (mode === 'white') {
            // Convert green to crisp pure white, preserving folds/shading
            const v = Math.min(255, Math.round(215 + (lum / 255) * 38));
            d[i] = v;
            d[i + 1] = v;
            d[i + 2] = v;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      return canvas.toDataURL('image/jpeg', 0.93);
    }

    return {
      blackData: process('black'),
      whiteData: process('white')
    };
  }, imgUri);

  const blackBuf = Buffer.from(res.blackData.split(',')[1], 'base64');
  const whiteBuf = Buffer.from(res.whiteData.split(',')[1], 'base64');

  fs.writeFileSync(path.join(__dirname, 'assets', 'trending', 'pk_cricket_tee_black.jpg'), blackBuf);
  fs.writeFileSync(path.join(__dirname, 'assets', 'trending', 'pk_cricket_tee_white.jpg'), whiteBuf);

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  fs.writeFileSync(path.join(artifactsDir, 'test_pixel_black_jersey.jpg'), blackBuf);
  fs.writeFileSync(path.join(artifactsDir, 'test_pixel_white_jersey.jpg'), whiteBuf);

  console.log('Saved pixel recolor for black and white jersey!');
  await browser.close();
})();
