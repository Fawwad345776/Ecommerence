const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// 1. Replace Direct Account Setup HTML Block
const oldAccountBlock = `        <!-- Online Payment Details in Firebase -->
        <!-- Online Payment Details in Firebase -->
        <h3 style="font-size: 1rem; margin-bottom: 12px; font-weight: 800;">Official Online Payment Gateway / Merchant Setup (Direct Deposit)</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 14px;">
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Payment Channel</label>
            <input type="text" id="cfg-bank-name" class="form-input" value="Online Payment" style="padding: 10px 12px; background: #f8fafc;" readonly>
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem;">Merchant Title (Customer Visible)</label>
            <input type="text" id="cfg-account-title" class="form-input" value="MF Store" style="padding: 10px 12px;">
          </div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; margin-bottom: 20px; font-size: 0.78rem; color: #64748b;">
          🔒 <strong>Privacy Policy Active:</strong> Storefront par sirf Payment Channel (Online Payment) aur Merchant Title (<strong>MF Store</strong>) show hoga. Koi personal naam ya personal bank account number public website par show nahi hoga taake 100% privacy aur security barkarar rahe.
        </div>`;

const newAccountBlock = `        <!-- Direct Merchant Accounts Setup (Bank & Wallet) -->
        <h3 style="font-size: 1rem; margin-bottom: 6px; font-weight: 800; color: var(--accent-black);">Direct Merchant Payment Accounts (Advance Orders)</h3>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.45;">
          Configure your direct bank and mobile wallet details below. When customers select 50% or 100% advance payment at checkout, these accounts are displayed with one-click copy buttons for instant direct transfers into your account.
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 14px;">
          <div>
            <label class="form-label" style="font-size: 0.72rem; font-weight: 700;">Bank Name</label>
            <input type="text" id="cfg-bank-name" class="form-input" value="Meezan Bank" style="padding: 10px 12px;" required>
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem; font-weight: 700;">Bank Account Number / IBAN</label>
            <input type="text" id="cfg-bank-acc" class="form-input" value="02010108920192" style="padding: 10px 12px; font-family: var(--font-mono); font-weight: 700;" required>
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem; font-weight: 700;">Mobile Wallet Provider</label>
            <input type="text" id="cfg-wallet-name" class="form-input" value="Easypaisa / JazzCash" style="padding: 10px 12px;" required>
          </div>
          <div>
            <label class="form-label" style="font-size: 0.72rem; font-weight: 700;">Wallet Mobile Number</label>
            <input type="text" id="cfg-wallet-acc" class="form-input" value="03001234567" style="padding: 10px 12px; font-family: var(--font-mono); font-weight: 700;" required>
          </div>
          <div style="grid-column: span 2;">
            <label class="form-label" style="font-size: 0.72rem; font-weight: 700;">Merchant Account Title (Customer Visible)</label>
            <input type="text" id="cfg-account-title" class="form-input" value="MF Store" style="padding: 10px 12px;" required>
          </div>
        </div>
        <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 0.8rem; color: #065f46; line-height: 1.5;">
          💳 <strong>Direct Deposit Mode:</strong> Advance payments go directly into your configured bank and wallet accounts. Customers can easily copy account numbers, make the transfer, and submit their Transaction ID or payment screenshot for instant order verification.
        </div>`;

html = html.replace(oldAccountBlock, newAccountBlock);

// 2. Firebase Rules Warning Solution Text
const oldWarning = `Google Firebase ka warning <em>"Your security rules are defined as public..."</em> is liye aata hai kyun ke default rules mein <code>.write: true</code> hota hai. Niche diye gaye secure rules ko Firebase Console mein paste karein — warning hamesha ke liye khatam ho jayegi aur customer orders aur prices mehfooz rahenge.`;
const newWarning = `The Google Firebase warning <em>"Your security rules are defined as public..."</em> occurs because default rules allow <code>.write: true</code>. Paste the secure rules below into your Firebase Console — the warning will disappear permanently and your customer orders and product pricing will remain secure.`;
html = html.replace(oldWarning, newWarning);

// 3. Security Rules Explanation Text
const oldRulesExpl = `Yeh rules kisi ko bhi existing customer orders delete ya modify nahi karne dete (<code>!data.exists()</code>), aur storefront ko seamlessly orders post karne dete hain.`;
const newRulesExpl = `These rules prevent anyone from modifying or deleting existing customer orders (<code>!data.exists()</code>), while allowing customers to seamlessly place new orders.`;
html = html.replace(oldRulesExpl, newRulesExpl);

// 4. Orders Dashboard Description
const oldOrdersDesc = `Har customer ka order yahan real-time nazar aayega — customer name, phone, address, custom prints, aur Trax dispatch status.`;
const newOrdersDesc = `Every customer order appears here in real-time — including customer name, phone, address, custom design prints, payment proof, and fulfillment status.`;
html = html.replace(oldOrdersDesc, newOrdersDesc);

// 5. Toast on Export
html = html.replace(
  'showToast("Export karne ke liye koi order nahi hai!");',
  'showToast("No orders available to export!");'
);

// 6. JS Form Payload - include bank and wallet fields
const oldPayload = `            bank_name: document.getElementById("cfg-bank-name")?.value || "Online Payment",
            account_title: document.getElementById("cfg-account-title")?.value || "MF Store",`;
const newPayload = `            bank_name: document.getElementById("cfg-bank-name")?.value || "Meezan Bank",
            bank_account_number: document.getElementById("cfg-bank-acc")?.value || "02010108920192",
            wallet_name: document.getElementById("cfg-wallet-name")?.value || "Easypaisa / JazzCash",
            wallet_account_number: document.getElementById("cfg-wallet-acc")?.value || "03001234567",
            account_title: document.getElementById("cfg-account-title")?.value || "MF Store",`;
html = html.replace(oldPayload, newPayload);

// 7. JS loadPricingRules - populate bank and wallet inputs
const oldLoadPricing = `            if (data.bank_name && document.getElementById("cfg-bank-name")) document.getElementById("cfg-bank-name").value = data.bank_name;
            if (data.account_title && document.getElementById("cfg-account-title")) document.getElementById("cfg-account-title").value = data.account_title;`;
const newLoadPricing = `            if (data.bank_name && document.getElementById("cfg-bank-name")) document.getElementById("cfg-bank-name").value = data.bank_name;
            if (data.bank_account_number && document.getElementById("cfg-bank-acc")) document.getElementById("cfg-bank-acc").value = data.bank_account_number;
            if (data.wallet_name && document.getElementById("cfg-wallet-name")) document.getElementById("cfg-wallet-name").value = data.wallet_name;
            if (data.wallet_account_number && document.getElementById("cfg-wallet-acc")) document.getElementById("cfg-wallet-acc").value = data.wallet_account_number;
            if (data.account_title && document.getElementById("cfg-account-title")) document.getElementById("cfg-account-title").value = data.account_title;`;
html = html.replace(oldLoadPricing, newLoadPricing);

fs.writeFileSync('admin.html', html, 'utf8');
console.log('Successfully updated admin.html with English text and Direct Account fields!');
