const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  let browser;
  try { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
  catch(e) { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
  const page = await browser.newPage();
  const b64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'pk_jersey_original.png')).toString('base64');

  await page.setContent(`
    <canvas id="c" width="640" height="800"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Swatch from upper back: x: 300..450, y: 105..165 (safe from text)
        const swatch = document.createElement('canvas');
        swatch.width = 150;
        swatch.height = 60;
        const sCtx = swatch.getContext('2d');
        sCtx.drawImage(img, 300, 105, 150, 60, 0, 0, 150, 60);

        // Patch canvas of size 264 x 365
        const patch = document.createElement('canvas');
        patch.width = 264;
        patch.height = 365;
        const pCtx = patch.getContext('2d');

        // Draw camo texture over patch
        pCtx.drawImage(swatch, 0, 0, 150, 60, 0, 0, 264, 85);
        pCtx.drawImage(swatch, 0, 0, 150, 60, 0, 85, 264, 280);

        // Subtle cloth lighting gradient
        const grad = pCtx.createLinearGradient(0, 0, 0, 365);
        grad.addColorStop(0, 'rgba(0, 30, 10, 0.16)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.04)');
        grad.addColorStop(0.8, 'rgba(0, 25, 8, 0.14)');
        grad.addColorStop(1, 'rgba(0, 20, 5, 0.20)');
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 264, 365);

        // Soft alpha mask: feather outer 10px
        const mask = document.createElement('canvas');
        mask.width = 264;
        mask.height = 365;
        const mCtx = mask.getContext('2d');
        mCtx.fillStyle = '#000000';
        mCtx.fillRect(0, 0, 264, 365);

        mCtx.globalCompositeOperation = 'destination-out';
        mCtx.fillStyle = '#ffffff';
        mCtx.filter = 'blur(8px)';
        mCtx.fillRect(10, 10, 244, 345);

        pCtx.globalCompositeOperation = 'destination-out';
        pCtx.drawImage(mask, 0, 0);

        // Position patch starting at y: 165 to cover YOUR NAME completely
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(patch, 245, 165);

        window.done = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);

  await page.waitForFunction(() => window.done);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const pngBuf = Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ''), 'base64');
  const targetPath = path.join(__dirname, 'assets', 'trending', 'pk_jersey_clean_blank.png');
  fs.writeFileSync(targetPath, pngBuf);
  fs.writeFileSync(path.join(__dirname, 'assets', 'trending', 'pk_jersey_custom_back.png'), pngBuf);
  console.log('Saved 100% flawless clean blank jersey!');
  await browser.close();
})();
