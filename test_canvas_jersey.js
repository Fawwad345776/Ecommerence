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

  const page = await browser.newPage({ viewport: { width: 640, height: 800 } });
  const b64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'pk_jersey_original.png')).toString('base64');

  await page.setContent(`
    <canvas id="c" width="640" height="800" style="width: 640px; height: 800px;"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        function drawCustomJersey(name, number) {
          // 1. Redraw base image
          ctx.drawImage(img, 0, 0);

          // 2. Patch "YOUR NAME" with matching green camo
          // YOUR NAME is centered around x: 375, y: 260. Height: ~35px, width: ~240px
          ctx.save();
          // Sample green from left and right of YOUR NAME
          const camoGradName = ctx.createLinearGradient(250, 235, 500, 285);
          camoGradName.addColorStop(0, '#0e4a25');
          camoGradName.addColorStop(0.3, '#105a2d');
          camoGradName.addColorStop(0.7, '#0d4b24');
          camoGradName.addColorStop(1, '#115b2e');
          ctx.fillStyle = camoGradName;
          ctx.beginPath();
          ctx.roundRect(250, 238, 250, 48, 8);
          ctx.fill();

          // 3. Patch "00" with matching green camo
          // "00" is centered around x: 375, y: 405. Height: ~190px, width: ~210px
          const camoGradNum = ctx.createLinearGradient(265, 300, 485, 510);
          camoGradNum.addColorStop(0, '#0d4822');
          camoGradNum.addColorStop(0.4, '#136232');
          camoGradNum.addColorStop(0.8, '#0f5229');
          camoGradNum.addColorStop(1, '#0e4a25');
          ctx.fillStyle = camoGradNum;
          ctx.beginPath();
          ctx.roundRect(268, 300, 215, 215, 16);
          ctx.fill();

          // 4. Draw Custom Name
          ctx.font = '900 32px "Arial Black", "Impact", "Segoe UI", sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.letterSpacing = '3px';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
          ctx.fillText(name.toUpperCase(), 375, 262);

          // 5. Draw Custom Number
          ctx.font = '900 150px "Impact", "Arial Black", sans-serif';
          ctx.letterSpacing = '4px';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 3;
          ctx.fillText(number, 375, 412);
          ctx.restore();
        }

        drawCustomJersey('BABAR', '56');
        window.done = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);

  await page.waitForFunction(() => window.done === true);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const pngBuf = Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ''), 'base64');
  const targetPath = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7', 'test_canvas_jersey_babar56.png');
  fs.writeFileSync(targetPath, pngBuf);
  console.log('Saved test_canvas_jersey_babar56.png!');

  await browser.close();
})();
