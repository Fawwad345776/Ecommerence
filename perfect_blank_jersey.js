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
  const originalPath = path.join(__dirname, 'assets', 'trending', 'pk_jersey_custom_back.png');
  const imgB64 = fs.readFileSync(originalPath).toString('base64');

  await page.setContent(`
    <canvas id="c" width="640" height="800"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Region to cover: x: 255 to 495, y: 180 to 405
        // Clean source region from lower back: x: 255 to 495, y: 530 to 755
        
        // 1. Draw smooth camo clone
        ctx.save();
        ctx.beginPath();
        // Rounded rectangle over the back print area
        const rx = 255, ry = 180, rw = 240, rh = 225, radius = 20;
        ctx.moveTo(rx + radius, ry);
        ctx.lineTo(rx + rw - radius, ry);
        ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + radius);
        ctx.lineTo(rx + rw, ry + rh - radius);
        ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - radius, ry + rh);
        ctx.lineTo(rx + radius, ry + rh);
        ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - radius);
        ctx.lineTo(rx, ry + radius);
        ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
        ctx.closePath();
        ctx.clip();

        // Draw camo source from lower back
        ctx.drawImage(img, 255, 530, 240, 225, 255, 180, 240, 225);

        // Add subtle shadow matching jersey lighting
        const shade = ctx.createLinearGradient(0, 180, 0, 405);
        shade.addColorStop(0, 'rgba(0,0,0,0.18)');
        shade.addColorStop(0.5, 'rgba(0,0,0,0.05)');
        shade.addColorStop(1, 'rgba(0,0,0,0.12)');
        ctx.fillStyle = shade;
        ctx.fill();

        ctx.restore();
        window.done = true;
      };
      img.src = 'data:image/png;base64,${imgB64}';
    </script>
  `);

  await page.waitForFunction(() => window.done === true);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const b64Data = dataUri.replace(/^data:image\/png;base64,/, '');

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  fs.writeFileSync(path.join(artifactsDir, 'clean_blank_jersey_v2.png'), Buffer.from(b64Data, 'base64'));
  // Also save directly to assets/trending/pk_jersey_custom_back.png!
  fs.writeFileSync(originalPath, Buffer.from(b64Data, 'base64'));
  console.log('Successfully updated pk_jersey_custom_back.png with clean blank jersey!');

  await browser.close();
})();
