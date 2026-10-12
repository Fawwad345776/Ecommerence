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

  // SVG Polygons in 0..1 scale
  const clips = {
    half_tee_front: [
      [0.42, 0.14], [0.50, 0.168], [0.58, 0.14], [0.77, 0.22], [0.955, 0.335],
      [0.875, 0.49], [0.83, 0.535], [0.772, 0.475], [0.775, 0.885], [0.225, 0.885],
      [0.228, 0.475], [0.17, 0.535], [0.125, 0.49], [0.045, 0.335], [0.23, 0.22]
    ],
    half_tee_back: [
      [0.42, 0.14], [0.50, 0.148], [0.58, 0.14], [0.77, 0.22], [0.955, 0.335],
      [0.875, 0.49], [0.83, 0.535], [0.772, 0.475], [0.775, 0.885], [0.225, 0.885],
      [0.228, 0.475], [0.17, 0.535], [0.125, 0.49], [0.045, 0.335], [0.23, 0.22]
    ],
    hoodie_front: [
      [0.50, 0.058], [0.61, 0.10], [0.64, 0.18], [0.62, 0.27], [0.755, 0.32],
      [0.855, 0.48], [0.86, 0.70], [0.855, 0.835], [0.855, 0.895], [0.76, 0.895],
      [0.75, 0.825], [0.74, 0.68], [0.735, 0.53], [0.725, 0.915], [0.275, 0.915],
      [0.265, 0.53], [0.26, 0.68], [0.25, 0.825], [0.24, 0.895], [0.145, 0.895],
      [0.145, 0.835], [0.14, 0.70], [0.145, 0.48], [0.245, 0.32], [0.38, 0.27],
      [0.36, 0.18], [0.39, 0.10]
    ],
    hoodie_back: [
      [0.50, 0.058], [0.61, 0.10], [0.64, 0.18], [0.62, 0.27], [0.755, 0.32],
      [0.855, 0.48], [0.86, 0.70], [0.855, 0.835], [0.855, 0.895], [0.76, 0.895],
      [0.75, 0.825], [0.74, 0.68], [0.735, 0.53], [0.725, 0.915], [0.275, 0.915],
      [0.265, 0.53], [0.26, 0.68], [0.25, 0.825], [0.24, 0.895], [0.145, 0.895],
      [0.145, 0.835], [0.14, 0.70], [0.145, 0.48], [0.245, 0.32], [0.38, 0.27],
      [0.36, 0.18], [0.39, 0.10]
    ],
    full_tee_front: [
      [0.42, 0.14], [0.50, 0.168], [0.58, 0.14], [0.77, 0.22], [0.94, 0.68],
      [0.88, 0.72], [0.75, 0.48], [0.76, 0.885], [0.24, 0.885], [0.25, 0.48],
      [0.12, 0.72], [0.06, 0.68], [0.23, 0.22]
    ],
    full_tee_back: [
      [0.42, 0.14], [0.50, 0.148], [0.58, 0.14], [0.77, 0.22], [0.94, 0.68],
      [0.88, 0.72], [0.75, 0.48], [0.76, 0.885], [0.24, 0.885], [0.25, 0.48],
      [0.12, 0.72], [0.06, 0.68], [0.23, 0.22]
    ]
  };

  const tasks = [
    { key: 'half_tee_front', src: 'assets/blank_tshirt_front.png' },
    { key: 'half_tee_back', src: 'assets/blank_tshirt_back.jpg' },
    { key: 'hoodie_front', src: 'assets/blank_hoodie_front.jpg' },
    { key: 'hoodie_back', src: 'assets/blank_hoodie_back.jpg' },
    { key: 'full_tee_front', src: 'assets/trending/fs_plain_white.jpg' },
    { key: 'full_tee_back', src: 'assets/blank_tshirt_back.jpg' }
  ];

  for (const t of tasks) {
    const rawBuf = fs.readFileSync(path.join(__dirname, t.src));
    const b64 = rawBuf.toString('base64');
    const mime = t.src.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const dataUri = `data:${mime};base64,${b64}`;
    const poly = clips[t.key];

    for (const [colorName, pal] of Object.entries(colorPalettes)) {
      const targetPath = path.join(outputDir, `${t.key}_${colorName}.png`);

      const outUri = await page.evaluate(async ({ dataUri, pal, poly, isSrcPng, isFsWhite }) => {
        const img = new Image();
        await new Promise(r => { img.onload = r; img.src = dataUri; });
        const w = img.naturalWidth || 800;
        const h = img.naturalHeight || 800;

        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');

        if (poly) {
          ctx.beginPath();
          ctx.moveTo(poly[0][0] * w, poly[0][1] * h);
          for (let i = 1; i < poly.length; i++) {
            ctx.lineTo(poly[i][0] * w, poly[i][1] * h);
          }
          ctx.closePath();
          ctx.clip();
        }

        ctx.drawImage(img, 0, 0);

        if (isFsWhite) {
          // Patch over small chest text with clean fabric texture from lower chest
          ctx.drawImage(c, 260, 450, 480, 140, 260, 275, 480, 140);
        }

        if (pal) {
          const imgData = ctx.getImageData(0, 0, w, h);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            if (d[i + 3] < 15) continue;
            const r = d[i], g = d[i + 1], b = d[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            d[i] = Math.min(255, Math.max(0, Math.round(pal.rBase + lum * pal.rScale)));
            d[i + 1] = Math.min(255, Math.max(0, Math.round(pal.gBase + lum * pal.gScale)));
            d[i + 2] = Math.min(255, Math.max(0, Math.round(pal.bBase + lum * pal.bScale)));
          }
          ctx.putImageData(imgData, 0, 0);
        }

        return c.toDataURL('image/png');
      }, { dataUri, pal, poly, isSrcPng: t.src.endsWith('.png'), isFsWhite: t.src.includes('fs_plain') });

      const buf = Buffer.from(outUri.replace(/^data:image\/png;base64,/, ''), 'base64');
      fs.writeFileSync(targetPath, buf);
      console.log(`Saved: ${path.basename(targetPath)}`);
    }
  }

  await browser.close();
  console.log('Complete precision rendering done!');
})();
