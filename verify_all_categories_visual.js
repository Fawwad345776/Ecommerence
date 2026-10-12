const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('--- Capturing Proofs for Hoodies, Mugs, Laptop Bags, and Caps ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });

  const brainDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');

  // 1. HOODIES SECTION
  console.log('1. Scrolling to Hoodies row...');
  const hoodiesRow = page.locator('#cat-row-hoodies');
  await hoodiesRow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(brainDir, 'proof_hoodies_row.png') });
  console.log('Saved proof_hoodies_row.png');

  // 2. MUGS & CUPS SECTION
  console.log('2. Scrolling to Mugs & Cups row...');
  const mugsRow = page.locator('#cat-row-mugs');
  await mugsRow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(brainDir, 'proof_mugs_row.png') });
  console.log('Saved proof_mugs_row.png');

  // 3. LAPTOP BAGS SECTION
  console.log('3. Scrolling to Laptop Bags row...');
  const bagsRow = page.locator('#cat-row-laptop-bags');
  await bagsRow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(brainDir, 'proof_laptop_bags_row.png') });
  console.log('Saved proof_laptop_bags_row.png');

  // 4. CAPS SECTION
  console.log('4. Scrolling to Caps row...');
  const capsRow = page.locator('#cat-row-caps');
  await capsRow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(brainDir, 'proof_caps_row.png') });
  console.log('Saved proof_caps_row.png');

  // 5. Test Filter Buttons
  console.log('5. Testing filter tabs...');
  for (const cat of ['hoodies', 'mugs', 'laptop-bags', 'caps']) {
    const btn = page.locator(`button.filter-btn[data-filter="${cat}"]`);
    await btn.click();
    await page.waitForTimeout(300);
    const count = await page.locator('#products-grid-container .product-card').count();
    console.log(`Filtered [${cat}]: ${count} cards displayed`);
  }

  console.log('--- ALL VISUAL VERIFICATIONS COMPLETED! ---');
  await browser.close();
})();
