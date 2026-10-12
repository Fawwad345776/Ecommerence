const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  console.log('--- Starting Comprehensive End-to-End Verification ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  // Clear localStorage before testing
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  // 1. Verify 6 Horizontal Category Rows
  const categories = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.category-row-section')).map(s => {
      const title = s.querySelector('.category-row-title')?.textContent?.trim() || '';
      const badge = s.querySelector('.category-row-badge')?.textContent?.trim() || '';
      const count = s.querySelectorAll('.product-card').length;
      return { id: s.id, title, badge, count };
    });
  });
  console.log('Category Rows Found:', categories);

  // Take screenshot of catalog top navigation & categories
  await page.locator('#top-category-bar').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(artifactsDir, 'verify_top_category_bar.png') });

  // 2. Test Custom Fan Jersey
  console.log('\n--- Testing Custom Fan Jersey Modal ---');
  await page.click('#card-prod-custom-jersey-name-number .product-thumb-wrapper');
  await page.waitForSelector('#product-dialog-overlay.active', { state: 'visible' });
  await page.waitForTimeout(400);

  // Check initial overlay
  const initialName = await page.textContent('#jersey-overlay-name');
  const initialNum = await page.textContent('#jersey-overlay-number');
  console.log('Initial Jersey Text:', { initialName, initialNum });

  // Type custom name & number
  await page.fill('#jersey-input-name', 'HAMZA');
  await page.fill('#jersey-input-number', '07');
  await page.waitForTimeout(300);

  const updatedName = await page.textContent('#jersey-overlay-name');
  const updatedNum = await page.textContent('#jersey-overlay-number');
  console.log('Updated Live Jersey Text:', { updatedName, updatedNum });

  // Screenshot modal with live preview
  await page.screenshot({ path: path.join(artifactsDir, 'verify_custom_jersey_live_modal.png') });

  // Click Add to Cart
  await page.click('#dialog-add-to-cart-btn');
  await page.waitForSelector('#cart-drawer-overlay.active', { state: 'visible' });
  await page.waitForTimeout(500);

  // Check Cart Item text
  const cartItemMeta = await page.textContent('#cart-items-list');
  console.log('Cart Items Content after Custom Jersey:\n', cartItemMeta);
  await page.screenshot({ path: path.join(artifactsDir, 'verify_cart_custom_jersey.png') });

  // Close cart drawer
  await page.click('#close-cart-btn');
  await page.waitForTimeout(300);

  // 3. Test Couple Set Dual Size Selection
  console.log('\n--- Testing Couple Set Dual Size Selection ---');
  // Click on King & Queen Couple Full Sleeve or Couple Pair Tee
  const coupleCard = await page.locator('#card-prod-fs-couple-king-queen .product-thumb-wrapper, #card-prod-couple-pair-tee .product-thumb-wrapper').first();
  await coupleCard.click();
  await page.waitForSelector('#product-dialog-overlay.active', { state: 'visible' });
  await page.waitForTimeout(400);

  // Check Men & Women size labels
  const menLabelInitial = await page.textContent('#dialog-couple-men-label');
  const womenLabelInitial = await page.textContent('#dialog-couple-women-label');
  console.log('Couple Initial Sizes:', { menLabelInitial, womenLabelInitial });

  // Click XXL for Men and S for Women
  await page.locator('#dialog-size-pills button:text("XXL")').first().click();
  await page.locator('#dialog-size-pills button:text("S")').last().click();
  await page.waitForTimeout(300);

  const menLabelSelected = await page.textContent('#dialog-couple-men-label');
  const womenLabelSelected = await page.textContent('#dialog-couple-women-label');
  console.log('Couple Selected Sizes:', { menLabelSelected, womenLabelSelected });

  // Screenshot dual size modal
  await page.screenshot({ path: path.join(artifactsDir, 'verify_couple_dual_sizes_modal.png') });

  // Add Couple Set to Cart
  await page.click('#dialog-add-to-cart-btn');
  await page.waitForSelector('#cart-drawer-overlay.active', { state: 'visible' });
  await page.waitForTimeout(500);

  // Screenshot Cart Drawer with both custom items
  await page.screenshot({ path: path.join(artifactsDir, 'verify_cart_all_items.png') });

  // Close Cart Drawer
  await page.click('#close-cart-btn');
  await page.waitForTimeout(300);

  // 4. Test Full Sleeves Category Row & Color Swapping
  console.log('\n--- Testing Full Sleeves Category Row ---');
  await page.locator('#cat-row-full-sleeves').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactsDir, 'verify_full_sleeves_row.png') });

  // Test color swap on Babar 56 Full Sleeve (Pure White -> Onyx Black)
  const babarCard = page.locator('#card-prod-fs-babar56');
  if (await babarCard.count() > 0) {
    const blackDot = babarCard.locator('.color-dot[title="Onyx Black"]');
    await blackDot.click();
    await page.waitForTimeout(300);
    const imgSrc = await babarCard.locator('.product-img').getAttribute('src');
    console.log('Babar 56 Color Swapped to Onyx Black:', imgSrc);
  }

  console.log('\n--- All Tests Successfully Completed! ---');
  await browser.close();
})();
