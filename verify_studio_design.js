const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

  console.log('Navigating to http://localhost:3030...');
  await page.goto('http://localhost:3030', { waitUntil: 'networkidle' });

  const brainDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7', 'scratch');

  // Find a product card with "Customize This Design in Studio"
  console.log('Clicking "Customize This Design in Studio" on product 2 (Truck Art Pop Tee)...');
  const customizeButtons = await page.$$('.btn-customize-card');
  console.log('Found customize buttons:', customizeButtons.length);

  // Click second one (Modern Truck Art Peacock Pop-Art Tee)
  if (customizeButtons.length > 1) {
    await customizeButtons[1].click();
  } else if (customizeButtons.length > 0) {
    await customizeButtons[0].click();
  }

  await page.waitForTimeout(1200);

  // Switch to Images Tab if not already
  const imgTab = await page.$('.studio-tab-btn[data-tab="images"]');
  if (imgTab) await imgTab.click();
  await page.waitForTimeout(600);

  // Check how many ready designs in studio grid
  const designThumbs = await page.$$('.ready-design-thumb');
  console.log('Studio Ready Designs count in library:', designThumbs.length);

  await page.screenshot({ path: path.join(brainDir, 'verify_studio_with_product_custom_design.png') });
  console.log('Saved verify_studio_with_product_custom_design.png');

  // Test filter tag in studio (e.g. Truck Art)
  const truckTag = await page.$('.studio-tag-btn[data-tag="truck_art"]');
  if (truckTag) {
    await truckTag.click();
    await page.waitForTimeout(500);
    const visibleThumbs = await page.$$eval('.ready-design-thumb', thumbs => thumbs.filter(t => t.style.display !== 'none').length);
    console.log('Visible truck art designs:', visibleThumbs);
    await page.screenshot({ path: path.join(brainDir, 'verify_studio_filter_truck_art.png') });
    console.log('Saved verify_studio_filter_truck_art.png');
  }

  // Add custom design to bag
  console.log('Adding custom design from studio to bag...');
  await page.click('#studio-order-btn');
  await page.waitForTimeout(800);

  const subtotal = await page.textContent('#cart-subtotal');
  const totalPayable = await page.textContent('#cart-total-payable');
  console.log(`Cart with Custom Design: Subtotal=${subtotal}, TotalPayable=${totalPayable}`);
  await page.screenshot({ path: path.join(brainDir, 'verify_cart_with_custom_product_design.png') });
  console.log('Saved verify_cart_with_custom_product_design.png');

  await browser.close();
  console.log('Studio verification complete!');
})();
