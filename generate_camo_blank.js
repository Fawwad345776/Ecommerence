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

        const imgData = ctx.getImageData(0, 0, 640, 800);
        const data = imgData.data;

        // Inside the region x: 245..505, y: 220..530:
        // Any pixel with r > 160 && g > 160 && b > 160 is part of white text or anti-aliasing
        for (let y = 220; y <= 530; y++) {
          for (let x = 245; x <= 505; x++) {
            const idx = (y * 640 + x) * 4;
            const r = data[idx], g = data[idx+1], b = data[idx+2];
            if (r > 155 && g > 155 && b > 155) {
              // Search left or right for nearest dark camo pixel
              let foundX = -1;
              for (let d = 1; d <= 80; d++) {
                // check left
                if (x - d >= 200) {
                  const leftIdx = (y * 640 + (x - d)) * 4;
                  if (data[leftIdx] < 140 && data[leftIdx+1] > 30) {
                    foundX = x - d;
                    break;
                  }
                }
                // check right
                if (x + d <= 550) {
                  const rightIdx = (y * 640 + (x + d)) * 4;
                  if (data[rightIdx] < 140 && data[rightIdx+1] > 30) {
                    foundX = x + d;
                    break;
                  }
                }
              }

              if (foundX !== -1) {
                const sampleIdx = (y * 640 + foundX) * 4;
                data[idx] = data[sampleIdx];
                data[idx+1] = data[sampleIdx+1];
                data[idx+2] = data[sampleIdx+2];
              } else {
                // Fallback dark green
                data[idx] = 16;
                data[idx+1] = 85;
                data[idx+2] = 40;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        window.done = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);

  await page.waitForFunction(() => window.done);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const pngBuf = Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ''), 'base64');
  const targetPath = path.join(__dirname, 'assets', 'trending', 'pk_jersey_blank_camo.png');
  fs.writeFileSync(targetPath, pngBuf);
  console.log('Saved assets/trending/pk_jersey_blank_camo.png!');
  await browser.close();
})();
