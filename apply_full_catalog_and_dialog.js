const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. Full 18-product catalog
const newProductsCode = `// 1. COMPLETE 18-PRODUCT CATALOG (PAKISTAN CEEPRINTO FULFILLMENT READY)
// Covering: T-Shirts, Hoodies, Cups/Mugs, Caps, and Bags with Multi-Angle Previews & Rich Colors
const PRODUCTS = [
  // --- 1. T-SHIRTS (tees) ---
  {
    id: "prod-tee-classic",
    name: "Unisex Regular White T-Shirt (210 GSM Combed Cotton)",
    category: "tees",
    categoryName: "Standard Crewneck Tee",
    baseCost: 850,
    profit: 800,
    retailPrice: 1650,
    image: "assets/blank_tshirt_front.jpg",
    blankSku: "CP-TEE-REGULAR-WHT-210GSM",
    blankKey: "white-tee",
    description: "210 GSM super combed cotton regular cut tee with reinforced collar ribbing, ultra-soft feel, and breathable weave.",
    angles: [
      { id: "front", label: "Front Angle", icon: "👁️", image: "assets/blank_tshirt_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Heather Grey", hex: "#9ca3af" },
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Maroon", hex: "#800020" },
      { name: "Beige", hex: "#d4b996" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-tee-tokyo",
    name: "Neo-Tokyo Shadow Corps Streetwear Graphic Tee (240 GSM)",
    category: "tees",
    categoryName: "Streetwear Graphic Tee",
    baseCost: 990,
    profit: 800,
    retailPrice: 1790,
    image: "assets/product1.jpg",
    blankSku: "CP-TEE-OVERSIZED-BLK-240GSM",
    blankKey: "white-tee",
    description: "240 GSM heavy combed cotton. Relaxed streetwear drop-shoulder cut with vibrant cyberpunk mecha chest print.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/product1.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-tee-urban",
    name: "Urban Archives Minimalist Vintage Cream Tee",
    category: "tees",
    categoryName: "Vintage Minimalist Tee",
    baseCost: 950,
    profit: 800,
    retailPrice: 1750,
    image: "assets/product2.jpg",
    blankSku: "CP-TEE-PURECOTTON-CRM-220GSM",
    blankKey: "white-tee",
    description: "Warm bone-cream luxury aesthetic. High-definition bold typography editorial badge with technical barcode print.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/product2.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Bone Cream", hex: "#f5f0eb" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-tee-vintage-rock",
    name: "Nighthawks '92 Vintage Tour Acid-Wash Tee",
    category: "tees",
    categoryName: "Vintage Heavyweight Graphic Tee",
    baseCost: 990,
    profit: 800,
    retailPrice: 1790,
    image: "assets/product4.jpg",
    blankSku: "CP-TEE-VINTAGE-ACIDWASH-240GSM",
    blankKey: "white-tee",
    description: "240 GSM mineral acid-wash vintage streetwear cut with distressed rock tour concert eagle graphics.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/product4.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Washed Black", hex: "#1f2937" },
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Vintage Navy", hex: "#1e293b" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },

  // --- 2. HOODIES (hoodies) ---
  {
    id: "prod-hoodie-fleece",
    name: "Unisex Heavyweight Fleece Streetwear Hoodie (380 GSM)",
    category: "hoodies",
    categoryName: "Heavyweight Fleece Hoodie",
    baseCost: 2100,
    profit: 800,
    retailPrice: 2900,
    image: "assets/product3.jpg",
    blankSku: "CP-HOODIE-HEAVYFLEECE-BLK-380GSM",
    blankKey: "hoodie",
    description: "380 GSM fleece interior. Double-layered warm hood, kangaroo pouch, metal-tipped drawstrings, and high-definition DTF print.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/product3.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#6b7280" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Maroon", hex: "#800020" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Beige", hex: "#d4b996" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-hoodie-minimal",
    name: "Nocturnal Heavyweight Core Minimalist Hoodie",
    category: "hoodies",
    categoryName: "Core Minimalist Hoodie",
    baseCost: 2100,
    profit: 800,
    retailPrice: 2900,
    image: "assets/blank_hoodie_front.jpg",
    blankSku: "CP-HOODIE-CORE-MINIMAL",
    blankKey: "hoodie",
    description: "Clean aesthetic tone-on-tone minimal streetwear fleece hoodie. Perfect base for custom sleeve, chest, and back graphic placements.",
    angles: [
      { id: "front", label: "Front Angle", icon: "🧥", image: "assets/blank_hoodie_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Forest Green", hex: "#14532d" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-hoodie-karachi",
    name: "Karachi Coastal Midnight Heavyweight Streetwear Hoodie",
    category: "hoodies",
    categoryName: "City Streetwear Series",
    baseCost: 2150,
    profit: 800,
    retailPrice: 2950,
    image: "assets/blank_hoodie_front.jpg",
    blankSku: "CP-HOODIE-KHI-MIDNIGHT-380GSM",
    blankKey: "hoodie",
    description: "Signature streetwear fleece silhouette inspired by Karachi night aesthetics. Deep ribbed cuffs, kangaroo pouch, and pre-shrunk warmth.",
    angles: [
      { id: "front", label: "Front Angle", icon: "🧥", image: "assets/blank_hoodie_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Midnight Black", hex: "#0b0c10" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Heather Grey", hex: "#6b7280" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-hoodie-lahore",
    name: "Lahore Heritage Drop-Shoulder Oversized Hoodie",
    category: "hoodies",
    categoryName: "Heritage Streetwear Series",
    baseCost: 2150,
    profit: 800,
    retailPrice: 2950,
    image: "assets/blank_hoodie_front.jpg",
    blankSku: "CP-HOODIE-LHR-HERITAGE-380GSM",
    blankKey: "hoodie",
    description: "Relaxed drop-shoulder oversized streetwear fit with warm brushed fleece interior. Ideal for seasonal layering.",
    angles: [
      { id: "front", label: "Front Angle", icon: "🧥", image: "assets/blank_hoodie_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Sand Beige", hex: "#d4b996" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Maroon", hex: "#800020" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },

  // --- 3. CUPS & MUGS (mugs) ---
  {
    id: "prod-mug-pure-white",
    name: "Pure White Glossy Ceramic Coffee Mug / Cup (11oz)",
    category: "mugs",
    categoryName: "Ceramic Drinkware (11oz)",
    baseCost: 550,
    profit: 800,
    retailPrice: 1350,
    image: "assets/ceeprinto_mug_white.jpg",
    blankSku: "CP-MUG-CERAMIC-WHT-11OZ",
    blankKey: "mug",
    mugColor: "white",
    description: "Grade-A high-gloss pure white ceramic coffee mug. Microwave and dishwasher safe with permanent 360 wrap sublimation print.",
    angles: [
      { id: "front", label: "Front Center View", icon: "👁️", image: "assets/ceeprinto_mug_white.jpg" },
      { id: "left", label: "Left View", icon: "☕", image: "assets/blank_mug_front.jpg" },
      { id: "right", label: "Right View", icon: "🔄", image: "assets/blank_mug_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff", imageOverride: "assets/ceeprinto_mug_white.jpg" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-green-white",
    name: "Two-Tone Emerald Green & White Ceramic Mug (11oz)",
    category: "mugs",
    categoryName: "Two-Tone Ceramic Drinkware",
    baseCost: 600,
    profit: 800,
    retailPrice: 1400,
    image: "assets/mug_green_clean_left.jpg",
    blankSku: "CP-MUG-TWOTONE-GRN-11OZ",
    blankKey: "mug",
    mugColor: "green_white",
    description: "Grade-A ceramic two-tone mug. Features vivid emerald green inner glazed rim and matching handle with pure white exterior body.",
    angles: [
      { id: "left", label: "Left Handle View", icon: "☕", image: "assets/mug_green_clean_left.jpg" },
      { id: "front", label: "Front Center View", icon: "👁️", image: "assets/blank_mug_green_white_front.jpg" },
      { id: "right", label: "Right Handle View", icon: "🔄", image: "assets/blank_mug_green_white_back.jpg" }
    ],
    colors: [
      { name: "Green & White", hex: "#16a34a", imageOverride: "assets/mug_green_clean_left.jpg" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-red-white",
    name: "Two-Tone Crimson Red & White Ceramic Mug (11oz)",
    category: "mugs",
    categoryName: "Two-Tone Ceramic Drinkware",
    baseCost: 600,
    profit: 800,
    retailPrice: 1400,
    image: "assets/ceeprinto_mug_red.jpg",
    blankSku: "CP-MUG-TWOTONE-RED-11OZ",
    blankKey: "mug",
    mugColor: "red_white",
    description: "Grade-A ceramic two-tone mug. Features vivid crimson red inner rim and red handle with pure white exterior body for vibrant sublimation prints.",
    angles: [
      { id: "left", label: "Left Handle View", icon: "☕", image: "assets/ceeprinto_mug_red.jpg" },
      { id: "front", label: "Front Center View", icon: "👁️", image: "assets/blank_mug_red_white_front.jpg" },
      { id: "right", label: "Right Handle View", icon: "🔄", image: "assets/blank_mug_red_white_back.jpg" }
    ],
    colors: [
      { name: "Red & White", hex: "#dc2626", imageOverride: "assets/ceeprinto_mug_red.jpg" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-black-white",
    name: "Two-Tone Onyx Black & White Ceramic Mug (11oz)",
    category: "mugs",
    categoryName: "Two-Tone Ceramic Drinkware",
    baseCost: 600,
    profit: 800,
    retailPrice: 1400,
    image: "assets/ceeprinto_mug_black.jpg",
    blankSku: "CP-MUG-TWOTONE-BLK-11OZ",
    blankKey: "mug",
    mugColor: "black_white",
    description: "Grade-A ceramic two-tone mug. Onyx black interior rim and glossy handle with bright white body for high contrast graphics.",
    angles: [
      { id: "left", label: "Left Handle View", icon: "☕", image: "assets/ceeprinto_mug_black.jpg" },
      { id: "front", label: "Front Center View", icon: "👁️", image: "assets/blank_mug_black_white_front.jpg" },
      { id: "right", label: "Right Handle View", icon: "🔄", image: "assets/blank_mug_black_white_back.jpg" }
    ],
    colors: [
      { name: "Black & White", hex: "#111216", imageOverride: "assets/ceeprinto_mug_black.jpg" },
      { name: "Solid Black", hex: "#000000", imageOverride: "assets/blank_mug_black_front.jpg" }
    ],
    sizes: ["11 oz Standard"]
  },

  // --- 4. CAPS (caps) ---
  {
    id: "prod-cap-classic",
    name: "Structured Minimalist Cotton Baseball Cap",
    category: "caps",
    categoryName: "Embroidered Headwear",
    baseCost: 650,
    profit: 800,
    retailPrice: 1450,
    image: "assets/blank_cap_front.jpg",
    blankSku: "CP-CAP-COTTON-BLK-STRUCTURED",
    blankKey: "cap",
    description: "100% brushed cotton twill with pre-curved visor, breathable eyelets, and adjustable brass buckle strap.",
    angles: [
      { id: "front", label: "Front Crown View", icon: "🧢", image: "assets/blank_cap_front.jpg" },
      { id: "profile", label: "3/4 Profile View", icon: "📐", image: "assets/product_cap.jpg" },
      { id: "back", label: "Back Strap View", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Stone Khaki", hex: "#d6cfc7" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["Adjustable Brass Buckle"]
  },
  {
    id: "prod-cap-mountain",
    name: "Alpine Peak Embroidered Curved Visor Cap",
    category: "caps",
    categoryName: "Designer Embroidered Cap",
    baseCost: 750,
    profit: 800,
    retailPrice: 1550,
    image: "assets/product_cap.jpg",
    blankSku: "CP-CAP-ALPINE-EMBROIDERED",
    blankKey: "cap",
    description: "High-density geometric alpine peak white thread embroidery on heavy brushed cotton with pre-curved brim.",
    angles: [
      { id: "profile", label: "3/4 Embroidered Angle", icon: "📐", image: "assets/product_cap.jpg" },
      { id: "front", label: "Front Crown View", icon: "🧢", image: "assets/blank_cap_front.jpg" },
      { id: "back", label: "Back Strap View", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Stone Khaki", hex: "#d6cfc7" }
    ],
    sizes: ["Adjustable Brass Buckle"]
  },
  {
    id: "prod-cap-blank",
    name: "Classic 6-Panel Buckram Cap for Custom Embroidery",
    category: "caps",
    categoryName: "Custom Headwear Blank",
    baseCost: 650,
    profit: 800,
    retailPrice: 1450,
    image: "assets/blank_cap_front.jpg",
    blankSku: "CP-CAP-BLANK-BASEBALL",
    blankKey: "cap",
    description: "6-panel classic crown baseball cap with reinforced front buckram, ready for custom logo prints or embroidery.",
    angles: [
      { id: "front", label: "Front Crown View", icon: "🧢", image: "assets/blank_cap_front.jpg" },
      { id: "back", label: "Back Strap View", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Crimson Red", hex: "#dc2626" }
    ],
    sizes: ["Adjustable Brass Buckle"]
  },

  // --- 5. BAGS & ACCESSORIES (laptop-bags / diaries) ---
  {
    id: "prod-laptop-bag-padded",
    name: "Padded Executive Waterproof Laptop Bag (15.6\\\")",
    category: "laptop-bags",
    categoryName: "Executive Laptop Accessories",
    baseCost: 1400,
    profit: 800,
    retailPrice: 2200,
    image: "assets/blank_laptop_bag_front.jpg",
    blankSku: "CP-BAG-LAPTOP-PADDED-15INCH",
    blankKey: "laptop-bag",
    description: "Heavy duty 360° padded foam laptop case briefcase with water-resistant shell, trolley sleeve, dual handles, and internal cable pockets.",
    angles: [
      { id: "front", label: "Front Briefcase View", icon: "💼", image: "assets/blank_laptop_bag_front.jpg" },
      { id: "back", label: "Back Trolley Strap View", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Slate Grey", hex: "#475569" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["13.3 - 14 Inch", "15.6 Inch Standard", "16 Inch Pro"]
  },
  {
    id: "prod-tote-canvas",
    name: "Heavyweight 100% Cotton Canvas Handcrafted Everyday Tote Bag",
    category: "laptop-bags",
    categoryName: "Eco Canvas Accessories",
    baseCost: 750,
    profit: 800,
    retailPrice: 1550,
    image: "assets/product_tote.jpg",
    blankSku: "CP-BAG-TOTE-HEAVYCANVAS-12OZ",
    blankKey: "laptop-bag",
    description: "12 oz heavyweight unbleached cotton canvas with reinforced handles and interior utility drop pocket. Durable, washable, and stylish.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👜", image: "assets/product_tote.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tote_back.jpg" }
    ],
    colors: [
      { name: "Natural Bone Canvas", hex: "#f5f0eb" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["Standard 15x16 Inch"]
  },
  {
    id: "prod-notebook-executive",
    name: "Executive Hardcover Ruled Journal Diary / Notebook (A5)",
    category: "diaries",
    categoryName: "Executive Stationery",
    baseCost: 650,
    profit: 800,
    retailPrice: 1450,
    image: "assets/blank_notebook_front.jpg",
    blankSku: "CP-BOOK-HARDCOVER-RULED-A5",
    blankKey: "notebook",
    description: "192 numbered pages of 100 GSM acid-free ivory paper. Premium vegan leatherette hardcover with ribbon bookmark and elastic closure band.",
    angles: [
      { id: "front", label: "Front Cover View", icon: "📓", image: "assets/blank_notebook_front.jpg" },
      { id: "back", label: "Back Elastic Band View", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Classic Black", hex: "#111216" },
      { name: "Royal Navy Blue", hex: "#1e3a8a" },
      { name: "Bottle Green", hex: "#166534" },
      { name: "Tan Brown", hex: "#92400e" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"]
  }
];`;

// Replace PRODUCTS array in app.js
const pStart = code.indexOf('// 1. COMPLETE CEEPRINTO PRODUCT CATALOG');
const pEnd = code.indexOf('// 2. CEEPRINTO API CLIENT CONFIGURATION');

if (pStart !== -1 && pEnd !== -1) {
  code = code.substring(0, pStart) + newProductsCode + '\n\n' + code.substring(pEnd);
} else {
  console.log('Error finding PRODUCTS bounds');
}

// 2. Update renderProductCard to include clickable dialog and view angles button
const newRenderCard = `function renderProductCard(product) {
  const currentVariant = AppState.selectedVariants[product.id] || {
    size: product.sizes[0],
    color: product.colors[0].name
  };

  const angleCount = (product.angles && product.angles.length) || 1;

  return \`
    <article class="product-card" id="card-\${product.id}">
      <div class="product-thumb-wrapper" onclick="openProductDialog('\${product.id}')" style="cursor: pointer;">
        <img src="\${product.image}" alt="\${product.name}" class="product-img" loading="lazy">
        <span class="badge-float" style="cursor: pointer;">👁️ \${angleCount} Angles</span>
      </div>

      <div class="product-info">
        <span class="product-category">\${product.categoryName}</span>
        <h3 class="product-name" onclick="openProductDialog('\${product.id}')" style="cursor: pointer;">\${product.name}</h3>
        
        <div class="product-pricing">
          <span class="retail-price">Rs. \${product.retailPrice.toLocaleString()}</span>
        </div>

        <!-- Color Swatches Row -->
        <div class="picker-row">
          <div class="picker-label">Color: <span>\${currentVariant.color}</span></div>
          <div class="color-dots">
            \${product.colors.slice(0, 7).map(c => \`
              <div 
                class="color-dot \${c.name === currentVariant.color ? 'active' : ''}" 
                style="background-color: \${c.hex}; \${c.hex === '#ffffff' ? 'border: 1px solid #cbd5e1;' : ''}" 
                title="\${c.name}"
                onclick="event.stopPropagation(); selectColor('\${product.id}', '\${c.name}')">
              </div>
            \`).join('')}
            \${product.colors.length > 7 ? \`<span style="font-size: 0.7rem; color: #64748b; font-weight: 700; align-self: center;">+\${product.colors.length - 7}</span>\` : ''}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="product-actions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: auto;">
          <button class="btn-secondary" onclick="openProductDialog('\${product.id}')" style="padding: 10px 6px; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 4px; border: 1.5px solid var(--border-medium); background: #f8fafc;" title="View all angles and colors">
            <span>👁️ 360° View</span>
          </button>
          <button class="btn-add-cart" onclick="openProductDialog('\${product.id}')" style="padding: 10px 6px; font-size: 0.8rem; font-weight: 800;">
            <span>Select & Buy ➔</span>
          </button>
        </div>
      </div>
    </article>
  \`;
}`;

const rpcStart = code.indexOf('function renderProductCard(product) {');
const rpcEnd = code.indexOf('function renderProducts() {');
if (rpcStart !== -1 && rpcEnd !== -1) {
  code = code.substring(0, rpcStart) + newRenderCard + '\n\n' + code.substring(rpcEnd);
} else {
  console.log('Error finding renderProductCard bounds');
}

// 3. Add Dialog Controller State & Functions
const dialogLogic = `
// ==========================================
// INTERACTIVE PRODUCT DIALOG & MULTI-ANGLE CONTROLLER
// ==========================================
AppState.activeDialog = {
  productId: null,
  activeAngleId: null,
  activeColor: null,
  activeSize: null,
  qty: 1
};

function openProductDialog(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentVariant = AppState.selectedVariants[productId] || {
    size: product.sizes[0],
    color: product.colors[0].name
  };

  const defaultAngle = (product.angles && product.angles[0]) ? product.angles[0].id : "front";

  AppState.activeDialog = {
    productId: productId,
    activeAngleId: defaultAngle,
    activeColor: currentVariant.color,
    activeSize: currentVariant.size,
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
  if (catEl) catEl.textContent = product.categoryName.toUpperCase();
  if (descEl) descEl.textContent = product.description;
  if (priceEl) priceEl.textContent = \`Rs. \${product.retailPrice.toLocaleString()}\`;
  if (qtyEl) qtyEl.textContent = "1";

  // Render Angles List
  renderDialogAngles(product);

  // Render Colors
  renderDialogColors(product);

  // Render Sizes
  renderDialogSizes(product);

  // Update Visual Viewport Image
  updateDialogPreviewImage(product);

  if (overlay) {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeProductDialog() {
  const overlay = document.getElementById("product-dialog-overlay");
  if (overlay) {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }
}

function renderDialogAngles(product) {
  const container = document.getElementById("dialog-angles-list");
  if (!container) return;

  const angles = product.angles || [{ id: "front", label: "Front View", icon: "👁️", image: product.image }];
  container.innerHTML = angles.map(a => \`
    <button 
      type="button" 
      class="angle-pill-btn \${a.id === AppState.activeDialog.activeAngleId ? 'active' : ''}" 
      onclick="setDialogAngle('\${a.id}')">
      <span>\${a.icon || '📐'}</span>
      <span>\${a.label}</span>
    </button>
  \`).join('');
}

function setDialogAngle(angleId) {
  AppState.activeDialog.activeAngleId = angleId;
  const product = PRODUCTS.find(p => p.id === AppState.activeDialog.productId);
  if (product) {
    renderDialogAngles(product);
    updateDialogPreviewImage(product);
  }
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
    // Sync with card variant state too
    if (!AppState.selectedVariants[product.id]) AppState.selectedVariants[product.id] = {};
    AppState.selectedVariants[product.id].color = colorName;

    renderDialogColors(product);
    updateDialogPreviewImage(product);
  }
}

function renderDialogSizes(product) {
  const container = document.getElementById("dialog-size-pills");
  if (!container) return;

  container.innerHTML = product.sizes.map(s => \`
    <button 
      type="button" 
      class="product-dialog-size-pill \${s === AppState.activeDialog.activeSize ? 'active' : ''}" 
      onclick="setDialogSize('\${s}')">
      \${s}
    </button>
  \`).join('');
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

function updateDialogPreviewImage(product) {
  const previewImg = document.getElementById("dialog-preview-img");
  const tintEl = document.getElementById("dialog-color-tint");
  const badgeEl = document.getElementById("dialog-active-angle-badge");
  if (!previewImg) return;

  const angles = product.angles || [];
  const currentAngle = angles.find(a => a.id === AppState.activeDialog.activeAngleId) || angles[0];
  const chosenColorObj = product.colors.find(c => c.name === AppState.activeDialog.activeColor);

  let imgSrc = (currentAngle && currentAngle.image) || product.image;

  // If color has an explicit image override (e.g. ceramic two-tone mug colors)
  if (chosenColorObj && chosenColorObj.imageOverride && currentAngle.id === 'left') {
    imgSrc = chosenColorObj.imageOverride;
  }

  previewImg.src = imgSrc;
  if (badgeEl && currentAngle) badgeEl.textContent = currentAngle.label;

  // Apply color tint effect for blank white garments when a distinct dark/vivid color is selected
  if (tintEl && chosenColorObj) {
    const isBlank = imgSrc.includes("blank_") || imgSrc.includes("customizer_blank");
    if (isBlank && chosenColorObj.hex !== "#ffffff") {
      tintEl.style.backgroundColor = chosenColorObj.hex;
      tintEl.style.opacity = chosenColorObj.hex === "#111216" || chosenColorObj.hex === "#000000" ? "0.85" : "0.55";
    } else {
      tintEl.style.opacity = "0";
    }
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

      const angleObj = (product.angles || []).find(a => a.id === AppState.activeDialog.activeAngleId) || (product.angles && product.angles[0]);
      const thumb = (angleObj && angleObj.image) || product.image;

      // Add to Cart
      for (let i = 0; i < AppState.activeDialog.qty; i++) {
        AppState.cart.push({
          cartId: Date.now() + Math.random(),
          productId: product.id,
          name: product.name,
          category: product.category,
          unitPrice: product.retailPrice,
          baseCost: product.baseCost,
          profit: product.profit,
          color: AppState.activeDialog.activeColor,
          size: AppState.activeDialog.activeSize,
          previewImage: thumb,
          isCustom: false
        });
      }

      updateCartUI();
      closeProductDialog();
      showToast(\`✓ Added \${product.name} (\${AppState.activeDialog.activeColor}) to shopping bag!\`);
      openCartDrawer();
    });
  }

  if (customizeBtn) {
    customizeBtn.addEventListener("click", () => {
      const product = PRODUCTS.find(p => p.id === AppState.activeDialog.productId);
      closeProductDialog();
      if (product) {
        launchCustomizerForProduct(product.id);
      }
    });
  }
}
`;

// Insert dialog logic before setupEventListeners
code = code.replace('function setupEventListeners() {', dialogLogic + '\nfunction setupEventListeners() {');

// Call setupProductDialogEventListeners inside setupEventListeners
code = code.replace('const openCartBtn = document.getElementById("open-cart-btn");', 'setupProductDialogEventListeners();\n  const openCartBtn = document.getElementById("open-cart-btn");');

fs.writeFileSync('app.js', code, 'utf8');
console.log('Successfully updated app.js with 18 products and Product Dialog logic!');
