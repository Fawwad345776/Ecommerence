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

  // Helper template for single garment with print
  function createGarmentHtml(type, colorStyle, graphicHtml) {
    let baseUri = teeUri;
    let imgStyle = "width: 100%; height: 100%; object-fit: contain;";
    let graphicTop = "215px";

    if (type === 'hoodie') {
      baseUri = hoodieUri;
      graphicTop = "255px";
    } else if (type === 'cap') {
      baseUri = capUri;
      graphicTop = "310px";
    } else if (type === 'mug') {
      baseUri = mugUri;
      graphicTop = "310px";
    } else if (type === 'bag') {
      baseUri = bagUri;
      graphicTop = "360px";
    }

    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.65) 100%);"></div>

        <div style="position: relative; width: 680px; height: 780px; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <!-- Real Garment Silhouette -->
          <img src="${baseUri}" style="${imgStyle} ${colorStyle}" />

          <!-- Chest Graphic -->
          <div style="position: absolute; top: ${graphicTop}; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 340px; text-align: center;">
            ${graphicHtml}
          </div>
        </div>
      </div>
    `;
  }

  // Helper template for couple pair garments (2 shirts side-by-side)
  function createCouplePairHtml(type, leftStyle, leftGraphic, rightStyle, rightGraphic) {
    const baseUri = type === 'hoodie' ? hoodieUri : teeUri;
    const topPos = type === 'hoodie' ? "230px" : "190px";

    return `
      <div style="width: 900px; height: 900px; background: #f8fafc; display: flex; align-items: center; justify-content: center; position: relative; font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;">
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9) 0%, rgba(226,232,240,0.65) 100%);"></div>

        <div style="position: relative; width: 880px; height: 780px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; z-index: 2;">
          <!-- Left Garment -->
          <div style="position: relative; width: 440px; height: 680px; display: flex; align-items: center; justify-content: center;">
            <img src="${baseUri}" style="width: 100%; height: 100%; object-fit: contain; ${leftStyle}" />
            <div style="position: absolute; top: ${topPos}; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; pointer-events: none; width: 230px; text-align: center;">
              ${leftGraphic}
            </div>
          </div>

          <!-- Right Garment -->
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

  const blackTeeFilter = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const whiteTeeFilter = 'filter: drop-shadow(0 25px 35px rgba(0,0,0,0.18));';
  const greenTeeFilter = 'filter: invert(0.35) sepia(1) saturate(5) hue-rotate(95deg) brightness(0.65) contrast(1.2) drop-shadow(0 25px 35px rgba(0,0,0,0.25));';
  const navyTeeFilter = 'filter: invert(0.85) sepia(0.6) saturate(3) hue-rotate(185deg) brightness(0.28) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const greyTeeFilter = 'filter: brightness(0.7) contrast(1.1) drop-shadow(0 25px 35px rgba(0,0,0,0.25));';
  const beigeTeeFilter = 'filter: sepia(0.35) saturate(1.4) brightness(0.92) contrast(1.05) drop-shadow(0 25px 35px rgba(0,0,0,0.2));';

  const blackHoodieFilter = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const greyHoodieFilter = 'filter: brightness(0.7) contrast(1.1) drop-shadow(0 25px 35px rgba(0,0,0,0.25));';
  const navyHoodieFilter = 'filter: invert(0.85) sepia(0.6) saturate(3) hue-rotate(185deg) brightness(0.25) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const greenHoodieFilter = 'filter: invert(0.35) sepia(1) saturate(5) hue-rotate(95deg) brightness(0.65) contrast(1.2) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const whiteHoodieFilter = 'filter: drop-shadow(0 25px 35px rgba(0,0,0,0.18));';

  const blackCapFilter = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 20px 30px rgba(0,0,0,0.35));';
  const whiteCapFilter = 'filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));';
  const beigeCapFilter = 'filter: sepia(0.4) saturate(1.4) brightness(0.88) contrast(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.2));';

  const whiteMugFilter = 'filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));';
  const blackMugFilter = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 20px 30px rgba(0,0,0,0.35));';

  const blackBagFilter = 'filter: invert(0.92) brightness(0.18) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';
  const navyBagFilter = 'filter: invert(0.85) sepia(0.6) saturate(3) hue-rotate(185deg) brightness(0.28) contrast(1.3) drop-shadow(0 25px 35px rgba(0,0,0,0.35));';

  const variants = [
    // 1. Pakistan Cricket Jersey Tee Variants
    {
      file: 'pk_cricket_tee_black.jpg',
      html: createGarmentHtml('tee', blackTeeFilter, `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 32px; filter: drop-shadow(0 2px 6px rgba(22,163,74,0.6));">⭐</span>
          <span style="font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #16a34a;">PAKISTAN</span>
        </div>
        <span style="font-size: 40px; font-weight: 900; letter-spacing: 4px; color: #ffffff; text-shadow: 0 4px 10px rgba(0,0,0,0.8);">CRICKET '92</span>
        <span style="font-size: 11px; font-weight: 800; letter-spacing: 3px; color: #4ade80; text-transform: uppercase; margin-top: 4px;">OFFICIAL NATIONAL EDITION</span>
      `)
    },
    {
      file: 'pk_cricket_tee_white.jpg',
      html: createGarmentHtml('tee', whiteTeeFilter, `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 32px; filter: drop-shadow(0 2px 6px rgba(22,163,74,0.6));">⭐</span>
          <span style="font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #15803d;">PAKISTAN</span>
        </div>
        <span style="font-size: 40px; font-weight: 900; letter-spacing: 4px; color: #0f172a;">CRICKET '92</span>
        <span style="font-size: 11px; font-weight: 800; letter-spacing: 3px; color: #15803d; text-transform: uppercase; margin-top: 4px;">OFFICIAL NATIONAL EDITION</span>
      `)
    },

    // 2. Babar 56 Tee Variants
    {
      file: 'babar56_tee_black.jpg',
      html: createGarmentHtml('tee', blackTeeFilter, `
        <span style="font-size: 64px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-shadow: 0 4px 12px rgba(22,163,74,0.6);">56</span>
        <span style="font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #4ade80; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #e2e8f0; text-transform: uppercase; margin-top: 2px;">COVER DRIVE KING</span>
      `)
    },
    {
      file: 'babar56_tee_green.jpg',
      html: createGarmentHtml('tee', greenTeeFilter, `
        <span style="font-size: 64px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-shadow: 0 4px 12px rgba(0,0,0,0.7);">56</span>
        <span style="font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #fde047; margin-top: -6px;">BABAR AZAM</span>
        <span style="font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin-top: 2px;">COVER DRIVE KING</span>
      `)
    },

    // 3. Cricket Emerald Mug Variants
    {
      file: 'pk_cricket_mug_white.jpg',
      html: createGarmentHtml('mug', whiteMugFilter, `
        <span style="font-size: 36px;">⭐🏏</span>
        <span style="font-size: 18px; font-weight: 900; color: #15803d; letter-spacing: 2px;">PAKISTAN</span>
        <span style="font-size: 11px; font-weight: 800; color: #0f172a;">CRICKET EDITION</span>
      `)
    },

    // 4. Cricket Hoodie Variants
    {
      file: 'pk_cricket_hoodie_black.jpg',
      html: createGarmentHtml('hoodie', blackHoodieFilter, `
        <span style="font-size: 46px; filter: drop-shadow(0 2px 8px rgba(22,163,74,0.6));">⭐🏏</span>
        <span style="font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #22c55e; margin-top: 2px;">PAKISTAN</span>
        <span style="font-size: 16px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">NATIONAL CREST FLEECE</span>
      `)
    },
    {
      file: 'pk_cricket_hoodie_grey.jpg',
      html: createGarmentHtml('hoodie', greyHoodieFilter, `
        <span style="font-size: 46px; filter: drop-shadow(0 2px 8px rgba(22,163,74,0.6));">⭐🏏</span>
        <span style="font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #15803d; margin-top: 2px;">PAKISTAN</span>
        <span style="font-size: 16px; font-weight: 800; letter-spacing: 2px; color: #0f172a;">NATIONAL CREST FLEECE</span>
      `)
    },

    // 5. Cricket Cap Variants
    {
      file: 'pk_cricket_cap_black.jpg',
      html: createGarmentHtml('cap', blackCapFilter, `
        <span style="font-size: 38px; filter: drop-shadow(0 2px 6px rgba(22,163,74,0.7));">⭐</span>
        <span style="font-size: 16px; font-weight: 900; letter-spacing: 2px; color: #22c55e;">PAKISTAN</span>
      `)
    },
    {
      file: 'pk_cricket_cap_white.jpg',
      html: createGarmentHtml('cap', whiteCapFilter, `
        <span style="font-size: 38px; filter: drop-shadow(0 2px 6px rgba(22,163,74,0.7));">⭐</span>
        <span style="font-size: 16px; font-weight: 900; letter-spacing: 2px; color: #15803d;">PAKISTAN</span>
      `)
    },

    // 6. Cricket Laptop Bag Variants
    {
      file: 'cricket_laptop_bag_black.jpg',
      html: createGarmentHtml('bag', blackBagFilter, `
        <span style="font-size: 42px;">⭐🏏</span>
        <span style="font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #22c55e;">PAKISTAN CRICKET</span>
        <span style="font-size: 13px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">EXECUTIVE BRIEFCASE</span>
      `)
    },

    // 7. Eid Mubarak Tee Variants
    {
      file: 'eid_mubarak_tee_white.jpg',
      html: createGarmentHtml('tee', whiteTeeFilter, `
        <span style="font-size: 48px; filter: drop-shadow(0 2px 6px rgba(217,119,6,0.5));">🌙✨</span>
        <span style="font-size: 32px; font-family: 'Georgia', serif; font-weight: 900; color: #b45309; margin-top: 2px;">عید مبارک</span>
        <span style="font-size: 22px; font-weight: 900; letter-spacing: 4px; color: #0f172a; margin-top: 2px;">EID MUBARAK</span>
        <span style="font-size: 10px; font-weight: 800; letter-spacing: 3px; color: #b45309; text-transform: uppercase; margin-top: 2px;">GOLD LUXURY EDITION</span>
      `)
    },
    {
      file: 'eid_mubarak_tee_beige.jpg',
      html: createGarmentHtml('tee', beigeTeeFilter, `
        <span style="font-size: 48px; filter: drop-shadow(0 2px 6px rgba(217,119,6,0.5));">🌙✨</span>
        <span style="font-size: 32px; font-family: 'Georgia', serif; font-weight: 900; color: #b45309; margin-top: 2px;">عید مبارک</span>
        <span style="font-size: 22px; font-weight: 900; letter-spacing: 4px; color: #0f172a; margin-top: 2px;">EID MUBARAK</span>
        <span style="font-size: 10px; font-weight: 800; letter-spacing: 3px; color: #78350f; text-transform: uppercase; margin-top: 2px;">BEIGE GOLD EDITION</span>
      `)
    },

    // 8. Eid Mug Variants
    {
      file: 'eid_mubarak_mug_black.jpg',
      html: createGarmentHtml('mug', blackMugFilter, `
        <span style="font-size: 36px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">🌙✨</span>
        <span style="font-size: 20px; font-weight: 900; color: #fbbf24; font-family: 'Georgia', serif;">عید مبارک</span>
        <span style="font-size: 12px; font-weight: 800; color: #ffffff; letter-spacing: 2px;">EID MUBARAK</span>
      `)
    },

    // 9. Eid Hoodie Variants
    {
      file: 'eid_hoodie_navy.jpg',
      html: createGarmentHtml('hoodie', navyHoodieFilter, `
        <span style="font-size: 44px; filter: drop-shadow(0 2px 8px rgba(245,158,11,0.6));">🌙✨</span>
        <span style="font-size: 26px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24;">عید مبارک</span>
        <span style="font-size: 18px; font-weight: 900; letter-spacing: 3px; color: #ffffff;">EID MUBARAK FLEECE</span>
      `)
    },
    {
      file: 'eid_hoodie_green.jpg',
      html: createGarmentHtml('hoodie', greenHoodieFilter, `
        <span style="font-size: 44px; filter: drop-shadow(0 2px 8px rgba(245,158,11,0.6));">🌙✨</span>
        <span style="font-size: 26px; font-family: 'Georgia', serif; font-weight: 900; color: #fbbf24;">عید مبارک</span>
        <span style="font-size: 18px; font-weight: 900; letter-spacing: 3px; color: #ffffff;">EID MUBARAK FLEECE</span>
      `)
    },

    // 10. Eid Cap Variants
    {
      file: 'eid_cap_white.jpg',
      html: createGarmentHtml('cap', whiteCapFilter, `
        <span style="font-size: 34px; filter: drop-shadow(0 2px 6px rgba(217,119,6,0.6));">🌙</span>
        <span style="font-size: 15px; font-weight: 900; letter-spacing: 2px; color: #b45309;">EID MUBARAK</span>
      `)
    },
    {
      file: 'eid_cap_beige.jpg',
      html: createGarmentHtml('cap', beigeCapFilter, `
        <span style="font-size: 34px; filter: drop-shadow(0 2px 6px rgba(217,119,6,0.6));">🌙</span>
        <span style="font-size: 15px; font-weight: 900; letter-spacing: 2px; color: #78350f;">EID MUBARAK</span>
      `)
    },

    // 11. Couple Matching Tees (Hubby & Wifey) - Navy & White Pair
    {
      file: 'couple_matching_tee_navy.jpg',
      html: createCouplePairHtml('tee',
        navyTeeFilter,
        `<span style="font-size: 42px;">💍</span><span style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">HUBBY</span><span style="font-size: 11px; font-weight: 800; color: #60a5fa; letter-spacing: 2px;">MR. RIGHT</span>`,
        whiteTeeFilter,
        `<span style="font-size: 42px;">💍</span><span style="font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: 3px;">WIFEY</span><span style="font-size: 11px; font-weight: 800; color: #e11d48; letter-spacing: 2px;">MRS. ALWAYS RIGHT</span>`
      )
    },

    // 12. Soulmates Tee Variants
    {
      file: 'couple_soulmates_tee_white.jpg',
      html: createGarmentHtml('tee', whiteTeeFilter, `
        <span style="font-size: 48px; filter: drop-shadow(0 2px 6px rgba(244,114,182,0.4));">🤝💕</span>
        <span style="font-size: 30px; font-weight: 900; letter-spacing: 4px; color: #0f172a;">SOULMATES</span>
        <span style="font-size: 18px; font-family: 'Georgia', serif; font-style: italic; color: #b45309; margin-top: 2px;">دو دل ایک جان</span>
      `)
    },
    {
      file: 'couple_soulmates_tee_beige.jpg',
      html: createGarmentHtml('tee', beigeTeeFilter, `
        <span style="font-size: 48px; filter: drop-shadow(0 2px 6px rgba(244,114,182,0.4));">🤝💕</span>
        <span style="font-size: 30px; font-weight: 900; letter-spacing: 4px; color: #0f172a;">SOULMATES</span>
        <span style="font-size: 18px; font-family: 'Georgia', serif; font-style: italic; color: #78350f; margin-top: 2px;">دو دل ایک جان</span>
      `)
    },

    // 13. Couple Mr & Mrs Right - Black & Pink Accent Pair
    {
      file: 'couple_mr_mrs_right_tee_black_pink.jpg',
      html: createCouplePairHtml('tee',
        blackTeeFilter,
        `<span style="font-size: 42px;">🤵</span><span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">MR. RIGHT</span>`,
        whiteTeeFilter,
        `<span style="font-size: 42px;">👰</span><span style="font-size: 22px; font-weight: 900; color: #db2777; letter-spacing: 2px;">MRS. ALWAYS RIGHT</span>`
      )
    },

    // 14. Couple Better Together - Pure Black Duo
    {
      file: 'couple_better_together_tee_black.jpg',
      html: createCouplePairHtml('tee',
        blackTeeFilter,
        `<span style="font-size: 40px;">❤️</span><span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">BETTER</span>`,
        blackTeeFilter,
        `<span style="font-size: 40px;">❤️</span><span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">TOGETHER</span>`
      )
    },

    // 15. Couple King & Queen - Both Jet Black & Both Pure White
    {
      file: 'couple_king_queen_tee_black.jpg',
      html: createCouplePairHtml('tee',
        blackTeeFilter,
        `<span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">👑</span><span style="font-size: 26px; font-weight: 900; color: #fbbf24; letter-spacing: 4px;">KING</span>`,
        blackTeeFilter,
        `<span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">👑</span><span style="font-size: 26px; font-weight: 900; color: #fbbf24; letter-spacing: 4px;">QUEEN</span>`
      )
    },
    {
      file: 'couple_king_queen_tee_white.jpg',
      html: createCouplePairHtml('tee',
        whiteTeeFilter,
        `<span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">👑</span><span style="font-size: 26px; font-weight: 900; color: #b45309; letter-spacing: 4px;">KING</span>`,
        whiteTeeFilter,
        `<span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">👑</span><span style="font-size: 26px; font-weight: 900; color: #b45309; letter-spacing: 4px;">QUEEN</span>`
      )
    },

    // 16. Couple King & Queen Hoodies - Black + White
    {
      file: 'couple_hoodie_white.jpg',
      html: createCouplePairHtml('hoodie',
        blackHoodieFilter,
        `<span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">👑</span><span style="font-size: 24px; font-weight: 900; color: #fbbf24; letter-spacing: 3px;">KING</span>`,
        whiteHoodieFilter,
        `<span style="font-size: 44px; filter: drop-shadow(0 2px 6px rgba(245,158,11,0.6));">👑</span><span style="font-size: 24px; font-weight: 900; color: #b45309; letter-spacing: 3px;">QUEEN</span>`
      )
    },

    // 17. Couple Laptop Bag - Onyx Black
    {
      file: 'couple_laptop_bag_black.jpg',
      html: createGarmentHtml('bag', blackBagFilter, `
        <span style="font-size: 40px;">💍</span>
        <span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 3px;">BETTER TOGETHER</span>
        <span style="font-size: 13px; font-weight: 800; color: #fbbf24; letter-spacing: 2px;">HUSBAND & WIFE EDITION</span>
      `)
    },

    // 18. Birthday Vintage Legend Tee Variants
    {
      file: 'birthday_tee_white.jpg',
      html: createGarmentHtml('tee', whiteTeeFilter, `
        <span style="font-size: 40px;">👑🎉</span>
        <span style="font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #0f172a;">VINTAGE LEGEND</span>
        <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #64748b;">AGED TO PERFECTION</span>
      `)
    },
    {
      file: 'birthday_tee_grey.jpg',
      html: createGarmentHtml('tee', greyTeeFilter, `
        <span style="font-size: 40px;">👑🎉</span>
        <span style="font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #ffffff;">VINTAGE LEGEND</span>
        <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #fde047;">AGED TO PERFECTION</span>
      `)
    },

    // 19. Birthday Hoodie Variants
    {
      file: 'birthday_hoodie_navy.jpg',
      html: createGarmentHtml('hoodie', navyHoodieFilter, `
        <span style="font-size: 44px;">🎮🎂</span>
        <span style="font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #60a5fa;">LEVEL UNLOCKED</span>
        <span style="font-size: 14px; font-weight: 800; color: #ffffff;">HAPPY BIRTHDAY</span>
      `)
    },
    {
      file: 'birthday_hoodie_grey.jpg',
      html: createGarmentHtml('hoodie', greyHoodieFilter, `
        <span style="font-size: 44px;">🎮🎂</span>
        <span style="font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #0f172a;">LEVEL UNLOCKED</span>
        <span style="font-size: 14px; font-weight: 800; color: #2563eb;">HAPPY BIRTHDAY</span>
      `)
    },

    // 20. Birthday Cap Variants
    {
      file: 'birthday_cap_white.jpg',
      html: createGarmentHtml('cap', whiteCapFilter, `
        <span style="font-size: 34px;">🎂</span>
        <span style="font-size: 16px; font-weight: 900; letter-spacing: 2px; color: #0f172a;">BIRTHDAY SQUAD</span>
      `)
    },

    // 21. Birthday Laptop Bag - Midnight Navy
    {
      file: 'birthday_laptop_bag_navy.jpg',
      html: createGarmentHtml('bag', navyBagFilter, `
        <span style="font-size: 42px;">🎉🎂</span>
        <span style="font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #60a5fa;">CELEBRATE EVERY MOMENT</span>
        <span style="font-size: 13px; font-weight: 800; color: #ffffff;">HAPPY BIRTHDAY EDITION</span>
      `)
    },

    // 22. Classic Blank Tee Variants
    {
      file: 'classic_tee_black.jpg',
      html: createGarmentHtml('tee', blackTeeFilter, `
        <span style="font-size: 14px; font-weight: 800; letter-spacing: 4px; color: #94a3b8; text-transform: uppercase;">PREMIUM COMBED COTTON</span>
      `)
    },
    {
      file: 'classic_tee_navy.jpg',
      html: createGarmentHtml('tee', navyTeeFilter, `
        <span style="font-size: 14px; font-weight: 800; letter-spacing: 4px; color: #93c5fd; text-transform: uppercase;">PREMIUM COMBED COTTON</span>
      `)
    },

    // 23. Classic Hoodie Variants
    {
      file: 'classic_hoodie_grey.jpg',
      html: createGarmentHtml('hoodie', greyHoodieFilter, `
        <span style="font-size: 15px; font-weight: 800; letter-spacing: 4px; color: #0f172a; text-transform: uppercase;">380 GSM HEAVYWEIGHT FLEECE</span>
      `)
    }
  ];

  const targetDir = path.join(__dirname, 'assets', 'trending');

  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    await page.setContent(v.html);
    await page.waitForTimeout(60);
    const dest = path.join(targetDir, v.file);
    await page.screenshot({ path: dest, quality: 92, type: 'jpeg' });
    console.log(`[${i + 1}/${variants.length}] Generated: ${v.file} (${fs.statSync(dest).size} bytes)`);
  }

  await browser.close();
  console.log('All color variants successfully generated!');
})();
