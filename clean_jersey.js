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

  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  const imgPath = path.join(__dirname, 'assets', 'trending', 'pk_jersey_custom_back.png');
  const imgB64 = fs.readFileSync(imgPath).toString('base64');

  await page.setContent(`
    <canvas id="c" width="640" height="800"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Sample texture from lower back of jersey (x: 280-460, y: 440-620)
        // and blend it over the name & number region (x: 275-475, y: 175-395)
        
        // 1. Fill base with average jersey green gradient
        const grad = ctx.createLinearGradient(375, 175, 375, 400);
        grad.addColorStop(0, '#165c36');
        grad.addColorStop(0.5, '#14532d');
        grad.addColorStop(1, '#166534');

        // Draw camo texture patch from lower back
        ctx.save();
        ctx.beginPath();
        // Create an organic ellipse/rounded polygon covering ONLY the back jersey print area
        ctx.ellipse(375, 280, 105, 115, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Blend pattern from lower back
        ctx.globalAlpha = 0.65;
        ctx.drawImage(img, 280, 440, 190, 180, 280, 190, 190, 180);
        ctx.restore();

        // Soften edges
        window.done = true;
      };
      img.src = 'data:image/png;base64,${imgB64}';
    </script>
  `);

  await page.waitForFunction(() => window.done === true);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const b64Data = dataUri.replace(/^data:image\/png;base64,/, '');

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  fs.writeFileSync(path.join(artifactsDir, 'clean_jersey_blank_test.png'), Buffer.from(b64Data, 'base64'));
  console.log('Saved clean_jersey_blank_test.png');

  await browser.close();
})();
