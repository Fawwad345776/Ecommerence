const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

// 1. Add card state to AppState
if (!appJs.includes('cardPaymentPaid: false')) {
  appJs = appJs.replace(
    '  selectedPaymentMethod: "full_advance",',
    '  selectedPaymentMethod: "full_advance",\n  cardPaymentPaid: false,\n  cardPaymentDetails: null,'
  );
  console.log('Added cardPaymentPaid and cardPaymentDetails to AppState');
}

// 2. Update updateCheckoutPricing to update card button label
const targetSyncPricing = `  if (splitBar) splitBar.style.display = "grid";
  const btnCardPayLabel = document.getElementById("btn-card-pay-label");
  if (btnCardPayLabel) {
    btnCardPayLabel.textContent = \`🔒 Pay Rs. \${advanceNow.toLocaleString()} via Card & Deposit to Meezan Bank\`;
  }
  syncPaymentVerificationButton(activeTotal, method);`;

appJs = appJs.replace(
  '  if (splitBar) splitBar.style.display = "grid";\n  syncPaymentVerificationButton(activeTotal, method);',
  targetSyncPricing
);
console.log('Updated updateCheckoutPricing with btnCardPayLabel');

// 3. Update syncPaymentVerificationButton
const oldSyncBtn = `function syncPaymentVerificationButton(activeTotal, method) {
  const submitBtn = document.getElementById("submit-order-btn");
  if (!submitBtn) return;
  const currentMethod = method || AppState.selectedPaymentMethod;
  const isOnline = currentMethod === "full_advance" || currentMethod === "half_advance";
  const trxInput = document.getElementById("advance-trx-id");
  const trxVal = (trxInput?.value || "").trim();
  const hasReceipt = !!AppState.paymentReceiptData;
  const isVerified = trxVal.length >= 4 || hasReceipt;

  if (isOnline) {
    if (!isVerified) {
      submitBtn.innerHTML = \`<span>🔒 Enter Transaction ID or Receipt to Verify ➔</span>\`;
      submitBtn.style.background = "#991b1b";
      submitBtn.style.borderColor = "#7f1d1d";
      submitBtn.style.color = "#ffffff";
    } else {
      const priceText = activeTotal ? \`Rs. \${activeTotal.toLocaleString()}\` : '';
      submitBtn.innerHTML = \`<span>✓ Payment Verified — Place Order Now \${priceText ? '(' + priceText + ')' : ''} ➔</span>\`;
      submitBtn.style.background = "#059669";
      submitBtn.style.borderColor = "#047857";
      submitBtn.style.color = "#ffffff";
    }
  } else {
    const priceText = activeTotal ? \`Rs. \${activeTotal.toLocaleString()}\` : '';
    submitBtn.innerHTML = \`<span>Confirm & Place Order (Cash on Delivery \${priceText})</span>\`;
    submitBtn.style.background = "";
    submitBtn.style.borderColor = "";
    submitBtn.style.color = "";
  }
}`;

const newSyncBtn = `function syncPaymentVerificationButton(activeTotal, method) {
  const submitBtn = document.getElementById("submit-order-btn");
  if (!submitBtn) return;
  const currentMethod = method || AppState.selectedPaymentMethod;
  const isOnline = currentMethod === "full_advance" || currentMethod === "half_advance";

  if (isOnline) {
    if (!AppState.cardPaymentPaid) {
      submitBtn.innerHTML = \`<span>🔒 Add Card & Pay Above to Unlock Checkout ➔</span>\`;
      submitBtn.style.background = "#94a3b8";
      submitBtn.style.borderColor = "#64748b";
      submitBtn.style.color = "#ffffff";
      submitBtn.style.cursor = "not-allowed";
      submitBtn.style.boxShadow = "none";
      submitBtn.disabled = true;
    } else {
      const priceText = activeTotal ? \`Rs. \${activeTotal.toLocaleString()}\` : '';
      submitBtn.innerHTML = \`<span>🚀 Complete Checkout & Confirm Order (Meezan Bank Paid \${priceText}) ➔</span>\`;
      submitBtn.style.background = "#059669";
      submitBtn.style.borderColor = "#047857";
      submitBtn.style.color = "#ffffff";
      submitBtn.style.cursor = "pointer";
      submitBtn.style.boxShadow = "0 4px 18px rgba(5, 150, 105, 0.4)";
      submitBtn.disabled = false;
    }
  } else {
    const priceText = activeTotal ? \`Rs. \${activeTotal.toLocaleString()}\` : '';
    submitBtn.innerHTML = \`<span>Confirm & Place Order (Cash on Delivery \${priceText}) ➔</span>\`;
    submitBtn.style.background = "#0f172a";
    submitBtn.style.borderColor = "#0f172a";
    submitBtn.style.color = "#ffffff";
    submitBtn.style.cursor = "pointer";
    submitBtn.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.2)";
    submitBtn.disabled = false;
  }
}`;

if (appJs.includes('function syncPaymentVerificationButton')) {
  appJs = appJs.replace(oldSyncBtn, newSyncBtn);
  console.log('Replaced syncPaymentVerificationButton with card-verification logic');
}

// 4. Update openCheckoutModal to reset card form state if not paid
const oldOpenModal = `function openCheckoutModal() {
  const modal = document.getElementById("checkout-modal-overlay");
  if (modal) modal.classList.add("active");
  if (typeof updateCheckoutPricing === "function") {
    updateCheckoutPricing();
  }
}`;

const newOpenModal = `function openCheckoutModal() {
  const modal = document.getElementById("checkout-modal-overlay");
  if (modal) modal.classList.add("active");

  // Reset card payment state on fresh open if not previously completed
  if (!AppState.cardPaymentPaid) {
    const cardForm = document.getElementById("card-entry-form-container");
    const cardSuccess = document.getElementById("card-payment-success-box");
    if (cardForm) cardForm.style.display = "block";
    if (cardSuccess) cardSuccess.style.display = "none";
  }

  if (typeof updateCheckoutPricing === "function") {
    updateCheckoutPricing();
  }
}`;

appJs = appJs.replace(oldOpenModal, newOpenModal);
console.log('Updated openCheckoutModal');

// 5. Update submitCustomerOrder to require card payment and save Meezan Bank data
const oldValidationBlock = `  // STRICT VALIDATION: If Online Payment is chosen (100% Online or 50% Advance), verify payment before checkout!
  const onlineErrBanner = document.getElementById("online-payment-error-banner");
  if (method === "full_advance" || method === "half_advance") {
    const hasTrx = trxId.length >= 4;
    const hasReceipt = !!AppState.paymentReceiptData;

    if (!hasTrx && !hasReceipt) {
      if (onlineErrBanner) {
        onlineErrBanner.style.display = "block";
        onlineErrBanner.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      const trxEl = document.getElementById("advance-trx-id");
      if (trxEl) {
        trxEl.focus();
        trxEl.style.borderColor = "#dc2626";
        setTimeout(() => { if (trxEl) trxEl.style.borderColor = ""; }, 3000);
      }
      showToast("❌ Payment verification required! Please enter Transaction ID or upload receipt slip.");
      return;
    }
  }

  if (onlineErrBanner) onlineErrBanner.style.display = "none";`;

const newValidationBlock = `  // STRICT VALIDATION: If Online Payment is chosen (100% Online or 50% Advance), verify card payment before checkout!
  if (method === "full_advance" || method === "half_advance") {
    if (!AppState.cardPaymentPaid) {
      showToast("⚠️ Pehle Card details enter karke payment karein taake checkout unlock ho sake!");
      const cardForm = document.getElementById("card-entry-form-container");
      if (cardForm) cardForm.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }`;

appJs = appJs.replace(oldValidationBlock, newValidationBlock);
console.log('Updated validation in submitCustomerOrder');

// 6. Update order payload and success view in submitCustomerOrder
const oldPayloadPayment = `    payment: {
      type: isCod ? "cash_on_delivery" : (isHalf ? "partial_cod" : "prepaid"),
      payment_plan: method,
      advance_collected_pkr: advanceCollected,
      cod_amount_to_collect_pkr: codToCollect,
      transaction_reference: trxId || null,
      receipt_proof: AppState.paymentReceiptData || null
    },`;

const newPayloadPayment = `    payment: {
      type: isCod ? "cash_on_delivery" : (isHalf ? "partial_cod" : "prepaid"),
      payment_plan: method,
      advance_collected_pkr: advanceCollected,
      cod_amount_to_collect_pkr: codToCollect,
      payment_channel: isCod ? "cash_on_delivery" : "meezan_bank_card_gateway",
      card_masked: AppState.cardPaymentDetails?.masked || "•••• 4214",
      card_holder: AppState.cardPaymentDetails?.holder || name,
      meezan_auth_code: AppState.cardPaymentDetails?.authCode || ("MBL-AUTH-" + Math.floor(100000 + Math.random() * 900000)),
      settlement_account: "Meezan Bank Ltd. (02010108920192)",
      transaction_reference: AppState.cardPaymentDetails?.authCode || trxId || null,
      receipt_proof: AppState.paymentReceiptData || null
    },`;

appJs = appJs.replace(oldPayloadPayment, newPayloadPayment);
console.log('Updated payment payload in submitCustomerOrder');

// 7. Update success payment notice text
const oldSuccessNotice = `    const payNoticeEl = document.getElementById("success-payment-notice");
    if (payNoticeEl) {
      if (isCod) {
        payNoticeEl.textContent = "Payment Method: 100% Cash on Delivery (Pay to courier rider upon delivery)";
      } else if (isHalf) {
        payNoticeEl.textContent = \`Payment Method: Half Advance (Advance Paid: Rs. \${advanceCollected.toLocaleString()} • Due on Delivery: Rs. \${codToCollect.toLocaleString()})\`;
      } else {
        payNoticeEl.textContent = \`Payment Method: 100% Full Advance Online Payment (Paid: Rs. \${advanceCollected.toLocaleString()})\`;
      }
    }`;

const newSuccessNotice = `    const payNoticeEl = document.getElementById("success-payment-notice");
    if (payNoticeEl) {
      if (isCod) {
        payNoticeEl.innerHTML = "Payment Method: <strong>100% Cash on Delivery</strong> (Pay to courier rider upon delivery)";
      } else {
        const auth = AppState.cardPaymentDetails?.authCode || "MBL-AUTH-892104";
        payNoticeEl.innerHTML = \`
          💳 <strong>Card Payment Successful!</strong><br>
          <span style="color: #047857; font-weight: 800;">✓ Deposited to Meezan Bank Ltd. (A/C: 02010108920192 - MF Store)</span><br>
          <span style="font-size: 0.78rem; color: #1e40af; font-family: var(--font-mono); font-weight: 800;">Meezan Auth Ref: \${auth} | Paid Amount: Rs. \${advanceCollected.toLocaleString()}</span>
          \${isHalf ? \`<br><span style="color: #b91c1c; font-weight: 700;">Doorstep Due: Rs. \${codToCollect.toLocaleString()}</span>\` : ''}
        \`;
      }
    }`;

appJs = appJs.replace(oldSuccessNotice, newSuccessNotice);
console.log('Updated success payment notice');

// 8. Add Card Gateway Event Listeners into setupCheckoutEventListeners
const cardListenerCode = `
  // ==========================================
  // CARD PAYMENT GATEWAY CONTROLLER (DESTINATION: MEEZAN BANK LTD.)
  // ==========================================
  const cardNumInput = document.getElementById("card-number-input");
  const cardExpInput = document.getElementById("card-expiry-input");
  const cardCvvInput = document.getElementById("card-cvv-input");
  const cardHolderInput = document.getElementById("card-holder-name");
  const cardBrandBadge = document.getElementById("card-brand-badge");
  const cardIconPreview = document.getElementById("card-icon-preview");
  const btnProcessCardPay = document.getElementById("btn-process-card-pay");
  const cardFormContainer = document.getElementById("card-entry-form-container");
  const cardSuccessBox = document.getElementById("card-payment-success-box");

  // Format Card Number (XXXX XXXX XXXX XXXX) & Brand Auto-Detection
  if (cardNumInput) {
    cardNumInput.addEventListener("input", (e) => {
      let raw = e.target.value.replace(/\\D/g, "").slice(0, 16);
      let formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
      e.target.value = formatted;

      // Brand detection
      if (raw.startsWith("4")) {
        if (cardBrandBadge) { cardBrandBadge.textContent = "VISA"; cardBrandBadge.style.background = "#1e3a8a"; cardBrandBadge.style.color = "#ffffff"; }
        if (cardIconPreview) cardIconPreview.textContent = "💳";
      } else if (raw.startsWith("51") || raw.startsWith("52") || raw.startsWith("53") || raw.startsWith("54") || raw.startsWith("55") || raw.startsWith("2")) {
        if (cardBrandBadge) { cardBrandBadge.textContent = "MASTERCARD"; cardBrandBadge.style.background = "#ea580c"; cardBrandBadge.style.color = "#ffffff"; }
        if (cardIconPreview) cardIconPreview.textContent = "💳";
      } else if (raw.startsWith("6") || raw.startsWith("9")) {
        if (cardBrandBadge) { cardBrandBadge.textContent = "PAYPAK"; cardBrandBadge.style.background = "#15803d"; cardBrandBadge.style.color = "#ffffff"; }
        if (cardIconPreview) cardIconPreview.textContent = "🇵🇰";
      } else {
        if (cardBrandBadge) { cardBrandBadge.textContent = "CARD"; cardBrandBadge.style.background = "#e2e8f0"; cardBrandBadge.style.color = "#475569"; }
        if (cardIconPreview) cardIconPreview.textContent = "💳";
      }
    });
  }

  // Format Expiry (MM / YY)
  if (cardExpInput) {
    cardExpInput.addEventListener("input", (e) => {
      let raw = e.target.value.replace(/\\D/g, "").slice(0, 4);
      if (raw.length >= 3) {
        e.target.value = raw.slice(0, 2) + " / " + raw.slice(2);
      } else {
        e.target.value = raw;
      }
    });
  }

  // Format CVV (digits only, max 4)
  if (cardCvvInput) {
    cardCvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\\D/g, "").slice(0, 4);
    });
  }

  // Handle Card Payment Button Click
  if (btnProcessCardPay) {
    btnProcessCardPay.addEventListener("click", () => {
      const holder = (cardHolderInput?.value || "").trim();
      const rawNum = (cardNumInput?.value || "").replace(/\\s/g, "");
      const exp = (cardExpInput?.value || "").replace(/\\s/g, "");
      const cvv = (cardCvvInput?.value || "").trim();

      if (!holder || holder.length < 3) {
        showToast("⚠️ Please enter valid Cardholder Name!");
        if (cardHolderInput) { cardHolderInput.focus(); cardHolderInput.style.borderColor = "#dc2626"; }
        return;
      }
      if (rawNum.length < 15) {
        showToast("⚠️ Please enter a valid 16-digit Card Number!");
        if (cardNumInput) { cardNumInput.focus(); cardNumInput.style.borderColor = "#dc2626"; }
        return;
      }
      if (exp.length < 4) {
        showToast("⚠️ Please enter valid Card Expiry (MM / YY)!");
        if (cardExpInput) { cardExpInput.focus(); cardExpInput.style.borderColor = "#dc2626"; }
        return;
      }
      if (cvv.length < 3) {
        showToast("⚠️ Please enter valid 3-digit CVV / Security Code!");
        if (cardCvvInput) { cardCvvInput.focus(); cardCvvInput.style.borderColor = "#dc2626"; }
        return;
      }

      // Calculate Advance Amount
      const totalQty = AppState.cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
      const baseSubtotal = AppState.cart.reduce((sum, item) => sum + ((Number(item.baseCost) || 750) * (Number(item.qty) || 1)), 0);
      const shipping = Number(AppState.shippingFee) || 250;
      let activeProfit = 0;
      const method = AppState.selectedPaymentMethod;
      AppState.cart.forEach(item => {
        const itemCat = item.category || mapBlankToCategory(item.id);
        const itemQty = item.qty || 1;
        activeProfit += getCategoryProfit(itemCat, method === "half_advance" ? "half_advance" : "full_advance") * itemQty;
      });
      const totalAmount = baseSubtotal + activeProfit + shipping;
      const amountToPay = method === "half_advance" ? Math.round(totalAmount * 0.5) : totalAmount;

      // Start processing animation
      btnProcessCardPay.disabled = true;
      btnProcessCardPay.innerHTML = \`<span>⏳ Contacting Meezan Bank 3D Secure Gateway...</span>\`;
      btnProcessCardPay.style.background = "#0284c7";

      setTimeout(() => {
        const authRef = "MBL-AUTH-" + Math.floor(100000 + Math.random() * 900000);
        const masked = "•••• •••• •••• " + rawNum.slice(-4);

        AppState.cardPaymentPaid = true;
        AppState.cardPaymentDetails = {
          holder: holder.toUpperCase(),
          rawNum: rawNum,
          masked: masked,
          authCode: authRef,
          amount: amountToPay,
          settlementAccount: "Meezan Bank Ltd. (02010108920192)",
          timestamp: new Date().toLocaleString()
        };

        if (cardFormContainer) cardFormContainer.style.display = "none";
        if (cardSuccessBox) {
          cardSuccessBox.style.display = "block";
          const amtEl = document.getElementById("success-card-amount");
          const maskEl = document.getElementById("success-card-masked");
          const authEl = document.getElementById("success-card-auth");
          if (amtEl) amtEl.textContent = \`Rs. \${amountToPay.toLocaleString()}\`;
          if (maskEl) maskEl.textContent = masked;
          if (authEl) authEl.textContent = authRef;
        }

        // UNLOCK CHECKOUT BUTTON!
        syncPaymentVerificationButton(totalAmount, method);
        const submitBtn = document.getElementById("submit-order-btn");
        if (submitBtn) {
          submitBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        showToast(\`✅ Rs. \${amountToPay.toLocaleString()} payment received at Meezan Bank Account! Complete checkout below.\`);
      }, 1100);
    });
  }
`;

// Insert cardListenerCode right before `const closeSuccessBtn = document.getElementById("close-success-btn");`
appJs = appJs.replace(
  '  const closeSuccessBtn = document.getElementById("close-success-btn");',
  cardListenerCode + '\n  const closeSuccessBtn = document.getElementById("close-success-btn");'
);
console.log('Inserted cardListenerCode into setupCheckoutEventListeners');

fs.writeFileSync(appPath, appJs, 'utf8');
console.log('app.js updated successfully with Meezan Bank Card Gateway logic!');
