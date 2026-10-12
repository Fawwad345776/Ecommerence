const fs = require('fs');
const path = require('path');

// 1. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');

// Breadcrumb & studio undo/redo
html = html.replace('title="Undo (Peeche jayein)"', 'title="Undo"');
html = html.replace('title="Redo (Aage jayein)"', 'title="Redo"');

// Graphics subtitle
html = html.replace(
  'Yeh versatile graphics hain jo Cup, Cap, Note, Hoodie, T-Shirt sab pe print ho sakti hain:',
  'Versatile graphic collection ready to print on Mugs, T-Shirts, Hoodies, Caps, and Accessories:'
);

// Order tracker text
html = html.replace(
  'Apna Order ID (maslan MF-8921) ya WhatsApp number darj karein aur parcel tracking check karein:',
  'Enter your Order ID (e.g., MF-8921) or phone number to track live delivery status:'
);
html = html.replace(
  'placeholder="Order ID (MF-xxxx) ya 03001234567"',
  'placeholder="Order ID (e.g. MF-8921) or 03001234567"'
);
html = html.replace(
  '<span>Track Karein</span>',
  '<span>Track Order</span>'
);

// Custom item notice in checkout
html = html.replace(
  'Aapke bag mein custom printed / personalized item mojood hai. Customized orders par <strong>Cash on Delivery (COD) dastiyab nahi hai</strong>. Production aur printing shuru karne ke liye <strong>50% Advance ya 100% Online Payment</strong> lazmi hai.',
  'Your bag contains customized / personalized merchandise. Cash on Delivery is unavailable on custom goods. A minimum <strong>50% Advance Deposit or 100% Full Payment</strong> is required to start printing.'
);

// Payment card subtitles
html = html.replace(
  '<span class="payment-card-sub" id="sub-cod-desc">Parcel receive hone par rider ko 100% cash dena hoga</span>',
  '<span class="payment-card-sub" id="sub-cod-desc">Pay 100% cash to courier rider upon doorstep delivery</span>'
);
html = html.replace(
  '<span class="payment-card-sub" id="sub-half-desc">50% Advance abhi online + 50% Cash parcel delivery par</span>',
  '<span class="payment-card-sub" id="sub-half-desc">Pay 50% advance online now + 50% cash upon delivery</span>'
);
html = html.replace(
  '<span class="payment-card-sub" id="sub-full-desc">Abhi 100% online advance pay karein (Doorstep Cash: Rs. 0)</span>',
  '<span class="payment-card-sub" id="sub-full-desc">Pay 100% advance online now (Doorstep Cash: Rs. 0)</span>'
);

// Split breakdown labels
html = html.replace(
  '<span class="split-label" style="font-size: 0.76rem; font-weight: 700; color: #1e40af; display: block; margin-bottom: 4px;">💳 Abhi Online Pay Karein:</span>',
  '<span class="split-label" style="font-size: 0.76rem; font-weight: 700; color: #1e40af; display: block; margin-bottom: 4px;">💳 Pay Advance Online Now:</span>'
);
html = html.replace(
  '<span class="split-label" style="font-size: 0.76rem; font-weight: 700; color: #991b1b; display: block; margin-bottom: 4px;">💵 Delivery par Rider ko Dena Hoga:</span>',
  '<span class="split-label" style="font-size: 0.76rem; font-weight: 700; color: #991b1b; display: block; margin-bottom: 4px;">💵 Due on Doorstep Delivery:</span>'
);

// Order Success View
html = html.replace(
  'Shukriya! Aapka order receive ho chuka hai aur hamare studio mein production ke liye queue ho gaya hai.',
  'Thank you! Your order has been placed and queued for production in our studio.'
);
html = html.replace(
  'Trax Express tracking number aapke WhatsApp number par deliver ho jayega.',
  'Your parcel tracking number will be delivered to your WhatsApp number.'
);
html = html.replace('<span>Naya Order Karein</span>', '<span>Continue Shopping</span>');

// DIRECT MERCHANT ACCOUNT BOX IN CHECKOUT DRAWER
const oldAdvanceBoxRegex = /<div style="background: #ffffff; border: 1\.5px solid #059669; border-radius: 8px; padding: 12px 14px; margin-bottom: 12px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div style="margin-top: 24px;">/;

const newAdvanceBox = `<div style="background: #ffffff; border: 1.5px solid #059669; border-radius: 10px; padding: 16px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.25rem;">🏦</span>
                    <strong style="font-size: 0.9rem; color: #065f46; text-transform: uppercase; letter-spacing: 0.04em;">Official Direct Merchant Account</strong>
                  </div>
                  <span style="font-size: 0.72rem; color: #047857; font-weight: 800; background: #ecfdf5; padding: 3px 10px; border-radius: 99px; border: 1px solid #a7f3d0;">Direct Transfer</span>
                </div>

                <p style="font-size: 0.78rem; color: #475569; margin-bottom: 12px; line-height: 1.45;">
                  Transfer your advance payment directly into our official business accounts via your banking app, Easypaisa, or JazzCash:
                </p>

                <!-- Bank Accounts Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
                  
                  <!-- Account 1: Meezan Bank / Bank Transfer -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 0.78rem; font-weight: 800; color: #0f172a;">🏛️ Meezan Bank</span>
                      <span style="font-size: 0.68rem; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Bank</span>
                    </div>
                    <div style="font-size: 0.74rem; color: #64748b; margin-bottom: 2px;">Title: <strong style="color: #0f172a;">MF Store</strong></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; margin-top: 4px;">
                      <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: #0f172a;" id="display-bank-acc">02010108920192</span>
                      <button type="button" class="btn-copy-acc" data-copy="02010108920192" style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; color: #059669; font-size: 0.74rem; font-weight: 800; cursor: pointer; padding: 2px 6px;">📋 Copy</button>
                    </div>
                  </div>

                  <!-- Account 2: Easypaisa / JazzCash -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 0.78rem; font-weight: 800; color: #0f172a;">📱 Easypaisa / JazzCash</span>
                      <span style="font-size: 0.68rem; background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Wallet</span>
                    </div>
                    <div style="font-size: 0.74rem; color: #64748b; margin-bottom: 2px;">Title: <strong style="color: #0f172a;">MF Store</strong></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; margin-top: 4px;">
                      <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: #0f172a;" id="display-wallet-acc">03001234567</span>
                      <button type="button" class="btn-copy-acc" data-copy="03001234567" style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; color: #059669; font-size: 0.74rem; font-weight: 800; cursor: pointer; padding: 2px 6px;">📋 Copy</button>
                    </div>
                  </div>

                </div>

                <!-- Easy 2-Step Verification Box -->
                <div style="background: #f0fdf4; border: 1.5px dashed #10b981; border-radius: 8px; padding: 14px;">
                  <strong style="font-size: 0.82rem; color: #065f46; display: block; margin-bottom: 10px;">
                    ⚡ Quick 2-Step Payment Verification:
                  </strong>
                  
                  <div style="margin-bottom: 10px;">
                    <label class="form-label" for="advance-trx-id" style="font-size: 0.76rem; color: #111827; margin-bottom: 4px;">
                      Step 1: Enter Transaction ID / Reference No. *
                    </label>
                    <input type="text" id="advance-trx-id" class="form-input" placeholder="e.g. 98240182910 / Bank Ref / TID" style="padding: 10px 12px; font-size: 0.86rem; font-family: var(--font-mono); font-weight: 700; background: #ffffff;">
                    <small style="font-size: 0.7rem; color: #64748b; display: block; margin-top: 3px;">
                      Copy & paste the Transaction ID from your banking app or confirmation SMS.
                    </small>
                  </div>

                  <div>
                    <label class="form-label" style="font-size: 0.76rem; color: #111827; margin-bottom: 4px;">
                      Step 2: Upload Payment Slip / Screenshot (Optional if Trx ID entered):
                    </label>
                    <div class="payment-upload-dropzone" id="payment-receipt-dropzone" style="border: 1.5px dashed #059669; background: #ffffff; border-radius: 6px; padding: 10px; text-align: center; cursor: pointer;">
                      <div id="receipt-upload-prompt">
                        <span style="font-size: 1.1rem; display: block; margin-bottom: 2px;">📎</span>
                        <strong style="font-size: 0.8rem; color: #065f46; display: block;">Upload Payment Receipt Slip</strong>
                        <span style="font-size: 0.7rem; color: #047857;">Click or drop payment screenshot here (PNG, JPG)</span>
                      </div>
                      <div id="receipt-upload-preview" style="display: none; align-items: center; justify-content: center; gap: 10px;">
                        <img id="receipt-preview-img" src="" alt="Payment Receipt" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; border: 1.5px solid #10b981;">
                        <div style="text-align: left;">
                          <span style="font-size: 0.78rem; font-weight: 700; color: #065f46; display: block;" id="receipt-filename-label">receipt.jpg</span>
                          <span style="font-size: 0.7rem; color: #059669; font-weight: 700;">✓ Payment Proof Attached</span>
                        </div>
                        <button type="button" id="remove-receipt-btn" style="background: none; border: none; color: #dc2626; font-weight: bold; cursor: pointer; font-size: 1.1rem; padding: 4px;" title="Remove Receipt">&times;</button>
                      </div>
                      <input type="file" id="payment-receipt-file-input" accept="image/*" style="display: none;">
                    </div>
                  </div>
                </div>

                <!-- WhatsApp Help Link -->
                <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.74rem; color: #64748b;">Need help with payment?</span>
                  <a href="https://wa.me/923001234567?text=Hello%20MF%20Store!%20I%20am%20making%20an%20advance%20payment%20for%20my%20order." target="_blank" style="font-size: 0.74rem; font-weight: 700; color: #047857; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                    <span>💬 WhatsApp Support ↗</span>
                  </a>
                </div>

                <!-- Error Banner -->
                <div id="online-payment-error-banner" style="display: none; margin-top: 10px; background: #fef2f2; border: 1.5px solid #f87171; border-radius: 6px; padding: 10px 12px; font-size: 0.8rem; color: #991b1b; line-height: 1.4;">
                  <strong>❌ Payment Verification Incomplete!</strong><br>
                  Please enter your Transaction ID or attach a payment receipt slip to complete your order.
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 24px;">`;

html = html.replace(oldAdvanceBoxRegex, newAdvanceBox);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html!');

// 2. UPDATE app.js
let app = fs.readFileSync('app.js', 'utf8');

// Replace all Roman Urdu toast and notification messages in app.js
const replacements = [
  ['showToast(`🎨 ${prod.name} Customizer Studio me open ho gaya! Ab apni picture ya text add karein.`);', 'showToast(`🎨 ${prod.name} loaded into Customizer Studio! You can now add artwork or text.`);'],
  ['showToast("↶ Undo ho gaya!");', 'showToast("↶ Undone!");'],
  ['showToast("↷ Redo ho gaya!");', 'showToast("↷ Redone!");'],
  ['showToast(`${name} apply ho gaya!`);', 'showToast(`${name} applied successfully!`);'],
  ['showToast("Photo delete ho gaya!");', 'showToast("Artwork removed!");'],
  ['showToast("Text delete ho gaya!");', 'showToast("Text removed!");'],
  ['showToast(`${prod.name} select ho gaya!`);', 'showToast(`${prod.name} selected!`);'],
  ['showToast("Design reset ho gaya!");', 'showToast("Design reset successfully!");'],
  ['showToast("⚠️ Error: Design printable area se bahar hai! Barah-e-karam design ko red box ke andar rakhein.", "error");', 'showToast("⚠️ Error: Design is outside the dashed printable area! Please place it inside the red dashed box.", "error");'],
  ['showToast("Barah-e-karam customizer mein koi photo ya text design karein!");', 'showToast("Please add an image or text before adding to bag!");'],
  ['showToast(`Custom ${prod.name} (${qty}x) bag mein add ho gaya!`);', 'showToast(`Custom ${prod.name} (${qty}x) added to your bag!`);'],
  ['<span style="font-size: 0.82rem; color: var(--text-muted);">Apna custom design banayein ya catalog se product select karein.</span>', '<span style="font-size: 0.82rem; color: var(--text-muted);">Create your custom design or browse our catalog.</span>'],
  ['subCod.textContent = `Parcel receive hone par rider ko poore Rs. ${totalCod.toLocaleString()} cash dene honge`;', 'subCod.textContent = `Pay full cash of Rs. ${totalCod.toLocaleString()} to courier rider upon delivery`;'],
  ['subHalf.textContent = `Abhi Advance: Rs. ${halfAdvanceNow.toLocaleString()} | Delivery par Rider ko Cash: Rs. ${halfDueOnDelivery.toLocaleString()}`;', 'subHalf.textContent = `Advance Now: Rs. ${halfAdvanceNow.toLocaleString()} | Due on Delivery: Rs. ${halfDueOnDelivery.toLocaleString()}`;'],
  ['subFull.textContent = `Abhi 100% Advance online pay karein: Rs. ${totalFull.toLocaleString()} (Delivery par: Rs. 0${fullAdvanceSaved > 0 ? \' • Save Rs. \' + fullAdvanceSaved.toLocaleString() : \'\'})`;', 'subFull.textContent = `Pay 100% Advance: Rs. ${totalFull.toLocaleString()} (Due on Delivery: Rs. 0${fullAdvanceSaved > 0 ? \' • Save Rs. \' + fullAdvanceSaved.toLocaleString() : \'\'})`;'],
  ['if (planTitle) planTitle.textContent = "100% Full Advance Online Payment (Delivery par: Rs. 0):";', 'if (planTitle) planTitle.textContent = "100% Full Advance Payment (Doorstep Delivery: Rs. 0):";'],
  ['showToast("Barah-e-karam image file upload karein (JPG/PNG)!");', 'showToast("Please upload a valid image file (JPG/PNG/WEBP)!");'],
  ['showToast("✓ Payment slip / screenshot attach ho gaya!");', 'showToast("✓ Payment receipt attached successfully!");'],
  ['showToast("❌ Payment verify kiye baghair checkout band hai! Pehle Trx ID darj karein ya Slip upload karein.");', 'showToast("❌ Payment verification required! Please enter Transaction ID or upload receipt slip.");'],
  ['showToast("❌ Payment verification lazmi hai! Transaction ID darj karein ya Payment Slip upload karein.");', 'showToast("❌ Payment verification required! Please enter Transaction ID or upload receipt slip.");'],
  ['Order record nahi mila. Barah-e-karam apna sahi Order ID (e.g. MF-8921) darj karein.', 'Order record not found. Please enter a valid Order ID (e.g., MF-8921) or phone number.']
];

replacements.forEach(([orig, rep]) => {
  if (app.includes(orig)) {
    app = app.replace(orig, rep);
  }
});

// Setup click-to-copy handler for direct bank accounts in app.js
if (!app.includes('btn-copy-acc')) {
  const copyHandlerCode = `
  // Setup One-Click Copy for Merchant Bank Accounts
  document.querySelectorAll('.btn-copy-acc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.dataset.copy;
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(\`📋 \${val} copied to clipboard!\`);
        }).catch(() => {
          showToast(\`📋 \${val} copied!\`);
        });
      }
    });
  });
`;
  app = app.replace('setupEventListeners();', `setupEventListeners();\n${copyHandlerCode}`);
}

fs.writeFileSync('app.js', app, 'utf8');
console.log('Successfully updated app.js!');
