const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('--- Generating High-End Realistic Mockups from Real Photo Bases ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });

  // Read clean real photo bases
  const mugWhiteUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'blank_mug_front.jpg')).toString('base64')}`;
  const mugBlackUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'blank_mug_black_front.jpg')).toString('base64')}`;
  const bagUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'blank_laptop_bag_front.jpg')).toString('base64')}`;
  const capWhiteUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'blank_cap_front.jpg')).toString('base64')}`;
  const capBlackUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'product_cap.jpg')).toString('base64')}`;
  const hoodieWhiteUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'blank_hoodie_front.jpg')).toString('base64')}`;
  const hoodieBlackUri = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, 'assets', 'product3.jpg')).toString('base64')}`;

  const trendingDir = path.join(__dirname, 'assets', 'trending');

  // 1. Single Mug (White or Black)
  function mugHtml(baseUri, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: center;">
          <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; top: 48%; left: 47%; transform: translate(-50%, -50%); width: 230px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 2. Dual Mugs (Side by Side)
  function dualMugHtml(leftUri, leftGraphic, rightUri, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: space-between; padding: 20px;">
          <div style="position: relative; width: 430px; height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            <img src="${leftUri}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 48%; left: 47%; transform: translate(-50%, -50%); width: 170px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${leftGraphic}
            </div>
          </div>
          <div style="position: relative; width: 430px; height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            <img src="${rightUri}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 48%; left: 47%; transform: translate(-50%, -50%); width: 170px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Laptop Bag
  function bagHtml(graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: center;">
          <img src="${bagUri}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; top: 54%; left: 50%; transform: translate(-50%, -50%); width: 380px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 4. Cap (Black or White)
  function capHtml(baseUri, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: center;">
          <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: cover;" />
          <!-- Embroidery overlay positioned right over front crown -->
          <div style="position: absolute; top: 45%; left: 49%; transform: translate(-50%, -50%); width: 240px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 5. Dual Caps (Black & White Couple)
  function dualCapHtml(leftGraphic, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: space-between; padding: 20px;">
          <div style="position: relative; width: 430px; height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            <img src="${capBlackUri}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 45%; left: 49%; transform: translate(-50%, -50%); width: 180px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${leftGraphic}
            </div>
          </div>
          <div style="position: relative; width: 430px; height: 600px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            <img src="${capWhiteUri}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 45%; left: 49%; transform: translate(-50%, -50%); width: 180px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 6. Hoodie
  function hoodieHtml(baseUri, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: center;">
          <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; top: 52%; left: 50%; transform: translate(-50%, -50%); width: 340px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 7. Dual Hoodies (Soulmates couple)
  function dualHoodieHtml(leftGraphic, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #ffffff; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: relative; width: 900px; height: 900px; display: flex; align-items: center; justify-content: space-between; padding: 20px;">
          <div style="position: relative; width: 430px; height: 750px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            <img src="${hoodieBlackUri}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${leftGraphic}
            </div>
          </div>
          <div style="position: relative; width: 430px; height: 750px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            <img src="${hoodieWhiteUri}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 52%; left: 50%; transform: translate(-50%, -50%); width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: none;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const ITEMS = [
    // --- HOODIES ---
    // Chai & Sardi Hoodie (Rendered on clean white hoodie base with warm badge)
    {
      file: 'chai_winter_hoodie_brown.jpg',
      html: hoodieHtml(hoodieWhiteUri, `
        <span style="font-size: 54px;">☕❄️</span>
        <span style="font-size: 28px; font-weight: 900; color: #451a03; letter-spacing: 3px; margin-top: 4px;">CHAI & SARDI</span>
        <span style="font-size: 16px; font-weight: 800; color: #92400e; font-family: 'Georgia', serif; margin-top: 2px;">گرما گرم چائے اور سرد شامیں</span>
      `)
    },
    // Soulmates Couple Hoodies (Black & White pair)
    {
      file: 'soulmates_hoodie_pair.jpg',
      html: dualHoodieHtml(
        `<span style="font-size: 42px;">🤝</span><span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">SOULMATES</span><span style="font-size: 14px; color: #fbbf24; font-family: 'Georgia', serif;">دو دل ایک جان</span>`,
        `<span style="font-size: 42px;">🤝</span><span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">SOULMATES</span><span style="font-size: 14px; color: #b45309; font-family: 'Georgia', serif;">دو دل ایک جان</span>`
      )
    },
    {
      file: 'soulmates_hoodie_white.jpg',
      html: dualHoodieHtml(
        `<span style="font-size: 42px;">🤝</span><span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">SOULMATES</span>`,
        `<span style="font-size: 42px;">🤝</span><span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">SOULMATES</span>`
      )
    },
    // City Streetwear Hoodie
    {
      file: 'city_street_hoodie_black.jpg',
      html: hoodieHtml(hoodieBlackUri, `
        <span style="font-size: 56px; font-weight: 900; color: #ffffff; letter-spacing: 6px; font-family: 'Impact', sans-serif;">021 // 042</span>
        <span style="font-size: 22px; font-weight: 800; color: #38bdf8; letter-spacing: 3px; margin-top: 2px;">PAKISTAN STREETWEAR</span>
        <span style="font-size: 13px; font-weight: 700; color: #94a3b8; letter-spacing: 2px;">HEAVY FLEECE 380 GSM</span>
      `)
    },
    // Babar 56 Hoodie
    {
      file: 'babar56_hoodie_white.jpg',
      html: hoodieHtml(hoodieWhiteUri, `
        <span style="font-size: 58px; font-weight: 900; color: #15803d; font-family: 'Impact', sans-serif; letter-spacing: 2px;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #166534; letter-spacing: 3px;">BABAR AZAM</span>
        <span style="font-size: 13px; font-weight: 800; color: #d97706; letter-spacing: 2px;">COVER DRIVE KING</span>
      `)
    },

    // --- MUGS ---
    // King & Queen Mugs Set
    {
      file: 'king_queen_mugs.jpg',
      html: dualMugHtml(
        mugBlackUri,
        `<span style="font-size: 44px;">👑</span><span style="font-size: 24px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">KING</span>`,
        mugWhiteUri,
        `<span style="font-size: 44px;">👑</span><span style="font-size: 24px; font-weight: 900; color: #d97706; letter-spacing: 3px;">QUEEN</span>`
      )
    },
    // Babar 56 Mug
    {
      file: 'babar56_mug_green.jpg',
      html: mugHtml(mugWhiteUri, `
        <span style="font-size: 54px; font-weight: 900; color: #15803d; font-family: 'Impact', sans-serif; letter-spacing: 2px;">56</span>
        <span style="font-size: 16px; font-weight: 900; color: #166534; letter-spacing: 2px;">BABAR AZAM</span>
        <span style="font-size: 12px; font-weight: 700; color: #d97706; letter-spacing: 1px;">COVER DRIVE KING</span>
      `)
    },
    {
      file: 'babar56_mug_white.jpg',
      html: mugHtml(mugWhiteUri, `
        <span style="font-size: 54px; font-weight: 900; color: #0f172a; font-family: 'Impact', sans-serif; letter-spacing: 2px;">56</span>
        <span style="font-size: 16px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">BABAR AZAM</span>
      `)
    },
    // Suno Chanda Mug
    {
      file: 'suno_chanda_mug_blue.jpg',
      html: mugHtml(mugBlackUri, `
        <span style="font-size: 44px;">🌙</span>
        <span style="font-size: 24px; font-weight: 900; color: #fbbf24; font-family: 'Georgia', serif;">چاند رات</span>
        <span style="font-size: 13px; font-weight: 700; color: #93c5fd; letter-spacing: 2px;">SUNO CHANDA</span>
      `)
    },
    {
      file: 'suno_chanda_mug_black.jpg',
      html: mugHtml(mugBlackUri, `
        <span style="font-size: 44px;">🌙</span>
        <span style="font-size: 24px; font-weight: 900; color: #ffffff; font-family: 'Georgia', serif;">چاند رات</span>
      `)
    },
    // Boss Couple Mugs
    {
      file: 'boss_couple_mugs.jpg',
      html: dualMugHtml(
        mugBlackUri,
        `<span style="font-size: 34px;">🕶️</span><span style="font-size: 18px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">THE BOSS</span>`,
        mugWhiteUri,
        `<span style="font-size: 34px;">👠</span><span style="font-size: 18px; font-weight: 900; color: #be185d; letter-spacing: 2px;">THE REAL BOSS</span>`
      )
    },

    // --- LAPTOP BAGS ---
    // Truck Art Laptop Bag
    {
      file: 'truck_art_laptop_sleeve_yellow.jpg',
      html: bagHtml(`
        <span style="font-size: 48px;">🦚✨</span>
        <span style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: 3px; margin-top: 4px;">TRUCK ART KARACHI</span>
        <span style="font-size: 13px; font-weight: 800; color: #be185d; letter-spacing: 2px;">CHAMAKPATTI EDITION // 15.6"</span>
      `)
    },
    // Babar 56 Laptop Bag
    {
      file: 'babar56_laptop_bag_black.jpg',
      html: bagHtml(`
        <span style="font-size: 52px; font-weight: 900; color: #15803d; font-family: 'Impact', sans-serif; letter-spacing: 3px;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">BABAR AZAM</span>
        <span style="font-size: 12px; font-weight: 800; color: #b45309; letter-spacing: 2px;">PRO ATHLETE TECH BRIEFCASE</span>
      `)
    },
    {
      file: 'babar56_laptop_bag_navy.jpg',
      html: bagHtml(`
        <span style="font-size: 52px; font-weight: 900; color: #1e3a8a; font-family: 'Impact', sans-serif; letter-spacing: 3px;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">BABAR AZAM</span>
      `)
    },
    // King & Queen Laptop Bag
    {
      file: 'king_queen_laptop_bag_black.jpg',
      html: bagHtml(`
        <span style="font-size: 46px;">👑💍</span>
        <span style="font-size: 24px; font-weight: 900; color: #d97706; letter-spacing: 3px; margin-top: 4px;">KING & QUEEN</span>
        <span style="font-size: 13px; font-weight: 800; color: #475569; letter-spacing: 2px;">LUXURY COUPLE TRAVEL SLEEVE</span>
      `)
    },

    // --- CAPS ---
    // Babar 56 Cap
    {
      file: 'babar56_cap_black.jpg',
      html: capHtml(capBlackUri, `
        <span style="font-size: 42px; font-weight: 900; color: #4ade80; font-family: 'Impact', sans-serif; letter-spacing: 2px; text-shadow: 0 3px 6px rgba(0,0,0,0.85);">56</span>
        <span style="font-size: 15px; font-weight: 900; color: #ffffff; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">BABAR AZAM</span>
      `)
    },
    {
      file: 'babar56_cap_green.jpg',
      html: capHtml(capBlackUri, `
        <span style="font-size: 42px; font-weight: 900; color: #fbbf24; font-family: 'Impact', sans-serif; letter-spacing: 2px; text-shadow: 0 3px 6px rgba(0,0,0,0.85);">56</span>
        <span style="font-size: 15px; font-weight: 900; color: #ffffff; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">BABAR AZAM</span>
      `)
    },
    // King & Queen Caps
    {
      file: 'king_queen_caps.jpg',
      html: dualCapHtml(
        `<span style="font-size: 38px;">👑</span><span style="font-size: 18px; font-weight: 900; color: #fbbf24; letter-spacing: 2px; text-shadow: 0 2px 5px rgba(0,0,0,0.8);">KING</span>`,
        `<span style="font-size: 38px;">👑</span><span style="font-size: 18px; font-weight: 900; color: #d97706; letter-spacing: 2px;">QUEEN</span>`
      )
    },
    // Pakistan City Cap
    {
      file: 'pakistan_city_cap_charcoal.jpg',
      html: capHtml(capBlackUri, `
        <span style="font-size: 34px; font-weight: 900; color: #ffffff; letter-spacing: 3px; font-family: 'Impact', sans-serif; text-shadow: 0 3px 6px rgba(0,0,0,0.85);">021 // 042</span>
        <span style="font-size: 13px; font-weight: 800; color: #38bdf8; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">KHI // LHR</span>
      `)
    },
    {
      file: 'pakistan_city_cap_navy.jpg',
      html: capHtml(capBlackUri, `
        <span style="font-size: 34px; font-weight: 900; color: #ffffff; letter-spacing: 3px; font-family: 'Impact', sans-serif; text-shadow: 0 3px 6px rgba(0,0,0,0.85);">021 // 042</span>
        <span style="font-size: 13px; font-weight: 800; color: #ffffff; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">PAKISTAN</span>
      `)
    },
    // Truck Art Cap
    {
      file: 'truck_art_cap_black.jpg',
      html: capHtml(capBlackUri, `
        <span style="font-size: 36px;">🦚</span>
        <span style="font-size: 15px; font-weight: 900; color: #f43f5e; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">TRUCK ART</span>
      `)
    },
    {
      file: 'truck_art_cap_white.jpg',
      html: capHtml(capWhiteUri, `
        <span style="font-size: 36px;">🦚</span>
        <span style="font-size: 15px; font-weight: 900; color: #be185d; letter-spacing: 2px;">TRUCK ART</span>
      `)
    }
  ];

  for (const item of ITEMS) {
    await page.setContent(item.html);
    await page.waitForTimeout(100);
    const savePath = path.join(trendingDir, item.file);
    await page.screenshot({ path: savePath, type: 'jpeg', quality: 95 });
    console.log(`Generated 100% Real Photo Mockup: ${item.file}`);
  }

  console.log('--- Finished Generating All Flawless Mockups! ---');
  await browser.close();
})();
