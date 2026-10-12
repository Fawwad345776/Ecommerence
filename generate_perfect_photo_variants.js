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

  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
  const trendingDir = path.join(__dirname, 'assets', 'trending');

  // Helper to process an image using Canvas
  async function recolorImage(srcFile, transforms) {
    const srcPath = path.join(trendingDir, srcFile);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file not found: ${srcFile}`);
      return;
    }

    const b64 = fs.readFileSync(srcPath).toString('base64');
    const uri = `data:image/jpeg;base64,${b64}`;

    const results = await page.evaluate(async ({ uri, transforms }) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = uri; });

      const w = img.naturalWidth || 1024;
      const h = img.naturalHeight || 1024;

      const output = {};

      for (const t of transforms) {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (t.type === 'green_garment') {
            // Target emerald/forest green garment
            const greenDiff = g - Math.max(r, b);
            if (greenDiff > 6 && g > 35) {
              const blend = Math.min(1, greenDiff / 18);
              if (t.target === 'black') {
                const targetVal = Math.min(255, Math.max(10, Math.round(lum * 0.26)));
                d[i] = Math.round(r * (1 - blend) + targetVal * blend);
                d[i + 1] = Math.round(g * (1 - blend) + targetVal * blend);
                d[i + 2] = Math.round(b * (1 - blend) + (targetVal + 3) * blend);
              } else if (t.target === 'white') {
                const targetVal = Math.min(255, Math.round(218 + (lum / 255) * 35));
                d[i] = Math.round(r * (1 - blend) + targetVal * blend);
                d[i + 1] = Math.round(g * (1 - blend) + targetVal * blend);
                d[i + 2] = Math.round(b * (1 - blend) + targetVal * blend);
              } else if (t.target === 'grey') {
                const targetVal = Math.min(255, Math.round(135 + (lum / 255) * 55));
                d[i] = Math.round(r * (1 - blend) + targetVal * blend);
                d[i + 1] = Math.round(g * (1 - blend) + targetVal * blend);
                d[i + 2] = Math.round(b * (1 - blend) + targetVal * blend);
              }
            }
          } else if (t.type === 'black_garment') {
            // Target black fabric (r, g, b all low, but gold text has high r & g and high difference)
            const isGold = (r > 130 && g > 100 && (r - b) > 35);
            const isLinenBg = (r > 120 && g > 110 && b > 90);
            if (!isGold && !isLinenBg && r < 75 && g < 75 && b < 75) {
              const darkness = (75 - Math.max(r, g, b)) / 75;
              if (t.target === 'white') {
                const targetVal = Math.min(255, Math.round(230 - lum * 0.45));
                d[i] = Math.round(r * (1 - darkness) + targetVal * darkness);
                d[i + 1] = Math.round(g * (1 - darkness) + targetVal * darkness);
                d[i + 2] = Math.round(b * (1 - darkness) + targetVal * darkness);
              } else if (t.target === 'beige') {
                const tr = Math.min(255, Math.round(228 - lum * 0.4));
                const tg = Math.min(255, Math.round(214 - lum * 0.4));
                const tb = Math.min(255, Math.round(195 - lum * 0.4));
                d[i] = Math.round(r * (1 - darkness) + tr * darkness);
                d[i + 1] = Math.round(g * (1 - darkness) + tg * darkness);
                d[i + 2] = Math.round(b * (1 - darkness) + tb * darkness);
              } else if (t.target === 'navy') {
                const tr = Math.min(255, Math.round(20 + lum * 0.15));
                const tg = Math.min(255, Math.round(35 + lum * 0.2));
                const tb = Math.min(255, Math.round(65 + lum * 0.3));
                d[i] = Math.round(r * (1 - darkness) + tr * darkness);
                d[i + 1] = Math.round(g * (1 - darkness) + tg * darkness);
                d[i + 2] = Math.round(b * (1 - darkness) + tb * darkness);
              } else if (t.target === 'green') {
                const tr = Math.min(255, Math.round(16 + lum * 0.15));
                const tg = Math.min(255, Math.round(68 + lum * 0.3));
                const tb = Math.min(255, Math.round(35 + lum * 0.2));
                d[i] = Math.round(r * (1 - darkness) + tr * darkness);
                d[i + 1] = Math.round(g * (1 - darkness) + tg * darkness);
                d[i + 2] = Math.round(b * (1 - darkness) + tb * darkness);
              }
            }
          } else if (t.type === 'white_garment') {
            // Target white fabric in babar56 (high r, g, b > 195, while text is green or dark)
            const isText = (g > r * 1.2 && (g - r) > 20) || (Math.max(r, g, b) < 130) || (r > 160 && g > 110 && b < 80);
            const isGreyBg = (Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && r < 185 && r > 120);
            if (!isText && !isGreyBg && r > 185 && g > 185 && b > 185) {
              const whiteness = Math.min(1, (Math.min(r, g, b) - 185) / 50);
              if (t.target === 'black') {
                const targetVal = Math.min(255, Math.max(12, Math.round(20 + (255 - lum) * 0.5)));
                d[i] = Math.round(r * (1 - whiteness) + targetVal * whiteness);
                d[i + 1] = Math.round(g * (1 - whiteness) + targetVal * whiteness);
                d[i + 2] = Math.round(b * (1 - whiteness) + (targetVal + 3) * whiteness);
              } else if (t.target === 'green') {
                const tr = Math.min(255, Math.round(18 + (255 - lum) * 0.1));
                const tg = Math.min(255, Math.round(85 + (lum / 255) * 45));
                const tb = Math.min(255, Math.round(40 + (255 - lum) * 0.1));
                d[i] = Math.round(r * (1 - whiteness) + tr * whiteness);
                d[i + 1] = Math.round(g * (1 - whiteness) + tg * whiteness);
                d[i + 2] = Math.round(b * (1 - whiteness) + tb * whiteness);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        output[t.outputFile] = canvas.toDataURL('image/jpeg', 0.93);
      }

      return output;
    }, { uri, transforms });

    for (const [outFile, dataUrl] of Object.entries(results)) {
      const dest = path.join(trendingDir, outFile);
      const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
      fs.writeFileSync(dest, buf);
      console.log(`Saved realistic variant: ${outFile} (${buf.length} bytes)`);
    }
  }

  // 1. Pakistan Cricket Jersey Tee: Black & White
  await recolorImage('pk_cricket_tee.jpg', [
    { type: 'green_garment', target: 'black', outputFile: 'pk_cricket_tee_black.jpg' },
    { type: 'green_garment', target: 'white', outputFile: 'pk_cricket_tee_white.jpg' }
  ]);

  // 2. Pakistan Cricket Hoodie: Black & Grey
  await recolorImage('pk_cricket_hoodie.jpg', [
    { type: 'green_garment', target: 'black', outputFile: 'pk_cricket_hoodie_black.jpg' },
    { type: 'green_garment', target: 'grey', outputFile: 'pk_cricket_hoodie_grey.jpg' }
  ]);

  // 3. Pakistan Cricket Cap: Black & White
  await recolorImage('pk_cricket_cap.jpg', [
    { type: 'green_garment', target: 'black', outputFile: 'pk_cricket_cap_black.jpg' },
    { type: 'green_garment', target: 'white', outputFile: 'pk_cricket_cap_white.jpg' }
  ]);

  // 4. Eid Mubarak Luxury Tee: White & Beige
  await recolorImage('eid_mubarak_tee.jpg', [
    { type: 'black_garment', target: 'white', outputFile: 'eid_mubarak_tee_white.jpg' },
    { type: 'black_garment', target: 'beige', outputFile: 'eid_mubarak_tee_beige.jpg' }
  ]);

  // 5. Babar Azam 56 Tee: Black & Green
  await recolorImage('babar56_tee.jpg', [
    { type: 'white_garment', target: 'black', outputFile: 'babar56_tee_black.jpg' },
    { type: 'white_garment', target: 'green', outputFile: 'babar56_tee_green.jpg' }
  ]);

  console.log('All authentic photo variants regenerated successfully!');
  await browser.close();
})();
