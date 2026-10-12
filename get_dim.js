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
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Let's get image dimensions
        window.imgDim = { w: img.width, h: img.height };
      };
      img.src = 'data:image/png;base64,${imgB64}';
    </script>
  `);

  await page.waitForFunction(() => window.imgDim !== undefined);
  const dim = await page.evaluate(() => window.imgDim);
  console.log('Image dimensions:', dim);

  await browser.close();
})();
