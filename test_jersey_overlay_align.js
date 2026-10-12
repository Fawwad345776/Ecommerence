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

  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const imgB64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'pk_jersey_custom_back.png')).toString('base64');
  const imgUri = `data:image/png;base64,${imgB64}`;

  await page.setContent(`
    <div style="width: 700px; height: 800px; position: relative; background: #e2e8f0; display: flex; align-items: center; justify-content: center; overflow: hidden;">
      <div id="img-container" style="position: relative; width: 600px; height: 750px;">
        <img id="preview" src="${imgUri}" style="width: 100%; height: 100%; object-fit: contain;" />
        
        <!-- Live Custom Name Overlay -->
        <div id="live-name" style="position: absolute; top: 23%; left: 58.5%; transform: translateX(-50%); width: 280px; text-align: center; font-family: 'Impact', 'Arial Black', sans-serif; font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 3px; text-shadow: 0 2px 6px rgba(0,0,0,0.8); pointer-events: none; text-transform: uppercase;">
          BABAR
        </div>

        <!-- Live Custom Number Overlay -->
        <div id="live-number" style="position: absolute; top: 30.5%; left: 58.5%; transform: translateX(-50%); width: 240px; text-align: center; font-family: 'Impact', 'Arial Black', sans-serif; font-size: 110px; font-weight: 900; color: #ffffff; line-height: 1; letter-spacing: 2px; text-shadow: 0 4px 10px rgba(0,0,0,0.8); pointer-events: none;">
          56
        </div>
      </div>
    </div>
  `);

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  await page.screenshot({ path: path.join(artifactsDir, 'test_live_jersey_overlay.png') });
  console.log('Saved test_live_jersey_overlay.png');
  await browser.close();
})();
