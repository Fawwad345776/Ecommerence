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

        // Test name box: x: 250..500, y: 185..245
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(250, 185, 245, 60);

        // Test number box: x: 265..485, y: 250..520
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillRect(265, 250, 215, 270);

        window.done = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);

  await page.waitForFunction(() => window.done);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const pngBuf = Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ''), 'base64');
  const targetPath = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7', 'test_overlay_alignment_v2.png');
  fs.writeFileSync(targetPath, pngBuf);
  console.log('Saved test_overlay_alignment_v2.png!');
  await browser.close();
})();
