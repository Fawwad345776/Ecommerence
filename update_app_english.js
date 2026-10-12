const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. Aapka shopping bag khali hai
code = code.replace('<p>Aapka shopping bag khali hai.</p>', '<p>Your shopping bag is empty.</p>');

// 2. Pehle Online Payment Proof Dein
code = code.replace(
  'submitBtn.innerHTML = `<span>🔒 Pehle Online Payment Proof Dein (Verify & Place Order)</span>`;',
  'submitBtn.innerHTML = `<span>🔒 Enter Transaction ID or Receipt to Verify ➔</span>`;'
);

// 3. Payment slip remove kar di gayi
code = code.replace(
  'showToast("Payment slip remove kar di gayi.");',
  'showToast("Payment receipt removed.");'
);

// 4. Custom print orders ke liye kam az kam 50%
code = code.replace(
  'showToast("⚠️ Custom print orders ke liye kam az kam 50% Advance ya 100% Online Payment lazmi hai!");',
  'showToast("⚠️ Custom print orders require at least 50% Advance Deposit or 100% Full Payment!");'
);

// 5. WhatsApp Text
const oldWa = `const waText = encodeURIComponent(\`Salam MF Store! Main ne order book kiya hai:\\n\\n*Order ID:* #\${orderId}\\n*Naam:* \${name}\\n*Sheher:* \${city}\\n*Total:* Rs. \${totalAmount.toLocaleString()}\\n*Payment:* \${isCod ? 'Cash on Delivery (COD)' : 'Online Payment (Title: MF Store)'}\\n\\nKindly confirmation aur dispatch details provide kar dein.\`);`;
const newWa = `const waText = encodeURIComponent(\`Hello MF Store! I have placed an order:\\n\\n*Order ID:* #\${orderId}\\n*Name:* \${name}\\n*City:* \${city}\\n*Total:* Rs. \${totalAmount.toLocaleString()}\\n*Payment:* \${isCod ? 'Cash on Delivery (COD)' : 'Direct Online Transfer (MF Store)'}\\n\\nPlease confirm my order and share dispatch details.\`);`;
code = code.replace(oldWa, newWa);

// 6. Pricing rules bank details loading
if (!code.includes('AppState.pricingRules.bankAccountNumber =')) {
  code = code.replace(
    'if (data.account_title) AppState.pricingRules.accountTitle = data.account_title;',
    `if (data.bank_account_number) AppState.pricingRules.bankAccountNumber = data.bank_account_number;
        if (data.wallet_name) AppState.pricingRules.walletName = data.wallet_name;
        if (data.wallet_account_number) AppState.pricingRules.walletAccountNumber = data.wallet_account_number;
        if (data.account_title) AppState.pricingRules.accountTitle = data.account_title;
        updateBankDetailsDisplay();`
  );
}

// 7. Add updateBankDetailsDisplay function
if (!code.includes('function updateBankDetailsDisplay()')) {
  const funcDef = `
// Synchronize and Display Direct Merchant Accounts in Checkout
function updateBankDetailsDisplay() {
  const bName = (AppState.pricingRules && AppState.pricingRules.bankName) || "Meezan Bank";
  const bAcc = (AppState.pricingRules && AppState.pricingRules.bankAccountNumber) || "02010108920192";
  const wName = (AppState.pricingRules && AppState.pricingRules.walletName) || "Easypaisa / JazzCash";
  const wAcc = (AppState.pricingRules && AppState.pricingRules.walletAccountNumber) || "03001234567";
  const title = (AppState.pricingRules && AppState.pricingRules.accountTitle) || "MF Store";

  const bNameEl = document.getElementById("display-bank-name");
  if (bNameEl) bNameEl.textContent = "🏛️ " + bName;

  const bAccEl = document.getElementById("display-bank-acc");
  if (bAccEl) bAccEl.textContent = bAcc;

  const wNameEl = document.getElementById("display-wallet-name");
  if (wNameEl) wNameEl.textContent = "📱 " + wName;

  const wAccEl = document.getElementById("display-wallet-acc");
  if (wAccEl) wAccEl.textContent = wAcc;

  const copyBtns = document.querySelectorAll(".btn-copy-acc");
  if (copyBtns && copyBtns.length >= 2) {
    copyBtns[0].setAttribute("data-copy", bAcc);
    copyBtns[1].setAttribute("data-copy", wAcc);
  }

  document.querySelectorAll(".display-acc-title").forEach(el => el.textContent = title);
}
`;
  code = code.replace('function syncPaymentVerificationButton(', funcDef + '\nfunction syncPaymentVerificationButton(');
}

// 8. Add copy buttons listener in setupEventListeners
if (!code.includes('doCopySuccess')) {
  const copyListener = `
  // Copy Bank / Wallet Account Number to Clipboard
  document.addEventListener("click", (e) => {
    const copyBtn = e.target.closest(".btn-copy-acc");
    if (!copyBtn) return;
    e.preventDefault();
    const textToCopy = copyBtn.getAttribute("data-copy") || copyBtn.dataset.copy;
    if (!textToCopy) return;

    const doCopySuccess = () => {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = "✓ Copied!";
      copyBtn.style.background = "#dcfce7";
      copyBtn.style.color = "#15803d";
      showToast(\`Copied account (\${textToCopy}) to clipboard!\`);
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.style.background = "#ecfdf5";
        copyBtn.style.color = "#059669";
      }, 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(doCopySuccess).catch(() => {
        fallbackCopyText(textToCopy, doCopySuccess);
      });
    } else {
      fallbackCopyText(textToCopy, doCopySuccess);
    }
  });

  function fallbackCopyText(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      if (cb) cb();
    } catch (_) {
      showToast(\`Account: \${text}\`);
    }
    document.body.removeChild(ta);
  }
`;
  code = code.replace('const openCartBtn = document.getElementById("open-cart-btn");', copyListener + '\n  const openCartBtn = document.getElementById("open-cart-btn");');
}

// Also call updateBankDetailsDisplay inside updateCheckoutPricing
if (!code.includes('updateBankDetailsDisplay();') || code.indexOf('updateBankDetailsDisplay();') === code.lastIndexOf('updateBankDetailsDisplay();')) {
  code = code.replace('syncPaymentVerificationButton(activeTotal, method);', 'syncPaymentVerificationButton(activeTotal, method);\n  updateBankDetailsDisplay();');
}

fs.writeFileSync('app.js', code, 'utf8');
console.log('Successfully updated app.js with English text and Direct Account copy logic!');
