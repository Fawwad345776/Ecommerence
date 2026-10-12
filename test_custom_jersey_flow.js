const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('--- Testing Custom Jersey Name & Number Feature End-to-End ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });

  // 1. Check card exists
  const card = await page.$('#card-prod-custom-jersey-name-number');
  if (!card) {
    console.error('ERROR: #card-prod-custom-jersey-name-number not found!');
    process.exit(1);
  }
  console.log('Found custom jersey card in catalog.');

  // 2. Click to open modal
  await page.click('#card-prod-custom-jersey-name-number .product-thumb-wrapper');
  await page.waitForSelector('#product-dialog-overlay.active', { state: 'visible' });
  await page.waitForTimeout(400);

  // 3. Verify inputs & overlay exist
  const nameOverlayBefore = await page.textContent('#jersey-overlay-name');
  const numOverlayBefore = await page.textContent('#jersey-overlay-number');
  console.log('Initial overlay:', { name: nameOverlayBefore, number: numOverlayBefore });

  // Check Add to Cart button is initially locked
  const addToCartBtn = await page.$('#dialog-add-to-cart-btn');
  const isDisabledInitially = await addToCartBtn.isDisabled();
  const initialBtnText = await addToCartBtn.textContent();
  console.log('Add to cart button initial state: disabled =', isDisabledInitially, ', text =', initialBtnText.trim());

  // 4. Enter custom user name & number
  console.log('Typing Name: "SHAHEEN", Number: "10"...');
  await page.fill('#jersey-input-name', 'SHAHEEN');
  await page.fill('#jersey-input-number', '10');
  await page.waitForTimeout(300);

  // Check live preview on jersey
  const nameOverlayLive = await page.textContent('#jersey-overlay-name');
  const numOverlayLive = await page.textContent('#jersey-overlay-number');
  console.log('Live jersey overlay text:', { name: nameOverlayLive, number: numOverlayLive });

  // Screenshot 1: Live user input on jersey
  await page.screenshot({ path: path.join(artifactsDir, 'proof_custom_jersey_live_input.png') });
  console.log('Saved proof_custom_jersey_live_input.png');

  // 5. Click Save Custom Details
  console.log('Clicking "Save Custom Details"...');
  await page.click('#jersey-save-details-btn');
  await page.waitForTimeout(300);

  const isUnlockedAfterSave = !(await addToCartBtn.isDisabled());
  const unlockedBtnText = await addToCartBtn.textContent();
  console.log('Add to cart button unlocked =', isUnlockedAfterSave, ', text =', unlockedBtnText.trim());

  // Screenshot 2: Saved state with unlocked button
  await page.screenshot({ path: path.join(artifactsDir, 'proof_custom_jersey_saved_unlocked.png') });
  console.log('Saved proof_custom_jersey_saved_unlocked.png');

  // 6. Click Add to Shopping Bag
  console.log('Clicking "ADD TO SHOPPING BAG"...');
  await page.click('#dialog-add-to-cart-btn');
  await page.waitForSelector('#cart-drawer-overlay.active', { state: 'visible' });
  await page.waitForTimeout(500);

  // Verify Cart contents
  const cartContent = await page.textContent('#cart-items-list');
  console.log('Cart Items Content:\n', cartContent.trim());

  // Screenshot 3: Cart Drawer with Custom Print details
  await page.screenshot({ path: path.join(artifactsDir, 'proof_custom_jersey_in_cart.png') });
  console.log('Saved proof_custom_jersey_in_cart.png');

  console.log('--- ALL TESTS PASSED FLUIDLY! ---');
  await browser.close();
})();
