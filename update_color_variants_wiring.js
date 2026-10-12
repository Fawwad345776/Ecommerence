const fs = require('fs');
const path = require('path');

const COLOR_IMAGES_MAP = {
  "prod-cricket-jersey-tee": {
    "Pakistan Green": "assets/trending/pk_cricket_tee.jpg",
    "Onyx Black": "assets/trending/pk_cricket_tee_black.jpg",
    "Pure White": "assets/trending/pk_cricket_tee_white.jpg"
  },
  "prod-cricket-babar56-tee": {
    "Pure White": "assets/trending/babar56_tee.jpg",
    "Onyx Black": "assets/trending/babar56_tee_black.jpg",
    "Pakistan Green": "assets/trending/babar56_tee_green.jpg"
  },
  "prod-cricket-emerald-mug": {
    "Pakistan Green": "assets/trending/pk_cricket_mug.jpg",
    "Pure White": "assets/trending/pk_cricket_mug_white.jpg"
  },
  "prod-cricket-green-hoodie": {
    "Forest Green": "assets/trending/pk_cricket_hoodie.jpg",
    "Onyx Black": "assets/trending/pk_cricket_hoodie_black.jpg",
    "Heather Grey": "assets/trending/pk_cricket_hoodie_grey.jpg"
  },
  "prod-cricket-twill-cap": {
    "Forest Green": "assets/trending/pk_cricket_cap.jpg",
    "Onyx Black": "assets/trending/pk_cricket_cap_black.jpg",
    "Pure White": "assets/trending/pk_cricket_cap_white.jpg"
  },
  "prod-cricket-laptop-briefcase": {
    "Executive Green": "assets/trending/cricket_laptop_bag.jpg",
    "Obsidian Black": "assets/trending/cricket_laptop_bag_black.jpg"
  },
  "prod-eid-gold-calligraphy-tee": {
    "Onyx Black": "assets/trending/eid_mubarak_tee.jpg",
    "Pure White": "assets/trending/eid_mubarak_tee_white.jpg",
    "Beige Cream": "assets/trending/eid_mubarak_tee_beige.jpg"
  },
  "prod-eid-gold-crescent-mug": {
    "Pure White": "assets/trending/eid_mubarak_mug.jpg",
    "Glossy Black": "assets/trending/eid_mubarak_mug_black.jpg"
  },
  "prod-eid-gold-hoodie": {
    "Onyx Black": "assets/trending/eid_hoodie.jpg",
    "Deep Navy": "assets/trending/eid_hoodie_navy.jpg",
    "Forest Green": "assets/trending/eid_hoodie_green.jpg"
  },
  "prod-eid-gold-cap": {
    "Onyx Black": "assets/trending/eid_cap.jpg",
    "Pure White": "assets/trending/eid_cap_white.jpg",
    "Beige Khaki": "assets/trending/eid_cap_beige.jpg"
  },
  "prod-eid-laptop-sleeve": {
    "Black & Gold": "assets/trending/eid_laptop_bag.jpg"
  },
  "prod-couple-matching-tees": {
    "Black & White Pair": "assets/trending/couple_matching_tee.jpg",
    "Navy & White Pair": "assets/trending/couple_matching_tee_navy.jpg"
  },
  "prod-couple-soulmates-tee": {
    "Charcoal Black": "assets/trending/couple_soulmates_tee.jpg",
    "Warm Beige": "assets/trending/couple_soulmates_tee_beige.jpg",
    "Pure White": "assets/trending/couple_soulmates_tee_white.jpg"
  },
  "prod-couple-mr-mrs-right-tee": {
    "Navy & White Duo": "assets/trending/couple_mr_mrs_right_tee.jpg",
    "Black & Pink Accent": "assets/trending/couple_mr_mrs_right_tee_black_pink.jpg"
  },
  "prod-couple-better-together-tee": {
    "White & Navy Contrast Pair": "assets/trending/couple_better_together_tee.jpg",
    "Pure Black Duo": "assets/trending/couple_better_together_tee_black.jpg"
  },
  "prod-couple-king-queen-tee": {
    "Onyx Black & White Pair": "assets/trending/couple_king_queen_tee.jpg",
    "Both Jet Black": "assets/trending/couple_king_queen_tee_black.jpg",
    "Both Pure White": "assets/trending/couple_king_queen_tee_white.jpg"
  },
  "prod-couple-matching-mugs": {
    "Matte Black & Marble": "assets/trending/couple_mugs.jpg"
  },
  "prod-couple-king-queen-hoodies": {
    "Black (King) + Grey (Queen)": "assets/trending/couple_hoodie.jpg",
    "Black (King) + White (Queen)": "assets/trending/couple_hoodie_white.jpg"
  },
  "prod-couple-mr-mrs-caps": {
    "Black (Mr) + White (Mrs)": "assets/trending/couple_caps.jpg"
  },
  "prod-couple-better-together-bag": {
    "Charcoal Grey": "assets/trending/couple_laptop_bag.jpg",
    "Onyx Black": "assets/trending/couple_laptop_bag_black.jpg"
  },
  "prod-birthday-vintage-legend-tee": {
    "Washed Black": "assets/trending/birthday_tee.jpg",
    "Pure White": "assets/trending/birthday_tee_white.jpg",
    "Charcoal Grey": "assets/trending/birthday_tee_grey.jpg"
  },
  "prod-birthday-superstar-mug": {
    "Pure White Festive": "assets/trending/birthday_mug.jpg"
  },
  "prod-birthday-level-unlocked-hoodie": {
    "Onyx Black": "assets/trending/birthday_hoodie.jpg",
    "Deep Navy": "assets/trending/birthday_hoodie_navy.jpg",
    "Heather Grey": "assets/trending/birthday_hoodie_grey.jpg"
  },
  "prod-birthday-squad-cap": {
    "Onyx Black": "assets/trending/birthday_cap.jpg",
    "Pure White": "assets/trending/birthday_cap_white.jpg"
  },
  "prod-birthday-confetti-laptop-bag": {
    "Charcoal Grey": "assets/trending/birthday_laptop_bag.jpg",
    "Midnight Navy": "assets/trending/birthday_laptop_bag_navy.jpg"
  },
  "prod-chai-dhabba-mug": {
    "Dhabba White": "assets/trending/chai_mug.jpg"
  },
  "prod-classic-white-tee": {
    "Pure White": "assets/blank_tshirt_front.jpg",
    "Onyx Black": "assets/trending/classic_tee_black.jpg",
    "Deep Navy": "assets/trending/classic_tee_navy.jpg"
  },
  "prod-classic-fleece-hoodie": {
    "Onyx Black": "assets/product3.jpg",
    "Heather Grey": "assets/trending/classic_hoodie_grey.jpg"
  }
};

const appPath = path.join(__dirname, 'app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

// 1. Attach COLOR_IMAGES_MAP into PRODUCTS array
const productsMatch = appCode.match(/const PRODUCTS = (\[[\s\S]*?\]);\r?\n/);
if (!productsMatch) {
  console.error("Could not find const PRODUCTS in app.js");
  process.exit(1);
}

const products = eval(productsMatch[1]);
products.forEach(p => {
  if (COLOR_IMAGES_MAP[p.id]) {
    p.colorImages = COLOR_IMAGES_MAP[p.id];
  }
});

const newProductsJson = 'const PRODUCTS = ' + JSON.stringify(products, null, 2) + ';\n';
appCode = appCode.replace(productsMatch[0], newProductsJson);

// 2. Replace renderProductCard function to dynamically use currentVariant color's image
const oldCardRegex = /function renderProductCard\(product\) \{[\s\S]*?\n\}/;
const newCardFn = `function renderProductCard(product) {
  const currentVariant = AppState.selectedVariants[product.id] || {
    size: (product.sizes && product.sizes[0]) || "Standard",
    color: (product.colors && product.colors[0] && product.colors[0].name) || "White"
  };

  const badgeText = product.badge || "⭐ POPULAR";
  const activeColor = currentVariant.color;
  const cardImg = (product.colorImages && product.colorImages[activeColor]) || product.image;

  return \`
    <article class="product-card" id="card-\${product.id}">
      <div class="product-thumb-wrapper" onclick="openProductDialog('\${product.id}')" style="cursor: pointer;">
        <img src="\${cardImg}" alt="\${product.name}" class="product-img" id="card-img-\${product.id}" loading="lazy">
        <span class="badge-float" style="cursor: pointer; background: rgba(15, 23, 42, 0.88); color: #fff; font-weight: 800; font-size: 0.72rem; letter-spacing: 0.5px; border: 1px solid rgba(255,255,255,0.2);">
          \${badgeText}
        </span>
      </div>

      <div class="product-info">
        <span class="product-category" style="color: var(--accent-gold); font-weight: 800; font-size: 0.72rem; letter-spacing: 0.5px; text-transform: uppercase;">
          \${product.categoryName || product.category}
        </span>
        <h3 class="product-name" onclick="openProductDialog('\${product.id}')" style="cursor: pointer; font-size: 1.05rem; line-height: 1.35; margin: 4px 0 8px; font-weight: 800; color: #0f172a;">
          \${product.name}
        </h3>
        
        <div class="product-pricing" style="margin-bottom: 10px;">
          <span class="retail-price" style="font-size: 1.35rem; font-weight: 900; color: #0f172a; font-family: var(--font-heading);">
            Rs. \${product.retailPrice.toLocaleString()}
          </span>
          <span style="font-size: 0.74rem; color: #059669; font-weight: 700; background: #ecfdf5; padding: 2px 8px; border-radius: 99px; margin-left: 8px;">
            ✓ Cash on Delivery
          </span>
        </div>

        <!-- Color Swatches Row -->
        <div class="picker-row" style="margin-bottom: 14px;">
          <div class="picker-label" style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-bottom: 6px;">
            Color: <span class="active-color-name" style="color: #0f172a; font-weight: 800;">\${activeColor}</span>
          </div>
          <div class="color-dots" style="display: flex; gap: 8px;">
            \${(product.colors || []).map(c => \`
              <div 
                class="color-dot \${c.name === activeColor ? 'active' : ''}" 
                style="background-color: \${c.hex}; \${c.hex === '#ffffff' ? 'border: 1px solid #cbd5e1;' : ''}" 
                title="\${c.name}"
                onclick="event.stopPropagation(); selectColor('\${product.id}', '\${c.name}')">
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="product-actions" style="margin-top: auto;">
          <button class="btn-add-cart" onclick="openProductDialog('\${product.id}')" style="width: 100%; padding: 12px 14px; font-size: 0.88rem; font-weight: 800; background: #0f172a; color: #fff; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; box-shadow: 0 2px 6px rgba(15,23,42,0.18);">
            <span>Select & Buy ➔</span>
          </button>
        </div>
      </div>
    </article>
  \`;
}`;

appCode = appCode.replace(oldCardRegex, newCardFn);

// 3. Update selectColor function for instant dynamic image swapping
const oldSelectColorRegex = /window\.selectColor = function\(productId, colorName\) \{[\s\S]*?\};/;
const newSelectColorFn = `window.selectColor = function(productId, colorName) {
  if (!AppState.selectedVariants[productId]) AppState.selectedVariants[productId] = {};
  AppState.selectedVariants[productId].color = colorName;

  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    const cardEl = document.getElementById(\`card-\${productId}\`);
    if (cardEl) {
      const imgEl = document.getElementById(\`card-img-\${productId}\`);
      if (imgEl) {
        const newImg = (product.colorImages && product.colorImages[colorName]) || product.image;
        imgEl.src = newImg;
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
};`;

appCode = appCode.replace(oldSelectColorRegex, newSelectColorFn);

// 4. Update setDialogColor and updateDialogPreviewImage
const oldSetDialogColorRegex = /function setDialogColor\(colorName\) \{[\s\S]*?\n\}/;
const newSetDialogColorFn = `function setDialogColor(colorName) {
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
}`;

appCode = appCode.replace(oldSetDialogColorRegex, newSetDialogColorFn);

const oldPreviewRegex = /function updateDialogPreviewImage\(product\) \{[\s\S]*?\n\}/;
const newPreviewFn = `function updateDialogPreviewImage(product) {
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
}`;

appCode = appCode.replace(oldPreviewRegex, newPreviewFn);

// 5. Update Dialog Add To Cart click event to pass selected color image into cart
const oldDialogAddRegex = /const angleObj = \(product\.angles \|\| \[\]\)\.find\(a => a\.id === AppState\.activeDialog\.activeAngleId\) \|\| \(product\.angles && product\.angles\[0\]\);\s*const thumb = \(angleObj && angleObj\.image\) \|\| product\.image;/;
const newDialogAdd = `const chosenColor = AppState.activeDialog.activeColor;
      const thumb = (product.colorImages && product.colorImages[chosenColor]) || product.image;`;

appCode = appCode.replace(oldDialogAddRegex, newDialogAdd);

// 6. Update window.addToCart itemImage logic
const oldAddToCartImgRegex = /const angleObj = \(product\.angles \|\| \[\]\)\.find\(a => a\.id === \(AppState\.activeDialog && AppState\.activeDialog\.activeAngleId\)\) \|\| \(product\.angles && product\.angles\[0\]\);\s*const itemImage = options\.image \|\| \(angleObj && angleObj\.image\) \|\| product\.image;/;
const newAddToCartImg = `const colorImg = (product.colorImages && product.colorImages[selectedColor]) || product.image;
  const itemImage = options.image || colorImg;`;

appCode = appCode.replace(oldAddToCartImgRegex, newAddToCartImg);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Successfully wired all product color images across cards, modal, and shopping cart!');
