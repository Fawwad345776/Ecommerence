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

  const teeB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_tshirt_front.png')).toString('base64');
  const teeUri = `data:image/png;base64,${teeB64}`;

  const hoodieB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_hoodie_front.png')).toString('base64');
  const hoodieUri = `data:image/png;base64,${hoodieB64}`;

  const capB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_cap_front.png')).toString('base64');
  const capUri = `data:image/png;base64,${capB64}`;

  const mugB64 = fs.readFileSync(path.join(__dirname, 'assets', 'blank_mug_front.png')).toString('base64');
  const mugUri = `data:image/png;base64,${mugB64}`;

  let bagUri = teeUri;
  const bagFile = path.join(__dirname, 'assets', 'blank_laptop_bag_front.jpg');
  if (fs.existsSync(bagFile)) {
    const bagB64 = fs.readFileSync(bagFile).toString('base64');
    bagUri = `data:image/jpeg;base64,${bagB64}`;
  }

  function createGarmentHtml(type, colorStyle, graphicHtml) {
    let baseUri = hoodieUri;
    let graphicTop = "255px";
    let width = "640px";
    let height = "740px";

    if (type === 'hoodie') {
      baseUri = hoodieUri;
      graphicTop = "255px";
    } else if (type === 'cap') {
      baseUri = capUri;
      graphicTop = "310px";
      width = "640px";
      height = "640px";
    } else if (type === 'mug') {
      baseUri = mugUri;
      graphicTop = "305px";
      width = "640px";
      height = "640px";
    } else if (type === 'bag') {
      baseUri = bagUri;
      graphicTop = "350px";
      width = "680px";
      height = "680px";
    }

    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.65) 100%);"></div>

        <div style="position: relative; width: ${width}; height: ${height}; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: contain; ${colorStyle}" />

          <div style="position: absolute; top: ${graphicTop}; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 340px; text-align: center;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  function createDualHtml(type, leftStyle, leftGraphic, rightStyle, rightGraphic) {
    const baseUri = type === 'hoodie' ? hoodieUri : (type === 'cap' ? capUri : mugUri);
    const topPos = type === 'hoodie' ? "230px" : (type === 'cap' ? "280px" : "290px");

    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.65) 100%);"></div>

        <div style="position: relative; width: 880px; height: 780px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; z-index: 2;">
          <div style="position: relative; width: 440px; height: 680px; display: flex; align-items: center; justify-content: center;">
            <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: contain; ${leftStyle}" />
            <div style="position: absolute; top: ${topPos}; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 230px; text-align: center;">
              ${leftGraphic}
            </div>
          </div>

          <div style="position: relative; width: 440px; height: 680px; display: flex; align-items: center; justify-content: center;">
            <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: contain; ${rightStyle}" />
            <div style="position: absolute; top: ${topPos}; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 230px; text-align: center;">
              ${rightGraphic}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Filters
  const fBlack = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const fWhite = 'filter: drop-shadow(0 25px 35px rgba(0,0,0,0.18));';
  const fGreen = 'filter: invert(0.35) sepia(1) saturate(5) hue-rotate(95deg) brightness(0.65) contrast(1.2) drop-shadow(0 25px 35px rgba(0,0,0,0.25));';
  const fNavy = 'filter: invert(0.85) sepia(0.6) saturate(3) hue-rotate(185deg) brightness(0.28) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const fGrey = 'filter: brightness(0.7) contrast(1.1) drop-shadow(0 25px 35px rgba(0,0,0,0.25));';
  const fBeige = 'filter: sepia(0.35) saturate(1.4) brightness(0.92) contrast(1.05) drop-shadow(0 25px 35px rgba(0,0,0,0.2));';
  const fBrown = 'filter: invert(0.35) sepia(0.8) saturate(2) hue-rotate(350deg) brightness(0.4) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const fYellow = 'filter: invert(0.1) sepia(0.8) saturate(4) hue-rotate(40deg) brightness(0.95) drop-shadow(0 25px 35px rgba(0,0,0,0.25));';

  const newItems = [
    // ----------------------------------------------------
    // 1. HOODIES (4 New Designs + Variants)
    // ----------------------------------------------------
    // H1. Soulmates Urdu Couple Hoodies (Pair of 2)
    {
      file: 'soulmates_hoodie_pair.jpg',
      html: createDualHtml('hoodie',
        fBlack, `<span style="font-size: 42px;">🤝</span><span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">SOULMATES</span><span style="font-size: 15px; color: #fbbf24; font-family: 'Georgia', serif;">دو دل ایک جان</span>`,
        fBeige, `<span style="font-size: 42px;">🤝</span><span style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">SOULMATES</span><span style="font-size: 15px; color: #78350f; font-family: 'Georgia', serif;">دو دل ایک جان</span>`
      )
    },
    {
      file: 'soulmates_hoodie_white.jpg',
      html: createDualHtml('hoodie',
        fBlack, `<span style="font-size: 42px;">🤝</span><span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">SOULMATES</span><span style="font-size: 15px; color: #fbbf24; font-family: 'Georgia', serif;">دو دل ایک جان</span>`,
        fWhite, `<span style="font-size: 42px;">🤝</span><span style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">SOULMATES</span><span style="font-size: 15px; color: #b45309; font-family: 'Georgia', serif;">دو دل ایک جان</span>`
      )
    },

    // H2. City 021/042 Streetwear Hoodie
    {
      file: 'city_street_hoodie_black.jpg',
      html: createGarmentHtml('hoodie', fBlack, `
        <span style="font-size: 46px; font-weight: 900; color: #ffffff; letter-spacing: 6px; text-shadow: 0 4px 12px rgba(0,0,0,0.8);">021 // 042</span>
        <span style="font-size: 20px; font-weight: 800; color: #38bdf8; letter-spacing: 4px; margin-top: 2px;">PAKISTAN STREETWEAR</span>
        <span style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 3px;">HEAVY FLEECE 380 GSM</span>
      `)
    },
    {
      file: 'city_street_hoodie_grey.jpg',
      html: createGarmentHtml('hoodie', fGrey, `
        <span style="font-size: 46px; font-weight: 900; color: #0f172a; letter-spacing: 6px;">021 // 042</span>
        <span style="font-size: 20px; font-weight: 800; color: #0284c7; letter-spacing: 4px; margin-top: 2px;">PAKISTAN STREETWEAR</span>
        <span style="font-size: 11px; font-weight: 700; color: #475569; letter-spacing: 3px;">HEAVY FLEECE 380 GSM</span>
      `)
    },
    {
      file: 'city_street_hoodie_navy.jpg',
      html: createGarmentHtml('hoodie', fNavy, `
        <span style="font-size: 46px; font-weight: 900; color: #ffffff; letter-spacing: 6px;">021 // 042</span>
        <span style="font-size: 20px; font-weight: 800; color: #60a5fa; letter-spacing: 4px; margin-top: 2px;">PAKISTAN STREETWEAR</span>
        <span style="font-size: 11px; font-weight: 700; color: #cbd5e1; letter-spacing: 3px;">HEAVY FLEECE 380 GSM</span>
      `)
    },

    // H3. Chai & Sardi Comfort Hoodie
    {
      file: 'chai_winter_hoodie_brown.jpg',
      html: createGarmentHtml('hoodie', fBrown, `
        <span style="font-size: 44px;">☕❄️</span>
        <span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">CHAI & SARDI</span>
        <span style="font-size: 16px; font-family: 'Georgia', serif; color: #fed7aa; margin-top: 2px;">گرما گرم چائے اور سرد شامیں</span>
      `)
    },
    {
      file: 'chai_winter_hoodie_beige.jpg',
      html: createGarmentHtml('hoodie', fBeige, `
        <span style="font-size: 44px;">☕❄️</span>
        <span style="font-size: 24px; font-weight: 900; color: #451a03; letter-spacing: 2px;">CHAI & SARDI</span>
        <span style="font-size: 16px; font-family: 'Georgia', serif; color: #9a3412; margin-top: 2px;">گرما گرم چائے اور سرد شامیں</span>
      `)
    },
    {
      file: 'chai_winter_hoodie_green.jpg',
      html: createGarmentHtml('hoodie', fGreen, `
        <span style="font-size: 44px;">☕❄️</span>
        <span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">CHAI & SARDI</span>
        <span style="font-size: 16px; font-family: 'Georgia', serif; color: #fde047; margin-top: 2px;">گرما گرم چائے اور سرد شامیں</span>
      `)
    },

    // H4. Babar 56 King of Cover Drives Hoodie
    {
      file: 'babar56_hoodie_white.jpg',
      html: createGarmentHtml('hoodie', fWhite, `
        <span style="font-size: 60px; font-weight: 900; color: #15803d;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 3px; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 11px; font-weight: 800; color: #d97706; letter-spacing: 2px;">COVER DRIVE KING</span>
      `)
    },
    {
      file: 'babar56_hoodie_black.jpg',
      html: createGarmentHtml('hoodie', fBlack, `
        <span style="font-size: 60px; font-weight: 900; color: #4ade80;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 3px; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 11px; font-weight: 800; color: #fde047; letter-spacing: 2px;">COVER DRIVE KING</span>
      `)
    },
    {
      file: 'babar56_hoodie_green.jpg',
      html: createGarmentHtml('hoodie', fGreen, `
        <span style="font-size: 60px; font-weight: 900; color: #ffffff;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #fde047; letter-spacing: 3px; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">COVER DRIVE KING</span>
      `)
    },

    // ----------------------------------------------------
    // 2. MUGS (4 New Designs + Variants)
    // ----------------------------------------------------
    // M1. King & Queen Mugs Set
    {
      file: 'king_queen_mugs.jpg',
      html: createDualHtml('mug',
        fBlack, `<span style="font-size: 34px;">👑</span><span style="font-size: 18px; font-weight: 900; color: #fbbf24; letter-spacing: 2px;">KING</span>`,
        fWhite, `<span style="font-size: 34px;">👑</span><span style="font-size: 18px; font-weight: 900; color: #b45309; letter-spacing: 2px;">QUEEN</span>`
      )
    },

    // M2. Babar 56 Signature Mug
    {
      file: 'babar56_mug_green.jpg',
      html: createGarmentHtml('mug', fGreen, `
        <span style="font-size: 44px; font-weight: 900; color: #ffffff;">56</span>
        <span style="font-size: 16px; font-weight: 900; color: #fde047; letter-spacing: 2px;">BABAR AZAM</span>
        <span style="font-size: 9px; font-weight: 800; color: #ffffff; letter-spacing: 1px;">COVER DRIVE KING</span>
      `)
    },
    {
      file: 'babar56_mug_white.jpg',
      html: createGarmentHtml('mug', fWhite, `
        <span style="font-size: 44px; font-weight: 900; color: #15803d;">56</span>
        <span style="font-size: 16px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">BABAR AZAM</span>
        <span style="font-size: 9px; font-weight: 800; color: #d97706; letter-spacing: 1px;">COVER DRIVE KING</span>
      `)
    },

    // M3. Suno Chanda / Chand Raat Aesthetic Mug
    {
      file: 'suno_chanda_mug_blue.jpg',
      html: createGarmentHtml('mug', fNavy, `
        <span style="font-size: 38px;">🌙⭐</span>
        <span style="font-size: 20px; font-family: 'Georgia', serif; font-weight: 900; color: #fde047;">سنو چندا</span>
        <span style="font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">MOONLIGHT EDITION</span>
      `)
    },
    {
      file: 'suno_chanda_mug_black.jpg',
      html: createGarmentHtml('mug', fBlack, `
        <span style="font-size: 38px;">🌙⭐</span>
        <span style="font-size: 20px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24;">سنو چندا</span>
        <span style="font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">MOONLIGHT EDITION</span>
      `)
    },

    // M4. Boss Lady & Real Boss Funny Couple Mugs
    {
      file: 'boss_couple_mugs.jpg',
      html: createDualHtml('mug',
        fBlack, `<span style="font-size: 30px;">💼</span><span style="font-size: 16px; font-weight: 900; color: #ffffff;">THE BOSS</span>`,
        fWhite, `<span style="font-size: 30px;">👠</span><span style="font-size: 16px; font-weight: 900; color: #db2777;">THE REAL BOSS</span>`
      )
    },

    // ----------------------------------------------------
    // 3. CAPS (4 New Designs + Variants)
    // ----------------------------------------------------
    // C1. Babar 56 Signature Cap
    {
      file: 'babar56_cap_black.jpg',
      html: createGarmentHtml('cap', fBlack, `
        <span style="font-size: 36px; font-weight: 900; color: #ffffff;">56</span>
        <span style="font-size: 14px; font-weight: 900; color: #4ade80; letter-spacing: 2px;">BABAR AZAM</span>
      `)
    },
    {
      file: 'babar56_cap_white.jpg',
      html: createGarmentHtml('cap', fWhite, `
        <span style="font-size: 36px; font-weight: 900; color: #15803d;">56</span>
        <span style="font-size: 14px; font-weight: 900; color: #0f172a; letter-spacing: 2px;">BABAR AZAM</span>
      `)
    },
    {
      file: 'babar56_cap_green.jpg',
      html: createGarmentHtml('cap', fGreen, `
        <span style="font-size: 36px; font-weight: 900; color: #ffffff;">56</span>
        <span style="font-size: 14px; font-weight: 900; color: #fde047; letter-spacing: 2px;">BABAR AZAM</span>
      `)
    },

    // C2. KING & QUEEN Crown Couple Caps
    {
      file: 'king_queen_caps.jpg',
      html: createDualHtml('cap',
        fBlack, `<span style="font-size: 32px;">👑</span><span style="font-size: 16px; font-weight: 900; color: #fbbf24;">KING</span>`,
        fWhite, `<span style="font-size: 32px;">👑</span><span style="font-size: 16px; font-weight: 900; color: #b45309;">QUEEN</span>`
      )
    },
    {
      file: 'king_queen_caps_black.jpg',
      html: createDualHtml('cap',
        fBlack, `<span style="font-size: 32px;">👑</span><span style="font-size: 16px; font-weight: 900; color: #fbbf24;">KING</span>`,
        fBlack, `<span style="font-size: 32px;">👑</span><span style="font-size: 16px; font-weight: 900; color: #fbbf24;">QUEEN</span>`
      )
    },

    // C3. Pakistan City Dad Cap (021/042)
    {
      file: 'pakistan_city_cap_charcoal.jpg',
      html: createGarmentHtml('cap', fBlack, `
        <span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 4px;">KHI • LHR</span>
        <span style="font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 2px;">PAKISTAN ORIGINALS</span>
      `)
    },
    {
      file: 'pakistan_city_cap_khaki.jpg',
      html: createGarmentHtml('cap', fBeige, `
        <span style="font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: 4px;">KHI • LHR</span>
        <span style="font-size: 12px; font-weight: 700; color: #78350f; letter-spacing: 2px;">PAKISTAN ORIGINALS</span>
      `)
    },
    {
      file: 'pakistan_city_cap_navy.jpg',
      html: createGarmentHtml('cap', fNavy, `
        <span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 4px;">KHI • LHR</span>
        <span style="font-size: 12px; font-weight: 700; color: #60a5fa; letter-spacing: 2px;">PAKISTAN ORIGINALS</span>
      `)
    },

    // C4. Truck Art Pop Embroidered Cap
    {
      file: 'truck_art_cap_black.jpg',
      html: createGarmentHtml('cap', fBlack, `
        <span style="font-size: 32px;">🦚✨</span>
        <span style="font-size: 14px; font-weight: 900; color: #f43f5e; letter-spacing: 2px;">TRUCK ART</span>
      `)
    },
    {
      file: 'truck_art_cap_blue.jpg',
      html: createGarmentHtml('cap', fNavy, `
        <span style="font-size: 32px;">🦚✨</span>
        <span style="font-size: 14px; font-weight: 900; color: #38bdf8; letter-spacing: 2px;">TRUCK ART</span>
      `)
    },

    // ----------------------------------------------------
    // 4. LAPTOP BAGS (4 New Designs + Variants)
    // ----------------------------------------------------
    // L1. Executive Tech Waterproof Briefcase
    {
      file: 'executive_tech_bag_grey.jpg',
      html: createGarmentHtml('bag', fGrey, `
        <span style="font-size: 38px;">💼🛡️</span>
        <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">EXECUTIVE TECH</span>
        <span style="font-size: 12px; font-weight: 800; color: #0284c7;">SHOCKPROOF 15.6"</span>
      `)
    },
    {
      file: 'executive_tech_bag_black.jpg',
      html: createGarmentHtml('bag', fBlack, `
        <span style="font-size: 38px;">💼🛡️</span>
        <span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">EXECUTIVE TECH</span>
        <span style="font-size: 12px; font-weight: 800; color: #38bdf8;">SHOCKPROOF 15.6"</span>
      `)
    },
    {
      file: 'executive_tech_bag_navy.jpg',
      html: createGarmentHtml('bag', fNavy, `
        <span style="font-size: 38px;">💼🛡️</span>
        <span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">EXECUTIVE TECH</span>
        <span style="font-size: 12px; font-weight: 800; color: #60a5fa;">SHOCKPROOF 15.6"</span>
      `)
    },

    // L2. Truck Art Peacock Laptop Sleeve
    {
      file: 'truck_art_laptop_sleeve_yellow.jpg',
      html: createGarmentHtml('bag', fYellow, `
        <span style="font-size: 44px;">🦚🌸</span>
        <span style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">TRUCK ART KARACHI</span>
        <span style="font-size: 13px; font-weight: 800; color: #be123c;">CHAMAKPATTI EDITION</span>
      `)
    },
    {
      file: 'truck_art_laptop_sleeve_black.jpg',
      html: createGarmentHtml('bag', fBlack, `
        <span style="font-size: 44px;">🦚🌸</span>
        <span style="font-size: 24px; font-weight: 900; color: #f43f5e; letter-spacing: 3px;">TRUCK ART KARACHI</span>
        <span style="font-size: 13px; font-weight: 800; color: #fde047;">CHAMAKPATTI EDITION</span>
      `)
    },

    // L3. Babar 56 Athlete Messenger Bag
    {
      file: 'babar56_laptop_bag_black.jpg',
      html: createGarmentHtml('bag', fBlack, `
        <span style="font-size: 44px; font-weight: 900; color: #4ade80;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">BABAR AZAM</span>
        <span style="font-size: 12px; font-weight: 800; color: #fde047;">PRO ATHLETE MESSENGER</span>
      `)
    },
    {
      file: 'babar56_laptop_bag_green.jpg',
      html: createGarmentHtml('bag', fGreen, `
        <span style="font-size: 44px; font-weight: 900; color: #ffffff;">56</span>
        <span style="font-size: 22px; font-weight: 900; color: #fde047; letter-spacing: 3px;">BABAR AZAM</span>
        <span style="font-size: 12px; font-weight: 800; color: #ffffff;">PRO ATHLETE MESSENGER</span>
      `)
    },

    // L4. KING & QUEEN Couple Monogram Laptop Bag
    {
      file: 'king_queen_laptop_bag_black.jpg',
      html: createGarmentHtml('bag', fBlack, `
        <span style="font-size: 42px;">👑💍</span>
        <span style="font-size: 22px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">KING & QUEEN</span>
        <span style="font-size: 12px; font-weight: 800; color: #ffffff;">LUXURY COUPLE MONOGRAM</span>
      `)
    },
    {
      file: 'king_queen_laptop_bag_brown.jpg',
      html: createGarmentHtml('bag', fBrown, `
        <span style="font-size: 42px;">👑💍</span>
        <span style="font-size: 22px; font-weight: 900; color: #fed7aa; letter-spacing: 3px;">KING & QUEEN</span>
        <span style="font-size: 12px; font-weight: 800; color: #ffffff;">VINTAGE BROWN MONOGRAM</span>
      `)
    }
  ];

  const targetDir = path.join(__dirname, 'assets', 'trending');

  for (let i = 0; i < newItems.length; i++) {
    const item = newItems[i];
    await page.setContent(item.html);
    await page.waitForTimeout(50);
    const dest = path.join(targetDir, item.file);
    await page.screenshot({ path: dest, quality: 92, type: 'jpeg' });
    console.log(`[${i + 1}/${newItems.length}] Generated: ${item.file} (${fs.statSync(dest).size} bytes)`);
  }

  await browser.close();
  console.log('All new product images across Hoodies, Mugs, Caps, and Bags generated successfully!');
})();
