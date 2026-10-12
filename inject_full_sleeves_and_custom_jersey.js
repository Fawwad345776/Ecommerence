const fs = require('fs');
const path = require('path');

const FULL_SLEEVE_PRODUCTS = [
  // 1. Pakistan Cricket Long Sleeve
  {
    "id": "prod-fs-pk-cricket",
    "name": "Pakistan Cricket '92 Official Full Sleeve Thermal Jersey Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Cricket Long Sleeve",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 980,
    "profit": 810,
    "retailPrice": 1790,
    "image": "assets/trending/fs_pk_cricket_green.jpg",
    "description": "240 GSM combed cotton thermal long sleeve tee with ribbed collar and cuffs. High-density gold PCB crossed bats crest.",
    "colors": [
      { "name": "Pakistan Green", "hex": "#15803d" },
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pure White", "hex": "#ffffff" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Pakistan Green": "assets/trending/fs_pk_cricket_green.jpg",
      "Onyx Black": "assets/trending/fs_pk_cricket_black.jpg",
      "Pure White": "assets/trending/fs_pk_cricket_white.jpg"
    }
  },

  // 2. Babar 56 Full Sleeve
  {
    "id": "prod-fs-babar56",
    "name": "Babar Azam 56 'Cover Drive King' Heavyweight Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Athlete Long Sleeve",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 980,
    "profit": 810,
    "retailPrice": 1790,
    "image": "assets/trending/fs_babar56_white.jpg",
    "description": "Iconic #56 Babar Azam cover drive typographic full sleeve with ribbed elastic wrist cuffs. 100% breathable winter cotton.",
    "colors": [
      { "name": "Pure White", "hex": "#ffffff" },
      { "name": "Onyx Black", "hex": "#111216" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Pure White": "assets/trending/fs_babar56_white.jpg",
      "Onyx Black": "assets/trending/fs_babar56_black.jpg"
    }
  },

  // 3. Eid Gold Calligraphy Full Sleeve
  {
    "id": "prod-fs-eid-calligraphy",
    "name": "'Eid Mubarak' Luxury Arabic Gold Calligraphy Full Sleeve Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Festive Luxury Apparel",
    "badge": "🌙 EID FESTIVE",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/trending/fs_eid_black.jpg",
    "description": "Metallic reflective gold foil 'Eid Mubarak' Arabic calligraphy printed on 240 GSM heavy combed cotton with double-stitched sleeves.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pure White", "hex": "#ffffff" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Onyx Black": "assets/trending/fs_eid_black.jpg",
      "Pure White": "assets/trending/fs_eid_white.jpg"
    }
  },

  // 4. Soulmates Urdu Long Sleeve
  {
    "id": "prod-fs-soulmates",
    "name": "'Soulmates - دو دل ایک جان' Romantic Aesthetic Long Sleeve Tee",
    "theme": "couple",
    "category": "full-sleeves",
    "categoryName": "Romantic Aesthetic Long Sleeve",
    "badge": "💍 COUPLE SPECIAL",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/trending/fs_soulmates_black.jpg",
    "description": "Oversized relaxed fit long sleeve with gold 'دو دل ایک جان' typography. Ultra-soft combed yarn with ribbed sleeve cuffs.",
    "colors": [
      { "name": "Charcoal Black", "hex": "#111216" },
      { "name": "Warm Beige", "hex": "#d4b996" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Charcoal Black": "assets/trending/fs_soulmates_black.jpg",
      "Warm Beige": "assets/trending/fs_soulmates_beige.jpg"
    }
  },

  // 5. City 021/042 Long Sleeve
  {
    "id": "prod-fs-city-street",
    "name": "'021 // 042 Karachi & Lahore' Brutalist Swiss Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Urban Streetwear",
    "badge": "🔥 STREETWEAR",
    "baseCost": 980,
    "profit": 810,
    "retailPrice": 1790,
    "image": "assets/trending/fs_city_charcoal.jpg",
    "description": "Swiss brutalist style city codes (021 Karachi & 042 Lahore) screenprinted in electric cyan and white on heavyweight drop-shoulder jersey.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pure White", "hex": "#ffffff" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Onyx Black": "assets/trending/fs_city_charcoal.jpg",
      "Pure White": "assets/trending/fs_city_white.jpg"
    }
  },

  // 6. Vintage Legend Birthday Full Sleeve
  {
    "id": "prod-fs-birthday-legend",
    "name": "'Vintage Legend - Aged to Perfection' Birthday Full Sleeve Tee",
    "theme": "birthday",
    "category": "full-sleeves",
    "categoryName": "Celebration Long Sleeve",
    "badge": "🎂 BIRTHDAY SPECIAL",
    "baseCost": 950,
    "profit": 740,
    "retailPrice": 1690,
    "image": "assets/trending/fs_birthday_black.jpg",
    "description": "Aged to perfection retro vintage badge printed on long sleeve combed cotton. A memorable birthday milestone gift.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Heather Grey", "hex": "#9ca3af" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Onyx Black": "assets/trending/fs_birthday_black.jpg",
      "Heather Grey": "assets/trending/fs_birthday_grey.jpg"
    }
  },

  // 7. Faiz Ahmad Faiz 'Bol Ke Lab Azaad' Full Sleeve
  {
    "id": "prod-fs-faiz-poetry",
    "name": "Faiz Ahmad Faiz 'Bol Ke Lab Azaad' Modern Urdu Long Sleeve Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Poetry Streetwear",
    "badge": "📜 URDU POETRY",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/trending/fs_faiz_black.jpg",
    "description": "Iconic revolutionary Urdu poetry by Faiz Ahmad Faiz 'بول کہ لب آزاد ہیں ترے' in modern brutalist editorial typography.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pure White", "hex": "#ffffff" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Onyx Black": "assets/trending/fs_faiz_black.jpg",
      "Pure White": "assets/trending/fs_faiz_white.jpg"
    }
  },

  // 8. Allama Iqbal 'Khudi' Full Sleeve
  {
    "id": "prod-fs-iqbal-khudi",
    "name": "Allama Iqbal 'Khudi Ko Kar Buland' Typographic Full Sleeve Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Philosophical Apparel",
    "badge": "🦅 PHILOSOPHY",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/trending/fs_iqbal_navy.jpg",
    "description": "Allama Iqbal's immortal verse 'خودی کو کر بلند اتنا' in gold typography across chest on premium heavy 240 GSM knit.",
    "colors": [
      { "name": "Deep Navy", "hex": "#1e3a8a" },
      { "name": "Onyx Black", "hex": "#111216" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Deep Navy": "assets/trending/fs_iqbal_navy.jpg",
      "Onyx Black": "assets/trending/fs_iqbal_black.jpg"
    }
  },

  // 9. Truck Art Pop Long Sleeve
  {
    "id": "prod-fs-truck-art",
    "name": "Karachi Truck Art Peacock Pop-Art Full Sleeve Streetwear Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Cultural Pop Apparel",
    "badge": "🦚 TRUCK ART POP",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/trending/fs_truck_art_black.jpg",
    "description": "Chamakpatti neon peacock and truck art floral borders fused with contemporary Tokyo streetwear graphics.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pure White", "hex": "#ffffff" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Onyx Black": "assets/trending/fs_truck_art_black.jpg",
      "Pure White": "assets/trending/fs_truck_art_white.jpg"
    }
  },

  // 10. Chai Dhabba Full Sleeve
  {
    "id": "prod-fs-chai-dhabba",
    "name": "'Pehlay Chai Phir Kaam' Waffle Knit Full Sleeve Cotton Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Desi Culture Apparel",
    "badge": "☕ CHAI EDITION",
    "baseCost": 950,
    "profit": 740,
    "retailPrice": 1690,
    "image": "assets/trending/fs_chai_white.jpg",
    "description": "Pakistani dhabba chai culture tribute with 'پہلے چائے پھر کام' print. Super comfortable thermal waffle cotton texture.",
    "colors": [
      { "name": "Pure White", "hex": "#ffffff" },
      { "name": "Onyx Black", "hex": "#111216" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Pure White": "assets/trending/fs_chai_white.jpg",
      "Onyx Black": "assets/trending/fs_chai_black.jpg"
    }
  },

  // 11. KING & QUEEN Couple Full Sleeve (2-Piece Set)
  {
    "id": "prod-fs-couple-king-queen",
    "name": "'KING & QUEEN' Crown Matching Full Sleeve Couple Tees (2-Piece Set)",
    "theme": "couple",
    "category": "full-sleeves",
    "categoryName": "Matching Couple Apparel",
    "badge": "👑 COUPLE DUO",
    "baseCost": 1500,
    "profit": 1100,
    "retailPrice": 2600,
    "image": "assets/trending/fs_couple_kq_pair.jpg",
    "description": "Matching King & Queen long sleeve tees (Pair of 2). Left tee in black with gold crown, right tee in white with gold crown.",
    "colors": [
      { "name": "Black & White Pair", "hex": "#111216" },
      { "name": "Both Jet Black", "hex": "#000000" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Black & White Pair": "assets/trending/fs_couple_kq_pair.jpg",
      "Both Jet Black": "assets/trending/fs_couple_kq_black.jpg"
    }
  },

  // 12. Plain Heavyweight Essential Full Sleeve
  {
    "id": "prod-fs-plain-essential",
    "name": "Unisex Heavyweight Ribbed Cuff Pure White Essential Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Minimalist Streetwear",
    "badge": "⭐ ESSENTIAL BASIC",
    "baseCost": 850,
    "profit": 740,
    "retailPrice": 1590,
    "image": "assets/trending/fs_plain_white.jpg",
    "description": "Ultra-clean minimalist 240 GSM heavy combed cotton long sleeve with reinforced 1x1 rib collar and cuffs. Ideal for layering.",
    "colors": [
      { "name": "Pure White", "hex": "#ffffff" },
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Deep Navy", "hex": "#1e3a8a" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Pure White": "assets/trending/fs_plain_white.jpg",
      "Onyx Black": "assets/trending/fs_plain_black.jpg",
      "Deep Navy": "assets/trending/fs_plain_navy.jpg"
    }
  }
];

// Custom Name & Number Jersey
const CUSTOM_JERSEY_PRODUCT = {
  "id": "prod-custom-jersey-name-number",
  "name": "Pakistan Official T20 Fan Jersey (Front & Back With Custom Name & Number)",
  "theme": "cricket",
  "category": "tees",
  "categoryName": "Custom Player Jersey",
  "badge": "⭐ CUSTOM NAME & NUMBER",
  "baseCost": 990,
  "profit": 860,
  "retailPrice": 1850,
  "image": "assets/trending/pk_jersey_custom_back.png",
  "isCustomJersey": true,
  "description": "Official Pakistan National T20 camouflage green team kit. Type your desired custom player name and jersey number for instant real-time back view preview and official athletic high-density printing.",
  "colors": [
    { "name": "Official Camo Green", "hex": "#15803d" }
  ],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colorImages": {
    "Official Camo Green": "assets/trending/pk_jersey_custom_back.png"
  }
};

const appPath = path.join(__dirname, 'app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

// 1. Inject products into PRODUCTS array in app.js
const productsMatch = appCode.match(/const PRODUCTS = (\[[\s\S]*?\]);\r?\n/);
if (!productsMatch) {
  console.error("Could not find const PRODUCTS in app.js");
  process.exit(1);
}

let existingProducts = eval(productsMatch[1]);
const existingIds = new Set(existingProducts.map(p => p.id));

// Add custom jersey as #1 featured product in tees!
if (!existingIds.has(CUSTOM_JERSEY_PRODUCT.id)) {
  existingProducts.unshift(CUSTOM_JERSEY_PRODUCT);
  existingIds.add(CUSTOM_JERSEY_PRODUCT.id);
}

// Add full sleeves
FULL_SLEEVE_PRODUCTS.forEach(p => {
  if (!existingIds.has(p.id)) {
    existingProducts.push(p);
    existingIds.add(p.id);
  }
});

console.log(`Updated products count: ${existingProducts.length}`);
const newProductsJson = 'const PRODUCTS = ' + JSON.stringify(existingProducts, null, 2) + ';\n';
appCode = appCode.replace(productsMatch[0], newProductsJson);

// 2. Add full-sleeves to HORIZONTAL_CATEGORIES
if (!appCode.includes('"full-sleeves"')) {
  const catMatch = appCode.match(/const HORIZONTAL_CATEGORIES = (\[[\s\S]*?\]);\r?\n/);
  if (catMatch) {
    let cats = eval(catMatch[1]);
    cats.push({
      id: "full-sleeves",
      name: "Full Sleeve T-Shirts",
      icon: "👕",
      badge: "Ribbed Cuff 240 GSM",
      sub: "Autumn & Winter Heavyweight Cotton Long Sleeves with Modern Graphic Prints"
    });
    appCode = appCode.replace(catMatch[0], 'const HORIZONTAL_CATEGORIES = ' + JSON.stringify(cats, null, 2) + ';\n');
    console.log('Added full-sleeves to HORIZONTAL_CATEGORIES');
  }
}

// 3. Update renderProducts filter list to include full-sleeves
appCode = appCode.replace(
  /else if \(filter === "laptop-bags"\) pool = PRODUCTS\.filter\(p => p\.category === "laptop-bags"\);/,
  `else if (filter === "laptop-bags") pool = PRODUCTS.filter(p => p.category === "laptop-bags");\n  else if (filter === "full-sleeves") pool = PRODUCTS.filter(p => p.category === "full-sleeves");`
);

appCode = appCode.replace(
  /if \(\["tees", "mugs", "hoodies", "caps", "laptop-bags"\]\.includes\(filter\)\)/,
  `if (["tees", "mugs", "hoodies", "caps", "laptop-bags", "full-sleeves"].includes(filter))`
);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('app.js successfully updated with Full Sleeves & Custom Jersey products!');

// 4. Update index.html navigation and filter buttons
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

if (!indexHtml.includes("full-sleeves")) {
  // Top nav
  indexHtml = indexHtml.replace(
    '<li><a href="#catalog" class="nav-link" onclick="setCatalogFilter(\'tees\')">👕 T-Shirts</a></li>',
    '<li><a href="#catalog" class="nav-link" onclick="setCatalogFilter(\'tees\')">👕 T-Shirts</a></li>\n          <li><a href="#catalog" class="nav-link" onclick="setCatalogFilter(\'full-sleeves\')" style="font-weight: 800;">👕 Full Sleeves</a></li>'
  );

  // Catalog filter buttons
  indexHtml = indexHtml.replace(
    '<button class="filter-btn" data-filter="tees">👕 T-Shirts</button>',
    '<button class="filter-btn" data-filter="tees">👕 T-Shirts</button>\n            <button class="filter-btn" data-filter="full-sleeves">👕 Full Sleeves</button>'
  );

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('index.html updated with Full Sleeves in navigation!');
}
