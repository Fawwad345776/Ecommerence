const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  let browser;
  try { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
  catch(e) { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });

  const outputDir = path.join(__dirname, 'assets', 'studio_blanks');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const colorPalettes = {
    'white': null,
    'black': { rBase: 20, gBase: 22, bBase: 26, rScale: 0.18, gScale: 0.18, bScale: 0.22 },
    'navy': { rBase: 16, gBase: 28, bBase: 70, rScale: 0.16, gScale: 0.24, bScale: 0.45 },
    'grey': { rBase: 42, gBase: 46, bBase: 52, rScale: 0.46, gScale: 0.48, bScale: 0.52 },
    'blue': { rBase: 18, gBase: 50, bBase: 155, rScale: 0.18, gScale: 0.38, bScale: 0.65 },
    'maroon': { rBase: 80, gBase: 12, bBase: 28, rScale: 0.45, gScale: 0.14, bScale: 0.20 }
  };

  const tasks = [
    { key: 'full_tee_front', file: 'blank_sweatshirt_front.jpg', isFront: true },
    { key: 'full_tee_back', file: 'blank_sweatshirt_back.jpg', isFront: false }
  ];

  for (const t of tasks) {
    const rawBuf = fs.readFileSync(path.join(__dirname, 'assets', t.file));
    const b64 = rawBuf.toString('base64');

    // 1. First generate pristine transparent white base image
    const whiteDataUri = await page.evaluate(async ({ b64, isFront }) => {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = 'data:image/jpeg;base64,' + b64; });
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;

      // Outer boundary polygon
      const outerPolyFront = [
        // Collar neckline
        [370, 165], [410, 155], [450, 162], [490, 168], [512, 170], [534, 168], [574, 162], [614, 155], [650, 165],
        // Right shoulder & right outer sleeve
        [692, 180], [735, 200], [773, 230], [796, 260], [815, 300], [834, 350],
        [851, 400], [865, 450], [880, 500], [893, 550], [905, 600], [916, 650],
        [925, 700], [920, 750], [915, 800], [910, 835],
        // Right cuff
        [900, 848], [840, 852],
        // Right hem bottom
        [752, 860], [670, 862], [590, 862], [510, 862], [430, 862], [350, 862], [268, 860],
        // Left cuff
        [175, 852], [105, 848], [85, 835],
        // Left outer sleeve & left shoulder
        [81, 800], [79, 750], [87, 700], [99, 650], [112, 600], [126, 550],
        [140, 500], [155, 450], [171, 400], [188, 350], [208, 300], [228, 260],
        [246, 230], [280, 200], [331, 180]
      ];

      const outerPolyBack = [
        // Collar neckline
        [370, 152], [410, 138], [450, 140], [490, 146], [512, 148], [534, 146], [574, 140], [614, 138], [650, 152],
        // Right shoulder & right outer sleeve
        [692, 180], [735, 200], [773, 230], [796, 260], [815, 300], [834, 350],
        [851, 400], [865, 450], [880, 500], [904, 500], [910, 560], [920, 620],
        [923, 680], [926, 710], [928, 740], [920, 770], [903, 800], [896, 835],
        // Right cuff
        [888, 848], [840, 852],
        // Right hem bottom
        [752, 860], [670, 862], [590, 862], [510, 862], [430, 862], [350, 862], [268, 860],
        // Left cuff
        [175, 852], [115, 848], [102, 835],
        // Left outer sleeve & left shoulder
        [95, 800], [94, 740], [97, 680], [101, 620], [107, 560], [115, 500],
        [140, 450], [160, 400], [188, 350], [208, 300], [228, 260],
        [246, 230], [280, 200], [331, 180]
      ];

      const outerPoly = isFront ? outerPolyFront : outerPolyBack;

      // Draw mask on secondary canvas
      const mc = document.createElement('canvas');
      mc.width = w;
      mc.height = h;
      const mctx = mc.getContext('2d');
      mctx.fillStyle = '#000000';
      mctx.fillRect(0, 0, w, h);

      // Fill garment body
      mctx.fillStyle = '#ffffff';
      mctx.beginPath();
      mctx.moveTo(outerPoly[0][0], outerPoly[0][1]);
      for (let i = 1; i < outerPoly.length; i++) {
        mctx.lineTo(outerPoly[i][0], outerPoly[i][1]);
      }
      mctx.closePath();
      mctx.fill();

      // Punch out left armpit gap (all the way down)
      mctx.fillStyle = '#000000';
      mctx.beginPath();
      mctx.moveTo(250, 440);
      mctx.lineTo(230, 510);
      mctx.lineTo(210, 620);
      mctx.lineTo(190, 720);
      mctx.lineTo(175, 800);
      mctx.lineTo(170, 850);
      mctx.lineTo(170, 1024);
      mctx.lineTo(266, 1024);
      mctx.lineTo(266, 860);
      mctx.lineTo(264, 760);
      mctx.lineTo(264, 600);
      mctx.lineTo(260, 470);
      mctx.closePath();
      mctx.fill();

      // Punch out right armpit gap (all the way down)
      mctx.beginPath();
      mctx.moveTo(775, 440);
      mctx.lineTo(795, 510);
      mctx.lineTo(815, 620);
      mctx.lineTo(835, 720);
      mctx.lineTo(845, 800);
      mctx.lineTo(845, 850);
      mctx.lineTo(845, 1024);
      mctx.lineTo(754, 1024);
      mctx.lineTo(754, 860);
      mctx.lineTo(758, 760);
      mctx.lineTo(760, 600);
      mctx.lineTo(765, 470);
      mctx.closePath();
      mctx.fill();

      const maskData = mctx.getImageData(0, 0, w, h).data;

      // Apply mask to original image data
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const isInside = maskData[idx] > 128;
          if (!isInside) {
            d[idx + 3] = 0;
            continue;
          }

          const r = d[idx], g = d[idx+1], b = d[idx+2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          // Collar dip fine check
          if (isFront && x >= 400 && x <= 624 && y < 172 && lum < 225) {
            d[idx + 3] = 0;
            continue;
          }
          if (!isFront && x >= 400 && x <= 624 && y < 146 && lum < 220) {
            d[idx + 3] = 0;
            continue;
          }

          // Bottom hem shadow fine check
          if (y > 858 && lum < 200) {
            d[idx + 3] = 0;
            continue;
          }

          // Cuffs fine check
          if (y > 830 && (x < 115 || x > 890) && lum < 210) {
            d[idx + 3] = 0;
            continue;
          }

          d[idx + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      return c.toDataURL('image/png');
    }, { b64, isFront: t.isFront });

    // 2. Now render each color variant from the pristine transparent white base
    for (const [colorName, pal] of Object.entries(colorPalettes)) {
      const targetPath = path.join(outputDir, `${t.key}_${colorName}.png`);

      const coloredUri = await page.evaluate(async ({ whiteDataUri, pal }) => {
        const img = new Image();
        await new Promise(r => { img.onload = r; img.src = whiteDataUri; });
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        if (pal) {
          const imgData = ctx.getImageData(0, 0, w, h);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            if (d[i + 3] < 20) continue;
            const r = d[i], g = d[i + 1], b = d[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            d[i] = Math.min(255, Math.max(0, Math.round(pal.rBase + lum * pal.rScale)));
            d[i + 1] = Math.min(255, Math.max(0, Math.round(pal.gBase + lum * pal.gScale)));
            d[i + 2] = Math.min(255, Math.max(0, Math.round(pal.bBase + lum * pal.bScale)));
          }
          ctx.putImageData(imgData, 0, 0);
        }

        return c.toDataURL('image/png');
      }, { whiteDataUri, pal });

      const buf = Buffer.from(coloredUri.replace(/^data:image\/png;base64,/, ''), 'base64');
      fs.writeFileSync(targetPath, buf);
      console.log(`Saved studio blank: ${path.basename(targetPath)}`);
    }
  }

  await browser.close();
  console.log('All full sleeve blanks successfully generated and saved!');
})();
