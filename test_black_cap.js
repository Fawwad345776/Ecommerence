const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const capWhiteB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_cap_front.jpg')).toString('base64');
  const capWhiteUri = `data:image/jpeg;base64,${capWhiteB64}`;

  await page.setContent(`
    <canvas id="c" width="900" height="900"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        
        // 1. Draw base white cap
        ctx.drawImage(img, 0, 0, 900, 900);

        // 2. Multiply with charcoal black to create realistic black twill cap
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = '#1e1e24';
        ctx.fillRect(0, 0, 900, 900);
        ctx.restore();

        // 3. Screen back lighting to keep studio background soft
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(0, 0, 900, 900);
        ctx.restore();

        // 4. Draw crisp 3D embroidery
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 3D Shadow
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.font = '900 48px Impact, sans-serif';
        ctx.fillStyle = '#4ade80';
        ctx.fillText('56', 450, 410);

        ctx.font = '900 16px "Segoe UI", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.letterSpacing = '3px';
        ctx.fillText('BABAR AZAM', 450, 455);

        ctx.restore();
        window.done = true;
      };
      img.src = '${capWhiteUri}';
    </script>
  `);

  await page.waitForFunction(() => window.done === true);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.95));
  const b64Data = dataUri.replace(/^data:image\/jpeg;base64,/, '');

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  fs.writeFileSync(path.join(artifactsDir, 'test_canvas_black_cap.jpg'), Buffer.from(b64Data, 'base64'));
  fs.writeFileSync(path.join(__dirname, 'assets', 'trending', 'babar56_cap_black.jpg'), Buffer.from(b64Data, 'base64'));
  console.log('Saved test_canvas_black_cap.jpg');

  await browser.close();
})();
