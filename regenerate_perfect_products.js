const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('--- Regenerating Real Studio Mockups for Mugs, Hoodies, Bags & Caps ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });

  // Read base assets
  const mugWhiteB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_mug_front.jpg')).toString('base64');
  const mugWhiteUri = `data:image/jpeg;base64,${mugWhiteB64}`;

  const mugBlackB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_mug_black_front.jpg')).toString('base64');
  const mugBlackUri = `data:image/jpeg;base64,${mugBlackB64}`;

  const bagB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_laptop_bag_front.jpg')).toString('base64');
  const bagUri = `data:image/jpeg;base64,${bagB64}`;

  const capB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_cap_front.png')).toString('base64');
  const capPngUri = `data:image/png;base64,${capB64}`;

  const hoodieB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_hoodie_front.png')).toString('base64');
  const hoodiePngUri = `data:image/png;base64,${hoodieB64}`;

  const trendingDir = path.join(__dirname, 'assets', 'trending');

  // Helper for single Mug (on clean realistic studio backdrop)
  function renderSingleMugHtml(baseUri, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 680px; height: 680px; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.18));" />
          <div style="position: absolute; top: 48%; left: 47%; transform: translate(-50%, -50%); width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // Helper for Dual Mugs (Pair of 2 side by side)
  function renderDualMugsHtml(leftUri, leftGraphic, rightUri, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 880px; height: 650px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; z-index: 2;">
          <!-- Left Mug -->
          <div style="position: relative; width: 420px; height: 600px; display: flex; align-items: center; justify-content: center;">
            <img src="${leftUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.18));" />
            <div style="position: absolute; top: 48%; left: 47%; transform: translate(-50%, -50%); width: 170px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${leftGraphic}
            </div>
          </div>
          <!-- Right Mug -->
          <div style="position: relative; width: 420px; height: 600px; display: flex; align-items: center; justify-content: center;">
            <img src="${rightUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.18));" />
            <div style="position: absolute; top: 48%; left: 47%; transform: translate(-50%, -50%); width: 170px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Helper for Realistic Laptop Bag
  function renderLaptopBagHtml(tintColor, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 720px; height: 720px; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img src="${bagUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.15)) ${tintColor};" />
          <div style="position: absolute; top: 52%; left: 50%; transform: translate(-50%, -50%); width: 340px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // Helper for Realistic Cap
  function renderCapHtml(tintFilter, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 660px; height: 660px; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img src="${capPngUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.15)) ${tintFilter};" />
          <div style="position: absolute; top: 38%; left: 50%; transform: translate(-50%, -50%); width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // Helper for Dual Caps (King & Queen Couple)
  function renderDualCapsHtml(leftFilter, leftGraphic, rightFilter, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 880px; height: 650px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; z-index: 2;">
          <div style="position: relative; width: 430px; height: 600px; display: flex; align-items: center; justify-content: center;">
            <img src="${capPngUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15)) ${leftFilter};" />
            <div style="position: absolute; top: 38%; left: 50%; transform: translate(-50%, -50%); width: 180px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${leftGraphic}
            </div>
          </div>
          <div style="position: relative; width: 430px; height: 600px; display: flex; align-items: center; justify-content: center;">
            <img src="${capPngUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15)) ${rightFilter};" />
            <div style="position: absolute; top: 38%; left: 50%; transform: translate(-50%, -50%); width: 180px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Helper for Realistic Hoodie (clean transparent PNG base with precise SVG garment tinting)
  function renderHoodieHtml(tintFilter, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 40%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 680px; height: 780px; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img src="${hoodiePngUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.18)) ${tintFilter};" />
          <div style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 280px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // Helper for Dual Hoodies (Soulmates couple)
  function renderDualHoodiesHtml(leftFilter, leftGraphic, rightFilter, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 40%, #ffffff 0%, #e2e8f0 100%);"></div>
        <div style="position: relative; width: 880px; height: 750px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; z-index: 2;">
          <div style="position: relative; width: 430px; height: 700px; display: flex; align-items: center; justify-content: center;">
            <img src="${hoodiePngUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.18)) ${leftFilter};" />
            <div style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 200px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${leftGraphic}
            </div>
          </div>
          <div style="position: relative; width: 430px; height: 700px; display: flex; align-items: center; justify-content: center;">
            <img src="${hoodiePngUri}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.18)) ${rightFilter};" />
            <div style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 200px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Clean filters for transparent PNGs (ONLY affects garment, background is 100% white/clean!)
  const tintBlack = 'brightness(0.15) contrast(1.2);';
  const tintWhite = 'brightness(1) contrast(1);';
  const tintMochaBrown = 'brightness(0.38) sepia(0.6) saturate(1.8) hue-rotate(350deg);';
  const tintBeige = 'sepia(0.35) saturate(1.3) brightness(0.92);';
  const tintNavy = 'brightness(0.22) sepia(0.5) saturate(2.5) hue-rotate(185deg);';
  const tintCharcoal = 'brightness(0.28) contrast(1.15);';
  const tintGreen = 'brightness(0.4) sepia(0.8) saturate(2.5) hue-rotate(85deg);';

  const MOCKUPS = [
    // ----------------------------------------------------
    // 1. MUGS (Real Ceramic Mugs on Studio Table)
    // ----------------------------------------------------
    // King & Queen Mugs Set
    {
      file: 'king_queen_mugs.jpg',
      html: renderDualMugsHtml(
        mugBlackUri,
        `<span style="font-size: 38px;">👑</span><span style="font-size: 22px; font-weight: 900; color: #fbbf24; letter-spacing: 3px; margin-top: 4px;">KING</span>`,
        mugWhiteUri,
        `<span style="font-size: 38px;">👑</span><span style="font-size: 22px; font-weight: 900; color: #d97706; letter-spacing: 3px; margin-top: 4px;">QUEEN</span>`
      )
    },
    // Babar 56 Mug
    {
      file: 'babar56_mug_green.jpg',
      html: renderSingleMugHtml(
        mugWhiteUri,
        `<span style="font-size: 44px; font-weight: 900; color: #15803d; font-family: 'Impact', sans-serif; letter-spacing: 2px;">56</span>
         <span style="font-size: 14px; font-weight: 900; color: #166534; letter-spacing: 2px;">BABAR AZAM</span>
         <span style="font-size: 11px; font-weight: 700; color: #d97706; letter-spacing: 1px;">COVER DRIVE KING</span>`
      )
    },
    {
      file: 'babar56_mug_white.jpg',
      html: renderSingleMugHtml(
        mugWhiteUri,
        `<span style="font-size: 44px; font-weight: 900; color: #0f172a; font-family: 'Impact', sans-serif; letter-spacing: 2px;">56</span>
         <span style="font-size: 14px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">BABAR AZAM</span>`
      )
    },
    // Suno Chanda Mug
    {
      file: 'suno_chanda_mug_blue.jpg',
      html: renderSingleMugHtml(
        mugBlackUri,
        `<span style="font-size: 36px;">🌙</span>
         <span style="font-size: 20px; font-weight: 900; color: #fbbf24; font-family: 'Georgia', serif;">چاند رات</span>
         <span style="font-size: 12px; font-weight: 700; color: #93c5fd; letter-spacing: 2px;">SUNO CHANDA</span>`
      )
    },
    {
      file: 'suno_chanda_mug_black.jpg',
      html: renderSingleMugHtml(
        mugBlackUri,
        `<span style="font-size: 36px;">🌙</span>
         <span style="font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Georgia', serif;">چاند رات</span>`
      )
    },
    // Boss Couple Mugs
    {
      file: 'boss_couple_mugs.jpg',
      html: renderDualMugsHtml(
        mugBlackUri,
        `<span style="font-size: 28px;">🕶️</span><span style="font-size: 16px; font-weight: 900; color: #ffffff; letter-spacing: 1.5px;">THE BOSS</span>`,
        mugWhiteUri,
        `<span style="font-size: 28px;">👠</span><span style="font-size: 16px; font-weight: 900; color: #be185d; letter-spacing: 1.5px;">THE REAL BOSS</span>`
      )
    },

    // ----------------------------------------------------
    // 2. HOODIES (Clean Studio Streetwear on #f8fafc)
    // ----------------------------------------------------
    // Chai & Sardi Hoodie
    {
      file: 'chai_winter_hoodie_brown.jpg',
      html: renderHoodieHtml(
        tintMochaBrown,
        `<span style="font-size: 42px;">☕❄️</span>
         <span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">CHAI & SARDI</span>
         <span style="font-size: 14px; font-weight: 700; color: #fde68a; font-family: 'Georgia', serif;">گرما گرم چائے اور سرد شامیں</span>`
      )
    },
    // Soulmates Couple Hoodies
    {
      file: 'soulmates_hoodie_pair.jpg',
      html: renderDualHoodiesHtml(
        tintBlack,
        `<span style="font-size: 36px;">🤝</span><span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">SOULMATES</span><span style="font-size: 13px; color: #fbbf24; font-family: 'Georgia', serif;">دو دل ایک جان</span>`,
        tintBeige,
        `<span style="font-size: 36px;">🤝</span><span style="font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">SOULMATES</span><span style="font-size: 13px; color: #78350f; font-family: 'Georgia', serif;">دو دل ایک جان</span>`
      )
    },
    {
      file: 'soulmates_hoodie_white.jpg',
      html: renderDualHoodiesHtml(
        tintBlack,
        `<span style="font-size: 36px;">🤝</span><span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">SOULMATES</span>`,
        tintWhite,
        `<span style="font-size: 36px;">🤝</span><span style="font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">SOULMATES</span>`
      )
    },
    // City 021/042 Hoodie
    {
      file: 'city_street_hoodie_black.jpg',
      html: renderHoodieHtml(
        tintBlack,
        `<span style="font-size: 46px; font-weight: 900; color: #ffffff; letter-spacing: 5px; font-family: 'Impact', sans-serif;">021 // 042</span>
         <span style="font-size: 18px; font-weight: 800; color: #38bdf8; letter-spacing: 3px;">PAKISTAN STREETWEAR</span>
         <span style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 2px;">HEAVY FLEECE 380 GSM</span>`
      )
    },
    // Babar 56 Hoodie
    {
      file: 'babar56_hoodie_white.jpg',
      html: renderHoodieHtml(
        tintWhite,
        `<span style="font-size: 50px; font-weight: 900; color: #15803d; font-family: 'Impact', sans-serif; letter-spacing: 2px;">56</span>
         <span style="font-size: 18px; font-weight: 900; color: #166534; letter-spacing: 3px;">BABAR AZAM</span>
         <span style="font-size: 12px; font-weight: 800; color: #d97706; letter-spacing: 2px;">COVER DRIVE KING</span>`
      )
    },

    // ----------------------------------------------------
    // 3. LAPTOP BAGS (Real Padded Briefcases with Embroidered/Printed Crests)
    // ----------------------------------------------------
    // Karachi Truck Art Laptop Sleeve
    {
      file: 'truck_art_laptop_sleeve_yellow.jpg',
      html: renderLaptopBagHtml(
        'sepia(0.2) saturate(1.2);',
        `<span style="font-size: 42px;">🦚✨</span>
         <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">TRUCK ART KARACHI</span>
         <span style="font-size: 12px; font-weight: 800; color: #be185d; letter-spacing: 2px;">CHAMAKPATTI EDITION // 15.6"</span>`
      )
    },
    // Babar 56 Laptop Bag
    {
      file: 'babar56_laptop_bag_black.jpg',
      html: renderLaptopBagHtml(
        'brightness(0.22) contrast(1.2);',
        `<span style="font-size: 44px; font-weight: 900; color: #4ade80; font-family: 'Impact', sans-serif; letter-spacing: 3px;">56</span>
         <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">BABAR AZAM</span>
         <span style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 2px;">PRO ATHLETE TECH BRIEFCASE</span>`
      )
    },
    {
      file: 'babar56_laptop_bag_navy.jpg',
      html: renderLaptopBagHtml(
        'brightness(0.3) sepia(0.5) saturate(2.5) hue-rotate(185deg);',
        `<span style="font-size: 44px; font-weight: 900; color: #38bdf8; font-family: 'Impact', sans-serif; letter-spacing: 3px;">56</span>
         <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">BABAR AZAM</span>`
      )
    },
    // King & Queen Laptop Bag
    {
      file: 'king_queen_laptop_bag_black.jpg',
      html: renderLaptopBagHtml(
        'brightness(0.2) contrast(1.25);',
        `<span style="font-size: 40px;">👑💍</span>
         <span style="font-size: 22px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">KING & QUEEN</span>
         <span style="font-size: 12px; font-weight: 800; color: #cbd5e1; letter-spacing: 2px;">LUXURY COUPLE TRAVEL SLEEVE</span>`
      )
    },

    // ----------------------------------------------------
    // 4. CAPS (Real 3D Curved Embroidered Baseball Caps)
    // ----------------------------------------------------
    // Babar 56 Cap
    {
      file: 'babar56_cap_black.jpg',
      html: renderCapHtml(
        tintBlack,
        `<span style="font-size: 34px; font-weight: 900; color: #4ade80; font-family: 'Impact', sans-serif; letter-spacing: 2px; text-shadow: 0 3px 6px rgba(0,0,0,0.8);">56</span>
         <span style="font-size: 13px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">BABAR AZAM</span>`
      )
    },
    {
      file: 'babar56_cap_green.jpg',
      html: renderCapHtml(
        tintGreen,
        `<span style="font-size: 34px; font-weight: 900; color: #fbbf24; font-family: 'Impact', sans-serif; letter-spacing: 2px; text-shadow: 0 3px 6px rgba(0,0,0,0.8);">56</span>
         <span style="font-size: 13px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">BABAR AZAM</span>`
      )
    },
    // King & Queen Caps
    {
      file: 'king_queen_caps.jpg',
      html: renderDualCapsHtml(
        tintBlack,
        `<span style="font-size: 30px;">👑</span><span style="font-size: 15px; font-weight: 900; color: #fbbf24; letter-spacing: 2px;">KING</span>`,
        tintWhite,
        `<span style="font-size: 30px;">👑</span><span style="font-size: 15px; font-weight: 900; color: #d97706; letter-spacing: 2px;">QUEEN</span>`
      )
    },
    // Pakistan City Cap
    {
      file: 'pakistan_city_cap_charcoal.jpg',
      html: renderCapHtml(
        tintCharcoal,
        `<span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 3px; font-family: 'Impact', sans-serif;">021 // 042</span>
         <span style="font-size: 11px; font-weight: 800; color: #38bdf8; letter-spacing: 2px;">KHI // LHR</span>`
      )
    },
    {
      file: 'pakistan_city_cap_navy.jpg',
      html: renderCapHtml(
        tintNavy,
        `<span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 3px; font-family: 'Impact', sans-serif;">021 // 042</span>
         <span style="font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">PAKISTAN</span>`
      )
    },
    // Truck Art Cap
    {
      file: 'truck_art_cap_black.jpg',
      html: renderCapHtml(
        tintBlack,
        `<span style="font-size: 28px;">🦚</span>
         <span style="font-size: 13px; font-weight: 900; color: #ec4899; letter-spacing: 2px;">TRUCK ART</span>`
      )
    },
    {
      file: 'truck_art_cap_white.jpg',
      html: renderCapHtml(
        tintWhite,
        `<span style="font-size: 28px;">🦚</span>
         <span style="font-size: 13px; font-weight: 900; color: #be185d; letter-spacing: 2px;">TRUCK ART</span>`
      )
    }
  ];

  for (const item of MOCKUPS) {
    await page.setContent(item.html);
    await page.waitForTimeout(100);
    const savePath = path.join(trendingDir, item.file);
    await page.screenshot({ path: savePath, type: 'jpeg', quality: 92 });
    console.log(`Generated perfect photo: ${item.file}`);
  }

  console.log('--- All Real Product Photos Generated Successfully! ---');
  await browser.close();
})();
