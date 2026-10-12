const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outDir = path.join(__dirname, 'assets', 'trending');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const MOCKUP_TASKS = [
  {
    name: 'eid_hoodie.jpg',
    base: 'assets/blank_hoodie_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 36px "Noto Nastaliq Urdu", "Traditional Arabic", serif';
      ctx.fillText('عید مبارک', 400, 470);
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('EID MUBARAK • LUXURY FESTIVE', 400, 515);
      ctx.font = '32px sans-serif';
      ctx.fillText('🌙', 400, 420);
    }
  },
  {
    name: 'birthday_hoodie.jpg',
    base: 'assets/blank_hoodie_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('LEVEL UNLOCKED', 400, 440);
      ctx.font = '800 15px system-ui, sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.letterSpacing = '2px';
      ctx.fillText('★ HAPPY BIRTHDAY EDITION ★', 400, 480);
      ctx.font = '700 12px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('MADE FOR CELEBRATIONS • 2026', 400, 515);
    }
  },
  {
    name: 'eid_cap.jpg',
    base: 'assets/blank_cap_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4af37';
      ctx.font = '28px sans-serif';
      ctx.fillText('🌙', 400, 320);
      ctx.font = 'bold 20px "Noto Nastaliq Urdu", serif';
      ctx.fillText('عید مبارک', 400, 355);
      ctx.font = '800 10px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('EID MUBARAK', 400, 380);
    }
  },
  {
    name: 'couple_caps.jpg',
    base: 'assets/blank_cap_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4af37';
      ctx.font = '24px sans-serif';
      ctx.fillText('👑', 400, 320);
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('MR & MRS', 400, 355);
      ctx.font = '700 10px system-ui, sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SOULMATES FOREVER', 400, 380);
    }
  },
  {
    name: 'birthday_cap.jpg',
    base: 'assets/blank_cap_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#f59e0b';
      ctx.font = '26px sans-serif';
      ctx.fillText('🎂', 400, 320);
      ctx.font = '900 18px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('BIRTHDAY SQUAD', 400, 355);
      ctx.font = '700 10px monospace';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('LIMITED EDITION', 400, 380);
    }
  },
  {
    name: 'couple_laptop_bag.jpg',
    base: 'assets/blank_laptop_bag_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4af37';
      ctx.font = '32px sans-serif';
      ctx.fillText('💍', 400, 385);
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('BETTER TOGETHER', 400, 430);
      ctx.font = '700 13px system-ui, sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.letterSpacing = '1.5px';
      ctx.fillText('HUSBAND & WIFE • SOULMATE EDITION', 400, 465);
    }
  },
  {
    name: 'birthday_laptop_bag.jpg',
    base: 'assets/blank_laptop_bag_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '32px sans-serif';
      ctx.fillText('🎉', 400, 385);
      ctx.font = '900 24px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('HAPPY BIRTHDAY', 400, 430);
      ctx.font = '700 13px monospace';
      ctx.fillStyle = '#fbbf24';
      ctx.letterSpacing = '1.5px';
      ctx.fillText('CELEBRATE EVERY MOMENT • 2026', 400, 465);
    }
  },
  {
    name: 'chai_mug.jpg',
    base: 'assets/ceeprinto_mug_front_stage.webp',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d97706';
      ctx.font = '30px sans-serif';
      ctx.fillText('☕', 390, 400);
      ctx.font = 'bold 22px "Noto Nastaliq Urdu", serif';
      ctx.fillStyle = '#1e293b';
      ctx.fillText('پہلے چائے پھر کام', 390, 440);
      ctx.font = '800 10px system-ui, sans-serif';
      ctx.letterSpacing = '1.5px';
      ctx.fillStyle = '#64748b';
      ctx.fillText('PEHLAY CHAI PHIR KAAM', 390, 470);
    }
  },
  {
    name: 'babar56_tee.jpg',
    base: 'assets/blank_tshirt_front.jpg',
    render: (ctx) => {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#15803d';
      ctx.font = '900 48px system-ui, sans-serif';
      ctx.fillText('56', 400, 385);
      ctx.font = '900 22px system-ui, sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.letterSpacing = '2px';
      ctx.fillText('BABAR AZAM', 400, 435);
      ctx.font = '800 13px system-ui, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillStyle = '#d97706';
      ctx.fillText('★ COVER DRIVE KING ★', 400, 470);
    }
  }
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 800, height: 800 } });

  for (let i = 0; i < MOCKUP_TASKS.length; i++) {
    const task = MOCKUP_TASKS[i];
    const baseFile = path.join(__dirname, task.base);
    let baseDataUrl = '';
    if (fs.existsSync(baseFile)) {
      const ext = path.extname(baseFile).replace('.', '') === 'jpg' ? 'jpeg' : 'png';
      baseDataUrl = `data:image/${ext};base64,` + fs.readFileSync(baseFile).toString('base64');
    }

    const destPath = path.join(outDir, task.name);

    // Evaluate in page
    const renderStr = task.render.toString();

    const dataUrl = await page.evaluate(async ({ baseDataUrl, renderStr }) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');

      if (baseDataUrl) {
        const img = new Image();
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
          img.src = baseDataUrl;
        });
        ctx.drawImage(img, 0, 0, 800, 800);
      } else {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 800, 800);
      }

      // Execute render function
      const fn = new Function('ctx', '(' + renderStr + ')(ctx)');
      fn(ctx);

      return canvas.toDataURL('image/jpeg', 0.94);
    }, { baseDataUrl, renderStr });

    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    fs.writeFileSync(destPath, buffer);
    console.log(`[${i + 1}/${MOCKUP_TASKS.length}] Generated ${task.name} (${buffer.length} bytes)`);
  }

  await browser.close();
  console.log('All remaining trending mockups generated successfully!');
})();
