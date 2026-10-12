const { chromium } = require('playwright');

(async () => {
  let browser;
  try { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
  catch(e) { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message, err.stack));
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });

  console.log('Clicking card thumb...');
  await page.evaluate(() => {
    window.openProductDialog('prod-custom-jersey-name-number');
  });

  const overlayActive = await page.evaluate(() => {
    const el = document.getElementById('product-dialog-overlay');
    return {
      display: el?.style.display,
      classList: Array.from(el?.classList || [])
    };
  });
  console.log('Overlay state:', overlayActive);
  await browser.close();
})();
