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

  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });

  const whiteB64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'fs_brutalist_archive_white.jpg')).toString('base64');
  const creamB64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'fs_monaco_motorsport_cream.jpg')).toString('base64');
  const blackB64 = fs.readFileSync(path.join(__dirname, 'assets', 'trending', 'fs_tokyo_cyberpunk_black.jpg')).toString('base64');

  // Helper to generate composite images using HTML5 Canvas
  async function generateDesign(baseB64, cleanArea, overlayHtml, outputFileName) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;700;800;900&family=Syne:wght@700;800;900&family=Amiri:wght@700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { width: 1024px; height: 1024px; overflow: hidden; background: #e5e5e5; }
          #container { position: relative; width: 1024px; height: 1024px; }
          #baseCanvas { width: 1024px; height: 1024px; display: block; }
          #overlay {
            position: absolute;
            top: 0; left: 0; width: 1024px; height: 1024px;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <div id="container">
          <canvas id="baseCanvas" width="1024" height="1024"></canvas>
          <div id="overlay">${overlayHtml}</div>
        </div>
        <script>
          const img = new Image();
          img.src = 'data:image/jpeg;base64,${baseB64}';
          img.onload = () => {
            const canvas = document.getElementById('baseCanvas');
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Clean designated areas if requested
            ${cleanArea ? `
              const cleanCfg = ${JSON.stringify(cleanArea)};
              // Sample fabric patch from safe belly area
              const patch = ctx.getImageData(cleanCfg.sampleX, cleanCfg.sampleY, cleanCfg.sampleW, cleanCfg.sampleH);
              
              // Create temporary canvas for pattern
              const pCanvas = document.createElement('canvas');
              pCanvas.width = cleanCfg.sampleW;
              pCanvas.height = cleanCfg.sampleH;
              const pCtx = pCanvas.getContext('2d');
              pCtx.putImageData(patch, 0, 0);
              
              const pattern = ctx.createPattern(pCanvas, 'repeat');
              ctx.save();
              cleanCfg.boxes.forEach(b => {
                ctx.fillStyle = pattern;
                ctx.filter = 'blur(3px)';
                ctx.fillRect(b.x, b.y, b.w, b.h);
                ctx.filter = 'none';
              });
              ctx.restore();
            ` : ''}

            window.__READY = true;
          };
        </script>
      </body>
      </html>
    `;

    await page.setContent(html);
    await page.waitForFunction(() => window.__READY === true, { timeout: 15000 });
    // Allow web fonts to render
    await page.waitForTimeout(1000);

    const outPath = path.join(__dirname, 'assets', 'trending', outputFileName);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });
    console.log(`Generated: ${outputFileName} (${fs.statSync(outPath).size} bytes)`);
  }

  console.log('--- Generating 5 Modern Streetwear Full-Sleeve Images ---');

  // 8. Luxury Modern Urdu Calligraphy (Gold & Jade Foil on Black Long Sleeve)
  // Base: black shirt. Overlay: Gold & Jade intricate Urdu Calligraphy "عشق // خودی"
  await generateDesign(
    blackB64,
    {
      sampleX: 380, sampleY: 720, sampleW: 260, sampleH: 120,
      boxes: [{ x: 360, y: 290, w: 300, h: 350 }]
    },
    `
      <div style="position: absolute; top: 295px; left: 512px; transform: translateX(-50%); width: 320px; text-align: center; color: #facc15; font-family: 'Amiri', serif;">
        <div style="font-size: 11px; letter-spacing: 5px; color: #10b981; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase; margin-bottom: 6px;">
          ✦ LUXURY EDITION // LAHORE ✦
        </div>
        <div style="font-size: 76px; line-height: 1.1; font-weight: 700; color: #fde047; text-shadow: 0 4px 15px rgba(250, 204, 21, 0.4), 0 0 30px rgba(16, 185, 129, 0.3);">
          عِشق
        </div>
        <div style="font-size: 28px; font-weight: 700; color: #34d399; letter-spacing: 4px; margin-top: -6px; text-shadow: 0 2px 10px rgba(52, 211, 153, 0.5);">
          خُودی کَا سَفَر
        </div>
        <div style="margin-top: 14px; display: inline-flex; align-items: center; gap: 8px; border-top: 1px solid rgba(250, 204, 21, 0.4); border-bottom: 1px solid rgba(250, 204, 21, 0.4); padding: 5px 16px;">
          <span style="font-size: 10px; font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: 3px; color: #ffffff;">EST. 1947 • HEAVYWEIGHT 260 GSM</span>
        </div>
      </div>
    `,
    'fs_luxury_urdu_black.jpg'
  );

  // 9. Bauhaus 1919 Weimar Geometric Wave (Cream Long Sleeve)
  // Base: cream shirt.
  await generateDesign(
    creamB64,
    {
      sampleX: 380, sampleY: 740, sampleW: 260, sampleH: 120,
      boxes: [{ x: 330, y: 270, w: 360, h: 400 }]
    },
    `
      <div style="position: absolute; top: 290px; left: 512px; transform: translateX(-50%); width: 330px; text-align: center; font-family: 'Syne', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 0 10px;">
          <span style="font-size: 13px; font-weight: 800; color: #dc2626; letter-spacing: 3px;">BAUHAUS</span>
          <span style="font-size: 11px; font-weight: 700; color: #0f172a; letter-spacing: 2px;">1919 — 1933</span>
          <span style="font-size: 11px; font-weight: 800; color: #2563eb; letter-spacing: 2px;">WEIMAR</span>
        </div>
        <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 14px;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: #dc2626; box-shadow: 0 6px 16px rgba(220,38,38,0.25);"></div>
          <div style="width: 70px; height: 70px; background: #2563eb; transform: rotate(45deg); box-shadow: 0 6px 16px rgba(37,99,235,0.25);"></div>
          <div style="width: 70px; height: 70px; background: #eab308; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); box-shadow: 0 6px 16px rgba(234,179,8,0.25);"></div>
        </div>
        <div style="font-size: 34px; font-weight: 900; color: #0f172a; letter-spacing: -1px; line-height: 1.1;">
          FORM FOLLOWS
        </div>
        <div style="font-size: 34px; font-weight: 900; color: #0f172a; letter-spacing: -1px; line-height: 1.1;">
          FUNCTION
        </div>
        <div style="font-size: 10px; font-family: 'Inter', sans-serif; font-weight: 800; color: #64748b; letter-spacing: 3px; margin-top: 10px;">
          STAATLICHES BAUHAUS ARCHIVE • BERLIN
        </div>
      </div>
    `,
    'fs_bauhaus_geometric_cream.jpg'
  );

  // 10. Botanical Fern & Flora Field Guide (Cream/Off-White Long Sleeve)
  await generateDesign(
    creamB64,
    {
      sampleX: 380, sampleY: 740, sampleW: 260, sampleH: 120,
      boxes: [{ x: 330, y: 270, w: 360, h: 400 }]
    },
    `
      <div style="position: absolute; top: 285px; left: 512px; transform: translateX(-50%); width: 330px; text-align: center; font-family: 'Cinzel', serif;">
        <div style="font-size: 11px; letter-spacing: 4px; color: #166534; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase;">
          FIELD STUDY • VOL. IV
        </div>
        <div style="font-size: 26px; font-weight: 900; color: #14532d; letter-spacing: 2px; margin-top: 4px;">
          HERBARIUM
        </div>
        <div style="margin: 12px auto; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; font-size: 80px; filter: drop-shadow(0 4px 10px rgba(20,83,45,0.2));">
          🌿
        </div>
        <div style="font-size: 15px; font-style: italic; color: #15803d; letter-spacing: 1px; font-weight: 700;">
          Polypodiopsida Fern
        </div>
        <div style="font-size: 9px; font-family: 'Inter', sans-serif; font-weight: 700; color: #475569; letter-spacing: 2px; margin-top: 8px; border-top: 1px solid #cbd5e1; padding-top: 6px;">
          COLLECTED AT 2,400M ALTITUDE • ORGANIC BOTANICAL
        </div>
      </div>
    `,
    'fs_botanical_fern_cream.jpg'
  );

  // 11. Sunday Vinyl & Coffee Society (White Long Sleeve)
  await generateDesign(
    whiteB64,
    {
      sampleX: 380, sampleY: 720, sampleW: 260, sampleH: 120,
      boxes: [
        { x: 340, y: 310, w: 350, h: 180 },
        { x: 160, y: 310, w: 120, h: 420 } // sleeve text
      ]
    },
    `
      <div style="position: absolute; top: 310px; left: 512px; transform: translateX(-50%); width: 340px; text-align: center; font-family: 'Inter', sans-serif;">
        <div style="font-size: 10px; letter-spacing: 4px; color: #78350f; font-weight: 800;">
          ESTABLISHED 1988
        </div>
        <div style="font-size: 32px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; margin-top: 4px;">
          COFFEE & VINYL
        </div>
        <div style="font-size: 14px; font-weight: 800; color: #d97706; letter-spacing: 3px;">
          SUNDAY MORNING CLUB
        </div>
        <div style="margin: 14px auto; font-size: 64px;">
          ☕ 🎵
        </div>
        <div style="font-size: 11px; font-weight: 600; color: #64748b; letter-spacing: 1px;">
          Pour-Over Brews & 33⅓ RPM Analog Grooves
        </div>
      </div>
    `,
    'fs_coffee_vinyl_white.jpg'
  );

  // 12. 80s Retro Synthwave Sunset (Black Long Sleeve)
  await generateDesign(
    blackB64,
    {
      sampleX: 380, sampleY: 720, sampleW: 260, sampleH: 120,
      boxes: [{ x: 360, y: 290, w: 300, h: 350 }]
    },
    `
      <div style="position: absolute; top: 290px; left: 512px; transform: translateX(-50%); width: 330px; text-align: center; font-family: 'Inter', sans-serif;">
        <div style="font-size: 11px; letter-spacing: 5px; color: #38bdf8; font-weight: 800;">
          NEON HIGHWAY // 1984
        </div>
        <div style="font-size: 36px; font-weight: 900; color: #f43f5e; letter-spacing: 2px; text-shadow: 0 4px 15px rgba(244,63,94,0.5);">
          SYNTHWAVE
        </div>
        <div style="margin: 10px auto; width: 180px; height: 90px; border-radius: 90px 90px 0 0; background: linear-gradient(to bottom, #fbbf24 0%, #f43f5e 50%, #8b5cf6 100%); box-shadow: 0 0 25px rgba(244,63,94,0.6); position: relative; overflow: hidden;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #000; box-shadow: 0 -8px 0 #000, 0 -18px 0 #000, 0 -30px 0 #000;"></div>
        </div>
        <div style="font-size: 13px; font-weight: 900; color: #38bdf8; letter-spacing: 4px; text-shadow: 0 0 10px rgba(56,189,248,0.6);">
          SUNSET HORIZON
        </div>
        <div style="font-size: 9px; font-weight: 700; color: #a855f7; letter-spacing: 2px; margin-top: 6px;">
          ANALOG DREAMS • OUTRUN OVERDRIVE
        </div>
      </div>
    `,
    'fs_synthwave_sunset_black.jpg'
  );

  console.log('--- All 5 additional designs generated successfully! ---');
  await browser.close();
})();
