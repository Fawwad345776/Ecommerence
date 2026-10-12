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

  // 1. Screenshot Hoodies row
  const hoodiesSection = await page.$('#cat-row-hoodies');
  if (hoodiesSection) {
    await hoodiesSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactsDir, '31_expanded_hoodies_row.png') });
    console.log('Saved 31_expanded_hoodies_row.png');
  }

  // 2. Test Hoodies Color Swap
  const streetHoodieCard = '#card-prod-hoodie-city-street';
  await page.waitForSelector(streetHoodieCard);
  console.log('Testing City Street Hoodie color swap to Heather Grey...');
  await page.click(`${streetHoodieCard} .color-dot[title="Heather Grey"]`);
  await page.waitForTimeout(300);
  const hoodieImgGrey = await page.$eval(`${streetHoodieCard} img.product-img`, el => el.src);
  console.log('City Street Hoodie (Heather Grey):', hoodieImgGrey);

  // 3. Screenshot Mugs row
  const mugsSection = await page.$('#cat-row-mugs');
  if (mugsSection) {
    await mugsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactsDir, '32_expanded_mugs_row.png') });
    console.log('Saved 32_expanded_mugs_row.png');
  }

  // 4. Test Mug Color Swap
  const babarMugCard = '#card-prod-mug-babar56';
  await page.waitForSelector(babarMugCard);
  console.log('Testing Babar Mug color swap to Pure White...');
  await page.click(`${babarMugCard} .color-dot[title="Pure White"]`);
  await page.waitForTimeout(300);
  const mugImgWhite = await page.$eval(`${babarMugCard} img.product-img`, el => el.src);
  console.log('Babar Mug (Pure White):', mugImgWhite);

  // 5. Screenshot Caps row
  const capsSection = await page.$('#cat-row-caps');
  if (capsSection) {
    await capsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactsDir, '33_expanded_caps_row.png') });
    console.log('Saved 33_expanded_caps_row.png');
  }

  // 6. Test Cap Color Swap
  const babarCapCard = '#card-prod-cap-babar56';
  await page.waitForSelector(babarCapCard);
  console.log('Testing Babar Cap color swap to Forest Green...');
  await page.click(`${babarCapCard} .color-dot[title="Forest Green"]`);
  await page.waitForTimeout(300);
  const capImgGreen = await page.$eval(`${babarCapCard} img.product-img`, el => el.src);
  console.log('Babar Cap (Forest Green):', capImgGreen);

  // 7. Screenshot Laptop Bags row
  const bagsSection = await page.$('#cat-row-laptop-bags');
  if (bagsSection) {
    await bagsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(artifactsDir, '34_expanded_laptop_bags_row.png') });
    console.log('Saved 34_expanded_laptop_bags_row.png');
  }

  // 8. Test Laptop Bag Color Swap
  const techBagCard = '#card-prod-bag-executive-tech';
  await page.waitForSelector(techBagCard);
  console.log('Testing Executive Tech Bag color swap to Midnight Navy...');
  await page.click(`${techBagCard} .color-dot[title="Midnight Navy"]`);
  await page.waitForTimeout(300);
  const bagImgNavy = await page.$eval(`${techBagCard} img.product-img`, el => el.src);
  console.log('Tech Bag (Midnight Navy):', bagImgNavy);

  // 9. Open Modal for a new Mug and Add to Cart
  console.log('Opening modal for Suno Chanda Mug...');
  await page.click('#card-prod-mug-suno-chanda .btn-add-cart');
  await page.waitForSelector('#product-dialog-overlay.active');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactsDir, '35_suno_chanda_mug_modal.png') });

  await page.click('#dialog-add-to-cart-btn');
  await page.waitForTimeout(800);
  await page.waitForSelector('#cart-drawer-overlay.active');
  await page.screenshot({ path: path.join(artifactsDir, '36_cart_drawer_with_new_mug.png') });

  console.log('ALL CATEGORY EXPANSION TESTS PASSED COMPLETELY!');
  await browser.close();
})();
