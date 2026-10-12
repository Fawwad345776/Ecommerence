const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

const engineCode = `// 6. DRAGGABLE & DELETABLE DUAL-SIDED CUSTOMIZER STUDIO ENGINE
function setupCustomizerStudio() {
  // Undo / Redo History Stack
  let historyStack = [];
  let historyIndex = -1;

  function pushHistory() {
    try {
      const snap = JSON.stringify(AppState.customizer.sides);
      if (historyIndex >= 0 && historyStack[historyIndex] === snap) return;
      historyStack = historyStack.slice(0, historyIndex + 1);
      historyStack.push(snap);
      historyIndex++;
      updateHistoryButtons();
    } catch (e) {
      console.warn("History push error:", e);
    }
  }

  function updateHistoryButtons() {
    const undoBtn = document.getElementById("studio-undo-btn");
    const redoBtn = document.getElementById("studio-redo-btn");
    if (undoBtn) undoBtn.disabled = historyIndex <= 0;
    if (redoBtn) redoBtn.disabled = historyIndex >= historyStack.length - 1;
  }

  const undoBtn = document.getElementById("studio-undo-btn");
  const redoBtn = document.getElementById("studio-redo-btn");
  if (undoBtn) {
    undoBtn.addEventListener("click", () => {
      if (historyIndex > 0) {
        historyIndex--;
        AppState.customizer.sides = JSON.parse(historyStack[historyIndex]);
        renderSideContent(AppState.customizer.activeSide);
        updateLayersList();
        updateCustomizerPricing();
        checkBoundaryCollision();
        updateHistoryButtons();
        showToast("↶ Undo ho gaya!");
      }
    });
  }
  if (redoBtn) {
    redoBtn.addEventListener("click", () => {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        AppState.customizer.sides = JSON.parse(historyStack[historyIndex]);
        renderSideContent(AppState.customizer.activeSide);
        updateLayersList();
        updateCustomizerPricing();
        checkBoundaryCollision();
        updateHistoryButtons();
        showToast("↷ Redo ho gaya!");
      }
    });
  }

  // --- Official Colors Palette per Product ---
  const CEEPRINTO_PRODUCT_COLORS = {
    "mug": [
      { name: "Green & White", hex: "linear-gradient(135deg, #16a34a 50%, #ffffff 50%)", border: "#15803d", label: "Green & White (Two-Tone)", mugVariant: "green_white" },
      { name: "Pure White", hex: "#ffffff", border: "#cbd5e1", label: "Pure White Cup", mugVariant: "white" },
      { name: "Red & White", hex: "linear-gradient(135deg, #dc2626 50%, #ffffff 50%)", border: "#dc2626", label: "Red & White (Two-Tone)", mugVariant: "red_white" },
      { name: "Blue & White", hex: "linear-gradient(135deg, #1d4ed8 50%, #ffffff 50%)", border: "#1d4ed8", label: "Blue & White (Two-Tone)", mugVariant: "blue_white" },
      { name: "Yellow & White", hex: "linear-gradient(135deg, #ca8a04 50%, #ffffff 50%)", border: "#a16207", label: "Yellow & White (Two-Tone)", mugVariant: "yellow_white" },
      { name: "Orange & White", hex: "linear-gradient(135deg, #ea580c 50%, #ffffff 50%)", border: "#c2410c", label: "Orange & White (Two-Tone)", mugVariant: "orange_white" },
      { name: "Pink & White", hex: "linear-gradient(135deg, #ec4899 50%, #ffffff 50%)", border: "#be185d", label: "Pink & White (Two-Tone)", mugVariant: "pink_white" },
      { name: "Black & White", hex: "linear-gradient(135deg, #111216 50%, #ffffff 50%)", border: "#111216", label: "Black & White (Two-Tone)", mugVariant: "black_white" },
      { name: "Obsidian Black", hex: "#111216", border: "#000000", label: "Obsidian Black Cup", mugVariant: "black" }
    ],
    "white-tee": [
      { name: "Pure White", hex: "#ffffff", border: "#cbd5e1" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#6b7280" },
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Royal Blue", hex: "#1d4ed8" },
      { name: "Sky Blue", hex: "#38bdf8" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Maroon Red", hex: "#800020" },
      { name: "Light Pink", hex: "#f472b6" },
      { name: "Light Purple", hex: "#a855f7" },
      { name: "Beige", hex: "#d4b996" },
      { name: "Dark Green", hex: "#14532d" },
      { name: "Knorr Green", hex: "#16a34a" },
      { name: "Mustard", hex: "#d97706" }
    ],
    "hoodie": [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff", border: "#cbd5e1" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Heather Grey", hex: "#6b7280" },
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Royal Blue", hex: "#1d4ed8" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Maroon Red", hex: "#800020" },
      { name: "Light Pink", hex: "#f472b6" },
      { name: "Purple", hex: "#7e22ce" },
      { name: "Beige", hex: "#d4b996" }
    ],
    "cap": [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff", border: "#cbd5e1" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Maroon Red", hex: "#800020" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Stone Khaki", hex: "#d6cfc7", border: "#a8a29e" }
    ],
    "notebook": [
      { name: "Classic Black", hex: "#111216" },
      { name: "Royal Navy Blue", hex: "#1e3a8a" },
      { name: "Bottle Green", hex: "#166534" },
      { name: "Tan Brown", hex: "#92400e" },
      { name: "Pure White", hex: "#ffffff", border: "#cbd5e1" }
    ],
    "laptop-bag": [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff", border: "#cbd5e1" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Heather Grey", hex: "#475569" }
    ]
  };

  const COLOR_PALETTE = {
    "Pure White": { filter: "none", tintBg: "transparent", tintOpacity: "0" },
    "Pure White Gloss": { filter: "none", tintBg: "transparent", tintOpacity: "0" },
    "Beige": { filter: "none", tintBg: "#d4b996", tintOpacity: "0.45" },
    "Onyx Black": { filter: "none", tintBg: "#111216", tintOpacity: "0.94" },
    "Charcoal Grey": { filter: "none", tintBg: "#374151", tintOpacity: "0.85" },
    "Heather Grey": { filter: "none", tintBg: "#475569", tintOpacity: "0.68" },
    "Deep Navy": { filter: "none", tintBg: "#172554", tintOpacity: "0.94" },
    "Royal Blue": { filter: "none", tintBg: "#1d4ed8", tintOpacity: "0.88" },
    "Royal Navy Blue": { filter: "none", tintBg: "#1e3a8a", tintOpacity: "0.94" },
    "Sky Blue": { filter: "none", tintBg: "#38bdf8", tintOpacity: "0.65" },
    "Bottle Green": { filter: "none", tintBg: "#14532d", tintOpacity: "0.94" },
    "Dark Green": { filter: "none", tintBg: "#14532d", tintOpacity: "0.94" },
    "Knorr Green": { filter: "none", tintBg: "#16a34a", tintOpacity: "0.88" },
    "Maroon Red": { filter: "none", tintBg: "#800020", tintOpacity: "0.94" },
    "Crimson Red": { filter: "none", tintBg: "#991b1b", tintOpacity: "0.94" },
    "Light Pink": { filter: "none", tintBg: "#f472b6", tintOpacity: "0.60" },
    "Light Purple": { filter: "none", tintBg: "#a855f7", tintOpacity: "0.72" },
    "Purple": { filter: "none", tintBg: "#7e22ce", tintOpacity: "0.85" },
    "Mustard": { filter: "none", tintBg: "#d97706", tintOpacity: "0.82" },
    "Tan Brown": { filter: "none", tintBg: "#92400e", tintOpacity: "0.92" },
    "Stone Khaki": { filter: "none", tintBg: "#d6cfc7", tintOpacity: "0.65" }
  };

  const PRODUCT_CLIPS = {
    "white-tee": {
      front: "polygon(42% 14%, 50% 16.8%, 58% 14%, 77% 22%, 95.5% 33.5%, 88.5% 49%, 85% 53.5%, 80% 54%, 77.2% 47.5%, 77.5% 88.5%, 22.5% 88.5%, 22.8% 47.5%, 20% 54%, 15% 53.5%, 11.5% 49%, 4.5% 33.5%, 23% 22%)",
      back: "polygon(42% 14%, 50% 14.8%, 58% 14%, 77% 22%, 95.5% 33.5%, 88.5% 49%, 85% 53.5%, 80% 54%, 77.2% 47.5%, 77.5% 88.5%, 22.5% 88.5%, 22.8% 47.5%, 20% 54%, 15% 53.5%, 11.5% 49%, 4.5% 33.5%, 23% 22%)"
    },
    "hoodie": {
      front: "polygon(50% 5.8%, 61% 10%, 64% 18%, 62% 27%, 75.5% 32%, 86.5% 52%, 86.5% 72%, 86.5% 89.5%, 76% 89.5%, 75% 82.5%, 74% 68%, 73.5% 53%, 72.5% 91.5%, 27.5% 91.5%, 26.5% 53%, 26% 68%, 25% 82.5%, 24% 89.5%, 13.5% 89.5%, 13.5% 72%, 13.5% 52%, 24.5% 32%, 38% 27%, 36% 18%, 39% 10%)",
      back: "polygon(50% 5.8%, 61% 10%, 64% 18%, 62% 27%, 78% 32%, 92.5% 55%, 92.5% 75%, 92% 89.5%, 82% 89.5%, 81% 75%, 80% 57%, 72.5% 91.5%, 27.5% 91.5%, 20% 57%, 19% 75%, 18% 89.5%, 7.5% 89.5%, 7.5% 75%, 7.5% 55%, 22% 32%, 38% 27%, 36% 18%, 39% 10%)"
    },
    "cap": {
      front: "polygon(50% 15.5%, 66% 21%, 76% 35%, 76% 52%, 72% 79%, 50% 83%, 28% 79%, 24% 52%, 24% 35%, 34% 21%)",
      back: "polygon(50% 20.5%, 68% 25%, 78% 36%, 86.5% 56%, 86.5% 67%, 77% 76.5%, 23% 76.5%, 13.5% 67%, 13.5% 56%, 22% 36%, 32% 25%)"
    },
    "notebook": {
      front: "polygon(26% 15.5%, 74% 15.5%, 74% 84.8%, 26% 84.8%)",
      back: "polygon(25.8% 15.5%, 73.8% 15.5%, 73.8% 84.8%, 25.8% 84.8%)"
    },
    "laptop-bag": {
      front: "polygon(22% 34%, 78% 34%, 78% 82%, 22% 82%)",
      back: "polygon(22% 34%, 78% 34%, 78% 82%, 22% 82%)"
    }
  };

  // --- Left Column Tabs Handling ---
  const tabButtons = document.querySelectorAll(".studio-tab-btn");
  const tabPanes = document.querySelectorAll(".studio-tab-pane");

  function switchStudioTab(targetTab) {
    tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === targetTab);
    });
    tabPanes.forEach(pane => {
      pane.classList.toggle("active", pane.id === \`tab-pane-\${targetTab}\`);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchStudioTab(btn.dataset.tab);
    });
  });

  // --- Realtime Boundary Collision Detection ---
  function checkBoundaryCollision() {
    const side = AppState.customizer.activeSide || "left";
    const sideData = AppState.customizer.sides[side] || {};
    const pArea = document.getElementById("printable-area");
    const banner = document.getElementById("studio-warning-banner");
    const bannerIcon = document.getElementById("studio-banner-icon");
    const bannerText = document.getElementById("studio-banner-text");
    const artEl = document.getElementById("artwork-drag-container");
    const textEl = document.getElementById("text-drag-container");

    if (!pArea || !banner) return false;

    const pWidth = pArea.clientWidth || pArea.offsetWidth;
    const pHeight = pArea.clientHeight || pArea.offsetHeight;

    const hasArtwork = !!(sideData.artworkSrc);
    const hasText = !!(sideData.text && sideData.text.trim().length > 0);

    let artOut = false;
    if (hasArtwork && artEl && artEl.style.display !== "none") {
      const aLeft = artEl.offsetLeft;
      const aTop = artEl.offsetTop;
      const aWidth = artEl.offsetWidth;
      const aHeight = artEl.offsetHeight;
      if (aLeft < -2 || aTop < -2 || (aLeft + aWidth) > (pWidth + 2) || (aTop + aHeight) > (pHeight + 2)) {
        artOut = true;
      }
    }

    let textOut = false;
    if (hasText && textEl && textEl.style.display !== "none") {
      const tLeft = textEl.offsetLeft;
      const tTop = textEl.offsetTop;
      const tWidth = textEl.offsetWidth;
      const tHeight = textEl.offsetHeight;
      if (tLeft < -2 || tTop < -2 || (tLeft + tWidth) > (pWidth + 2) || (tTop + tHeight) > (pHeight + 2)) {
        textOut = true;
      }
    }

    const isOutOfBounds = artOut || textOut;
    AppState.customizer.isOutOfBounds = isOutOfBounds;

    if (isOutOfBounds) {
      banner.classList.remove("normal");
      banner.classList.add("error");
      if (bannerIcon) bannerIcon.textContent = "⚠️";
      if (bannerText) {
        if (artOut && textOut) {
          bannerText.textContent = "Error: Image & text are outside the dashed printable area! Please place them inside.";
        } else if (artOut) {
          bannerText.textContent = "Error: Image is outside the dashed printable area! Please place it inside the red dashed box.";
        } else {
          bannerText.textContent = "Error: Text is outside the dashed printable area! Please place it inside the red dashed box.";
        }
      }
      pArea.classList.add("out-of-bounds");
    } else {
      banner.classList.remove("error");
      banner.classList.add("normal");
      pArea.classList.remove("out-of-bounds");

      if (hasArtwork || hasText) {
        if (bannerIcon) bannerIcon.textContent = "✓";
        if (bannerText) bannerText.textContent = "✓ Design is safely placed inside the dashed design area.";
      } else {
        if (bannerIcon) bannerIcon.textContent = "!";
        if (bannerText) bannerText.textContent = "Place images and text inside the dashed design area. Upload an image or add text to start!";
      }
    }

    return isOutOfBounds;
  }

  // --- Dynamic Layers List in Product Tab ---
  function updateLayersList() {
    const container = document.getElementById("studio-layers-container");
    if (!container) return;

    const side = AppState.customizer.activeSide || "left";
    const sideData = AppState.customizer.sides[side] || {};
    const hasArtwork = !!(sideData.artworkSrc);
    const hasText = !!(sideData.text && sideData.text.trim().length > 0);

    if (!hasArtwork && !hasText) {
      container.innerHTML = \`
        <div class="empty-layers-msg">
          <span>No layers yet</span>
          <small>Upload an image or add text to start</small>
        </div>
      \`;
      return;
    }

    let html = "";
    if (hasArtwork) {
      html += \`
        <div class="layer-item-row" data-layer-type="artwork" style="cursor: pointer;" title="Click to edit artwork">
          <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
            <img src="\${sideData.artworkSrc}" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px; background: #f1f5f9;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px; font-weight: 700;">\${sideData.artworkName || 'Custom Artwork'}</span>
          </div>
          <button type="button" class="btn-del-layer" data-action="del-artwork" title="Delete Artwork">🗑️</button>
        </div>
      \`;
    }

    if (hasText) {
      html += \`
        <div class="layer-item-row" data-layer-type="text" style="cursor: pointer;" title="Click to edit text">
          <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
            <span style="font-size: 1rem;">🔤</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px; font-weight: 800; color: \${sideData.textColor || '#000000'};">"\${sideData.text}"</span>
          </div>
          <button type="button" class="btn-del-layer" data-action="del-text" title="Delete Text">🗑️</button>
        </div>
      \`;
    }

    container.innerHTML = html;

    // Attach click events on layer rows
    container.querySelectorAll(".layer-item-row").forEach(row => {
      row.addEventListener("click", (e) => {
        if (e.target.closest(".btn-del-layer")) return;
        const type = row.dataset.layerType;
        if (type === "artwork") switchStudioTab("images");
        else if (type === "text") switchStudioTab("text");
      });
    });

    // Attach delete button events
    const delArtBtn = container.querySelector('[data-action="del-artwork"]');
    if (delArtBtn) {
      delArtBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteArtworkForActiveSide();
      });
    }

    const delTxtBtn = container.querySelector('[data-action="del-text"]');
    if (delTxtBtn) {
      delTxtBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteCustomTextForActiveSide();
      });
    }
  }

  // --- Dynamic Pricing Engine ---
  function updateCustomizerPricing() {
    const blankKey = AppState.customizer.blankType || "mug";
    const prod = AppState.customizer.products[blankKey];
    if (!prod) return;

    let baseCost = prod.baseCost;
    if (blankKey === "mug") {
      const vKey = AppState.customizer.mugColor || "green_white";
      const vObj = prod.mugVariants ? (prod.mugVariants[vKey] || prod.mugVariants["white"]) : null;
      if (vObj) baseCost = vObj.cost;
    }

    const blankCat = prod.category || mapBlankToCategory(blankKey);
    const catProfit = getCategoryProfit(blankCat, "half_advance");
    const basePrice = baseCost + catProfit;

    AppState.customizer.baseCost = baseCost;
    AppState.customizer.profit = catProfit;
    AppState.customizer.price = basePrice;

    // Additional side print fees (e.g. +Rs. 200 for each side designed)
    let totalSideFees = 0;
    const sidesList = prod.sides || [];
    sidesList.forEach(s => {
      const sData = AppState.customizer.sides[s.id];
      if (sData && (sData.artworkSrc || (sData.text && sData.text.trim().length > 0))) {
        totalSideFees += (s.fee || 200);
      }
    });

    const qty = AppState.customizer.qty || 1;
    const unitPrice = basePrice + totalSideFees;
    const totalOrderPrice = unitPrice * qty;

    const baseEl = document.getElementById("cust-base-price");
    if (baseEl) baseEl.textContent = \`Base: Rs. \${basePrice.toLocaleString()}\`;

    const totalEl = document.getElementById("customizer-calc-total");
    if (totalEl) totalEl.textContent = \`Rs. \${totalOrderPrice.toLocaleString()}\`;

    const btnLabel = document.getElementById("cust-btn-label");
    if (btnLabel) btnLabel.textContent = \`Add to Cart • Rs. \${totalOrderPrice.toLocaleString()}\`;
  }

  // Quantity +/- Buttons
  const qtyMinus = document.getElementById("cust-qty-minus");
  const qtyPlus = document.getElementById("cust-qty-plus");
  const qtyDisplay = document.getElementById("cust-qty-display");

  if (qtyMinus) {
    qtyMinus.addEventListener("click", () => {
      if ((AppState.customizer.qty || 1) > 1) {
        AppState.customizer.qty = (AppState.customizer.qty || 1) - 1;
        if (qtyDisplay) qtyDisplay.textContent = AppState.customizer.qty;
        updateCustomizerPricing();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener("click", () => {
      AppState.customizer.qty = (AppState.customizer.qty || 1) + 1;
      if (qtyDisplay) qtyDisplay.textContent = AppState.customizer.qty;
      updateCustomizerPricing();
    });
  }

  // --- Right Column: Dynamic Print Sides Stack ---
  function renderPrintSidesStack() {
    const stack = document.getElementById("print-sides-stack");
    if (!stack) return;

    const blankKey = AppState.customizer.blankType || "mug";
    const prod = AppState.customizer.products[blankKey];
    if (!prod) return;

    const sides = prod.sides || [
      { id: "front", label: "Front", sub: "Front side design", fee: 200, img: prod.frontImg || "assets/blank_tshirt_front.jpg" },
      { id: "back", label: "Back", sub: "Back side design", fee: 200, img: prod.backImg || "assets/blank_tshirt_back.jpg" }
    ];

    const currentSide = AppState.customizer.activeSide || sides[0].id;

    stack.innerHTML = sides.map(s => {
      const isActive = s.id === currentSide;
      let thumbImg = s.img;
      if (blankKey === "mug" && prod.mugVariants) {
        const vKey = AppState.customizer.mugColor || "green_white";
        const vObj = prod.mugVariants[vKey] || prod.mugVariants["white"];
        if (vObj) {
          if (s.id === "front") thumbImg = vObj.front || s.img;
          else if (s.id === "left") thumbImg = vObj.left || s.img;
          else if (s.id === "right") thumbImg = vObj.right || vObj.left || s.img;
        }
      }

      return \`
        <div class="print-side-card \${isActive ? 'active' : ''}" data-side="\${s.id}">
          <img src="\${thumbImg}" alt="\${s.label}" class="print-side-thumb" style="\${s.flip ? 'transform: scaleX(-1);' : ''}">
          <div class="print-side-info">
            <span class="print-side-name">\${s.label}</span>
            \${s.sub ? \`<span class="print-side-sub">\${s.sub}</span>\` : ''}
          </div>
          <span class="print-side-price">+Rs\${s.fee}.00</span>
        </div>
      \`;
    }).join("");

    // Attach click events to switch side
    stack.querySelectorAll(".print-side-card").forEach(card => {
      card.addEventListener("click", () => {
        const sideId = card.dataset.side;
        switchCustomizerSide(sideId);
      });
    });
  }

  // --- Breadcrumb Updater ---
  function updateBreadcrumb() {
    const crumbProd = document.getElementById("studio-crumb-product");
    const crumbSide = document.getElementById("studio-crumb-side");
    const blankKey = AppState.customizer.blankType || "mug";
    const prod = AppState.customizer.products[blankKey];

    if (crumbProd && prod) {
      crumbProd.textContent = prod.name;
    }

    if (crumbSide && prod) {
      const curSide = AppState.customizer.activeSide || "left";
      const sObj = (prod.sides || []).find(s => s.id === curSide);
      crumbSide.textContent = sObj ? sObj.label : curSide.toUpperCase();
    }
  }

  // --- Switch Customizer Side Function ---
  function switchCustomizerSide(newSide) {
    const blankKey = AppState.customizer.blankType || "mug";
    const prod = AppState.customizer.products[blankKey];
    if (!prod) return;

    AppState.customizer.activeSide = newSide;

    // Update Right Column Stack Active State
    renderPrintSidesStack();

    // Update Breadcrumb
    updateBreadcrumb();

    // Update Mockup Base Image
    const baseImg = document.getElementById("mockup-base-img");
    if (baseImg) {
      if (blankKey === "mug") {
        const vKey = AppState.customizer.mugColor || "green_white";
        const vObj = prod.mugVariants ? (prod.mugVariants[vKey] || prod.mugVariants["white"]) : null;
        if (vObj) {
          if (newSide === "left") {
            baseImg.src = vObj.left || "assets/ceeprinto_mug_green.jpg";
            baseImg.style.transform = "none";
          } else if (newSide === "right") {
            baseImg.src = vObj.right || vObj.left || "assets/ceeprinto_mug_green.jpg";
            baseImg.style.transform = "scaleX(-1)";
          } else if (newSide === "front") {
            baseImg.src = vObj.front || "assets/blank_mug_green_white_front.jpg";
            baseImg.style.transform = "none";
          } else {
            baseImg.src = vObj.front || "assets/blank_mug_green_white_front.jpg";
            baseImg.style.transform = "none";
          }
        }
      } else {
        baseImg.style.transform = "none";
        if (newSide === "back") {
          baseImg.src = prod.backImg || "assets/blank_tshirt_back.jpg";
        } else {
          baseImg.src = prod.frontImg || "assets/blank_tshirt_front.jpg";
        }
      }
    }

    // Apply Garment Color Tint for Apparel
    applyGarmentColor(AppState.customizer.color);

    // Update Printable Area Position
    updatePrintableArea();

    // Render Artwork & Text for this side
    renderSideContent(newSide);

    // Update Layers list
    updateLayersList();

    // Check Boundary Collision
    checkBoundaryCollision();

    // Update Pricing
    updateCustomizerPricing();
  }

  // --- Printable Area Positioning ---
  function updatePrintableArea() {
    const blankKey = AppState.customizer.blankType || "mug";
    const prod = AppState.customizer.products[blankKey];
    const printableArea = document.getElementById("printable-area");
    if (!prod || !printableArea) return;

    const side = AppState.customizer.activeSide || "left";
    const area = (prod.printArea && prod.printArea[side]) ? prod.printArea[side] : (prod.printArea ? prod.printArea.front : { top: "25%", left: "28%", width: "44%", height: "48%" });

    printableArea.style.top = area.top;
    printableArea.style.left = area.left;
    printableArea.style.width = area.width;
    printableArea.style.height = area.height;
  }

  // --- Garment Color Application ---
  function applyGarmentColor(colorName) {
    const prodId = AppState.customizer.blankType || "mug";
    const side = AppState.customizer.activeSide || "left";
    const tint = document.getElementById("mockup-color-tint");
    const baseImg = document.getElementById("mockup-base-img");

    if (baseImg) baseImg.style.filter = "none";

    // Mug variant photorealistic switching
    if (prodId === "mug") {
      const mugProd = AppState.customizer.products["mug"];
      const vKey = AppState.customizer.mugColor || "green_white";
      const vObj = mugProd && mugProd.mugVariants ? (mugProd.mugVariants[vKey] || mugProd.mugVariants["white"]) : null;

      if (vObj && baseImg) {
        if (side === "left") {
          baseImg.src = vObj.left || "assets/ceeprinto_mug_green.jpg";
          baseImg.style.transform = "none";
        } else if (side === "right") {
          baseImg.src = vObj.right || vObj.left || "assets/ceeprinto_mug_green.jpg";
          baseImg.style.transform = "scaleX(-1)";
        } else {
          baseImg.src = vObj.front || "assets/blank_mug_green_white_front.jpg";
          baseImg.style.transform = "none";
        }
      }
      if (tint) tint.style.opacity = "0";
      return;
    }

    // Non-mug garment color tint
    const cfg = COLOR_PALETTE[colorName] || COLOR_PALETTE["Pure White"];
    if (tint) {
      const clipRules = PRODUCT_CLIPS[prodId] || PRODUCT_CLIPS["white-tee"];
      const clipVal = clipRules[side === "back" ? "back" : "front"] || clipRules.front;
      tint.style.clipPath = clipVal;
      tint.style.webkitClipPath = clipVal;
      tint.style.backgroundColor = cfg.tintBg;
      tint.style.opacity = cfg.tintOpacity;
    }
  }

  // --- Draggable Handler with Out-of-Bounds Movement Support ---
  function makeDraggable(element, boundary, onMoveCallback) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    element.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".tool-icon-btn") || e.target.closest("button") || e.target.classList.contains("resize-handle")) return;

      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = element.offsetLeft;
      initialTop = element.offsetTop;

      element.setPointerCapture(e.pointerId);
      element.classList.add("is-dragging");
    });

    element.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Allow dragging partially outside the boundary so user experiences the boundary warning!
      const minLeft = -element.offsetWidth + 25;
      const maxLeft = boundary.clientWidth - 25;
      const minTop = -element.offsetHeight + 25;
      const maxTop = boundary.clientHeight - 25;

      newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
      newTop = Math.max(minTop, Math.min(newTop, maxTop));

      element.style.left = \`\${newLeft}px\`;
      element.style.top = \`\${newTop}px\`;

      if (onMoveCallback) onMoveCallback(newLeft, newTop);
      checkBoundaryCollision();
    });

    const stopDragging = (e) => {
      if (!isDragging) return;
      isDragging = false;
      element.classList.remove("is-dragging");
      try { element.releasePointerCapture(e.pointerId); } catch (_) {}
      checkBoundaryCollision();
      pushHistory();
    };

    element.addEventListener("pointerup", stopDragging);
    element.addEventListener("pointercancel", stopDragging);
  }

  const artworkDrag = document.getElementById("artwork-drag-container");
  const textDrag = document.getElementById("text-drag-container");
  const printableArea = document.getElementById("printable-area");

  if (artworkDrag && printableArea) {
    makeDraggable(artworkDrag, printableArea, (left, top) => {
      const side = AppState.customizer.activeSide || "left";
      if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
      AppState.customizer.sides[side].artLeft = left;
      AppState.customizer.sides[side].artTop = top;
    });
  }

  if (textDrag && printableArea) {
    makeDraggable(textDrag, printableArea, (left, top) => {
      const side = AppState.customizer.activeSide || "left";
      if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
      AppState.customizer.sides[side].textLeft = left;
      AppState.customizer.sides[side].textTop = top;
    });
  }

  // --- Artwork Resizing Handlers ---
  const sizeSlider = document.getElementById("artwork-size-slider");
  const sizeLabel = document.getElementById("artwork-size-label");

  function setArtworkSize(newSize) {
    if (!artworkDrag) return;
    const clampedSize = Math.max(60, Math.min(320, Math.round(newSize)));
    const side = AppState.customizer.activeSide || "left";
    if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
    AppState.customizer.sides[side].artWidth = clampedSize;
    AppState.customizer.sides[side].artHeight = clampedSize;

    artworkDrag.style.width = \`\${clampedSize}px\`;
    artworkDrag.style.height = \`\${clampedSize}px\`;

    if (sizeSlider) sizeSlider.value = clampedSize;
    if (sizeLabel) sizeLabel.textContent = \`\${clampedSize}px\`;

    checkBoundaryCollision();
  }

  if (sizeSlider) {
    sizeSlider.addEventListener("input", (e) => {
      setArtworkSize(parseInt(e.target.value));
    });
    sizeSlider.addEventListener("change", () => {
      pushHistory();
    });
  }

  const scalePlusBtns = [document.getElementById("controls-scale-up"), document.getElementById("art-scale-up")];
  const scaleMinusBtns = [document.getElementById("controls-scale-down"), document.getElementById("art-scale-down")];

  scalePlusBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const side = AppState.customizer.activeSide || "left";
        const curW = (AppState.customizer.sides[side] && AppState.customizer.sides[side].artWidth) || 140;
        setArtworkSize(curW + 25);
        pushHistory();
      });
    }
  });

  scaleMinusBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const side = AppState.customizer.activeSide || "left";
        const curW = (AppState.customizer.sides[side] && AppState.customizer.sides[side].artWidth) || 140;
        setArtworkSize(curW - 25);
        pushHistory();
      });
    }
  });

  // Corner Resize Handle
  const resizeHandle = document.getElementById("artwork-resize-handle");
  if (resizeHandle && artworkDrag) {
    let isResizing = false;
    let initialW = 140, initialPointerX = 0;

    resizeHandle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;
      initialPointerX = e.clientX;
      initialW = artworkDrag.offsetWidth;
      resizeHandle.setPointerCapture(e.pointerId);
    });

    resizeHandle.addEventListener("pointermove", (e) => {
      if (!isResizing) return;
      e.preventDefault();
      e.stopPropagation();
      const delta = e.clientX - initialPointerX;
      setArtworkSize(initialW + delta);
    });

    const stopResizing = (e) => {
      if (!isResizing) return;
      isResizing = false;
      try { resizeHandle.releasePointerCapture(e.pointerId); } catch (_) {}
      pushHistory();
    };

    resizeHandle.addEventListener("pointerup", stopResizing);
    resizeHandle.addEventListener("pointercancel", stopResizing);
  }

  // --- Render Content for Active Side ---
  const artworkPreview = document.getElementById("custom-artwork-preview");
  const textPreview = document.getElementById("custom-text-preview");
  const textInput = document.getElementById("custom-text-input");
  const textColorInput = document.getElementById("custom-text-color");
  const textSizeSlider = document.getElementById("custom-text-size-slider");
  const textSizeLabel = document.getElementById("text-size-label");

  function renderSideContent(side) {
    const data = AppState.customizer.sides[side] || {};
    const activeControls = document.getElementById("active-image-controls");
    const activeLabel = document.getElementById("active-image-name-label");

    // Artwork Rendering
    if (data.artworkSrc && artworkPreview && artworkDrag) {
      artworkPreview.src = data.artworkSrc;
      artworkDrag.style.display = "flex";
      artworkDrag.style.left = typeof data.artLeft === "number" ? \`\${data.artLeft}px\` : (data.artLeft || "20px");
      artworkDrag.style.top = typeof data.artTop === "number" ? \`\${data.artTop}px\` : (data.artTop || "20px");
      setArtworkSize(data.artWidth || 140);
      if (activeControls) activeControls.style.display = "block";
      if (activeLabel) activeLabel.textContent = \`🖼️ \${data.artworkName || 'Custom Artwork'}\`;
    } else {
      if (artworkDrag) artworkDrag.style.display = "none";
      if (artworkPreview) artworkPreview.src = "";
      if (activeControls) activeControls.style.display = "none";
    }

    // Text Rendering
    if (data.text && textPreview && textDrag) {
      textPreview.textContent = data.text;
      textPreview.style.color = data.textColor || "#000000";
      textPreview.style.fontSize = \`\${data.textSize || 18}px\`;
      textDrag.style.display = "flex";
      textDrag.style.left = typeof data.textLeft === "number" ? \`\${data.textLeft}px\` : (data.textLeft || "20px");
      textDrag.style.top = typeof data.textTop === "number" ? \`\${data.textTop}px\` : (data.textTop || "60px");
      if (textInput) textInput.value = data.text;
      if (textColorInput) textColorInput.value = data.textColor || "#000000";
      if (textSizeSlider) textSizeSlider.value = data.textSize || 18;
      if (textSizeLabel) textSizeLabel.textContent = \`\${data.textSize || 18}px\`;
    } else {
      if (textDrag) textDrag.style.display = "none";
      if (textPreview) textPreview.textContent = "";
      if (textInput) textInput.value = "";
    }
  }

  // --- Activate Artwork on Active Side ---
  function activateArtworkForActiveSide(src, name) {
    const side = AppState.customizer.activeSide || "left";
    if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
    AppState.customizer.sides[side].artworkSrc = src;
    AppState.customizer.sides[side].artworkName = name;
    AppState.customizer.sides[side].artWidth = 140;
    AppState.customizer.sides[side].artHeight = 140;
    AppState.customizer.sides[side].artLeft = 20;
    AppState.customizer.sides[side].artTop = 20;

    renderSideContent(side);
    updateLayersList();
    checkBoundaryCollision();
    updateCustomizerPricing();
    pushHistory();
    showToast(\`\${name} apply ho gaya!\`);
  }

  // Upload custom picture from PC
  const uploadDropzone = document.getElementById("upload-dropzone");
  const fileInput = document.getElementById("custom-image-input");

  if (uploadDropzone && fileInput) {
    uploadDropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          activateArtworkForActiveSide(evt.target.result, file.name);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Ready Graphic Designs Picker
  const readyThumbs = document.querySelectorAll(".ready-design-thumb");
  readyThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      readyThumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      activateArtworkForActiveSide(thumb.dataset.designSrc, thumb.dataset.designName);
    });
  });

  // Delete Artwork from Active Side
  function deleteArtworkForActiveSide() {
    const side = AppState.customizer.activeSide || "left";
    if (AppState.customizer.sides[side]) {
      AppState.customizer.sides[side].artworkSrc = null;
      AppState.customizer.sides[side].artworkName = "";
    }
    if (fileInput) fileInput.value = "";
    readyThumbs.forEach(t => t.classList.remove("active"));
    renderSideContent(side);
    updateLayersList();
    checkBoundaryCollision();
    updateCustomizerPricing();
    pushHistory();
    showToast("Photo delete ho gaya!");
  }

  const artDelBtn = document.getElementById("art-delete-btn");
  const controlsDelArtBtn = document.getElementById("controls-del-art-btn");
  if (artDelBtn) artDelBtn.addEventListener("click", (e) => { e.stopPropagation(); deleteArtworkForActiveSide(); });
  if (controlsDelArtBtn) controlsDelArtBtn.addEventListener("click", (e) => { e.stopPropagation(); deleteArtworkForActiveSide(); });

  // --- Text Handlers ---
  if (textInput && textPreview && textDrag) {
    textInput.addEventListener("input", (e) => {
      const val = e.target.value;
      const side = AppState.customizer.activeSide || "left";
      if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
      AppState.customizer.sides[side].text = val;

      if (val.trim()) {
        textPreview.textContent = val;
        textDrag.style.display = "flex";
      } else {
        textDrag.style.display = "none";
      }
      updateLayersList();
      checkBoundaryCollision();
      updateCustomizerPricing();
    });

    textInput.addEventListener("change", () => {
      pushHistory();
    });

    if (textColorInput) {
      textColorInput.addEventListener("input", (e) => {
        const side = AppState.customizer.activeSide || "left";
        if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
        AppState.customizer.sides[side].textColor = e.target.value;
        textPreview.style.color = e.target.value;
        updateLayersList();
      });
      textColorInput.addEventListener("change", () => pushHistory());
    }

    if (textSizeSlider) {
      textSizeSlider.addEventListener("input", (e) => {
        const side = AppState.customizer.activeSide || "left";
        if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
        AppState.customizer.sides[side].textSize = e.target.value;
        textPreview.style.fontSize = \`\${e.target.value}px\`;
        if (textSizeLabel) textSizeLabel.textContent = \`\${e.target.value}px\`;
        checkBoundaryCollision();
      });
      textSizeSlider.addEventListener("change", () => pushHistory());
    }
  }

  // Delete Text from Active Side
  function deleteCustomTextForActiveSide() {
    const side = AppState.customizer.activeSide || "left";
    if (AppState.customizer.sides[side]) {
      AppState.customizer.sides[side].text = "";
    }
    if (textDrag) textDrag.style.display = "none";
    if (textPreview) textPreview.textContent = "";
    if (textInput) textInput.value = "";
    updateLayersList();
    checkBoundaryCollision();
    updateCustomizerPricing();
    pushHistory();
    showToast("Text delete ho gaya!");
  }

  const textDelBtn = document.getElementById("text-delete-btn");
  const controlsDelTextBtn = document.getElementById("controls-del-text-btn");
  if (textDelBtn) textDelBtn.addEventListener("click", (e) => { e.stopPropagation(); deleteCustomTextForActiveSide(); });
  if (controlsDelTextBtn) controlsDelTextBtn.addEventListener("click", (e) => { e.stopPropagation(); deleteCustomTextForActiveSide(); });

  // --- Dynamic Color Dots Renderer ---
  function renderCustomizerColors(blankKey) {
    const colorContainer = document.getElementById("customizer-color-dots");
    const colorLabel = document.getElementById("customizer-color-label");
    if (!colorContainer) return;

    const colors = CEEPRINTO_PRODUCT_COLORS[blankKey] || CEEPRINTO_PRODUCT_COLORS["mug"];
    colorContainer.innerHTML = "";

    const hasCurrent = colors.some(c => c.name === AppState.customizer.color);
    if (!hasCurrent) {
      AppState.customizer.color = colors[0].name;
    }
    if (colorLabel) colorLabel.textContent = AppState.customizer.color;

    colors.forEach(c => {
      const dot = document.createElement("div");
      dot.className = \`color-dot \${c.name === AppState.customizer.color ? 'active' : ''}\`;
      dot.dataset.color = c.name;
      dot.title = c.label || c.name;
      dot.style.background = c.hex;
      dot.style.width = "28px";
      dot.style.height = "28px";
      dot.style.borderRadius = "50%";
      dot.style.cursor = "pointer";
      dot.style.transition = "all 0.2s ease";
      dot.style.border = c.name === AppState.customizer.color ? "2.5px solid #0f172a" : (c.border ? \`1.5px solid \${c.border}\` : "1.5px solid #cbd5e1");

      dot.addEventListener("click", () => {
        colorContainer.querySelectorAll(".color-dot").forEach(d => {
          d.classList.remove("active");
          const cObj = colors.find(x => x.name === d.dataset.color);
          d.style.border = cObj && cObj.border ? \`1.5px solid \${cObj.border}\` : "1.5px solid #cbd5e1";
        });
        dot.classList.add("active");
        dot.style.border = "2.5px solid #0f172a";

        AppState.customizer.color = c.name;
        if (colorLabel) colorLabel.textContent = c.label || c.name;

        if (blankKey === "mug" && c.mugVariant) {
          AppState.customizer.mugColor = c.mugVariant;
          const mugProd = AppState.customizer.products["mug"];
          const vObj = mugProd && mugProd.mugVariants ? mugProd.mugVariants[c.mugVariant] : null;
          if (vObj) {
            AppState.customizer.baseCost = vObj.cost;
          }
        }

        applyGarmentColor(c.name);
        renderPrintSidesStack();
        updateCustomizerPricing();
        showToast(\`Color: \${c.label || c.name}\`);
      });

      colorContainer.appendChild(dot);
    });
  }

  // --- Dynamic Size Pills Renderer ---
  function renderCustomizerSizePills(blankKey) {
    const pillsContainer = document.getElementById("customizer-size-pills");
    if (!pillsContainer) return;
    const prod = AppState.customizer.products[blankKey];
    const sizes = (prod && prod.sizes) ? prod.sizes : ["11 oz Standard"];
    AppState.customizer.size = sizes[0];
    pillsContainer.innerHTML = sizes.map((s, idx) => \`
      <button type="button" class="size-pill \${idx === 0 ? 'active' : ''}" data-size="\${s}">\${s}</button>
    \`).join('');

    pillsContainer.querySelectorAll(".size-pill").forEach(pBtn => {
      pBtn.addEventListener("click", () => {
        pillsContainer.querySelectorAll(".size-pill").forEach(b => b.classList.remove("active"));
        pBtn.classList.add("active");
        AppState.customizer.size = pBtn.dataset.size;
      });
    });
  }

  // --- Change Product Modal Handlers ---
  const btnOpenChangeProd = document.getElementById("btn-open-change-prod");
  const changeProdModal = document.getElementById("change-product-modal-overlay");
  const closeChangeProdModalBtn = document.getElementById("close-change-prod-modal-btn");

  if (btnOpenChangeProd && changeProdModal) {
    btnOpenChangeProd.addEventListener("click", () => {
      changeProdModal.classList.add("active");
    });
  }

  if (closeChangeProdModalBtn && changeProdModal) {
    closeChangeProdModalBtn.addEventListener("click", () => {
      changeProdModal.classList.remove("active");
    });
  }

  if (changeProdModal) {
    changeProdModal.addEventListener("click", (e) => {
      if (e.target === changeProdModal) {
        changeProdModal.classList.remove("active");
      }
    });

    changeProdModal.querySelectorAll(".change-prod-card").forEach(card => {
      card.addEventListener("click", () => {
        const blankKey = card.dataset.blank;
        const prod = AppState.customizer.products[blankKey];
        if (!prod) return;

        AppState.customizer.blankType = blankKey;
        AppState.customizer.blankName = prod.name;
        AppState.customizer.baseCost = prod.baseCost;

        const defaultSide = blankKey === "mug" ? "left" : "front";
        AppState.customizer.activeSide = defaultSide;

        // Update left column product card
        const nameEl = document.getElementById("customizer-selected-name");
        if (nameEl) nameEl.textContent = prod.name;

        // Render dynamic sizes, colors, print sides
        renderCustomizerSizePills(blankKey);
        renderCustomizerColors(blankKey);
        renderPrintSidesStack();
        updateBreadcrumb();

        // Switch side and update canvas
        switchCustomizerSide(defaultSide);

        changeProdModal.classList.remove("active");
        showToast(\`\${prod.name} select ho gaya!\`);
      });
    });
  }

  // --- Reset All Canvas Sides ---
  const clearAllBtn = document.getElementById("customizer-clear-all-btn");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      Object.keys(AppState.customizer.sides).forEach(s => {
        AppState.customizer.sides[s].artworkSrc = null;
        AppState.customizer.sides[s].artworkName = "";
        AppState.customizer.sides[s].text = "";
      });
      if (fileInput) fileInput.value = "";
      readyThumbs.forEach(t => t.classList.remove("active"));
      renderSideContent(AppState.customizer.activeSide);
      updateLayersList();
      checkBoundaryCollision();
      updateCustomizerPricing();
      pushHistory();
      showToast("Design reset ho gaya!");
    });
  }

  // --- Add to Cart with Boundary Collision Validation ---
  const addCustomBtn = document.getElementById("btn-add-custom-to-cart");
  if (addCustomBtn) {
    addCustomBtn.addEventListener("click", () => {
      // 1. Boundary check: Prevent adding to cart if design is out-of-bounds!
      const isOut = checkBoundaryCollision();
      if (isOut) {
        showToast("⚠️ Error: Design printable area se bahar hai! Barah-e-karam design ko red box ke andar rakhein.", "error");
        const canvasCard = document.querySelector(".studio-canvas-card");
        if (canvasCard) {
          canvasCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      // 2. Check if at least one side has artwork or text
      const sides = AppState.customizer.sides;
      let hasAnyDesign = false;
      Object.keys(sides).forEach(k => {
        if (sides[k].artworkSrc || (sides[k].text && sides[k].text.trim().length > 0)) {
          hasAnyDesign = true;
        }
      });

      if (!hasAnyDesign) {
        showToast("Barah-e-karam customizer mein koi photo ya text design karein!");
        return;
      }

      // 3. Assemble Custom Cart Item
      const blankKey = AppState.customizer.blankType || "mug";
      const prod = AppState.customizer.products[blankKey];
      const activeSide = AppState.customizer.activeSide || "left";
      const activeSideData = sides[activeSide] || {};

      let baseImgSrc = prod.frontImg || "assets/blank_tshirt_front.jpg";
      let selectedItemColor = AppState.customizer.color;

      if (blankKey === "mug") {
        const vKey = AppState.customizer.mugColor || "green_white";
        const vObj = prod.mugVariants ? (prod.mugVariants[vKey] || prod.mugVariants["white"]) : null;
        baseImgSrc = vObj ? (vObj.left || vObj.front) : "assets/ceeprinto_mug_green.jpg";
        selectedItemColor = vObj ? vObj.name : "Green & White";
      }

      const previewImg = activeSideData.artworkSrc || baseImgSrc;
      const customCat = prod.category || mapBlankToCategory(blankKey);

      let totalSideFees = 0;
      (prod.sides || []).forEach(s => {
        const sData = sides[s.id];
        if (sData && (sData.artworkSrc || (sData.text && sData.text.trim().length > 0))) {
          totalSideFees += (s.fee || 200);
        }
      });

      const unitPrice = AppState.customizer.price + totalSideFees;
      const qty = AppState.customizer.qty || 1;

      const customItem = {
        cartKey: \`custom-\${Date.now()}\`,
        id: \`custom-\${blankKey}\`,
        category: customCat,
        name: \`Custom \${prod.name}\`,
        price: unitPrice,
        baseCost: AppState.customizer.baseCost + totalSideFees,
        profit: getCategoryProfit(customCat, "half_advance"),
        image: previewImg,
        size: AppState.customizer.size,
        color: selectedItemColor,
        blankSku: \`CUSTOM-\${blankKey.toUpperCase()}\`,
        qty: qty,
        isCustom: true,
        customSides: JSON.parse(JSON.stringify(AppState.customizer.sides))
      };

      AppState.cart.push(customItem);
      saveCart();
      updateCartUI();
      openCartDrawer();
      showToast(\`Custom \${prod.name} (\${qty}x) bag mein add ho gaya!\`);
    });
  }

  // --- Initial Studio Execution ---
  renderCustomizerSizePills("mug");
  renderCustomizerColors("mug");
  renderPrintSidesStack();
  updateBreadcrumb();
  switchCustomizerSide("left");
  pushHistory();

  // Expose global helper for loading ready design onto specific side
  window.loadReadyDesignIntoCustomizer = function(designName, designImg, targetSide) {
    const customizerSection = document.getElementById("customizer-studio");
    if (customizerSection) {
      customizerSection.scrollIntoView({ behavior: "smooth" });
    }
    const side = targetSide || AppState.customizer.activeSide || "left";
    switchCustomizerSide(side);
    activateArtworkForActiveSide(designImg, designName);
    switchStudioTab("images");
  };
}
`;

// Replace from '// 6. DRAGGABLE & DELETABLE DUAL-SIDED CUSTOMIZER STUDIO ENGINE' to '// 7. CART OPERATIONS'
const engineRegex = /\/\/ 6\. DRAGGABLE & DELETABLE DUAL-SIDED CUSTOMIZER STUDIO ENGINE[\s\S]*?(?=\/\/ 7\. CART OPERATIONS)/;
if (engineRegex.test(content)) {
  content = content.replace(engineRegex, `${engineCode}\n`);
  console.log("setupCustomizerStudio engine successfully replaced!");
} else {
  console.error("Failed to find setupCustomizerStudio block!");
}

fs.writeFileSync(appJsPath, content, 'utf8');
console.log("Done updating app.js!");
