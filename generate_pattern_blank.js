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

        // Swatch from upper back above YOUR NAME: x: 320..440, y: 110..205
        const swatch = document.createElement('canvas');
        swatch.width = 120;
        swatch.height = 95;
        const sCtx = swatch.getContext('2d');
        sCtx.drawImage(img, 320, 110, 120, 95, 0, 0, 120, 95);

        const pattern = ctx.createPattern(swatch, 'repeat');

        // Draw pattern over YOUR NAME (x: 250..505, y: 230..285)
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(248, 230, 258, 55, 12);
        ctx.fillStyle = pattern;
        ctx.fill();

        // Draw pattern over 00 (x: 260..495, y: 295..520)
        ctx.beginPath();
        ctx.roundRect(260, 295, 235, 225, 20);
        ctx.fillStyle = pattern;
        ctx.fill();

        // Subtle gradient overlay matching jersey shadow
        const grad = ctx.createLinearGradient(0, 230, 0, 520);
        grad.addColorStop(0, 'rgba(0, 30, 10, 0.15)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        grad.addColorStop(1, 'rgba(0, 20, 5, 0.20)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(248, 230, 258, 55, 12);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(260, 295, 235, 225, 20);
        ctx.fill();

        ctx.restore();
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
  console.log('Saved assets/trending/pk_jersey_clean_blank.png with clean pattern from upper back!');
  await browser.close();
})();
