const { chromium } = require('playwright');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  const brainDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\598ae2cf-b838-43c8-a9f7-996acb2491b7';

  console.log('--- Testing Couple T-Shirt Separate Men & Women S M L XL Size Selection ---');

  await page.goto('http://localhost:3030', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // 1. Locate Couple T-Shirt card
  console.log('1. Locating Couple T-Shirt...');
  const coupleCard = page.locator('#card-prod-couple-matching-tees, #card-prod-couple-king-queen-tee').first();
  await coupleCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  // 2. Open Product Modal
  console.log('2. Opening Product Showcase Dialog...');
  await coupleCard.locator('.product-thumb-wrapper, .btn-add-cart').first().click();

  const modal = page.locator('#product-dialog-overlay');
  await modal.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(600);

  // 3. Verify Men and Women separate size buttons exist
  console.log('3. Verifying separate Men and Women S M L XL XXL options...');
  const menSizes = ['s', 'm', 'l', 'xl', 'xxl'];
  const womenSizes = ['s', 'm', 'l', 'xl', 'xxl'];

  for (const s of menSizes) {
    const btn = page.locator(`#couple-men-size-${s}`);
    const count = await btn.count();
    if (count === 0) throw new Error(`Men size button #couple-men-size-${s} not found!`);
  }
  console.log('✓ All Men size options (S, M, L, XL, XXL) found!');

  for (const s of womenSizes) {
    const btn = page.locator(`#couple-women-size-${s}`);
    const count = await btn.count();
    if (count === 0) throw new Error(`Women size button #couple-women-size-${s} not found!`);
  }
  console.log('✓ All Women size options (S, M, L, XL, XXL) found!');

  // 4. Select Men: XL and Women: S
  console.log('4. Selecting Men size: XL and Women size: S...');
  await page.locator('#couple-men-size-xl').click();
  await page.waitForTimeout(300);
  await page.locator('#couple-women-size-s').click();
  await page.waitForTimeout(300);

  const menLabel = await page.locator('#dialog-couple-men-label').textContent();
  const womenLabel = await page.locator('#dialog-couple-women-label').textContent();
  console.log(`Current Selected Labels -> Men: "${menLabel.trim()}", Women: "${womenLabel.trim()}"`);

  // Screenshot modal with dual size selector
  const modalProof = path.join(brainDir, 'proof_couple_dual_size_modal.png');
  await page.screenshot({ path: modalProof });
  console.log(`Saved ${modalProof}`);

  // 5. Click Add Couple Set to Bag
  console.log('5. Clicking Add Couple Set to Shopping Bag...');
  const addBtn = page.locator('#dialog-add-to-cart-btn');
  const addBtnText = await addBtn.textContent();
  console.log(`Button Text: "${addBtnText.trim()}"`);
  await addBtn.click();
  await page.waitForTimeout(800);

  // 6. Verify Cart Drawer
  const cartDrawer = page.locator('#cart-drawer');
  await cartDrawer.waitFor({ state: 'visible', timeout: 4000 });
  await page.waitForTimeout(500);

  const cartMeta = await page.locator('.cart-item-meta').first().textContent();
  console.log(`Cart Item Meta: "${cartMeta.replace(/\s+/g, ' ').trim()}"`);

  // Screenshot cart drawer
  const cartProof = path.join(brainDir, 'proof_couple_cart_dual_sizes.png');
  await page.screenshot({ path: cartProof });
  console.log(`Saved ${cartProof}`);

  console.log('--- ALL COUPLE T-SHIRT DUAL SIZE SELECTION TESTS PASSED! ---');
  await browser.close();
})();
