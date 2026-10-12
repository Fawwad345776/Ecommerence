const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('--- Testing 12 Modern Full Sleeve T-Shirts End-to-End ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });

  // 1. Click Full Sleeves filter button
  console.log('1. Filtering by Full Sleeves category...');
  const fsFilterBtn = page.locator('button.filter-btn[data-filter="full-sleeves"]');
  await fsFilterBtn.click();
  await page.waitForTimeout(600);

  // 2. Count rendered products
  const productCards = page.locator('#products-grid-container .product-card');
  const count = await productCards.count();
  console.log(`Rendered Full Sleeve cards: ${count} (Expected: 12)`);
  if (count !== 12) {
    console.error(`ERROR: Expected 12 cards, but found ${count}`);
    process.exit(1);
  }

  // Capture proof of catalog
  const catalogProofPath = path.join(
    'C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain',
    '598ae2cf-b838-43c8-a9f7-996acb2491b7', 'proof_full_sleeves_catalog.png'
  );
  await page.screenshot({ path: catalogProofPath, fullPage: false });
  console.log('Saved catalog proof:', catalogProofPath);

  // 3. Click the first Modern Full Sleeve Product (Tokyo Cyberpunk)
  console.log('2. Opening Tokyo Cyberpunk Long Sleeve product modal...');
  const firstCardBtn = page.locator('#products-grid-container .product-card .btn-add-cart').first();
  await firstCardBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await firstCardBtn.click();

  // Wait for dialog overlay
  const dialogOverlay = page.locator('#product-dialog-overlay');
  await dialogOverlay.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(600);

  // Capture modal proof
  const modalProofPath = path.join(
    'C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain',
    '598ae2cf-b838-43c8-a9f7-996acb2491b7', 'proof_full_sleeves_modal.png'
  );
  await page.screenshot({ path: modalProofPath });
  console.log('Saved modal proof:', modalProofPath);

  // 4. Test color swatch switching
  console.log('3. Testing color swatch switching...');
  const swatches = page.locator('.dialog-swatch');
  const swatchCount = await swatches.count();
  console.log(`Found ${swatchCount} color swatches in modal`);
  if (swatchCount > 1) {
    await swatches.nth(1).click();
    await page.waitForTimeout(500);
  }

  // 5. Click Add to Shopping Bag
  console.log('4. Adding to Shopping Bag...');
  const addBtn = page.locator('#dialog-add-to-cart-btn');
  await addBtn.click();
  await page.waitForTimeout(800);

  // 6. Verify cart drawer opens with item
  const cartDrawer = page.locator('#cart-drawer');
  await cartDrawer.waitFor({ state: 'visible', timeout: 5000 });
  const cartItemTitle = await page.locator('.cart-item-title').first().textContent();
  console.log(`Item in Cart: "${cartItemTitle.trim()}"`);

  // Capture cart proof
  const cartProofPath = path.join(
    'C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain',
    '598ae2cf-b838-43c8-a9f7-996acb2491b7', 'proof_full_sleeves_cart.png'
  );
  await page.screenshot({ path: cartProofPath });
  console.log('Saved cart proof:', cartProofPath);

  console.log('--- ALL TESTS PASSED SUCCESSFULLY! ---');
  await browser.close();
})();
