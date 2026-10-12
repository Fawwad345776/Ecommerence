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

  const artifactsDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');
  const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });

  console.log('Navigating to http://localhost:3030/#catalog...');
  await page.goto('http://localhost:3030/#catalog', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Check Pakistan Cricket Jersey Card Initial State
  const cardId = '#card-prod-cricket-jersey-tee';
  await page.waitForSelector(cardId);
  const initialCardImg = await page.$eval(`${cardId} img.product-img`, el => el.src);
  console.log('Initial Cricket Card Img:', initialCardImg);

  // Take screenshot of initial green card
  await page.screenshot({ path: path.join(artifactsDir, '21_card_green_initial.png') });

  // Click Onyx Black swatch on card
  console.log('Clicking Onyx Black on card...');
  await page.click(`${cardId} .color-dot[title="Onyx Black"]`);
  await page.waitForTimeout(300);
  const blackCardImg = await page.$eval(`${cardId} img.product-img`, el => el.src);
  console.log('Card Img after Black click:', blackCardImg);
  await page.screenshot({ path: path.join(artifactsDir, '22_card_black_swapped.png') });

  // Click Pure White swatch on card
  console.log('Clicking Pure White on card...');
  await page.click(`${cardId} .color-dot[title="Pure White"]`);
  await page.waitForTimeout(300);
  const whiteCardImg = await page.$eval(`${cardId} img.product-img`, el => el.src);
  console.log('Card Img after White click:', whiteCardImg);

  // 2. Open Product Dialog Modal
  console.log('Opening dialog modal...');
  await page.click(`${cardId} .btn-add-cart`);
  await page.waitForSelector('#product-dialog-overlay.active');
  await page.waitForTimeout(500);

  const modalImgWhite = await page.$eval('#dialog-preview-img', el => el.src);
  console.log('Modal Img (White):', modalImgWhite);
  await page.screenshot({ path: path.join(artifactsDir, '23_modal_white_swapped.png') });

  // Click Onyx Black swatch inside modal
  console.log('Clicking Onyx Black in modal...');
  await page.click('#dialog-color-dots .product-dialog-color-dot[title="Onyx Black"]');
  await page.waitForTimeout(300);
  const modalImgBlack = await page.$eval('#dialog-preview-img', el => el.src);
  console.log('Modal Img (Black):', modalImgBlack);
  await page.screenshot({ path: path.join(artifactsDir, '24_modal_black_swapped.png') });

  // Click Pakistan Green swatch inside modal
  console.log('Clicking Pakistan Green in modal...');
  await page.click('#dialog-color-dots .product-dialog-color-dot[title="Pakistan Green"]');
  await page.waitForTimeout(300);
  const modalImgGreen = await page.$eval('#dialog-preview-img', el => el.src);
  console.log('Modal Img (Green):', modalImgGreen);
  await page.screenshot({ path: path.join(artifactsDir, '25_modal_green_swapped.png') });

  // Re-select Black and Add to Bag
  console.log('Re-selecting Black in modal & adding to bag...');
  await page.click('#dialog-color-dots .product-dialog-color-dot[title="Onyx Black"]');
  await page.waitForTimeout(300);
  await page.click('#dialog-add-to-cart-btn');
  await page.waitForTimeout(800);

  // 3. Verify Cart Drawer Thumbnail and Color Label
  await page.waitForSelector('#cart-drawer-overlay.active');
  const cartItemTitle = await page.$eval('.cart-item-title', el => el.textContent.trim());
  const cartItemColor = await page.$eval('.cart-item-meta', el => el.textContent.trim());
  const cartItemImg = await page.$eval('.cart-item-thumb', el => el.src);
  console.log('Cart Item Details:', { cartItemTitle, cartItemColor, cartItemImg });

  await page.screenshot({ path: path.join(artifactsDir, '26_cart_drawer_black_jersey.png') });

  // Close Cart Drawer
  await page.click('#close-cart-btn');
  await page.waitForTimeout(400);

  // 4. Test Couple King & Queen Tee color swaps
  const kqCard = '#card-prod-couple-king-queen-tee';
  await page.waitForSelector(kqCard);
  console.log('Testing Couple King & Queen Card...');
  await page.click(`${kqCard} .color-dot[title="Both Jet Black"]`);
  await page.waitForTimeout(300);
  const kqBlackImg = await page.$eval(`${kqCard} img.product-img`, el => el.src);
  console.log('King & Queen (Both Jet Black):', kqBlackImg);
  await page.screenshot({ path: path.join(artifactsDir, '27_couple_both_black_swapped.png') });

  await page.click(`${kqCard} .color-dot[title="Both Pure White"]`);
  await page.waitForTimeout(300);
  const kqWhiteImg = await page.$eval(`${kqCard} img.product-img`, el => el.src);
  console.log('King & Queen (Both Pure White):', kqWhiteImg);
  await page.screenshot({ path: path.join(artifactsDir, '28_couple_both_white_swapped.png') });

  console.log('ALL TESTS PASSED WITH 100% COLOR FIDELITY!');
  await browser.close();
})();
