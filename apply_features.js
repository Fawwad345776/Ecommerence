const fs = require('fs');
const path = require('path');

console.log('--- Applying Full Sleeves, Custom Jersey & Couple Sizing updates ---');

// 1. UPDATE index.html
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Ensure Full Sleeves is in top-cat-pill list
if (!indexHtml.includes("scrollToCategory('full-sleeves')")) {
  indexHtml = indexHtml.replace(
    `<div class="top-cat-pill" onclick="scrollToCategory('tees')">
              <span class="cat-icon">👕</span>
              <div>
                <strong>T-Shirts</strong>
                <small>10 Designs</small>
              </div>
            </div>`,
    `<div class="top-cat-pill" onclick="scrollToCategory('tees')">
              <span class="cat-icon">👕</span>
              <div>
                <strong>T-Shirts</strong>
                <small>11 Designs</small>
              </div>
            </div>
            <div class="top-cat-pill" onclick="scrollToCategory('full-sleeves')">
              <span class="cat-icon">👕</span>
              <div>
                <strong>Full Sleeves</strong>
                <small>12 Designs</small>
              </div>
            </div>`
  );
  console.log('Updated index.html top category pills with Full Sleeves');
}

// Ensure filter tabs has full-sleeves button
if (!indexHtml.includes('data-filter="full-sleeves"')) {
  indexHtml = indexHtml.replace(
    '<button class="filter-btn" data-filter="tees">👕 T-Shirts</button>',
    '<button class="filter-btn" data-filter="tees">👕 T-Shirts</button>\n            <button class="filter-btn" data-filter="full-sleeves">👕 Full Sleeves</button>'
  );
}

// Add jersey-live-preview-overlay inside dialog-img-card
if (!indexHtml.includes('id="jersey-live-preview-overlay"')) {
  indexHtml = indexHtml.replace(
    `<div id="dialog-color-tint" style="position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; z-index: 2; opacity: 0; transition: background-color 0.25s ease, opacity 0.25s ease;"></div>
          </div>`,
    `<div id="dialog-color-tint" style="position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; z-index: 2; opacity: 0; transition: background-color 0.25s ease, opacity 0.25s ease;"></div>
            <!-- Live Custom Jersey Name & Number Overlay (Positioned on Jersey Back) -->
            <div id="jersey-live-preview-overlay" style="display: none; position: absolute; inset: 0; pointer-events: none; z-index: 5;">
              <div id="jersey-overlay-name" class="jersey-patch-name">BABAR</div>
              <div id="jersey-overlay-number" class="jersey-patch-number">56</div>
            </div>
          </div>`
  );
  console.log('Added jersey-live-preview-overlay into index.html');
}

// Add container for jersey custom inputs in dialog info column
if (!indexHtml.includes('id="dialog-jersey-custom-container"')) {
  indexHtml = indexHtml.replace(
    `<p id="dialog-product-desc" style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 16px;">
            Product description goes here.
          </p>`,
    `<p id="dialog-product-desc" style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 16px;">
            Product description goes here.
          </p>
          <!-- Custom Jersey Inputs Container -->
          <div id="dialog-jersey-custom-container" style="display: none;"></div>`
  );
  console.log('Added dialog-jersey-custom-container into index.html');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');

// 2. UPDATE style.css
const stylePath = path.join(__dirname, 'style.css');
let styleCss = fs.readFileSync(stylePath, 'utf8');

if (!styleCss.includes('.jersey-patch-name')) {
  const customCss = `
/* Custom Jersey Live Name & Number Overlay */
.jersey-patch-name {
  position: absolute;
  top: 23%;
  left: 58.5%;
  transform: translateX(-50%);
  width: 280px;
  text-align: center;
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 3px;
  text-shadow: 0 2px 6px rgba(0,0,0,0.85);
  text-transform: uppercase;
}

.jersey-patch-number {
  position: absolute;
  top: 30.5%;
  left: 58.5%;
  transform: translateX(-50%);
  width: 240px;
  text-align: center;
  font-family: 'Impact', 'Arial Black', sans-serif;
  font-size: 105px;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: 2px;
  text-shadow: 0 4px 10px rgba(0,0,0,0.9);
}

.product-dialog-size-pill {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}
.product-dialog-size-pill:hover {
  border-color: #0f172a;
  background: #f8fafc;
}
.product-dialog-size-pill.active {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
}

.product-dialog-color-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}
.product-dialog-color-dot:hover {
  transform: scale(1.1);
}
.product-dialog-color-dot.active {
  border-color: #0f172a;
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}
`;
  styleCss += customCss;
  fs.writeFileSync(stylePath, styleCss, 'utf8');
  console.log('Appended modal & jersey styles to style.css');
}

// 3. UPDATE app.js
const appPath = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

// Ensure HORIZONTAL_CATEGORIES includes full-sleeves
const targetHoriz = `const HORIZONTAL_CATEGORIES = [
  {
    id: "tees",
    name: "T-Shirts",
    icon: "👕",
    badge: "100% Combed Cotton",
    sub: "Pakistan Cricket Official '92, Babar 56, Eid Calligraphy, Couple Sets & Birthday Specials"
  },
  {
    id: "full-sleeves",
    name: "Full Sleeve T-Shirts",
    icon: "👕",
    badge: "Ribbed Cuff 240 GSM",
    sub: "Autumn & Winter Heavyweight Cotton Long Sleeves with Modern Graphic Prints"
  },
  {
    id: "hoodies",
    name: "Hoodies",
    icon: "🧥",
    badge: "320 GSM Fleece",
    sub: "Warm Winter Streetwear, Kangaroo Pockets, Embroidered Crests & Couple Sets"
  },
  {
    id: "mugs",
    name: "Mugs & Cups",
    icon: "☕",
    badge: "High-Gloss Ceramic",
    sub: "Microwave Safe, Dual-Sided Gloss Prints, Cricket Stadium, Eid Gold & Anniversary Pairs"
  },
  {
    id: "laptop-bags",
    name: "Laptop Bags & Sleeves",
    icon: "💼",
    badge: "Shockproof Padded Neoprene",
    sub: "Water-Resistant, Heavy-Duty YKK Zippers, Fits 13-16 Inch Laptops"
  },
  {
    id: "caps",
    name: "Caps",
    icon: "🧢",
    badge: "6-Panel Cotton Twill",
    sub: "Structured Profile, Embroidered Badges, Breathable Fit & Adjustable Straps"
  }
];`;

appJs = appJs.replace(/const HORIZONTAL_CATEGORIES = \[[\s\S]*?\];\r?\n/, targetHoriz + '\n');
console.log('Updated HORIZONTAL_CATEGORIES in app.js');

// Ensure full-sleeves is in pricingRules
if (!appJs.includes('"full-sleeves": { name: "Full Sleeve T-Shirts"')) {
  appJs = appJs.replace(
    `"tees": { name: "T-Shirts", cod_profit: 800, half_advance_profit: 600, full_advance_profit: 500 },`,
    `"tees": { name: "T-Shirts", cod_profit: 800, half_advance_profit: 600, full_advance_profit: 500 },
      "full-sleeves": { name: "Full Sleeve T-Shirts", cod_profit: 850, half_advance_profit: 650, full_advance_profit: 550 },`
  );
  console.log('Added full-sleeves to AppState.pricingRules');
}

// Update openProductDialog, renderDialogSizes, and setupProductDialogEventListeners
const newDialogCode = `
window.openProductDialog = openProductDialog;
window.closeProductDialog = closeProductDialog;
window.setDialogAngle = setDialogAngle;
window.setDialogColor = setDialogColor;
window.setDialogSize = setDialogSize;
window.setDialogCoupleSize = setDialogCoupleSize;

function openProductDialog(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentVariant = AppState.selectedVariants[productId] || {
    size: product.sizes[0],
    color: product.colors[0].name
  };

  const isCouple = product.theme === 'couple' || (product.name && (product.name.includes('Couple') || product.name.includes('2-Piece') || product.name.includes('Soulmates') || product.name.includes('KING & QUEEN')));

  AppState.activeDialog = {
    productId: productId,
    activeColor: currentVariant.color,
    activeSize: currentVariant.size,
    menSize: "L",
    womenSize: "M",
    customJerseyName: "BABAR",
    customJerseyNumber: "56",
    isCouple: isCouple,
    qty: 1
  };

  // Populate Header & Text
  const overlay = document.getElementById("product-dialog-overlay");
  const titleEl = document.getElementById("dialog-product-title");
  const catEl = document.getElementById("dialog-cat-badge");
  const descEl = document.getElementById("dialog-product-desc");
  const priceEl = document.getElementById("dialog-product-price");
  const qtyEl = document.getElementById("dialog-qty-display");

  if (titleEl) titleEl.textContent = product.name;
  if (catEl) catEl.textContent = (product.categoryName || product.category).toUpperCase();
  if (descEl) descEl.textContent = product.description;
  if (priceEl) priceEl.textContent = \`Rs. \${product.retailPrice.toLocaleString()}\`;
  if (qtyEl) qtyEl.textContent = "1";

  // Hide angles list completely (front view only)
  const anglesContainer = document.getElementById("dialog-angles-list");
  if (anglesContainer) anglesContainer.innerHTML = "";

  // Render Colors
  renderDialogColors(product);

  // Render Sizes (Dual sizes if Couple set)
  renderDialogSizes(product);

  // Custom Jersey Live Inputs & Overlay Handling
  const jerseyOverlay = document.getElementById("jersey-live-preview-overlay");
  const customInputsContainer = document.getElementById("dialog-jersey-custom-container");

  if (product.isCustomJersey) {
    if (jerseyOverlay) {
      jerseyOverlay.style.display = "block";
      const nameEl = document.getElementById("jersey-overlay-name");
      const numEl = document.getElementById("jersey-overlay-number");
      if (nameEl) nameEl.textContent = AppState.activeDialog.customJerseyName;
      if (numEl) numEl.textContent = AppState.activeDialog.customJerseyNumber;
    }

    if (customInputsContainer) {
      customInputsContainer.style.display = "block";
      customInputsContainer.innerHTML = \`
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
          <div style="font-size: 0.82rem; font-weight: 800; color: #166534; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>⚡ Custom Player Fan Kit (Live Real-Time Back Preview):</span>
          </div>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px;">
            <div>
              <label style="display: block; font-size: 0.74rem; font-weight: 700; color: #374151; margin-bottom: 4px;">Player / Your Name</label>
              <input type="text" id="jersey-input-name" maxlength="12" value="\${AppState.activeDialog.customJerseyName}" style="width: 100%; padding: 8px 10px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-weight: 800; font-size: 0.9rem; text-transform: uppercase;" placeholder="BABAR">
            </div>
            <div>
              <label style="display: block; font-size: 0.74rem; font-weight: 700; color: #374151; margin-bottom: 4px;">Jersey Number</label>
              <input type="text" id="jersey-input-number" maxlength="2" value="\${AppState.activeDialog.customJerseyNumber}" style="width: 100%; padding: 8px 10px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-weight: 800; font-size: 0.9rem; text-align: center;" placeholder="56">
            </div>
          </div>
          <small style="display: block; color: #15803d; font-size: 0.72rem; margin-top: 6px; font-weight: 600;">✓ Live preview updates instantly above and will be printed on the back.</small>
        </div>
      \`;

      const nameInput = document.getElementById("jersey-input-name");
      const numInput = document.getElementById("jersey-input-number");
      const nameOverlay = document.getElementById("jersey-overlay-name");
      const numOverlay = document.getElementById("jersey-overlay-number");

      if (nameInput) {
        nameInput.addEventListener("input", (e) => {
          const val = e.target.value.toUpperCase();
          AppState.activeDialog.customJerseyName = val || "NAME";
          if (nameOverlay) nameOverlay.textContent = AppState.activeDialog.customJerseyName;
        });
      }

      if (numInput) {
        numInput.addEventListener("input", (e) => {
          const val = e.target.value.replace(/[^0-9]/g, '');
          AppState.activeDialog.customJerseyNumber = val || "00";
          if (numOverlay) numOverlay.textContent = AppState.activeDialog.customJerseyNumber;
        });
      }
    }
  } else {
    if (jerseyOverlay) jerseyOverlay.style.display = "none";
    if (customInputsContainer) {
      customInputsContainer.style.display = "none";
      customInputsContainer.innerHTML = "";
    }
  }

  // Update Visual Viewport Image (Front View Only)
  updateDialogPreviewImage(product);

  if (overlay) {
    overlay.style.display = "flex";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeProductDialog() {
  const overlay = document.getElementById("product-dialog-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }
}

function renderDialogAngles(product) {
  const container = document.getElementById("dialog-angles-list");
  if (container) container.innerHTML = "";
}

function setDialogAngle(angleId) {
  // Front view only
}

function renderDialogColors(product) {
  const container = document.getElementById("dialog-color-dots");
  const labelEl = document.getElementById("dialog-selected-color-label");
  if (!container) return;

  if (labelEl) labelEl.textContent = AppState.activeDialog.activeColor;

  container.innerHTML = product.colors.map(c => \`
    <div 
      class="product-dialog-color-dot \${c.name === AppState.activeDialog.activeColor ? 'active' : ''}" 
      style="background-color: \${c.hex}; \${c.hex === '#ffffff' ? 'border: 1px solid #cbd5e1;' : ''}" 
      title="\${c.name}"
      onclick="setDialogColor('\${c.name}')">
    </div>
  \`).join('');
}

function setDialogColor(colorName) {
  AppState.activeDialog.activeColor = colorName;
  const product = PRODUCTS.find(p => p.id === AppState.activeDialog.productId);
  if (product) {
    if (!AppState.selectedVariants[product.id]) AppState.selectedVariants[product.id] = {};
    AppState.selectedVariants[product.id].color = colorName;

    renderDialogColors(product);
    updateDialogPreviewImage(product);

    // Sync catalog card image and swatch states too
    const cardEl = document.getElementById(\`card-\${product.id}\`);
    if (cardEl) {
      const cardImg = document.getElementById(\`card-img-\${product.id}\`);
      if (cardImg) {
        cardImg.src = (product.colorImages && product.colorImages[colorName]) || product.image;
      }
      const labelSpan = cardEl.querySelector('.active-color-name');
      if (labelSpan) labelSpan.textContent = colorName;
      const dots = cardEl.querySelectorAll('.color-dot');
      dots.forEach(d => {
        if (d.getAttribute('title') === colorName) d.classList.add('active');
        else d.classList.remove('active');
      });
    }
  }
}

function renderDialogSizes(product) {
  const container = document.getElementById("dialog-size-pills");
  if (!container) return;

  const isCouple = product.theme === 'couple' || (product.name && (product.name.includes('Couple') || product.name.includes('2-Piece') || product.name.includes('Soulmates') || product.name.includes('KING & QUEEN')));

  if (isCouple) {
    container.innerHTML = \`
      <div style="width: 100%; display: flex; flex-direction: column; gap: 14px;">
        <!-- Men's / Partner 1 Size -->
        <div style="background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #1e3a8a; margin-bottom: 6px; display: flex; justify-content: space-between;">
            <span>👔 Partner 1 (Men's Size):</span>
            <span style="font-weight: 900; color: #0f172a;" id="dialog-couple-men-label">\${AppState.activeDialog.menSize || 'L'}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            \${(product.sizes || ["S", "M", "L", "XL", "XXL"]).map(s => \`
              <button 
                type="button" 
                class="product-dialog-size-pill \${s === AppState.activeDialog.menSize ? 'active' : ''}" 
                onclick="setDialogCoupleSize('men', '\${s}')">
                \${s}
              </button>
            \`).join('')}
          </div>
        </div>

        <!-- Women's / Partner 2 Size -->
        <div style="background: #fdf2f8; padding: 10px 12px; border-radius: 8px; border: 1px solid #fce7f3;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #be185d; margin-bottom: 6px; display: flex; justify-content: space-between;">
            <span>👗 Partner 2 (Women's Size):</span>
            <span style="font-weight: 900; color: #0f172a;" id="dialog-couple-women-label">\${AppState.activeDialog.womenSize || 'M'}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            \${(product.sizes || ["S", "M", "L", "XL", "XXL"]).map(s => \`
              <button 
                type="button" 
                class="product-dialog-size-pill \${s === AppState.activeDialog.womenSize ? 'active' : ''}" 
                onclick="setDialogCoupleSize('women', '\${s}')">
                \${s}
              </button>
            \`).join('')}
          </div>
        </div>
      </div>
    \`;
  } else {
    container.innerHTML = product.sizes.map(s => \`
      <button 
        type="button" 
        class="product-dialog-size-pill \${s === AppState.activeDialog.activeSize ? 'active' : ''}" 
        onclick="setDialogSize('\${s}')">
        \${s}
      </button>
    \`).join('');
  }
}

function setDialogSize(sizeName) {
  AppState.activeDialog.activeSize = sizeName;
  const product = PRODUCTS.find(p => p.id === AppState.activeDialog.productId);
  if (product) {
    if (!AppState.selectedVariants[product.id]) AppState.selectedVariants[product.id] = {};
    AppState.selectedVariants[product.id].size = sizeName;
    renderDialogSizes(product);
  }
}

function setDialogCoupleSize(partner, sizeName) {
  if (partner === 'men') {
    AppState.activeDialog.menSize = sizeName;
  } else {
    AppState.activeDialog.womenSize = sizeName;
  }
  const product = PRODUCTS.find(p => p.id === AppState.activeDialog.productId);
  if (product) {
    renderDialogSizes(product);
  }
}

function updateDialogPreviewImage(product) {
  const previewImg = document.getElementById("dialog-preview-img");
  const tintEl = document.getElementById("dialog-color-tint");
  if (!previewImg) return;

  const chosenColor = AppState.activeDialog && AppState.activeDialog.activeColor;
  const modalImg = (product.colorImages && product.colorImages[chosenColor]) || product.image;
  previewImg.src = modalImg;

  if (tintEl) {
    tintEl.style.opacity = "0";
    tintEl.style.clipPath = "none";
    tintEl.style.webkitClipPath = "none";
  }
}

function setupProductDialogEventListeners() {
  const overlay = document.getElementById("product-dialog-overlay");
  const closeBtn = document.getElementById("close-product-dialog-btn");
  const qtyMinus = document.getElementById("dialog-qty-minus");
  const qtyPlus = document.getElementById("dialog-qty-plus");
  const qtyDisplay = document.getElementById("dialog-qty-display");
  const addToCartBtn = document.getElementById("dialog-add-to-cart-btn");
  const customizeBtn = document.getElementById("dialog-customize-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeProductDialog);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target.id === "product-dialog-overlay") closeProductDialog();
    });
  }

  if (qtyMinus) {
    qtyMinus.addEventListener("click", () => {
      if (AppState.activeDialog.qty > 1) {
        AppState.activeDialog.qty -= 1;
        if (qtyDisplay) qtyDisplay.textContent = AppState.activeDialog.qty;
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener("click", () => {
      AppState.activeDialog.qty += 1;
      if (qtyDisplay) qtyDisplay.textContent = AppState.activeDialog.qty;
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const product = PRODUCTS.find(p => p.id === AppState.activeDialog.productId);
      if (!product) return;

      const chosenColor = AppState.activeDialog.activeColor;
      const thumb = (product.colorImages && product.colorImages[chosenColor]) || product.image;
      const qty = parseInt(AppState.activeDialog.qty || 1);

      if (product.isCustomJersey) {
        const customName = AppState.activeDialog.customJerseyName || "BABAR";
        const customNumber = AppState.activeDialog.customJerseyNumber || "56";
        window.addToCart(product.id, {
          size: AppState.activeDialog.activeSize || "L",
          color: chosenColor,
          qty: qty,
          image: thumb,
          isCustomJersey: true,
          customPlayerName: customName,
          customJerseyNumber: customNumber
        });
      } else if (AppState.activeDialog.isCouple) {
        const menSize = AppState.activeDialog.menSize || "L";
        const womenSize = AppState.activeDialog.womenSize || "M";
        window.addToCart(product.id, {
          size: \`Men: \${menSize} | Women: \${womenSize}\`,
          menSize: menSize,
          womenSize: womenSize,
          isCouple: true,
          color: chosenColor,
          qty: qty,
          image: thumb
        });
      } else {
        window.addToCart(product.id, {
          size: AppState.activeDialog.activeSize,
          color: chosenColor,
          qty: qty,
          image: thumb
        });
      }

      closeProductDialog();
    });
  }

  if (customizeBtn) customizeBtn.style.display = "none";
}
`;

// Replace from window.openProductDialog = openProductDialog to setupProductDialogEventListeners
const dialogRegex = /window\.openProductDialog = openProductDialog;[\s\S]*?function setupProductDialogEventListeners\(\) \{[\s\S]*?if \(customizeBtn\) customizeBtn\.style\.display = "none";\r?\n\}/;
if (appJs.match(dialogRegex)) {
  appJs = appJs.replace(dialogRegex, newDialogCode.trim());
  console.log('Successfully replaced dialog functions in app.js');
} else {
  console.error('Could not match dialogRegex in app.js');
}

// 4. Update addToCart in app.js to handle customPlayerName and couple sizes in cartKey and item object
const oldAddToCartRegex = /window\.addToCart = function\(productId, options = \{\}\) \{[\s\S]*?showToast\(`✓ Added \${product\.name} \(\${qtyToAdd}x\) to shopping bag!`\);\r?\n\};/;

const newAddToCartCode = `window.addToCart = function(productId, options = {}) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentVariant = AppState.selectedVariants[productId] || {
    size: (product.sizes && product.sizes[0]) || "Standard",
    color: (product.colors && product.colors[0] && product.colors[0].name) || "Pure White"
  };

  const selectedSize = options.size || (AppState.activeDialog && AppState.activeDialog.productId === productId ? AppState.activeDialog.activeSize : null) || currentVariant.size || "Standard";
  const selectedColor = options.color || (AppState.activeDialog && AppState.activeDialog.productId === productId ? AppState.activeDialog.activeColor : null) || currentVariant.color || "Pure White";
  const qtyToAdd = Math.max(1, parseInt(options.qty || (AppState.activeDialog && AppState.activeDialog.productId === productId ? AppState.activeDialog.qty : 1) || 1));

  const colorImg = (product.colorImages && product.colorImages[selectedColor]) || product.image;
  const itemImage = options.image || colorImg;

  let cartKey = \`\${productId}-\${selectedSize}-\${selectedColor}\`;
  if (options.isCustomJersey) {
    cartKey = \`\${productId}-\${selectedSize}-\${selectedColor}-\${options.customPlayerName || 'BABAR'}-\${options.customJerseyNumber || '56'}\`;
  } else if (options.isCouple) {
    cartKey = \`\${productId}-couple-\${options.menSize || 'L'}-\${options.womenSize || 'M'}-\${selectedColor}\`;
  }

  const validPrice = Number(product.retailPrice || (product.baseCost + product.profit) || 1250);
  const validBaseCost = Number(product.baseCost || 700);
  const validProfit = Number(product.profit || 500);

  const existingItem = AppState.cart.find(item => item.cartKey === cartKey);
  if (existingItem) {
    existingItem.qty = (Number(existingItem.qty) || 1) + qtyToAdd;
    existingItem.price = validPrice;
    existingItem.unitPrice = validPrice;
    existingItem.baseCost = validBaseCost;
    existingItem.profit = validProfit;
  } else {
    AppState.cart.push({
      cartKey,
      id: product.id,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: validPrice,
      unitPrice: validPrice,
      baseCost: validBaseCost,
      profit: validProfit,
      image: itemImage,
      previewImage: itemImage,
      size: selectedSize,
      color: selectedColor,
      blankSku: product.blankSku || \`SKU-\${product.id}\`,
      qty: qtyToAdd,
      isCustom: false,
      isCustomJersey: !!options.isCustomJersey,
      customPlayerName: options.customPlayerName || null,
      customJerseyNumber: options.customJerseyNumber || null,
      isCouple: !!options.isCouple,
      menSize: options.menSize || null,
      womenSize: options.womenSize || null
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(\`✓ Added \${product.name} (\${qtyToAdd}x) to shopping bag!\`);
};`;

if (appJs.match(oldAddToCartRegex)) {
  appJs = appJs.replace(oldAddToCartRegex, newAddToCartCode);
  console.log('Successfully updated window.addToCart in app.js');
}

// 5. Update updateCartUI to display custom jersey name/number and couple sizes cleanly
const oldCartItemHtmlRegex = /<h4 class="cart-item-title">\${item\.name}<\/h4>[\s\S]*?Size: <strong>\${item\.size}<\/strong> \| Color: <strong>\${item\.color}<\/strong>/;

const newCartItemHtml = `<h4 class="cart-item-title">\${item.name}</h4>
          <div class="cart-item-meta">
            \${item.isCustomJersey ? \`
              <div style="font-size: 0.74rem; background: #ecfdf5; color: #047857; font-weight: 800; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 4px; border: 1px solid #a7f3d0;">
                🏏 Custom Fan Print: <strong>\${item.customPlayerName} #\${item.customJerseyNumber}</strong>
              </div>
            \` : ''}
            \${item.isCouple ? \`
              <div style="font-size: 0.74rem; background: #fdf2f8; color: #be185d; font-weight: 800; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 4px; border: 1px solid #fbcfe8;">
                💍 Couple Duo: 👔 Men \${item.menSize || 'L'} + 👗 Women \${item.womenSize || 'M'}
              </div>
            \` : ''}
            \${item.isCustom ? \`
              <div style="font-size: 0.74rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 3px;">
                \${item.customSides?.hasFront && item.customSides?.hasBack ? '✨ 2-Sided Print (Front & Back)' : (item.customSides?.hasFront ? '✨ Front Print' : '✨ Back Print')}
              </div>
              \${item.customSides?.front?.artworkName ? \`<div style="font-size: 0.72rem; color: var(--text-secondary);">Front: \${item.customSides.front.artworkName} \${item.customSides.front.text ? \`("\${item.customSides.front.text}")\` : ''}</div>\` : (item.customSides?.front?.text ? \`<div style="font-size: 0.72rem; color: var(--text-secondary);">Front Text: "\${item.customSides.front.text}"</div>\` : '')}
              \${item.customSides?.back?.artworkName ? \`<div style="font-size: 0.72rem; color: var(--text-secondary);">Back: \${item.customSides.back.artworkName} \${item.customSides.back.text ? \`("\${item.customSides.back.text}")\` : ''}</div>\` : (item.customSides?.back?.text ? \`<div style="font-size: 0.72rem; color: var(--text-secondary);">Back Text: "\${item.customSides.back.text}"</div>\` : '')}
            \` : ''}
            Size: <strong>\${item.size}</strong> | Color: <strong>\${item.color}</strong>`;

if (appJs.match(oldCartItemHtmlRegex)) {
  appJs = appJs.replace(oldCartItemHtmlRegex, newCartItemHtml);
  console.log('Successfully updated cart item rendering in updateCartUI');
}

fs.writeFileSync(appPath, appJs, 'utf8');
console.log('--- All updates applied cleanly! ---');
