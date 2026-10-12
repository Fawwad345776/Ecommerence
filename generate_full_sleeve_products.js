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

  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });

  const shirtB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_sweatshirt_front.jpg')).toString('base64');
  const shirtUri = `data:image/jpeg;base64,${shirtB64}`;

  function createFullSleeveHtml(colorFilter, graphicHtml) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.65) 100%);"></div>

        <div style="position: relative; width: 720px; height: 720px; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img src="${shirtUri}" style="width: 100%; height: 100%; object-fit: contain; ${colorFilter}" />

          <div style="position: absolute; top: 220px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 340px; text-align: center;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  function createDualFullSleeveHtml(leftFilter, leftGraphic, rightFilter, rightGraphic) {
    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.65) 100%);"></div>

        <div style="position: relative; width: 880px; height: 740px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; z-index: 2;">
          <div style="position: relative; width: 440px; height: 680px; display: flex; align-items: center; justify-content: center;">
            <img src="${shirtUri}" style="width: 100%; height: 100%; object-fit: contain; ${leftFilter}" />
            <div style="position: absolute; top: 200px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 230px; text-align: center;">
              ${leftGraphic}
            </div>
          </div>

          <div style="position: relative; width: 440px; height: 680px; display: flex; align-items: center; justify-content: center;">
            <img src="${shirtUri}" style="width: 100%; height: 100%; object-fit: contain; ${rightFilter}" />
            <div style="position: absolute; top: 200px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 230px; text-align: center;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Filters
  const fWhite = 'filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));';
  const fBlack = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 20px 30px rgba(0,0,0,0.35));';
  const fGreen = 'filter: invert(0.35) sepia(1) saturate(5) hue-rotate(95deg) brightness(0.65) contrast(1.2) drop-shadow(0 20px 30px rgba(0,0,0,0.25));';
  const fNavy = 'filter: invert(0.85) sepia(0.6) saturate(3) hue-rotate(185deg) brightness(0.28) contrast(1.3) drop-shadow(0 20px 30px rgba(0,0,0,0.35));';
  const fGrey = 'filter: brightness(0.7) contrast(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.25));';
  const fBeige = 'filter: sepia(0.35) saturate(1.4) brightness(0.92) contrast(1.05) drop-shadow(0 20px 30px rgba(0,0,0,0.2));';

  const fullSleeveTasks = [
    // 1. Pakistan Cricket Long Sleeve
    {
      file: 'fs_pk_cricket_green.jpg',
      html: createFullSleeveHtml(fGreen, `
        <span style="font-size: 38px;">⭐🏏</span>
        <span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">PAKISTAN</span>
        <span style="font-size: 14px; font-weight: 800; color: #fde047; letter-spacing: 2px;">CRICKET '92 LONG SLEEVE</span>
      `)
    },
    {
      file: 'fs_pk_cricket_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 38px;">⭐🏏</span>
        <span style="font-size: 26px; font-weight: 900; color: #22c55e; letter-spacing: 3px;">PAKISTAN</span>
        <span style="font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">CRICKET '92 LONG SLEEVE</span>
      `)
    },
    {
      file: 'fs_pk_cricket_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 38px;">⭐🏏</span>
        <span style="font-size: 26px; font-weight: 900; color: #15803d; letter-spacing: 3px;">PAKISTAN</span>
        <span style="font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: 2px;">CRICKET '92 LONG SLEEVE</span>
      `)
    },

    // 2. Babar 56 Full Sleeve
    {
      file: 'fs_babar56_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 58px; font-weight: 900; color: #15803d;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 2px; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 11px; font-weight: 800; color: #d97706; letter-spacing: 2px;">COVER DRIVE KING</span>
      `)
    },
    {
      file: 'fs_babar56_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 58px; font-weight: 900; color: #4ade80;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 2px; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 11px; font-weight: 800; color: #fde047; letter-spacing: 2px;">COVER DRIVE KING</span>
      `)
    },

    // 3. Eid Mubarak Gold Calligraphy Full Sleeve
    {
      file: 'fs_eid_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">🌙✨</span>
        <span style="font-size: 28px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24;">عید مبارک</span>
        <span style="font-size: 18px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">EID MUBARAK</span>
      `)
    },
    {
      file: 'fs_eid_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(217,119,6,0.5));">🌙✨</span>
        <span style="font-size: 28px; font-family: 'Georgia', serif; font-weight: 900; color: #b45309;">عید مبارک</span>
        <span style="font-size: 18px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">EID MUBARAK</span>
      `)
    },

    // 4. Soulmates Urdu Long Sleeve
    {
      file: 'fs_soulmates_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 44px;">🤝💕</span>
        <span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">SOULMATES</span>
        <span style="font-size: 16px; font-family: 'Georgia', serif; color: #fbbf24;">دو دل ایک جان</span>
      `)
    },
    {
      file: 'fs_soulmates_beige.jpg',
      html: createFullSleeveHtml(fBeige, `
        <span style="font-size: 44px;">🤝💕</span>
        <span style="font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">SOULMATES</span>
        <span style="font-size: 16px; font-family: 'Georgia', serif; color: #78350f;">دو دل ایک جان</span>
      `)
    },

    // 5. City 021/042 Long Sleeve
    {
      file: 'fs_city_charcoal.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 44px; font-weight: 900; color: #ffffff; letter-spacing: 6px;">021 // 042</span>
        <span style="font-size: 18px; font-weight: 800; color: #38bdf8; letter-spacing: 3px;">KARACHI & LAHORE</span>
      `)
    },
    {
      file: 'fs_city_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 44px; font-weight: 900; color: #0f172a; letter-spacing: 6px;">021 // 042</span>
        <span style="font-size: 18px; font-weight: 800; color: #0284c7; letter-spacing: 3px;">KARACHI & LAHORE</span>
      `)
    },

    // 6. Vintage Legend Birthday Full Sleeve
    {
      file: 'fs_birthday_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 40px;">👑🎉</span>
        <span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">VINTAGE LEGEND</span>
        <span style="font-size: 12px; font-weight: 800; color: #fde047; letter-spacing: 2px;">AGED TO PERFECTION</span>
      `)
    },
    {
      file: 'fs_birthday_grey.jpg',
      html: createFullSleeveHtml(fGrey, `
        <span style="font-size: 40px;">👑🎉</span>
        <span style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">VINTAGE LEGEND</span>
        <span style="font-size: 12px; font-weight: 800; color: #2563eb; letter-spacing: 2px;">AGED TO PERFECTION</span>
      `)
    },

    // 7. Faiz Ahmad Faiz 'Bol Ke Lab Azaad' Full Sleeve
    {
      file: 'fs_faiz_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 34px; font-family: 'Georgia', serif; font-weight: 900; color: #f43f5e; margin-bottom: 4px;">بول کہ لب آزاد ہیں ترے</span>
        <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">FAIZ AHMAD FAIZ</span>
        <span style="font-size: 11px; font-weight: 700; color: #cbd5e1; letter-spacing: 3px;">REVOLUTIONARY POETRY</span>
      `)
    },
    {
      file: 'fs_faiz_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 34px; font-family: 'Georgia', serif; font-weight: 900; color: #e11d48; margin-bottom: 4px;">بول کہ لب آزاد ہیں ترے</span>
        <span style="font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">FAIZ AHMAD FAIZ</span>
        <span style="font-size: 11px; font-weight: 700; color: #475569; letter-spacing: 3px;">REVOLUTIONARY POETRY</span>
      `)
    },

    // 8. Allama Iqbal 'Khudi' Full Sleeve
    {
      file: 'fs_iqbal_navy.jpg',
      html: createFullSleeveHtml(fNavy, `
        <span style="font-size: 34px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24; margin-bottom: 4px;">خودی کو کر بلند اتنا</span>
        <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">ALLAMA IQBAL</span>
        <span style="font-size: 11px; font-weight: 700; color: #93c5fd; letter-spacing: 3px;">PHILOSOPHICAL EDITION</span>
      `)
    },
    {
      file: 'fs_iqbal_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 34px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24; margin-bottom: 4px;">خودی کو کر بلند اتنا</span>
        <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">ALLAMA IQBAL</span>
        <span style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 3px;">PHILOSOPHICAL EDITION</span>
      `)
    },

    // 9. Truck Art Peacock Full Sleeve
    {
      file: 'fs_truck_art_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 42px;">🦚✨</span>
        <span style="font-size: 22px; font-weight: 900; color: #f43f5e; letter-spacing: 3px;">CHAMAKPATTI TRUCK ART</span>
        <span style="font-size: 11px; font-weight: 800; color: #fde047; letter-spacing: 2px;">KARACHI POP STREETWEAR</span>
      `)
    },
    {
      file: 'fs_truck_art_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 42px;">🦚✨</span>
        <span style="font-size: 22px; font-weight: 900; color: #be123c; letter-spacing: 3px;">CHAMAKPATTI TRUCK ART</span>
        <span style="font-size: 11px; font-weight: 800; color: #0f172a; letter-spacing: 2px;">KARACHI POP STREETWEAR</span>
      `)
    },

    // 10. Chai Dhabba Waffle Full Sleeve
    {
      file: 'fs_chai_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 38px;">☕✨</span>
        <span style="font-size: 22px; font-family: 'Georgia', serif; font-weight: 900; color: #b45309;">پہلے چائے پھر کام</span>
        <span style="font-size: 13px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">PEHLAY CHAI PHIR KAAM</span>
      `)
    },
    {
      file: 'fs_chai_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 38px;">☕✨</span>
        <span style="font-size: 22px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24;">پہلے چائے پھر کام</span>
        <span style="font-size: 13px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">PEHLAY CHAI PHIR KAAM</span>
      `)
    },

    // 11. KING & QUEEN Couple Full Sleeve Tees (Pair of 2)
    {
      file: 'fs_couple_kq_pair.jpg',
      html: createDualFullSleeveHtml(
        fBlack, `<span style="font-size: 38px;">👑</span><span style="font-size: 22px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">KING</span>`,
        fWhite, `<span style="font-size: 38px;">👑</span><span style="font-size: 22px; font-weight: 900; color: #b45309; letter-spacing: 3px;">QUEEN</span>`
      )
    },
    {
      file: 'fs_couple_kq_black.jpg',
      html: createDualFullSleeveHtml(
        fBlack, `<span style="font-size: 38px;">👑</span><span style="font-size: 22px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">KING</span>`,
        fBlack, `<span style="font-size: 38px;">👑</span><span style="font-size: 22px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">QUEEN</span>`
      )
    },

    // 12. Plain Heavyweight Essential Full Sleeve
    {
      file: 'fs_plain_white.jpg',
      html: createFullSleeveHtml(fWhite, `
        <span style="font-size: 13px; font-weight: 800; color: #64748b; letter-spacing: 4px; text-transform: uppercase;">PREMIUM 240 GSM COMBED COTTON</span>
      `)
    },
    {
      file: 'fs_plain_black.jpg',
      html: createFullSleeveHtml(fBlack, `
        <span style="font-size: 13px; font-weight: 800; color: #94a3b8; letter-spacing: 4px; text-transform: uppercase;">PREMIUM 240 GSM COMBED COTTON</span>
      `)
    },
    {
      file: 'fs_plain_navy.jpg',
      html: createFullSleeveHtml(fNavy, `
        <span style="font-size: 13px; font-weight: 800; color: #93c5fd; letter-spacing: 4px; text-transform: uppercase;">PREMIUM 240 GSM COMBED COTTON</span>
      `)
    }
  ];

  const targetDir = path.join(__dirname, 'assets', 'trending');

  for (let i = 0; i < fullSleeveTasks.length; i++) {
    const task = fullSleeveTasks[i];
    await page.setContent(task.html);
    await page.waitForTimeout(50);
    const dest = path.join(targetDir, task.file);
    await page.screenshot({ path: dest, quality: 92, type: 'jpeg' });
    console.log(`[${i + 1}/${fullSleeveTasks.length}] Saved: ${task.file} (${fs.statSync(dest).size} bytes)`);
  }

  await browser.close();
  console.log('All 12 Full Sleeve T-Shirt designs generated successfully!');
})();
