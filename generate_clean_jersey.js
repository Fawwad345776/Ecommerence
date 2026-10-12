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
    <canvas id="c" width="640" height="800"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // We want to seamlessly clone the clean camo from y: 540..760 into y: 215..435
        // Create an offscreen buffer for the patch with feathered/soft alpha mask
        const patchCanvas = document.createElement('canvas');
        patchCanvas.width = 300;
        patchCanvas.height = 230;
        const pCtx = patchCanvas.getContext('2d');

        // Draw source camo from lower back
        pCtx.drawImage(img, 230, 530, 300, 230, 0, 0, 300, 230);

        // Feather the edges of the patch so it blends invisibly
        const gradL = pCtx.createLinearGradient(0, 0, 35, 0);
        gradL.addColorStop(0, 'rgba(0,0,0,1)');
        gradL.addColorStop(1, 'rgba(0,0,0,0)');
        pCtx.globalCompositeOperation = 'destination-out';
        pCtx.fillStyle = gradL;
        pCtx.fillRect(0, 0, 35, 230);

        const gradR = pCtx.createLinearGradient(265, 0, 300, 0);
        gradR.addColorStop(0, 'rgba(0,0,0,0)');
        gradR.addColorStop(1, 'rgba(0,0,0,1)');
        pCtx.fillStyle = gradR;
        pCtx.fillRect(265, 0, 35, 230);

        const gradT = pCtx.createLinearGradient(0, 0, 0, 30);
        gradT.addColorStop(0, 'rgba(0,0,0,1)');
        gradT.addColorStop(1, 'rgba(0,0,0,0)');
        pCtx.fillStyle = gradT;
        pCtx.fillRect(0, 0, 300, 30);

        const gradB = pCtx.createLinearGradient(0, 200, 0, 230);
        gradB.addColorStop(0, 'rgba(0,0,0,0)');
        gradB.addColorStop(1, 'rgba(0,0,0,1)');
        pCtx.fillStyle = gradB;
        pCtx.fillRect(0, 200, 300, 30);

        // Composite the feathered patch over the original image at y: 215
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(patchCanvas, 230, 215);

        // Also adjust lighting slightly to match the upper back curvature
        ctx.save();
        const lightGrad = ctx.createLinearGradient(0, 215, 0, 445);
        lightGrad.addColorStop(0, 'rgba(0, 30, 10, 0.12)');
        lightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        lightGrad.addColorStop(1, 'rgba(0, 20, 5, 0.10)');
        ctx.fillStyle = lightGrad;
        ctx.fillRect(230, 215, 300, 230);
        ctx.restore();

        window.done = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);

  await page.waitForFunction(() => window.done === true);
  const dataUri = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  const pngBuf = Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ''), 'base64');
  const targetPath = path.join(__dirname, 'assets', 'trending', 'pk_jersey_clean_blank.png');
  fs.writeFileSync(targetPath, pngBuf);
  console.log('Saved seamless assets/trending/pk_jersey_clean_blank.png!');

  await browser.close();
})();
