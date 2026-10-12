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
  const shirtB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_sweatshirt_front.jpg')).toString('base64');

  async function renderProduct(bgTint, graphicHtml, outName) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;600;700;800;900&family=Syne:wght@700;800;900&family=Amiri:wght@700&family=Outfit:wght@600;800;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1024px; height: 1024px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #e2e8f0;
          }
          #wrap {
            position: relative;
            width: 1024px; height: 1024px;
            background: ${bgTint.bg || '#e2e8f0'};
          }
          #shirt {
            width: 100%; height: 100%;
            object-fit: cover;
            display: block;
            ${bgTint.shirtFilter || ''}
          }
          #graphic-layer {
            position: absolute;
            top: 270px;
            left: 512px;
            transform: translateX(-50%);
            width: 380px;
            text-align: center;
            pointer-events: none;
            mix-blend-mode: multiply;
            opacity: 0.94;
          }
        </style>
      </head>
      <body>
        <div id="wrap">
          <img id="shirt" src="data:image/jpeg;base64,${shirtB64}" />
          <div id="graphic-layer">
            ${graphicHtml}
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html);
    await page.waitForTimeout(1200); // Allow Google fonts to render smoothly
    const outPath = path.join(__dirname, 'assets', 'trending', outName);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });
    console.log(`Rendered: ${outName} (${fs.statSync(outPath).size} bytes)`);
  }

  console.log('--- Rendering 5 High-Quality Modern Streetwear Products ---');

  // 1. Bauhaus 1919 Weimar Form Follows Function (Off-White / Cream Knit)
  await renderProduct(
    {
      bgTint: '#f1f1ee',
      shirtFilter: 'sepia(0.08) brightness(0.99) contrast(1.02);'
    },
    `
      <div style="font-family: 'Syne', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 0 16px;">
          <span style="font-size: 13px; font-weight: 800; color: #b91c1c; letter-spacing: 4px;">BAUHAUS</span>
          <span style="font-size: 11px; font-weight: 700; color: #334155; letter-spacing: 2px;">1919 — 1933</span>
          <span style="font-size: 12px; font-weight: 800; color: #1d4ed8; letter-spacing: 3px;">WEIMAR</span>
        </div>
        
        <!-- Bauhaus primary geometry shapes -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 18px;">
          <div style="width: 74px; height: 74px; border-radius: 50%; background: #dc2626;"></div>
          <div style="width: 70px; height: 70px; background: #2563eb; transform: rotate(45deg);"></div>
          <div style="width: 76px; height: 76px; background: #eab308; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
        </div>

        <div style="font-size: 38px; font-weight: 900; color: #0f172a; letter-spacing: -1.5px; line-height: 1.05;">
          FORM FOLLOWS
        </div>
        <div style="font-size: 38px; font-weight: 900; color: #0f172a; letter-spacing: -1.5px; line-height: 1.05;">
          FUNCTION
        </div>
        
        <div style="font-size: 10px; font-family: 'Inter', sans-serif; font-weight: 800; color: #475569; letter-spacing: 4px; margin-top: 14px; border-top: 1.5px solid #cbd5e1; padding-top: 8px;">
          STAATLICHES BAUHAUS ARCHIVE • EXHIBITION 2026
        </div>
      </div>
    `,
    'fs_bauhaus_geometric_cream.jpg'
  );

  // 2. Sunday Coffee & Vinyl Society (Crisp White Heavyweight)
  await renderProduct(
    {
      bgTint: '#f8fafc',
      shirtFilter: ''
    },
    `
      <div style="font-family: 'Inter', sans-serif;">
        <div style="font-size: 11px; letter-spacing: 5px; color: #78350f; font-weight: 800; text-transform: uppercase;">
          • ESTABLISHED 1988 •
        </div>
        <div style="font-size: 34px; font-weight: 900; color: #0f172a; letter-spacing: -1px; margin-top: 6px;">
          COFFEE & VINYL
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #d97706; letter-spacing: 4px; text-transform: uppercase;">
          SUNDAY MORNING CLUB
        </div>
        
        <!-- Clean Modern Line Art Graphic -->
        <div style="margin: 18px auto; width: 140px; height: 140px; border: 3px solid #0f172a; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; background: #ffffff;">
          <div style="width: 100px; height: 100px; border: 1.5px dashed #0f172a; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <div style="width: 40px; height: 40px; background: #d97706; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px;">
              ☕
            </div>
          </div>
          <span style="position: absolute; bottom: -8px; background: #0f172a; color: #fff; font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 99px; letter-spacing: 1.5px;">33⅓ RPM</span>
        </div>

        <div style="font-size: 11px; font-weight: 600; color: #475569; letter-spacing: 1.5px; line-height: 1.4;">
          Single-Origin Pour-Over Brews & Rare Analog Grooves<br>
          <strong style="color: #0f172a; font-weight: 800;">TOKYO • LONDON • NEW YORK</strong>
        </div>
      </div>
    `,
    'fs_coffee_vinyl_white.jpg'
  );

  // 3. Botanical Herbarium & Fern Study (Warm Natural Ecru)
  await renderProduct(
    {
      bgTint: '#f5f5f0',
      shirtFilter: 'sepia(0.12) brightness(0.98) contrast(1.02);'
    },
    `
      <div style="font-family: 'Cinzel', serif;">
        <div style="font-size: 11px; letter-spacing: 5px; color: #166534; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase;">
          FLORA & BOTANICA • VOL. VII
        </div>
        <div style="font-size: 30px; font-weight: 900; color: #14532d; letter-spacing: 3px; margin-top: 4px;">
          HERBARIUM
        </div>

        <div style="margin: 16px auto; width: 170px; height: 160px; border: 2px solid #166534; padding: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(240, 253, 244, 0.4);">
          <div style="font-size: 72px; line-height: 1;">🌿</div>
          <div style="font-size: 11px; font-style: italic; color: #15803d; font-family: 'Inter', sans-serif; font-weight: 700; margin-top: 6px;">
            Polypodiopsida Fern
          </div>
        </div>

        <div style="font-size: 10px; font-family: 'Inter', sans-serif; font-weight: 800; color: #334155; letter-spacing: 2px; line-height: 1.5;">
          ALPINE SPECIMEN COLLECTED AT 2,400M<br>
          <span style="color: #166534; font-weight: 900;">100% ORGANIC COMBED HEAVYWEIGHT COTTON</span>
        </div>
      </div>
    `,
    'fs_botanical_fern_cream.jpg'
  );

  // 4. Modern Urdu Poetry Streetwear (Faiz Ahmad Faiz "بول کہ لب آزاد ہیں ترے")
  await renderProduct(
    {
      bgTint: '#f8fafc',
      shirtFilter: ''
    },
    `
      <div style="font-family: 'Amiri', serif;">
        <div style="font-size: 11px; letter-spacing: 4px; color: #dc2626; font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase; margin-bottom: 8px;">
          FAIZ AHMAD FAIZ // STREET EDITORIAL
        </div>
        
        <div style="font-size: 56px; line-height: 1.15; font-weight: 700; color: #0f172a; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          بول کہ لب آزاد ہیں تیرے
        </div>
        
        <div style="font-size: 26px; font-weight: 700; color: #15803d; margin-top: 4px; letter-spacing: 2px;">
          بول زباں اب تک تیری ہے
        </div>

        <div style="margin-top: 18px; display: inline-flex; flex-direction: column; align-items: center; gap: 4px; border-top: 2px solid #0f172a; border-bottom: 2px solid #0f172a; padding: 6px 20px;">
          <span style="font-size: 10px; font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: 3px; color: #0f172a;">URDU LITERARY ARCHIVE • 240 GSM</span>
          <span style="font-size: 9px; font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: 2px; color: #64748b;">LAHORE 1952 — 2026</span>
        </div>
      </div>
    `,
    'fs_faiz_poetry_white.jpg'
  );

  // 5. 1984 Malibu Sunset Synthwave & Palms (Heather Vintage Light Grey)
  await renderProduct(
    {
      bgTint: '#e2e8f0',
      shirtFilter: 'contrast(1.04);'
    },
    `
      <div style="font-family: 'Outfit', sans-serif;">
        <div style="font-size: 11px; letter-spacing: 6px; color: #0284c7; font-weight: 900; text-transform: uppercase;">
          CALIFORNIA HIGHWAY // 1984
        </div>
        
        <div style="font-size: 38px; font-weight: 900; color: #be123c; letter-spacing: 1px; margin-top: 2px;">
          SUNSET DRIVE
        </div>

        <div style="margin: 12px auto; width: 190px; height: 110px; border-radius: 95px 95px 0 0; background: linear-gradient(180deg, #f59e0b 0%, #e11d48 55%, #7c3aed 100%); position: relative; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 8px 20px rgba(225,29,72,0.3);">
          <span style="font-size: 58px; line-height: 1; filter: drop-shadow(0 0 4px #000);">🌴</span>
          <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: #0f172a; box-shadow: 0 -8px 0 #0f172a, 0 -18px 0 #0f172a, 0 -30px 0 #0f172a;"></div>
        </div>

        <div style="font-size: 13px; font-weight: 900; color: #0284c7; letter-spacing: 4px; margin-top: 6px;">
          OUTRUN THE HORIZON
        </div>
        <div style="font-size: 9px; font-weight: 800; color: #475569; letter-spacing: 2px; margin-top: 4px;">
          SYNTHWAVE SOUNDTRACK • LIMITED PACIFIC EDITION
        </div>
      </div>
    `,
    'fs_synthwave_sunset_grey.jpg'
  );

  console.log('--- All 5 products rendered cleanly! ---');
  await browser.close();
})();
