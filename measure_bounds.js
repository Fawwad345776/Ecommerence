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
        const data = ctx.getImageData(0, 0, 640, 800).data;
        let minX = 640, maxX = 0;
        let nameMinY = 800, nameMaxY = 0, numMinY = 800, numMaxY = 0;
        let nameMinX = 640, nameMaxX = 0, numMinX = 640, numMaxX = 0;
        for (let y = 180; y <= 550; y++) {
          for (let x = 200; x <= 600; x++) {
            const idx = (y * 640 + x) * 4;
            if (data[idx] > 200 && data[idx+1] > 200 && data[idx+2] > 200) {
              if (y < 280) {
                if (y < nameMinY) nameMinY = y;
                if (y > nameMaxY) nameMaxY = y;
                if (x < nameMinX) nameMinX = x;
                if (x > nameMaxX) nameMaxX = x;
              } else {
                if (y < numMinY) numMinY = y;
                if (y > numMaxY) numMaxY = y;
                if (x < numMinX) numMinX = x;
                if (x > numMaxX) numMaxX = x;
              }
            }
          }
        }
        window.bounds = { nameMinX, nameMaxX, nameMinY, nameMaxY, numMinX, numMaxX, numMinY, numMaxY };
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);

  await page.waitForFunction(() => window.bounds);
  const bounds = await page.evaluate(() => window.bounds);
  console.log('Detected text pixel bounds:', bounds);
  await browser.close();
})();
