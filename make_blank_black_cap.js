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
  const capBlackB64 = fs.readFileSync(path.join(__dirname, 'assets', 'product_cap.jpg')).toString('base64');
  const capBlackUri = `data:image/jpeg;base64,${capBlackB64}`;

  await page.setContent(`
    <canvas id="c" width="1024" height="1024"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Patch the triangle logo completely
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(455, 470, 115, 95, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 560, 420, 230, 190, 340, 375, 230, 190);
        ctx.restore();

        window.done = true;
      };
      img.src = '${capBlackUri}';
    </script>
  `);

  await page.waitForFunction(() => window.done === true);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.95));
  const b64Data = dataUri.replace(/^data:image\/jpeg;base64,/, '');

  fs.writeFileSync(path.join(__dirname, 'assets', 'blank_black_cap_front.jpg'), Buffer.from(b64Data, 'base64'));
  console.log('Saved clean blank black cap without any logo!');

  await browser.close();
})();
