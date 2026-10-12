const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Ensure assets/pk_products directory exists
const outDir = path.join(__dirname, 'assets', 'pk_products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 66 Modern Pakistani Design Products (10-12 per category)
const PK_PRODUCTS = [
  // ==========================================
  // 1. T-SHIRTS (tees) - 12 Products
  // ==========================================
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
      { name: "Beige", hex: "#d4b996" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-tee-truck-art-pop",
    name: "Modern Truck Art Peacock Pop-Art Tee (240 GSM)",
    category: "tees",
    categoryName: "Modern Streetwear Graphic Tee",
    baseCost: 990,
    profit: 800,
    retailPrice: 1790,
    image: "assets/pk_products/tee_truck_art_pop.jpg",
    blankSku: "CP-TEE-TRUCKART-POP-240GSM",
    blankKey: "white-tee",
    description: "240 GSM heavy combed cotton. Vibrant Karachi truck art chamakpatti peacock motif fused with contemporary cyberpunk pop-art framing.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_truck_art_pop.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "KARACHI TRUCK ART",
      subTitle: "چمک پٹی آرٹ • 2026",
      theme: "truck_art",
      colors: ["#ec4899", "#ca8a04", "#06b6d4"]
    }
  },
  {
    id: "prod-tee-faiz-bol",
    name: "Faiz Ahmad Faiz 'Bol Ke Lab Azaad' Calligraphy Tee",
    category: "tees",
    categoryName: "Urdu Poetry Streetwear Tee",
    baseCost: 990,
    profit: 800,
    retailPrice: 1790,
    image: "assets/pk_products/tee_faiz_bol.jpg",
    blankSku: "CP-TEE-FAIZ-BOL-240GSM",
    blankKey: "white-tee",
    description: "Faiz Ahmad Faiz's revolutionary Urdu poetry 'بول کہ لب آزاد ہیں ترے' in modern brutalist Swiss typography layout with high-density print.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_faiz_bol.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Bone Cream", hex: "#f5f0eb" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "FAIZ AHMAD FAIZ",
      subTitle: "بول کہ لب آزاد ہیں ترے",
      theme: "urdu_poetry",
      colors: ["#dc2626", "#ffffff", "#e2e8f0"]
    }
  },
  {
    id: "prod-tee-chai-dhaba",
    name: "'Pehlay Chai Phir Baat' Street Dhabba Graphic Tee",
    category: "tees",
    categoryName: "Pakistani Pop Culture Graphic Tee",
    baseCost: 950,
    profit: 800,
    retailPrice: 1750,
    image: "assets/pk_products/tee_chai_dhaba.jpg",
    blankSku: "CP-TEE-CHAI-DHABBA-220GSM",
    blankKey: "white-tee",
    description: "Authentic Pakistani tea culture tribute. Retro cutting chai kettle graphic with bold modern Urdu lettering 'پہلے چائے پھر بات'.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_chai_dhaba.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Beige", hex: "#d4b996" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "KARAK CHAI CLUB",
      subTitle: "پہلے چائے پھر بات ☕",
      theme: "chai_culture",
      colors: ["#ea580c", "#ca8a04", "#78350f"]
    }
  },
  {
    id: "prod-tee-karachi-cyberpunk",
    name: "Karachi Lights 2099 Cyberpunk Streetwear Tee",
    category: "tees",
    categoryName: "Cyberpunk Streetwear Graphic Tee",
    baseCost: 990,
    profit: 800,
    retailPrice: 1790,
    image: "assets/pk_products/tee_karachi_cyberpunk.jpg",
    blankSku: "CP-TEE-KHI-CYBERPUNK-240GSM",
    blankKey: "white-tee",
    description: "Saddar neon skyline & Clifton coastal highway in 1980s retro-futuristic synthwave vector with technical grid coordinates.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_karachi_cyberpunk.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "KARACHI 2099",
      subTitle: "CITY OF LIGHTS // عروس البلاد",
      theme: "cyber_pakistan",
      colors: ["#38bdf8", "#f43f5e", "#a855f7"]
    }
  },
  {
    id: "prod-tee-lahore-heritage",
    name: "Lahore Fort Fresco Modernist Tile Tee",
    category: "tees",
    categoryName: "Architectural Streetwear Tee",
    baseCost: 950,
    profit: 800,
    retailPrice: 1750,
    image: "assets/pk_products/tee_lahore_heritage.jpg",
    blankSku: "CP-TEE-LHR-HERITAGE-220GSM",
    blankKey: "white-tee",
    description: "Mughal Sheesh Mahal muqarnas geometry and tile mosaics deconstructed into clean contemporary streetwear chest badge.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_lahore_heritage.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Bone Cream", hex: "#f5f0eb" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "LAHORE ARCHIVES",
      subTitle: "شاہی قلعہ لاہور • MUGHAL MOSAIC",
      theme: "heritage",
      colors: ["#b45309", "#15803d", "#1d4ed8"]
    }
  },
  {
    id: "prod-tee-sukoon-urdu",
    name: "'Sukoon' (سکون) High-Density Minimal Typography Tee",
    category: "tees",
    categoryName: "Urdu Typography Graphic Tee",
    baseCost: 950,
    profit: 800,
    retailPrice: 1750,
    image: "assets/pk_products/tee_sukoon_urdu.jpg",
    blankSku: "CP-TEE-SUKOON-URDU-220GSM",
    blankKey: "white-tee",
    description: "Modern Nastaliq letterform 'سکون' (Peace & Serenity) centered in clean Japanese-streetwear minimalist framing on premium cotton.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_sukoon_urdu.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Heather Grey", hex: "#9ca3af" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "SUKOON // سکون",
      subTitle: "SERENITY IN CHAOS",
      theme: "urdu_minimal",
      colors: ["#10b981", "#ffffff", "#64748b"]
    }
  },
  {
    id: "prod-tee-rickshaw-drift",
    name: "Karachi Rickshaw Drift Society Retro Graphic Tee",
    category: "tees",
    categoryName: "Retro Pop Culture Tee",
    baseCost: 950,
    profit: 800,
    retailPrice: 1750,
    image: "assets/pk_products/tee_rickshaw_drift.jpg",
    blankSku: "CP-TEE-RICKSHAW-DRIFT-220GSM",
    blankKey: "white-tee",
    description: "High-octane urban auto-rickshaw drifting graphic with retro anime speed lines and witty Urdu street decals.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_rickshaw_drift.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Crimson Red", hex: "#dc2626" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "RICKSHAW DRIFT CLUB",
      subTitle: "دیکھ مگر پیار سے • KHI",
      theme: "retro_vehicle",
      colors: ["#f59e0b", "#ef4444", "#10b981"]
    }
  },
  {
    id: "prod-tee-gully-cricket",
    name: "Tape-Ball Gully Cricket Legends 1996 Graphic Tee",
    category: "tees",
    categoryName: "Sports Nostalgia Graphic Tee",
    baseCost: 950,
    profit: 800,
    retailPrice: 1750,
    image: "assets/pk_products/tee_gully_cricket.jpg",
    blankSku: "CP-TEE-TAPE-BALL-1996",
    blankKey: "white-tee",
    description: "Heritage homage to Pakistan's legendary street tape-ball cricket culture. Electrical tape seam ball graphic and Rawalpindi speed meter.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/pk_products/tee_gully_cricket.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Heather Grey", hex: "#9ca3af" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_tshirt_front.jpg",
      badgeTitle: "GULLY CRICKET '96",
      subTitle: "TAPE BALL CHAMPIONSHIP",
      theme: "cricket_nostalgia",
      colors: ["#16a34a", "#ffffff", "#eab308"]
    }
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

  // ==========================================
  // 2. HOODIES (hoodies) - 12 Products
  // ==========================================
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
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-hoodie-karakoram",
    name: "Karakoram K2 8611m Expedition Streetwear Hoodie",
    category: "hoodies",
    categoryName: "Expedition Streetwear Hoodie",
    baseCost: 2300,
    profit: 800,
    retailPrice: 3100,
    image: "assets/pk_products/hoodie_karakoram.jpg",
    blankSku: "CP-HOODIE-K2-EXPEDITION",
    blankKey: "hoodie",
    description: "Topographic contour line art of K2 summit (8,611m) and Concordia glacier with minimal alpine club coordinates print.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_karakoram.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#6b7280" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "KARAKORAM RANGE // K2",
      subTitle: "8,611 METERS • SAVAGE MOUNTAIN",
      theme: "alpine_k2",
      colors: ["#38bdf8", "#ffffff", "#94a3b8"]
    }
  },
  {
    id: "prod-hoodie-qalandar",
    name: "'Mast Qalandar' Modern Sufi Grunge Street Hoodie",
    category: "hoodies",
    categoryName: "Sufi Heritage Streetwear Hoodie",
    baseCost: 2300,
    profit: 800,
    retailPrice: 3100,
    image: "assets/pk_products/hoodie_qalandar.jpg",
    blankSku: "CP-HOODIE-QALANDAR-GRUNGE",
    blankKey: "hoodie",
    description: "Abstract whirling dervish silhouette and mystic Urdu typography 'مست قلندر' in weathered puff print texture on 380 GSM fleece.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_qalandar.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Maroon", hex: "#800020" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "DAM MAST QALANDAR",
      subTitle: "صوفیانا جادو // SUFI MYSTIC",
      theme: "sufi_grunge",
      colors: ["#f59e0b", "#ef4444", "#ffffff"]
    }
  },
  {
    id: "prod-hoodie-islamabad-monsoon",
    name: "Islamabad Margalla Forest Club Heavyweight Hoodie",
    category: "hoodies",
    categoryName: "Minimalist Nature Streetwear Hoodie",
    baseCost: 2200,
    profit: 800,
    retailPrice: 3000,
    image: "assets/pk_products/hoodie_islamabad_monsoon.jpg",
    blankSku: "CP-HOODIE-ISB-MARGALLA",
    blankKey: "hoodie",
    description: "Deep evergreen aesthetics. Minimalist Margalla Hills ridge vector badge, trail coordinates, and mist monsoon cloud typography.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_islamabad_monsoon.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Bottle Green", hex: "#14532d" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#6b7280" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "MARGALLA EXPEDITIONS",
      subTitle: "ISLAMABAD 051 // PINE TRAIL",
      theme: "nature_isb",
      colors: ["#22c55e", "#ffffff", "#86efac"]
    }
  },
  {
    id: "prod-hoodie-faiz-hum-dekhenge",
    name: "'Hum Dekhenge' Revolutionary Poetry Street Hoodie",
    category: "hoodies",
    categoryName: "Urdu Poetry Streetwear Hoodie",
    baseCost: 2300,
    profit: 800,
    retailPrice: 3100,
    image: "assets/pk_products/hoodie_faiz_hum_dekhenge.jpg",
    blankSku: "CP-HOODIE-HUM-DEKHENGE",
    blankKey: "hoodie",
    description: "Faiz Ahmad Faiz's iconic anthem 'ہم دیکھیں گے' rendered in bold Swiss typography badge with technical editorial barcode.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_faiz_hum_dekhenge.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Bone Cream", hex: "#f5f0eb" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "HUM DEKHENGE // ہم دیکھیں گے",
      subTitle: "FAIZ AHMAD FAIZ • 1979",
      theme: "faiz_poetry",
      colors: ["#dc2626", "#ffffff", "#94a3b8"]
    }
  },
  {
    id: "prod-hoodie-multan-kashigari",
    name: "Multan Blue Pottery Kashigari Geometric Hoodie",
    category: "hoodies",
    categoryName: "Heritage Ceramic Art Hoodie",
    baseCost: 2300,
    profit: 800,
    retailPrice: 3100,
    image: "assets/pk_products/hoodie_multan_kashigari.jpg",
    blankSku: "CP-HOODIE-MULTAN-KASHIGARI",
    blankKey: "hoodie",
    description: "Intricate cobalt blue and Persian turquoise Kashigari ceramic tilework reinterpreted into high-fashion luxury streetwear graphics.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_multan_kashigari.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "MULTAN KASHIGARI",
      subTitle: "BLUE POTTERY MOSAIC • ملتان",
      theme: "multan_art",
      colors: ["#0284c7", "#38bdf8", "#ffffff"]
    }
  },
  {
    id: "prod-hoodie-mohenjodaro",
    name: "Indus Valley King Priest Line-Art Hoodie",
    category: "hoodies",
    categoryName: "Archaeological Minimalist Hoodie",
    baseCost: 2300,
    profit: 800,
    retailPrice: 3100,
    image: "assets/pk_products/hoodie_mohenjodaro.jpg",
    blankSku: "CP-HOODIE-INDUS-VALLEY",
    blankKey: "hoodie",
    description: "Mohenjo-Daro 2500 BCE King Priest stone sculpture rendered in modernist continuous line-art vector with Indus script glyphs.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_mohenjodaro.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Bone Cream", hex: "#f5f0eb" },
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "INDUS VALLEY 2500 BCE",
      subTitle: "KING PRIEST // موہنجودڑو",
      theme: "ancient_indus",
      colors: ["#d97706", "#ffffff", "#78350f"]
    }
  },
  {
    id: "prod-hoodie-sabran-jameela",
    name: "'Sabran Jameela' Islamic Geometric Arch Hoodie",
    category: "hoodies",
    categoryName: "Islamic Calligraphy Streetwear Hoodie",
    baseCost: 2200,
    profit: 800,
    retailPrice: 3000,
    image: "assets/pk_products/hoodie_sabran_jameela.jpg",
    blankSku: "CP-HOODIE-SABRAN-JAMEELA",
    blankKey: "hoodie",
    description: "Modernist Kufic calligraphy 'صَبْرًا جَمِيلًا' (Patience Most Beautiful) set inside a clean architectural pointed arch vector silhouette.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_sabran_jameela.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#6b7280" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "SABRAN JAMEELA",
      subTitle: "صَبْرًا جَمِيلًا // NOBLE PATIENCE",
      theme: "islamic_arch",
      colors: ["#10b981", "#ffffff", "#94a3b8"]
    }
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
      { id: "front", label: "Front View", icon: "🧥", image: "assets/blank_hoodie_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-hoodie-cyberpunk",
    name: "Cyber-Samurai Heavyweight Drop-Shoulder Hoodie",
    category: "hoodies",
    categoryName: "Oversized Cyberpunk Hoodie",
    baseCost: 2300,
    profit: 800,
    retailPrice: 3100,
    image: "assets/product3.jpg",
    blankSku: "CP-HOODIE-CYBERSAMURAI",
    blankKey: "hoodie",
    description: "Futuristic neon mecha aesthetic on heavyweight drop-shoulder streetwear fleece cut.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/product3.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-hoodie-botanical",
    name: "Moments of Calm Botanical Heavyweight Fleece Hoodie",
    category: "hoodies",
    categoryName: "Botanical Floral Hoodie",
    baseCost: 2150,
    profit: 800,
    retailPrice: 2950,
    image: "assets/blank_hoodie_front.jpg",
    blankSku: "CP-HOODIE-BOTANICAL-CALM",
    blankKey: "hoodie",
    description: "Earthy natural wildflower minimalist botanical chest badge with soft organic streetwear mood.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/blank_hoodie_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Bone Cream", hex: "#f5f0eb" },
      { name: "Heather Grey", hex: "#6b7280" }
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "prod-hoodie-pindi-boyz",
    name: "Pindi Boyz Rawalpindi Metro Street Hoodie",
    category: "hoodies",
    categoryName: "Urban Streetwear Graphic Hoodie",
    baseCost: 2200,
    profit: 800,
    retailPrice: 3000,
    image: "assets/pk_products/hoodie_pindi_boyz.jpg",
    blankSku: "CP-HOODIE-PINDI-BOYZ",
    blankKey: "hoodie",
    description: "6th Road brutalist metro corridor and Rawalpindi youth culture celebrated with neon graphic print typography.",
    angles: [
      { id: "front", label: "Front View", icon: "🧥", image: "assets/pk_products/hoodie_pindi_boyz.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL"],
    design: {
      base: "assets/blank_hoodie_front.jpg",
      badgeTitle: "PINDI EXPRESS",
      subTitle: "RAWALPINDI 051 // STREETWEAR",
      theme: "pindi_metro",
      colors: ["#ec4899", "#38bdf8", "#ffffff"]
    }
  },

  // ==========================================
  // 3. CUPS & MUGS (mugs) - 12 Products
  // ==========================================
  {
    id: "prod-mug-ceramic",
    name: "White Ceramic Mug with Color Inside (11 oz Standard)",
    category: "mugs",
    categoryName: "Two-Tone Ceramic Mug",
    baseCost: 550,
    profit: 550,
    retailPrice: 1100,
    image: "assets/ceeprinto_mug_left_stage.webp",
    blankSku: "CP-MUG-CERAMIC-TWOTONE-11OZ",
    blankKey: "mug",
    description: "Grade-A 11 oz ceramic coffee cup with glossy finish, colored inner glaze, and dishwasher-safe sublimation print.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/ceeprinto_mug_left_stage.webp" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "right", label: "Right View", icon: "🔄", image: "assets/ceeprinto_mug_right_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Green & White", hex: "#16a34a" },
      { name: "Red & White", hex: "#dc2626" },
      { name: "Blue & White", hex: "#1d4ed8" },
      { name: "Obsidian Black", hex: "#111216" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-chai-charcha",
    name: "'Pehlay Chai Phir Kaam' Modern Dhabba Mug",
    category: "mugs",
    categoryName: "Chai Culture Ceramic Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/pk_products/mug_chai_charcha.jpg",
    blankSku: "CP-MUG-CHAI-CHARCHA-11OZ",
    blankKey: "mug",
    description: "Steaming cutting glass chai kettle artwork with witty Urdu slogan 'پہلے چائے پھر کام'. Perfect gift for Pakistani chai lovers.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_chai_charcha.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Yellow & White", hex: "#ca8a04" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "PEHLAY CHAI",
      subTitle: "پہلے چائے پھر کام ☕",
      theme: "chai_mug",
      colors: ["#ea580c", "#ca8a04", "#1e293b"]
    }
  },
  {
    id: "prod-mug-dekh-magar-pyar",
    name: "'Dekh Magar Pyar Se' Truck Art Ceramic Mug",
    category: "mugs",
    categoryName: "Truck Art Ceramic Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/pk_products/mug_dekh_magar_pyar.jpg",
    blankSku: "CP-MUG-DEKH-MAGAR-11OZ",
    blankKey: "mug",
    description: "Legendary Pakistani road catchphrase 'دیکھ مگر پیار سے' with vibrant Karachi truck art floral border and psychedelic eagle crest.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_dekh_magar_pyar.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Red & White", hex: "#dc2626" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "DEKH MAGAR PYAR SE",
      subTitle: "دیکھ مگر پیار سے ❤️",
      theme: "truck_art_mug",
      colors: ["#dc2626", "#eab308", "#15803d"]
    }
  },
  {
    id: "prod-mug-iqbal-khudi",
    name: "Allama Iqbal 'Khudi' Gold & Black Ceramic Mug",
    category: "mugs",
    categoryName: "Urdu Poetry Ceramic Mug",
    baseCost: 650,
    profit: 550,
    retailPrice: 1200,
    image: "assets/pk_products/mug_iqbal_khudi.jpg",
    blankSku: "CP-MUG-IQBAL-KHUDI-11OZ",
    blankKey: "mug",
    description: "Sleek obsidian black exterior with metallic gold Nastaliq calligraphy 'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے'.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_iqbal_khudi.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/blank_mug_black_front.jpg" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Obsidian Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "ALLAMA IQBAL",
      subTitle: "خودی کو کر بلند اتنا",
      theme: "gold_poetry_mug",
      colors: ["#ca8a04", "#eab308", "#0f172a"]
    }
  },
  {
    id: "prod-mug-multan-kashigari",
    name: "Multan Blue Kashigari Cobalt Ceramic Mug",
    category: "mugs",
    categoryName: "Heritage Ceramic Art Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/pk_products/mug_multan_kashigari.jpg",
    blankSku: "CP-MUG-MULTAN-BLUE-11OZ",
    blankKey: "mug",
    description: "Traditional Multan tomb ceramic tilework with cobalt indigo spirals, Persian turquoise floral rosettes, and glazed rim.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_multan_kashigari.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Blue & White", hex: "#1d4ed8" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "MULTANI KASHIGARI",
      subTitle: "کاشیکاری ملتان • COBALT",
      theme: "kashigari_mug",
      colors: ["#1d4ed8", "#38bdf8", "#0f172a"]
    }
  },
  {
    id: "prod-mug-karachi-se-lahore",
    name: "'Karachi Se Lahore' GT Road Milestone Mug",
    category: "mugs",
    categoryName: "Road Trip Pop Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/pk_products/mug_karachi_se_lahore.jpg",
    blankSku: "CP-MUG-KHI-LHR-MILESTONE",
    blankKey: "mug",
    description: "Highway milestone graphic connecting Karachi's Burns Road food street to Lahore's Gawalmandi with vintage speed badges.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_karachi_se_lahore.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "N-5 HIGHWAY",
      subTitle: "KARACHI ➔ LAHORE • 1200 KM",
      theme: "road_milestone",
      colors: ["#16a34a", "#eab308", "#1e293b"]
    }
  },
  {
    id: "prod-mug-sitaron-se-aagay",
    name: "'Sitaron Se Aagay' Cosmic Astronomy Urdu Mug",
    category: "mugs",
    categoryName: "Cosmic Urdu Poetry Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/pk_products/mug_sitaron_se_aagay.jpg",
    blankSku: "CP-MUG-SITARON-SE-AAGAY",
    blankKey: "mug",
    description: "Deep galactic nebula vector background with Iqbal's timeless line 'ستاروں سے آگے جہاں اور بھی ہیں' in elegant script.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_sitaron_se_aagay.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Blue & White", hex: "#1d4ed8" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "SITARON SE AAGAY",
      subTitle: "ستاروں سے آگے جہاں اور بھی ہیں",
      theme: "cosmic_urdu",
      colors: ["#a855f7", "#38bdf8", "#0f172a"]
    }
  },
  {
    id: "prod-mug-horn-ahista",
    name: "'Horn Ahista Bajao' Street Humor Ceramic Mug",
    category: "mugs",
    categoryName: "Street Humor Ceramic Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/pk_products/mug_horn_ahista.jpg",
    blankSku: "CP-MUG-HORN-AHISTA-11OZ",
    blankKey: "mug",
    description: "Witty Pakistani traffic sign illustration 'ہارن آہستہ بجاؤ مریض سو رہا ہے' with vintage air horn graphic.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/pk_products/mug_horn_ahista.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/ceeprinto_mug_front_stage.webp" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Green & White", hex: "#16a34a" }
    ],
    sizes: ["11 oz Standard"],
    design: {
      base: "assets/ceeprinto_mug_left_stage.webp",
      badgeTitle: "HORN AHISTA BAJAO",
      subTitle: "ہارن آہستہ بجاؤ • NO NOISE",
      theme: "horn_humor",
      colors: ["#e11d48", "#f59e0b", "#0f172a"]
    }
  },
  {
    id: "prod-mug-green",
    name: "Knorr Emerald Green & White Ceramic Mug",
    category: "mugs",
    categoryName: "Two-Tone Ceramic Mug",
    baseCost: 600,
    profit: 550,
    retailPrice: 1150,
    image: "assets/mug_green_clean_left.jpg",
    blankSku: "CP-MUG-GREEN-WHITE-11OZ",
    blankKey: "mug",
    description: "Vibrant bottle green glossy inner glaze paired with pristine bright white porcelain exterior.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/mug_green_clean_left.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/blank_mug_green_white_front.jpg" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Green & White", hex: "#16a34a" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-white-classic",
    name: "Pure White Minimalist Ceramic Coffee Mug (11 oz)",
    category: "mugs",
    categoryName: "Minimalist Ceramic Mug",
    baseCost: 550,
    profit: 550,
    retailPrice: 1100,
    image: "assets/ceeprinto_mug_white.jpg",
    blankSku: "CP-MUG-PUREWHITE-11OZ",
    blankKey: "mug",
    description: "Ultra-pure white high gloss ceramic mug. The standard professional studio blank for custom full-color wrapping prints.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/ceeprinto_mug_white.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/blank_mug_front.jpg" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-cyberpunk",
    name: "Neo-Tokyo Cyberpunk Ceramic Coffee Mug (11 oz)",
    category: "mugs",
    categoryName: "Graphic Art Ceramic Mug",
    baseCost: 640,
    profit: 550,
    retailPrice: 1190,
    image: "assets/product_mug.jpg",
    blankSku: "CP-MUG-CYBERPUNK-11OZ",
    blankKey: "mug",
    description: "Vivid cyberpunk graphics printed 360° on ultra-white ceramic with scratch-proof sublimation seal.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/product_mug.jpg" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Standard"]
  },
  {
    id: "prod-mug-black-onyx",
    name: "Obsidian Black Premium Glazed Ceramic Mug",
    category: "mugs",
    categoryName: "Executive Ceramic Mug",
    baseCost: 650,
    profit: 550,
    retailPrice: 1200,
    image: "assets/ceeprinto_mug_black.jpg",
    blankSku: "CP-MUG-OBSIDIAN-BLK",
    blankKey: "mug",
    description: "Deep obsidian black glaze throughout exterior and interior for a dramatic executive coffee experience.",
    angles: [
      { id: "left", label: "Left View", icon: "☕", image: "assets/ceeprinto_mug_black.jpg" },
      { id: "front", label: "Front View", icon: "👁️", image: "assets/blank_mug_black_front.jpg" },
      { id: "packaging", label: "Gift Packaging", icon: "📦", image: "assets/ceeprinto_mug_packaging_stage.webp" }
    ],
    colors: [
      { name: "Obsidian Black", hex: "#111216" }
    ],
    sizes: ["11 oz Standard"]
  },

  // ==========================================
  // 4. CAPS (caps) - 10 Products
  // ==========================================
  {
    id: "prod-cap-baseball",
    name: "Structured Baseball Cap (6-Panel Cotton Twill)",
    category: "caps",
    categoryName: "Structured Baseball Cap",
    baseCost: 650,
    profit: 600,
    retailPrice: 1250,
    image: "assets/product_cap.jpg",
    blankSku: "CP-CAP-BASEBALL-STRUC-6PANEL",
    blankKey: "cap",
    description: "Heavyweight brushed cotton twill with pre-curved visor, moisture-wicking sweatband, and brass buckle strapback.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/product_cap.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Stone Khaki", hex: "#d6cfc7" }
    ],
    sizes: ["Adjustable Strap"]
  },
  {
    id: "prod-cap-1992-tigers",
    name: "Pakistan '92 Cornered Tigers Championship Cap",
    category: "caps",
    categoryName: "Sports Nostalgia Embroidered Cap",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/cap_1992_tigers.jpg",
    blankSku: "CP-CAP-PAK92-TIGERS",
    blankKey: "cap",
    description: "Iconic Pakistani green structured crown featuring gold 3D embroidery of the 1992 world champions jumping tiger crest.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_1992_tigers.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Knorr Green", hex: "#16a34a" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "CORNERED TIGERS",
      subTitle: "PAKISTAN 1992 ★ CHAMPIONS",
      theme: "sports_cap",
      colors: ["#16a34a", "#eab308", "#ffffff"]
    }
  },
  {
    id: "prod-cap-truck-art-crest",
    name: "Truck Art Floral Crest Embroidered Strapback Cap",
    category: "caps",
    categoryName: "Folk Art Streetwear Cap",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/cap_truck_art_crest.jpg",
    blankSku: "CP-CAP-TRUCKART-CREST",
    blankKey: "cap",
    description: "High-density multi-color embroidered truck art lotus bloom centered on premium vintage washed khaki cotton twill.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_truck_art_crest.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Stone Khaki", hex: "#d6cfc7" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "CHAMAK PATTI CREST",
      subTitle: "TRUCK ART FLORAL // 2026",
      theme: "truck_art_cap",
      colors: ["#ec4899", "#ca8a04", "#06b6d4"]
    }
  },
  {
    id: "prod-cap-karakoram-alpine",
    name: "Karakoram Mountain Alpine Club Explorer Cap",
    category: "caps",
    categoryName: "Outdoor Alpine Cap",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/cap_karakoram_alpine.jpg",
    blankSku: "CP-CAP-KARAKORAM-CLUB",
    blankKey: "cap",
    description: "Deep navy twill with woven patch featuring mountain peak vector and Karakoram coordinates (35°52′57″N 76°30′48″E).",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_karakoram_alpine.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "KARAKORAM CLUB",
      subTitle: "NORTHERN EXPLORERS // 8611M",
      theme: "alpine_cap",
      colors: ["#38bdf8", "#ffffff", "#94a3b8"]
    }
  },
  {
    id: "prod-cap-lahore-zindadilan",
    name: "'Zinda Dilan' Lahore Heritage Structured Cap",
    category: "caps",
    categoryName: "City Heritage Cap",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/cap_lahore_zindadilan.jpg",
    blankSku: "CP-CAP-LHR-ZINDADILAN",
    blankKey: "cap",
    description: "Crimson red and white structured crown with modern Urdu typography 'زندہ دلانِ لاہور' in bold 3D puff embroidery.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_lahore_zindadilan.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "ZINDA DILAN LHR",
      subTitle: "زندہ دلان لاہور • 1021",
      theme: "lahore_cap",
      colors: ["#dc2626", "#ffffff", "#fbbf24"]
    }
  },
  {
    id: "prod-cap-sukoon-script",
    name: "'Sukoon' (سکون) Minimalist Script Black Cap",
    category: "caps",
    categoryName: "Urdu Typography Cap",
    baseCost: 700,
    profit: 600,
    retailPrice: 1300,
    image: "assets/pk_products/cap_sukoon_script.jpg",
    blankSku: "CP-CAP-SUKOON-SCRIPT",
    blankKey: "cap",
    description: "Sleek low-profile black cotton twill dad hat with subtle white embroidered Nastaliq script 'سکون'.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_sukoon_script.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Stone Khaki", hex: "#d6cfc7" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "SUKOON // سکون",
      subTitle: "PEACE OF MIND",
      theme: "sukoon_cap",
      colors: ["#10b981", "#ffffff", "#64748b"]
    }
  },
  {
    id: "prod-cap-islamabad-051",
    name: "Islamabad 051 Capital District Vintage Cap",
    category: "caps",
    categoryName: "City Code Streetwear Cap",
    baseCost: 700,
    profit: 600,
    retailPrice: 1300,
    image: "assets/pk_products/cap_islamabad_051.jpg",
    blankSku: "CP-CAP-ISB-051",
    blankKey: "cap",
    description: "Forest green crown with crisp white athletic collegiate badge 'ISLAMABAD 051' and pine tree emblem.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_islamabad_051.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Bottle Green", hex: "#14532d" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "ISLAMABAD 051",
      subTitle: "CAPITAL TERRITORY",
      theme: "isb_cap",
      colors: ["#15803d", "#ffffff", "#86efac"]
    }
  },
  {
    id: "prod-cap-cyberpunk",
    name: "Neo-Tokyo Cyberpunk Streetwear Baseball Cap",
    category: "caps",
    categoryName: "Cyberpunk Baseball Cap",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/blank_cap_front.jpg",
    blankSku: "CP-CAP-CYBERPUNK",
    blankKey: "cap",
    description: "Cyberpunk mecha emblem embroidered on structured black cotton twill with technical brim tape.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/blank_cap_front.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["Adjustable Strap"]
  },
  {
    id: "prod-cap-minimal",
    name: "Obsidian Black Core Minimalist Cap",
    category: "caps",
    categoryName: "Minimalist Cap",
    baseCost: 650,
    profit: 600,
    retailPrice: 1250,
    image: "assets/blank_cap_front.jpg",
    blankSku: "CP-CAP-CORE-MINIMAL",
    blankKey: "cap",
    description: "Unbranded stealth matte black baseball cap with premium curved brim and antiqued metal adjuster.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/blank_cap_front.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["Adjustable Strap"]
  },
  {
    id: "prod-cap-karachi-harbor",
    name: "Karachi Port Grand Maritime Anchor Cap",
    category: "caps",
    categoryName: "Maritime Heritage Cap",
    baseCost: 700,
    profit: 600,
    retailPrice: 1300,
    image: "assets/pk_products/cap_karachi_harbor.jpg",
    blankSku: "CP-CAP-KHI-HARBOR",
    blankKey: "cap",
    description: "Washed navy twill with anchor vector patch celebrating Karachi's historic Arabian Sea maritime coastline.",
    angles: [
      { id: "front", label: "Front Crown", icon: "🧢", image: "assets/pk_products/cap_karachi_harbor.jpg" },
      { id: "back", label: "Back Strap", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["Adjustable Strap"],
    design: {
      base: "assets/blank_cap_front.jpg",
      badgeTitle: "KARACHI HARBOR",
      subTitle: "PORT GRAND // MANORA PT",
      theme: "maritime_cap",
      colors: ["#0284c7", "#ffffff", "#38bdf8"]
    }
  },

  // ==========================================
  // 5. LAPTOP BAGS & SLEEVES (laptop-bags) - 10 Products
  // ==========================================
  {
    id: "prod-bag-laptop-classic",
    name: "Padded Laptop Bag / Sleeve (15.6\" Shock-Resistant)",
    category: "laptop-bags",
    categoryName: "Executive Laptop Bag",
    baseCost: 1400,
    profit: 800,
    retailPrice: 2200,
    image: "assets/blank_laptop_bag_front.jpg",
    blankSku: "CP-BAG-LAPTOP-15IN-NYLON",
    blankKey: "laptop-bag",
    description: "Shock-absorbing egg-crate interior foam with weather-sealed zippers, dual luggage handles, and luggage trolley strap.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/blank_laptop_bag_front.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#475569" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["13.3 - 14 Inch", "15.6 Inch Standard", "16 Inch Pro"]
  },
  {
    id: "prod-bag-multan-kashigari",
    name: "Multan Kashigari Cobalt Ceramic Laptop Sleeve (15.6\")",
    category: "laptop-bags",
    categoryName: "Heritage Art Laptop Sleeve",
    baseCost: 1650,
    profit: 800,
    retailPrice: 2450,
    image: "assets/pk_products/bag_multan_kashigari.jpg",
    blankSku: "CP-BAG-MULTAN-KASHIGARI",
    blankKey: "laptop-bag",
    description: "Water-resistant ballistic neoprene sleeve wrapped in intricate Multan blue pottery ceramic geometric patterns.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_multan_kashigari.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["14 Inch", "15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "MULTANI KASHIGARI",
      subTitle: "COBALT CERAMIC ART • 2026",
      theme: "kashigari_bag",
      colors: ["#0284c7", "#38bdf8", "#ffffff"]
    }
  },
  {
    id: "prod-bag-karakoram-topo",
    name: "Karakoram Topographic Contour Laptop Briefcase",
    category: "laptop-bags",
    categoryName: "Technical Contour Laptop Bag",
    baseCost: 1750,
    profit: 800,
    retailPrice: 2550,
    image: "assets/pk_products/bag_karakoram_topo.jpg",
    blankSku: "CP-BAG-KARAKORAM-TOPO",
    blankKey: "laptop-bag",
    description: "Elevation contour vectors of K2, Broad Peak, and Baltoro Glacier in crisp white linework on water-resistant matte black shell.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_karakoram_topo.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#475569" }
    ],
    sizes: ["15.6 Inch Standard", "16 Inch Pro"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "KARAKORAM TOPO MAP",
      subTitle: "K2 SUMMIT 8611M • NORTHERN ARC",
      theme: "topo_bag",
      colors: ["#38bdf8", "#ffffff", "#64748b"]
    }
  },
  {
    id: "prod-bag-truck-art-kaleidoscope",
    name: "Truck Art Pop Kaleidoscope Laptop Briefcase",
    category: "laptop-bags",
    categoryName: "Pop Folk Art Laptop Bag",
    baseCost: 1650,
    profit: 800,
    retailPrice: 2450,
    image: "assets/pk_products/bag_truck_art_kaleidoscope.jpg",
    blankSku: "CP-BAG-TRUCKART-POPKAL",
    blankKey: "laptop-bag",
    description: "Contemporary Pakistani truck art rosettes, peacocks, and floral arabesques set in high-density vibrant print.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_truck_art_kaleidoscope.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["14 Inch", "15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "CHAMAK PATTI DESIGN",
      subTitle: "PAKISTANI TRUCK ART • FOLK POP",
      theme: "truck_art_bag",
      colors: ["#ec4899", "#f59e0b", "#06b6d4"]
    }
  },
  {
    id: "prod-bag-lahore-fort-mosaic",
    name: "Lahore Fort Fresco Mosaic Executive Bag",
    category: "laptop-bags",
    categoryName: "Executive Heritage Briefcase",
    baseCost: 1700,
    profit: 800,
    retailPrice: 2500,
    image: "assets/pk_products/bag_lahore_fort_mosaic.jpg",
    blankSku: "CP-BAG-LHR-FRESCO",
    blankKey: "laptop-bag",
    description: "Sheesh Mahal ceiling geometry transformed into modern monochrome executive print for laptops and documents.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_lahore_fort_mosaic.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "LAHORE FORT FRESCO",
      subTitle: "SHEESH MAHAL GEOMETRY • 1631",
      theme: "heritage_bag",
      colors: ["#b45309", "#d97706", "#ffffff"]
    }
  },
  {
    id: "prod-bag-taxila-gandhara",
    name: "Taxila Gandhara Minimalist Line-Art Laptop Sleeve",
    category: "laptop-bags",
    categoryName: "Minimal Heritage Sleeve",
    baseCost: 1600,
    profit: 800,
    retailPrice: 2400,
    image: "assets/pk_products/bag_taxila_gandhara.jpg",
    blankSku: "CP-BAG-TAXILA-GANDHARA",
    blankKey: "laptop-bag",
    description: "Minimalist stone stupa and Gandharan relief vector print on heavy-duty water-resistant padded canvas.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_taxila_gandhara.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Heather Grey", hex: "#475569" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["14 Inch", "15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "TAXILA ARCHIVES",
      subTitle: "GANDHARA HERITAGE • 500 BCE",
      theme: "taxila_bag",
      colors: ["#94a3b8", "#ffffff", "#cbd5e1"]
    }
  },
  {
    id: "prod-bag-urdu-calligraphy",
    name: "'Ilm O Hunar' (علم و ہنر) Modern Calligraphy Bag",
    category: "laptop-bags",
    categoryName: "Urdu Calligraphy Briefcase",
    baseCost: 1650,
    profit: 800,
    retailPrice: 2450,
    image: "assets/pk_products/bag_urdu_calligraphy.jpg",
    blankSku: "CP-BAG-ILM-O-HUNAR",
    blankKey: "laptop-bag",
    description: "Abstract modern Kufic letterforms 'علم و ہنر' (Knowledge & Skill) printed in gunmetal gray on onyx black shell.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_urdu_calligraphy.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "ILM O HUNAR",
      subTitle: "علم و ہنر • KNOWLEDGE & CRAFT",
      theme: "calligraphy_bag",
      colors: ["#10b981", "#ffffff", "#64748b"]
    }
  },
  {
    id: "prod-bag-monument-wireframe",
    name: "Pakistan Monument 3D Wireframe CAD Briefcase",
    category: "laptop-bags",
    categoryName: "Architectural Wireframe Bag",
    baseCost: 1750,
    profit: 800,
    retailPrice: 2550,
    image: "assets/pk_products/bag_monument_wireframe.jpg",
    blankSku: "CP-BAG-PAK-MONUMENT-CAD",
    blankKey: "laptop-bag",
    description: "Blooming petal granite architecture of Islamabad's Pakistan Monument deconstructed into technical CAD blueprint vectors.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_monument_wireframe.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "PAKISTAN MONUMENT",
      subTitle: "3D CAD BLUEPRINT // SHAKARPARIAN",
      theme: "monument_bag",
      colors: ["#38bdf8", "#0284c7", "#ffffff"]
    }
  },
  {
    id: "prod-bag-laptop-cyberpunk",
    name: "Neo-Tokyo Cyberpunk Tech Sleeve (15.6\")",
    category: "laptop-bags",
    categoryName: "Cyberpunk Tech Sleeve",
    baseCost: 1600,
    profit: 800,
    retailPrice: 2400,
    image: "assets/blank_laptop_bag_front.jpg",
    blankSku: "CP-BAG-CYBERPUNK-SLEEVE",
    blankKey: "laptop-bag",
    description: "Cyberpunk tech sleeve with water-resistant neoprene exterior, heavy-duty YKK zips, and plush velvet scratch protection.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/blank_laptop_bag_front.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["15.6 Inch Standard"]
  },
  {
    id: "prod-bag-karachi-harbor",
    name: "Karachi Maritime Deep-Sea Navigational Bag",
    category: "laptop-bags",
    categoryName: "Maritime Navigational Bag",
    baseCost: 1700,
    profit: 800,
    retailPrice: 2500,
    image: "assets/pk_products/bag_karachi_harbor.jpg",
    blankSku: "CP-BAG-KHI-MARITIME",
    blankKey: "laptop-bag",
    description: "Nautical chart contours and Arabian Sea shipping lane coordinates printed on water-resistant marine-grade canvas.",
    angles: [
      { id: "front", label: "Front Exterior", icon: "💼", image: "assets/pk_products/bag_karachi_harbor.jpg" },
      { id: "back", label: "Back Exterior", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["15.6 Inch Standard"],
    design: {
      base: "assets/blank_laptop_bag_front.jpg",
      badgeTitle: "ARABIAN SEA CHARTS",
      subTitle: "PORT OF KARACHI // 24.86° N",
      theme: "maritime_bag",
      colors: ["#0ea5e9", "#38bdf8", "#ffffff"]
    }
  },

  // ==========================================
  // 6. NOTEBOOKS & DIARIES (diaries) - 10 Products
  // ==========================================
  {
    id: "prod-diary-executive",
    name: "Executive Hardcover Notebook (A5 192 Pgs)",
    category: "diaries",
    categoryName: "Executive Hardcover Notebook",
    baseCost: 650,
    profit: 600,
    retailPrice: 1250,
    image: "assets/blank_notebook_front.jpg",
    blankSku: "CP-DIARY-HARDCOVER-A5-192P",
    blankKey: "notebook",
    description: "192 ruled bleed-resistant pages (80 GSM). Ribbon bookmark, expandable inner pocket, and pen loop on PU leather cover.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/blank_notebook_front.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Classic Black", hex: "#111216" },
      { name: "Royal Navy Blue", hex: "#1e3a8a" },
      { name: "Bottle Green", hex: "#166534" },
      { name: "Tan Brown", hex: "#92400e" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"]
  },
  {
    id: "prod-diary-iqbal-khudi",
    name: "Allama Iqbal 'Khudi' Gold Foil Hardcover Journal",
    category: "diaries",
    categoryName: "Gold Foil Heritage Notebook",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/diary_iqbal_khudi.jpg",
    blankSku: "CP-DIARY-IQBAL-KHUDI",
    blankKey: "notebook",
    description: "Matte black soft-touch hardcover stamped with shimmering metallic gold 'خودی' calligraphy and geometric Mughal framing.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_iqbal_khudi.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Classic Black", hex: "#111216" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "ALLAMA IQBAL",
      subTitle: "خودی کو کر بلند اتنا • GOLD FOIL",
      theme: "gold_diary",
      colors: ["#eab308", "#ca8a04", "#ffffff"]
    }
  },
  {
    id: "prod-diary-multan-kashigari",
    name: "Multani Kashigari Cobalt Blue Hardcover Notebook",
    category: "diaries",
    categoryName: "Ceramic Tile Art Journal",
    baseCost: 700,
    profit: 600,
    retailPrice: 1300,
    image: "assets/pk_products/diary_multan_kashigari.jpg",
    blankSku: "CP-DIARY-MULTAN-KASHIGARI",
    blankKey: "notebook",
    description: "Traditional floral cobalt Kashigari tilework on premium textured linen hardcover with turquoise page ribbon.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_multan_kashigari.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Royal Navy Blue", hex: "#1e3a8a" },
      { name: "Classic Black", hex: "#111216" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "MULTANI KASHIGARI",
      subTitle: "BLUE POTTERY NOTEBOOK • ملتان",
      theme: "kashigari_diary",
      colors: ["#0284c7", "#38bdf8", "#ffffff"]
    }
  },
  {
    id: "prod-diary-faiz-bol",
    name: "Faiz Poetry Collection A5 Executive Notebook",
    category: "diaries",
    categoryName: "Literary Heritage Notebook",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/diary_faiz_bol.jpg",
    blankSku: "CP-DIARY-FAIZ-BOL",
    blankKey: "notebook",
    description: "Deep burgundy textured hardcover debossed with Faiz Ahmad Faiz's verses and Swiss typography metadata spine.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_faiz_bol.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Classic Black", hex: "#111216" },
      { name: "Tan Brown", hex: "#92400e" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "FAIZ AHMAD FAIZ",
      subTitle: "نقش فریادی • POETRY JOURNAL",
      theme: "faiz_diary",
      colors: ["#dc2626", "#ffffff", "#94a3b8"]
    }
  },
  {
    id: "prod-diary-truck-art-radiant",
    name: "Radiant Truck Art Chamakpatti Art Journal",
    category: "diaries",
    categoryName: "Folk Art Diary",
    baseCost: 700,
    profit: 600,
    retailPrice: 1300,
    image: "assets/pk_products/diary_truck_art_radiant.jpg",
    blankSku: "CP-DIARY-TRUCKART-RAD",
    blankKey: "notebook",
    description: "Vibrant folk art rosettes, peacocks, and floral arabesques with high-gloss spot UV accents on heavy 120 GSM ivory pages.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_truck_art_radiant.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Classic Black", hex: "#111216" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "TRUCK ART RADIANT",
      subTitle: "چمک پٹی آرٹ ڈائری • FOLK POP",
      theme: "truck_art_diary",
      colors: ["#ec4899", "#ca8a04", "#06b6d4"]
    }
  },
  {
    id: "prod-diary-karakoram-field",
    name: "Karakoram Mountaineer Expedition Field Log",
    category: "diaries",
    categoryName: "Expedition Field Log",
    baseCost: 650,
    profit: 600,
    retailPrice: 1250,
    image: "assets/pk_products/diary_karakoram_field.jpg",
    blankSku: "CP-DIARY-KARAKORAM-LOG",
    blankKey: "notebook",
    description: "Weather-resistant rugged kraft hardcover with contour topo map of Baltoro Glacier and altitude ascent chart.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_karakoram_field.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Tan Brown", hex: "#92400e" },
      { name: "Classic Black", hex: "#111216" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "KARAKORAM FIELD LOG",
      subTitle: "BALTORO EXPEDITION • K2 8611M",
      theme: "field_diary",
      colors: ["#38bdf8", "#ffffff", "#94a3b8"]
    }
  },
  {
    id: "prod-diary-sukoon-minimal",
    name: "'Sukoon' (سکون) Minimalist Sage Cloth Notebook",
    category: "diaries",
    categoryName: "Minimalist Cloth Journal",
    baseCost: 680,
    profit: 600,
    retailPrice: 1280,
    image: "assets/pk_products/diary_sukoon_minimal.jpg",
    blankSku: "CP-DIARY-SUKOON-SAGE",
    blankKey: "notebook",
    description: "Calming botanical aesthetic. Textured cloth cover with gold foil-stamped Nastaliq calligraphy 'سکون' (Peace).",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_sukoon_minimal.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Bottle Green", hex: "#166534" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "SUKOON // سکون",
      subTitle: "SERENITY JOURNAL",
      theme: "sukoon_diary",
      colors: ["#10b981", "#ffffff", "#86efac"]
    }
  },
  {
    id: "prod-diary-badshahi-blueprint",
    name: "Badshahi Mosque Architectural Blueprint Journal",
    category: "diaries",
    categoryName: "Architectural Blueprint Journal",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/diary_badshahi_blueprint.jpg",
    blankSku: "CP-DIARY-BADSHAHI-BLUEPRINT",
    blankKey: "notebook",
    description: "Red sandstone texture with intricate white CAD blueprint lines of Badshahi Mosque's triple marble domes and grand arch.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_badshahi_blueprint.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Classic Black", hex: "#111216" },
      { name: "Tan Brown", hex: "#92400e" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "BADSHAHI MOSQUE",
      subTitle: "LAHORE ARCHITECTURE • 1673",
      theme: "badshahi_diary",
      colors: ["#f59e0b", "#ffffff", "#b45309"]
    }
  },
  {
    id: "prod-diary-dhabba-chai",
    name: "Dhabba Chronicles Cutting Chai Pocket Diary",
    category: "diaries",
    categoryName: "Pop Culture Pocket Diary",
    baseCost: 650,
    profit: 600,
    retailPrice: 1250,
    image: "assets/pk_products/diary_dhabba_chai.jpg",
    blankSku: "CP-DIARY-DHABBA-CHAI",
    blankKey: "notebook",
    description: "Warm kraft cardstock cover featuring vintage chai kettle art, tea glasses, and humorous Pakistani dhabba slogans.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_dhabba_chai.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Tan Brown", hex: "#92400e" },
      { name: "Classic Black", hex: "#111216" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "DHABBA CHRONICLES",
      subTitle: "چائے کا وقت // KARAK CHAI",
      theme: "chai_diary",
      colors: ["#ea580c", "#ca8a04", "#78350f"]
    }
  },
  {
    id: "prod-diary-mohenjodaro",
    name: "Indus Seal Script Archaeologist Notebook",
    category: "diaries",
    categoryName: "Archaeological Journal",
    baseCost: 750,
    profit: 600,
    retailPrice: 1350,
    image: "assets/pk_products/diary_mohenjodaro.jpg",
    blankSku: "CP-DIARY-INDUS-SEAL",
    blankKey: "notebook",
    description: "Minimalist embossed Unicorn seal and King Priest terracotta relief on bone-white leatherette hardcover.",
    angles: [
      { id: "front", label: "Front Cover", icon: "📓", image: "assets/pk_products/diary_mohenjodaro.jpg" },
      { id: "back", label: "Back Cover", icon: "🔄", image: "assets/blank_notebook_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Classic Black", hex: "#111216" }
    ],
    sizes: ["A5 Hardcover (192 Pgs)"],
    design: {
      base: "assets/blank_notebook_front.jpg",
      badgeTitle: "INDUS EXCAVATION",
      subTitle: "MOHENJO-DARO 2500 BCE",
      theme: "mohenjo_diary",
      colors: ["#d97706", "#ffffff", "#78350f"]
    }
  }
];

// Playwright Mockup Renderer Function
async function renderAllProductMockups() {
  console.log(`Starting generation for ${PK_PRODUCTS.length} products...`);
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 800, height: 800 } });

  const productsWithDesign = PK_PRODUCTS.filter(p => p.design);
  console.log(`Rendering ${productsWithDesign.length} custom graphic print mockups...`);

  for (let i = 0; i < productsWithDesign.length; i++) {
    const prod = productsWithDesign[i];
    const design = prod.design;
    const destPath = path.join(__dirname, prod.image);

    // Read base image as base64
    const baseFile = path.join(__dirname, design.base);
    let baseDataUrl = '';
    if (fs.existsSync(baseFile)) {
      const ext = path.extname(baseFile).replace('.', '') === 'jpg' ? 'jpeg' : 'png';
      baseDataUrl = `data:image/${ext};base64,` + fs.readFileSync(baseFile).toString('base64');
    }

    const dataUrl = await page.evaluate(async ({ baseDataUrl, design, prodName, cat }) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');

      // 1. Draw base product mockup
      if (baseDataUrl) {
        const img = new Image();
        await new Promise((res) => {
          img.onload = res;
          img.onerror = res;
          img.src = baseDataUrl;
        });
        ctx.drawImage(img, 0, 0, 800, 800);
      } else {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 800, 800);
      }

      // 2. Graphic Overlay Position depending on product category
      let cx = 400, cy = 420, scale = 1;
      if (cat === 'tees') { cx = 400; cy = 410; scale = 0.95; }
      else if (cat === 'hoodies') { cx = 400; cy = 460; scale = 0.85; }
      else if (cat === 'mugs') { cx = 490; cy = 425; scale = 0.72; }
      else if (cat === 'caps') { cx = 400; cy = 340; scale = 0.65; }
      else if (cat === 'laptop-bags') { cx = 400; cy = 420; scale = 0.9; }
      else if (cat === 'diaries') { cx = 400; cy = 410; scale = 0.85; }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Design Card / Emblem
      const w = 260;
      const h = 260;
      const x = -w / 2;
      const y = -h / 2;

      // Outer badge shape
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;

      // Theme Background & Borders
      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 14);
      ctx.fill();

      // Border gradient
      ctx.lineWidth = 3;
      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, design.colors[0] || '#ec4899');
      grad.addColorStop(0.5, design.colors[1] || '#eab308');
      grad.addColorStop(1, design.colors[2] || '#06b6d4');
      ctx.strokeStyle = grad;
      ctx.stroke();

      // Inner ornate corner accents
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = design.colors[1] || '#eab308';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 10, y + 10, w - 20, h - 20);

      // Center Graphic Icon / Motif
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Top Tag
      ctx.fillStyle = design.colors[0] || '#38bdf8';
      ctx.font = '900 13px system-ui, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText(design.badgeTitle, 0, -65);

      // Center Emblem
      ctx.fillStyle = design.colors[1] || '#eab308';
      let centerIcon = '🇵🇰';
      if (design.theme.includes('truck')) centerIcon = '🦚';
      else if (design.theme.includes('chai')) centerIcon = '☕';
      else if (design.theme.includes('poetry') || design.theme.includes('urdu')) centerIcon = '✒️';
      else if (design.theme.includes('k2') || design.theme.includes('alpine')) centerIcon = '🏔️';
      else if (design.theme.includes('cricket')) centerIcon = '🏏';
      else if (design.theme.includes('cyber')) centerIcon = '⚡';
      else if (design.theme.includes('sufi')) centerIcon = '🌀';
      else if (design.theme.includes('kashigari')) centerIcon = '💠';
      else if (design.theme.includes('heritage')) centerIcon = '🕌';

      ctx.font = '48px sans-serif';
      ctx.fillText(centerIcon, 0, -5);

      // Subtitle / Urdu Calligraphy Line
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px system-ui, "Noto Nastaliq Urdu", sans-serif';
      ctx.fillText(design.subTitle, 0, 55);

      // Bottom Studio Stamp
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '700 9px monospace';
      ctx.letterSpacing = '1px';
      ctx.fillText('MF STORE × CEEPRINTO • ORIGINAL PK', 0, 85);

      ctx.restore();

      return canvas.toDataURL('image/jpeg', 0.92);
    }, { baseDataUrl, design, prodName: prod.name, cat: prod.category });

    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    fs.writeFileSync(destPath, buffer);
    console.log(`[${i + 1}/${productsWithDesign.length}] Generated ${prod.image} (${buffer.length} bytes)`);
  }

  await browser.close();
  console.log('All product mockups generated successfully!');
}

// Update app.js Catalog
function updateAppJs() {
  const appPath = path.join(__dirname, 'app.js');
  let appCode = fs.readFileSync(appPath, 'utf8');

  // Strip design helper metadata from final catalog array for clean production payload
  const cleanCatalog = PK_PRODUCTS.map(p => {
    const copy = { ...p };
    delete copy.design;
    return copy;
  });

  const catalogStr = 'const PRODUCTS = ' + JSON.stringify(cleanCatalog, null, 2) + ';';

  // Replace PRODUCTS array in app.js
  const regex = /const PRODUCTS = \[[\s\S]*?\n\];/;
  if (regex.test(appCode)) {
    appCode = appCode.replace(regex, catalogStr);
    console.log('Successfully replaced PRODUCTS array in app.js!');
  } else {
    console.error('Could not match PRODUCTS array regex in app.js');
    return;
  }

  // Update renderProducts categories to cleanly separate all 6 categories
  const categoriesRegex = /const categories = \[[\s\S]*?items: PRODUCTS\.filter\(p => p\.category === "laptop-bags"\)\s*\}\s*\];/;
  const newCategories = `const categories = [
      {
        id: "tees",
        title: "👕 Premium T-Shirts Collection",
        desc: "210-240 GSM super combed cotton, modern truck art pop, Faiz poetry, and streetwear prints.",
        items: PRODUCTS.filter(p => p.category === "tees")
      },
      {
        id: "hoodies",
        title: "🧥 Heavyweight Streetwear Hoodies",
        desc: "380 GSM fleece interior, Karakoram K2 expedition topo maps, Sufi grunge, and Multan pottery prints.",
        items: PRODUCTS.filter(p => p.category === "hoodies")
      },
      {
        id: "mugs",
        title: "☕ Ceramic Cups & Modern Mugs",
        desc: "11 oz ceramic drinkware featuring 'Pehlay Chai Phir Kaam', 'Dekh Magar Pyar Se', and Iqbal Khudi gold art.",
        items: PRODUCTS.filter(p => p.category === "mugs")
      },
      {
        id: "caps",
        title: "🧢 Structured Baseball & Street Caps",
        desc: "Structured cotton twill headwear with '92 Cornered Tigers, Truck Art Crest, and Karakoram Alpine patches.",
        items: PRODUCTS.filter(p => p.category === "caps")
      },
      {
        id: "diaries",
        title: "📓 Executive Hardcover Notebooks & Journals",
        desc: "192-page ruled vegan leatherette hardcover executive diaries with gold foil calligraphy and heritage art.",
        items: PRODUCTS.filter(p => p.category === "diaries")
      },
      {
        id: "laptop-bags",
        title: "💼 Executive Waterproof Laptop Bags & Sleeves",
        desc: "Heavy-duty 360° padded foam briefcase cases with Multani Kashigari and technical contour prints.",
        items: PRODUCTS.filter(p => p.category === "laptop-bags")
      }
    ];`;

  if (categoriesRegex.test(appCode)) {
    appCode = appCode.replace(categoriesRegex, newCategories);
    console.log('Successfully updated category groupings in renderProducts()!');
  }

  fs.writeFileSync(appPath, appCode, 'utf8');
  console.log('Updated app.js written to disk!');
}

(async () => {
  await renderAllProductMockups();
  updateAppJs();
  console.log('Done! 66 products generated and applied.');
})();
