const fs = require('fs');

let html = fs.readFileSync('admin.html', 'utf8');

// 1. Title & Header cleanup
html = html.replace(
  '<title>MF Store | Merchant Dashboard (CeePrinto Fulfillment)</title>',
  '<title>MF Store | Merchant Operations Dashboard</title>'
);

html = html.replace(
  '<span class="brand-sub">CEEPRINTO CONTROL CENTER</span>',
  '<span class="brand-sub">MERCHANT OPERATIONS PORTAL</span>'
);

// Replace header nav actions
const oldNavActions = `<div class="nav-actions">
        <button class="api-status-btn" id="admin-ping-btn">
          <span class="pulse-dot"></span>
          <span>Verify CeePrinto Bridge</span>
        </button>
        <a href="index.html" class="btn-secondary" style="padding: 8px 18px; font-size: 0.84rem;">
          <span>← View Storefront</span>
        </a>
      </div>`;

const newNavActions = `<div class="nav-actions" style="display: flex; align-items: center; gap: 12px;">
        <span style="display: inline-flex; align-items: center; gap: 6px; background: #ecfdf5; color: #047857; padding: 6px 14px; border-radius: 99px; font-size: 0.78rem; font-weight: 800; border: 1px solid #a7f3d0;">
          <span class="pulse-dot" style="background: #10b981; width: 7px; height: 7px; border-radius: 50%; display: inline-block;"></span>
          Live Realtime Sync
        </span>
        <a href="index.html" class="btn-secondary" style="padding: 8px 18px; font-size: 0.84rem;">
          <span>← View Storefront</span>
        </a>
      </div>`;

html = html.replace(oldNavActions, newNavActions);

// 2. Remove the Welcome and raw API Credentials card
const oldWelcomeBlock = `    <!-- Welcome & Stats -->
    <div style="margin-bottom: 36px;">
      <h1 style="font-size: 2rem; margin-bottom: 6px;">Store Owner Dashboard</h1>
      <p style="color: var(--text-secondary); font-size: 0.94rem;">
        CeePrinto Print-on-Demand integration status, live order queue, and profit margins.
      </p>
    </div>

    <!-- API Connection Card -->
    <div class="feature-box" style="padding: 32px; display: block; margin-bottom: 30px; background: #ffffff;">
      <h2 style="font-size: 1.25rem; margin-bottom: 16px;">CeePrinto Integration Credentials</h2>
      
      <div class="form-group">
        <label class="form-label">Active Secret API Key</label>
        <div class="api-key-box">
          <span>cp_live_47wpeRK8jmunkr2NHepqmDR3.fyGJMUG8DMHhVJaJls80vQwopUm1yJJjZtkDwjE2</span>
          <span style="color: var(--accent-green); font-weight: 700;">Connected</span>
        </div>
        <small style="color: var(--text-muted); font-size: 0.78rem; display: block; margin-top: 6px;">
          Store Name: <strong>Mfstore</strong> | Store ID: <strong>47wpeRK8jmunkr2NHepqmDR3</strong> | Status: Active
        </small>
      </div>

      <div id="ping-response-box" style="margin-top: 14px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-green);">
        ✓ Backend server bridge actively forwarding customer orders to api.ceeprinto.com
      </div>
    </div>`;

const newWelcomeBlock = `    <!-- Dashboard Header -->
    <div style="margin-bottom: 28px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 14px;">
      <div>
        <h1 style="font-size: 1.85rem; font-weight: 900; margin-bottom: 4px; color: var(--accent-black);">Merchant Dashboard</h1>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Real-time order management, advance payment verification, and automated fulfillment.
        </p>
      </div>
    </div>`;

html = html.replace(oldWelcomeBlock, newWelcomeBlock);

// 3. Remove the Firebase Security Rules Fix block
const oldSecurityBlock = `    <!-- Firebase Security Rules Fix (Public Warning Solution) -->
    <div class="feature-box" style="padding: 28px 32px; display: block; margin-bottom: 30px; background: #ffffff; border-left: 5px solid var(--accent-gold);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">🛡️</span>
            <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--accent-black);">Firebase Security Rules Fix (Public Warning Solution)</h2>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.86rem; margin-top: 6px; max-width: 800px; line-height: 1.5;">
            The Google Firebase warning <em>"Your security rules are defined as public..."</em> occurs because default rules allow <code>.write: true</code>. Paste the secure rules below into your Firebase Console — the warning will disappear permanently and your customer orders and product pricing will remain secure.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="button" class="btn-secondary" id="copy-rules-btn" style="padding: 8px 18px; font-size: 0.82rem; font-weight: 700;">
            <span>📋 Copy Secure Rules JSON</span>
          </button>
          <a href="https://console.firebase.google.com/project/mfstore-69ab0/database/mfstore-69ab0-default-rtdb/rules" target="_blank" class="btn-primary" style="padding: 8px 18px; font-size: 0.82rem;">
            <span>Open Firebase Rules Tab ↗</span>
          </a>
        </div>
      </div>
      <div style="margin-top: 14px; background: #0f1016; padding: 14px 18px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #a5f3fc; overflow-x: auto;" id="rules-code-block">
<pre style="margin: 0;">{
  "rules": {
    "pricing_rules": {
      ".read": true,
      ".write": "newData.hasChildren(['full_advance_profit', 'half_advance_profit', 'cod_profit'])"
    },
    "orders": {
      ".read": true,
      "$order_id": {
        ".write": "!data.exists()",
        ".validate": "newData.hasChildren(['orderId', 'total'])"
      }
    }
  }
}</pre>
      </div>
      <small style="display: block; margin-top: 8px; color: var(--text-muted); font-size: 0.76rem;">
        These rules prevent anyone from modifying or deleting existing customer orders (<code>!data.exists()</code>), while allowing customers to seamlessly place new orders.
      </small>
    </div>`;

html = html.replace(oldSecurityBlock, '');

fs.writeFileSync('admin.html', html, 'utf8');
console.log('Successfully cleaned up admin.html dashboard!');
