const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('--- Testing Meezan Bank Card Payment & Checkout Unlock Flow ---');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('http://localhost:3030/', { waitUntil: 'networkidle' });

  const brainDir = path.join('C:', 'Users', 'Dell', '.gemini', 'antigravity-ide', 'brain', '598ae2cf-b838-43c8-a9f7-996acb2491b7');

  // 1. Add first product to shopping bag
  console.log('1. Adding product to shopping bag...');
  const firstBuyBtn = page.locator('.product-card .btn-add-cart').first();
  await firstBuyBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await firstBuyBtn.click();

  const productDialog = page.locator('#product-dialog-overlay');
  await productDialog.waitFor({ state: 'visible', timeout: 5000 });

  // If custom jersey, save details first
  const saveJerseyBtn = page.locator('#jersey-save-details-btn');
  if (await saveJerseyBtn.isVisible()) {
    await saveJerseyBtn.click();
    await page.waitForTimeout(400);
  }

  const dialogAddBtn = page.locator('#dialog-add-to-cart-btn');
  await dialogAddBtn.click();
  await page.waitForTimeout(600);

  // 2. Open Cart Drawer & Proceed to Checkout
  console.log('2. Proceeding to Checkout...');
  const proceedBtn = page.locator('#proceed-checkout-btn');
  await proceedBtn.waitFor({ state: 'visible', timeout: 5000 });
  await proceedBtn.click();

  const checkoutModal = page.locator('#checkout-modal-overlay');
  await checkoutModal.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(600);

  // Fill Delivery Fields
  console.log('3. Filling customer delivery info...');
  await page.fill('#customer-name', 'Hamza Farooq');
  await page.fill('#customer-phone', '0300 7654321');
  await page.selectOption('#customer-city', 'Lahore');
  await page.fill('#customer-address', 'House 42, Sector C, Phase 6, DHA, Lahore');

  // Verify Card Gateway Form is visible
  const cardGateway = page.locator('#bank-details-card');
  await cardGateway.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Capture Card Gateway Form proof
  const formProofPath = path.join(brainDir, 'proof_meezan_card_gateway_form.png');
  await page.screenshot({ path: formProofPath });
  console.log('Saved proof_meezan_card_gateway_form.png');

  // Check Checkout Button is locked initially
  const submitBtn = page.locator('#submit-order-btn');
  const initialBtnText = await submitBtn.textContent();
  console.log(`Initial Checkout Button Text: "${initialBtnText.trim()}"`);

  // 4. Fill Card Details
  console.log('4. Entering card details...');
  await page.fill('#card-holder-name', 'HAMZA FAROOQ');
  await page.fill('#card-number-input', '4214 5500 1234 9876');
  await page.fill('#card-expiry-input', '12/28');
  await page.fill('#card-cvv-input', '883');
  await page.waitForTimeout(400);

  // 5. Click "Pay via Card & Deposit to Meezan Bank"
  console.log('5. Clicking Pay via Card & Deposit to Meezan Bank...');
  const payCardBtn = page.locator('#btn-process-card-pay');
  await payCardBtn.click();

  // 6. Wait for Meezan Bank processing & success box
  const cardSuccessBox = page.locator('#card-payment-success-box');
  await cardSuccessBox.waitFor({ state: 'visible', timeout: 6000 });
  await page.waitForTimeout(800);

  // Capture Card Payment Paid & Checkout Unlocked proof
  await submitBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const paidProofPath = path.join(brainDir, 'proof_meezan_card_paid_unlocked.png');
  await page.screenshot({ path: paidProofPath });
  console.log('Saved proof_meezan_card_paid_unlocked.png');

  const unlockedBtnText = await submitBtn.textContent();
  console.log(`Unlocked Checkout Button Text: "${unlockedBtnText.trim()}"`);

  // 7. Click the unlocked Complete Checkout button!
  console.log('6. Submitting order through unlocked checkout button...');
  await submitBtn.click();

  // 8. Verify Order Confirmed Screen
  const successView = page.locator('#order-success-view');
  await successView.waitFor({ state: 'visible', timeout: 6000 });
  await page.waitForTimeout(600);

  const orderId = await page.locator('#success-order-id').textContent();
  const paymentNotice = await page.locator('#success-payment-notice').textContent();
  console.log(`Order Placed Successfully! Order ID: ${orderId.trim()}`);
  console.log(`Payment Notice: ${paymentNotice.trim()}`);

  // Capture Final Order Confirmed proof
  const orderProofPath = path.join(brainDir, 'proof_meezan_order_confirmed.png');
  await page.screenshot({ path: orderProofPath });
  console.log('Saved proof_meezan_order_confirmed.png');

  console.log('--- ALL MEEZAN BANK CARD PAYMENT TESTS PASSED! ---');
  await browser.close();
})();
