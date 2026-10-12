const fs = require('fs');
const path = require('path');

console.log('Revamping MF Store to clean luxury storefront with real trending prints...');

// 1. Curated High-Converting Catalog across all 4 requested themes + categories
const TRENDING_PRODUCTS = [
  // ==========================================
  // THEME 1: PAKISTAN CRICKET EDITION
  // ==========================================
  {
    id: "prod-cricket-jersey-tee",
    name: "Pakistan Cricket Official '92-26 National Green Jersey Tee",
    theme: "cricket",
    category: "tees",
    categoryName: "National Cricket Edition",
    badge: "🏏 CRICKET SPECIAL",
    baseCost: 850,
    profit: 800,
    retailPrice: 1650,
    image: "assets/trending/pk_cricket_tee.jpg",
    description: "Official Pakistan national cricket emerald green jersey print with gold-foil crescent and crossed bats crest on 240 GSM breathable combed cotton.",
    angles: [
      { id: "front", label: "Front Jersey View", icon: "👁️", image: "assets/trending/pk_cricket_tee.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Pakistan Green", hex: "#15803d" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-cricket-babar56-tee",
    name: "Babar Azam 56 'Cover Drive King' Fan Edition Tee",
    theme: "cricket",
    category: "tees",
    categoryName: "Athlete Signature Edition",
    badge: "🏏 CRICKET SPECIAL",
    baseCost: 850,
    profit: 740,
    retailPrice: 1590,
    image: "assets/trending/babar56_tee.jpg",
    description: "Iconic #56 Babar Azam cover drive typographic tribute on 210 GSM heavyweight cotton. High-density gold and green inks.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/trending/babar56_tee.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pakistan Green", hex: "#15803d" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-cricket-emerald-mug",
    name: "Pakistan Cricket Emerald & Gold Crest Ceramic Mug",
    theme: "cricket",
    category: "mugs",
    categoryName: "Cricket Drinkware",
    badge: "🏏 CRICKET SPECIAL",
    baseCost: 550,
    profit: 600,
    retailPrice: 1150,
    image: "assets/trending/pk_cricket_mug.jpg",
    description: "Glossy deep forest green ceramic mug with 24k gold-finish Pakistan Cricket crescent, star, and crossed bats emblem. Dishwasher and microwave safe.",
    angles: [
      { id: "front", label: "Front Crest View", icon: "👁️", image: "assets/trending/pk_cricket_mug.jpg" },
      { id: "left", label: "Left Angle", icon: "☕", image: "assets/ceeprinto_mug_left_stage.webp" },
      { id: "right", label: "Right Angle", icon: "📐", image: "assets/ceeprinto_mug_right_stage.webp" }
    ],
    colors: [
      { name: "Pakistan Green", hex: "#15803d" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Ceramic Mug"]
  },
  {
    id: "prod-cricket-green-hoodie",
    name: "Pakistan Cricket National Green Heavyweight Fleece Hoodie",
    theme: "cricket",
    category: "hoodies",
    categoryName: "Heavyweight Fleece Streetwear",
    badge: "🏏 CRICKET SPECIAL",
    baseCost: 2100,
    profit: 1150,
    retailPrice: 3250,
    image: "assets/trending/pk_cricket_hoodie.jpg",
    description: "380 GSM thermal brushed fleece hoodie in national forest green with metallic gold star and crescent emblem on chest. Warm kangaroo pocket and ribbed cuffs.",
    angles: [
      { id: "front", label: "Front Hoodie View", icon: "👁️", image: "assets/trending/pk_cricket_hoodie.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Forest Green", hex: "#15803d" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#9ca3af" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-cricket-twill-cap",
    name: "Pakistan Cricket National Green Embroidered Twill Cap",
    theme: "cricket",
    category: "caps",
    categoryName: "Structured Headwear",
    badge: "🏏 CRICKET SPECIAL",
    baseCost: 650,
    profit: 640,
    retailPrice: 1290,
    image: "assets/trending/pk_cricket_cap.jpg",
    description: "Structured 6-panel cotton twill cap with 3D raised gold embroidered Pakistan Cricket star crest and adjustable antique brass strapback buckle.",
    angles: [
      { id: "front", label: "Front Crown View", icon: "👁️", image: "assets/trending/pk_cricket_cap.jpg" },
      { id: "back", label: "Back Strap Angle", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Forest Green", hex: "#15803d" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["Adjustable Strapback (One Size)"]
  },
  {
    id: "prod-cricket-laptop-briefcase",
    name: "Pakistan Cricket Executive Shockproof Laptop Briefcase (15.6\")",
    theme: "cricket",
    category: "laptop-bags",
    categoryName: "Executive Tech Luggage",
    badge: "🏏 CRICKET SPECIAL",
    baseCost: 1550,
    profit: 1100,
    retailPrice: 2650,
    image: "assets/trending/cricket_laptop_bag.jpg",
    description: "Water-resistant ballistic nylon briefcase with genuine leather accents, 360° padded laptop protection compartment, and gold Pakistan Cricket crest.",
    angles: [
      { id: "front", label: "Front Briefcase View", icon: "👁️", image: "assets/trending/cricket_laptop_bag.jpg" },
      { id: "back", label: "Back Luggage Strap", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Executive Green", hex: "#15803d" },
      { name: "Obsidian Black", hex: "#111216" }
    ],
    sizes: ["15.6\" Padded Briefcase"]
  },

  // ==========================================
  // THEME 2: EID MUBARAK & ISLAMIC FESTIVE
  // ==========================================
  {
    id: "prod-eid-gold-calligraphy-tee",
    name: "'Eid Mubarak' Luxury Gold Arabic Calligraphy Streetwear Tee",
    theme: "eid",
    category: "tees",
    categoryName: "Festive Luxury Apparel",
    badge: "🌙 EID FESTIVE",
    baseCost: 850,
    profit: 800,
    retailPrice: 1650,
    image: "assets/trending/eid_mubarak_tee.jpg",
    description: "240 GSM combed cotton oversized streetwear tee featuring metallic gold Arabic calligraphy of 'Eid Mubarak' with intricate crescent moon and star motifs.",
    angles: [
      { id: "front", label: "Front Calligraphy View", icon: "👁️", image: "assets/trending/eid_mubarak_tee.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Beige Cream", hex: "#d4b996" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-eid-gold-crescent-mug",
    name: "'Eid Mubarak' White Ceramic & Gold Crescent Coffee Mug",
    theme: "eid",
    category: "mugs",
    categoryName: "Festive Drinkware",
    badge: "🌙 EID FESTIVE",
    baseCost: 550,
    profit: 600,
    retailPrice: 1150,
    image: "assets/trending/eid_mubarak_mug.jpg",
    description: "Premium pure white ceramic mug with reflective gold foil Eid Mubarak calligraphy and floral crescent moon. Perfect celebratory gift for family and loved ones.",
    angles: [
      { id: "front", label: "Front Calligraphy View", icon: "👁️", image: "assets/trending/eid_mubarak_mug.jpg" },
      { id: "left", label: "Left Angle", icon: "☕", image: "assets/ceeprinto_mug_left_stage.webp" },
      { id: "right", label: "Right Angle", icon: "📐", image: "assets/ceeprinto_mug_right_stage.webp" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Glossy Black", hex: "#111216" }
    ],
    sizes: ["11 oz Ceramic Mug"]
  },
  {
    id: "prod-eid-gold-hoodie",
    name: "'Eid Mubarak' Gold Arabic Calligraphy Heavyweight Fleece Hoodie",
    theme: "eid",
    category: "hoodies",
    categoryName: "Festive Luxury Streetwear",
    badge: "🌙 EID FESTIVE",
    baseCost: 2100,
    profit: 1000,
    retailPrice: 3100,
    image: "assets/trending/eid_hoodie.jpg",
    description: "380 GSM heavyweight thermal fleece hoodie with shiny gold Arabic calligraphy 'Eid Mubarak' and crescent moon art. Ultra warm, soft, and celebratory.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/trending/eid_hoodie.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Forest Green", hex: "#15803d" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-eid-gold-cap",
    name: "'Eid Mubarak' Gold Embroidered Structured Strapback Cap",
    theme: "eid",
    category: "caps",
    categoryName: "Festive Headwear",
    badge: "🌙 EID FESTIVE",
    baseCost: 650,
    profit: 600,
    retailPrice: 1250,
    image: "assets/trending/eid_cap.jpg",
    description: "Heavy twill structured 6-panel cap with golden crescent moon and Eid Mubarak embroidery. Subtle, tasteful celebratory design.",
    angles: [
      { id: "front", label: "Front View", icon: "👁️", image: "assets/trending/eid_cap.jpg" },
      { id: "back", label: "Back View", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Beige Khaki", hex: "#d4b996" }
    ],
    sizes: ["Adjustable Strapback"]
  },
  {
    id: "prod-eid-laptop-sleeve",
    name: "Luxury Islamic Arabesque Gold & Black 'Noor' Laptop Sleeve",
    theme: "eid",
    category: "laptop-bags",
    categoryName: "Luxury Tech Accessory",
    badge: "🌙 EID FESTIVE",
    baseCost: 1550,
    profit: 1100,
    retailPrice: 2650,
    image: "assets/trending/eid_laptop_bag.jpg",
    description: "Quilted waterproof velvet-touch laptop sleeve with ornate gold Islamic geometric arabesque borders and Arabic calligraphy. Shock-absorbent padding.",
    angles: [
      { id: "front", label: "Front Sleeve View", icon: "👁️", image: "assets/trending/eid_laptop_bag.jpg" },
      { id: "back", label: "Back View", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Black & Gold", hex: "#111216" }
    ],
    sizes: ["15.6\" Padded Sleeve"]
  },

  // ==========================================
  // THEME 3: HUSBAND & WIFE / COUPLE SETS
  // ==========================================
  {
    id: "prod-couple-matching-tees",
    name: "'Hubby & Wifey' Matching Romantic Couple T-Shirts (2-Piece Set)",
    theme: "couple",
    category: "tees",
    categoryName: "Matching Couple Apparel",
    badge: "💍 COUPLE SET",
    baseCost: 1600,
    profit: 1250,
    retailPrice: 2850,
    image: "assets/trending/couple_matching_tee.jpg",
    description: "Includes TWO premium tees: 1 Black 'Hubby' Tee + 1 White 'Wifey' Tee with elegant gold hearts and modern flowing script calligraphy. 100% Combed Cotton.",
    angles: [
      { id: "front", label: "Pair Flatlay View", icon: "👁️", image: "assets/trending/couple_matching_tee.jpg" },
      { id: "back", label: "Back Plain Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Black & White Pair", hex: "#111216" },
      { name: "Navy & White Pair", hex: "#1e3a8a" }
    ],
    sizes: ["Men M + Women S", "Men L + Women M", "Men XL + Women L", "Custom Pair Sizes"]
  },
  {
    id: "prod-couple-matching-mugs",
    name: "'Hubby & Wifey' Matte Black & Marble Ceramic Couple Mugs Set",
    theme: "couple",
    category: "mugs",
    categoryName: "Couple Drinkware Set",
    badge: "💍 COUPLE SET",
    baseCost: 990,
    profit: 1000,
    retailPrice: 1990,
    image: "assets/trending/couple_mugs.jpg",
    description: "Set of TWO luxury mugs: 1 Matte Black 'Hubby' mug + 1 Italian Marble Glaze 'Wifey' mug with real 24k gold-accented handles and rims. Gift boxed.",
    angles: [
      { id: "front", label: "2-Mug Set View", icon: "👁️", image: "assets/trending/couple_mugs.jpg" },
      { id: "left", label: "Left View", icon: "☕", image: "assets/ceeprinto_mug_left_stage.webp" }
    ],
    colors: [
      { name: "Matte Black & Marble", hex: "#111216" }
    ],
    sizes: ["2-Piece Gift Box Set (11 oz each)"]
  },
  {
    id: "prod-couple-king-queen-hoodies",
    name: "'KING & QUEEN' Crown Heavyweight Couple Hoodies (Pair of 2)",
    theme: "couple",
    category: "hoodies",
    categoryName: "Matching Couple Winterwear",
    badge: "💍 COUPLE SET",
    baseCost: 3800,
    profit: 1650,
    retailPrice: 5450,
    image: "assets/trending/couple_hoodie.jpg",
    description: "Includes TWO heavyweight 380 GSM hoodies: 1 Black 'KING' Hoodie with Gold Crown + 1 Heather Grey 'QUEEN' Hoodie with Gold Crown. Ultra-cozy winter fleece.",
    angles: [
      { id: "front", label: "Pair Flatlay View", icon: "👁️", image: "assets/trending/couple_hoodie.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Black (King) + Grey (Queen)", hex: "#111216" },
      { name: "Black (King) + White (Queen)", hex: "#374151" }
    ],
    sizes: ["Men M + Women S", "Men L + Women M", "Men XL + Women L", "Custom Pair Sizes"]
  },
  {
    id: "prod-couple-mr-mrs-caps",
    name: "'Mr. & Mrs.' Soulmates Matching Embroidered Caps (Pair of 2)",
    theme: "couple",
    category: "caps",
    categoryName: "Couple Headwear Set",
    badge: "💍 COUPLE SET",
    baseCost: 1100,
    profit: 1090,
    retailPrice: 2190,
    image: "assets/trending/couple_caps.jpg",
    description: "Set of TWO structured twill strapback caps: Gold crown embroidery with 'MR & MRS SOULMATES FOREVER'. Adjustable antique buckles.",
    angles: [
      { id: "front", label: "Pair Front View", icon: "👁️", image: "assets/trending/couple_caps.jpg" },
      { id: "back", label: "Back Strap View", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Black (Mr) + White (Mrs)", hex: "#111216" }
    ],
    sizes: ["Adjustable Strapbacks (Pair)"]
  },
  {
    id: "prod-couple-better-together-bag",
    name: "'Better Together' Husband & Wife Padded Laptop Briefcase",
    theme: "couple",
    category: "laptop-bags",
    categoryName: "Keepsake Travel Tech Bag",
    badge: "💍 COUPLE SET",
    baseCost: 1450,
    profit: 1000,
    retailPrice: 2450,
    image: "assets/trending/couple_laptop_bag.jpg",
    description: "Executive water-resistant laptop sleeve featuring romantic gold wedding ring and 'Better Together - Husband & Wife Soulmate Edition' typographic print.",
    angles: [
      { id: "front", label: "Front View", icon: "👁️", image: "assets/trending/couple_laptop_bag.jpg" },
      { id: "back", label: "Back View", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["15.6\" Padded Sleeve"]
  },

  // ==========================================
  // THEME 4: HAPPY BIRTHDAY CELEBRATIONS
  // ==========================================
  {
    id: "prod-birthday-vintage-legend-tee",
    name: "'Vintage Legend - Aged to Perfection' Birthday Celebration Tee",
    theme: "birthday",
    category: "tees",
    categoryName: "Birthday Special Edition",
    badge: "🎂 BIRTHDAY SPECIAL",
    baseCost: 850,
    profit: 740,
    retailPrice: 1590,
    image: "assets/trending/birthday_tee.jpg",
    description: "Washed black aesthetic vintage typography 'Limited Edition - Vintage Legend - Aged to Perfection'. Best-selling birthday gift tee for all ages.",
    angles: [
      { id: "front", label: "Front Vintage View", icon: "👁️", image: "assets/trending/birthday_tee.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Washed Black", hex: "#1f2937" },
      { name: "Pure White", hex: "#ffffff" },
      { name: "Charcoal Grey", hex: "#374151" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-birthday-superstar-mug",
    name: "'Happy Birthday Superstar' Festive Ceramic Coffee Mug",
    theme: "birthday",
    category: "mugs",
    categoryName: "Celebration Drinkware",
    badge: "🎂 BIRTHDAY SPECIAL",
    baseCost: 550,
    profit: 550,
    retailPrice: 1100,
    image: "assets/trending/birthday_mug.jpg",
    description: "Vibrant ceramic coffee mug with 'Happy Birthday' calligraphy, colorful party confetti, gift boxes, and balloons. Comes in a celebratory gift box.",
    angles: [
      { id: "front", label: "Front Party View", icon: "👁️", image: "assets/trending/birthday_mug.jpg" },
      { id: "left", label: "Left View", icon: "☕", image: "assets/ceeprinto_mug_left_stage.webp" }
    ],
    colors: [
      { name: "Pure White Festive", hex: "#ffffff" }
    ],
    sizes: ["11 oz Ceramic Mug"]
  },
  {
    id: "prod-birthday-level-unlocked-hoodie",
    name: "'Level Unlocked - Happy Birthday' Heavyweight Street Hoodie",
    theme: "birthday",
    category: "hoodies",
    categoryName: "Celebration Streetwear",
    badge: "🎂 BIRTHDAY SPECIAL",
    baseCost: 2100,
    profit: 1000,
    retailPrice: 3100,
    image: "assets/trending/birthday_hoodie.jpg",
    description: "380 GSM thermal heavyweight hoodie printed with 'Level Unlocked - Happy Birthday Edition - Made For Celebrations'. Thick drawstrings and kangaroo pocket.",
    angles: [
      { id: "front", label: "Front Graphic View", icon: "👁️", image: "assets/trending/birthday_hoodie.jpg" },
      { id: "back", label: "Back View", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" },
      { name: "Heather Grey", hex: "#9ca3af" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-birthday-squad-cap",
    name: "'Birthday Squad - Limited Edition' Embroidered Party Cap",
    theme: "birthday",
    category: "caps",
    categoryName: "Celebration Headwear",
    badge: "🎂 BIRTHDAY SPECIAL",
    baseCost: 650,
    profit: 540,
    retailPrice: 1190,
    image: "assets/trending/birthday_cap.jpg",
    description: "Structured black baseball twill cap with embroidered birthday cake motif and bold 'BIRTHDAY SQUAD - LIMITED EDITION' lettering.",
    angles: [
      { id: "front", label: "Front View", icon: "👁️", image: "assets/trending/birthday_cap.jpg" },
      { id: "back", label: "Back View", icon: "🔄", image: "assets/blank_cap_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["Adjustable Strapback"]
  },
  {
    id: "prod-birthday-confetti-laptop-bag",
    name: "'Celebrate Every Moment' Happy Birthday Shockproof Laptop Bag",
    theme: "birthday",
    category: "laptop-bags",
    categoryName: "Celebration Tech Accessory",
    badge: "🎂 BIRTHDAY SPECIAL",
    baseCost: 1450,
    profit: 840,
    retailPrice: 2290,
    image: "assets/trending/birthday_laptop_bag.jpg",
    description: "Waterproof protective laptop sleeve with colorful celebration confetti and modern 'Happy Birthday - Celebrate Every Moment' typography.",
    angles: [
      { id: "front", label: "Front View", icon: "👁️", image: "assets/trending/birthday_laptop_bag.jpg" },
      { id: "back", label: "Back View", icon: "🔄", image: "assets/blank_laptop_bag_back.jpg" }
    ],
    colors: [
      { name: "Charcoal Grey", hex: "#374151" },
      { name: "Midnight Navy", hex: "#1e3a8a" }
    ],
    sizes: ["15.6\" Padded Sleeve"]
  },

  // ==========================================
  // THEME 5: ICONIC PAKISTANI CHAI & URBAN CULTURE
  // ==========================================
  {
    id: "prod-chai-dhabba-mug",
    name: "'Pehlay Chai Phir Kaam' Pakistani Dhabba Ceramic Mug",
    theme: "chai",
    category: "mugs",
    categoryName: "Iconic Pakistani Culture",
    badge: "☕ CHAI CLUB",
    baseCost: 550,
    profit: 500,
    retailPrice: 1050,
    image: "assets/trending/chai_mug.jpg",
    description: "The national anthem of every tea lover in Pakistan! Ceramic mug with 'پہلے چائے پھر کام ☕ Pehlay Chai Phir Kaam' typography.",
    angles: [
      { id: "front", label: "Front Chai View", icon: "👁️", image: "assets/trending/chai_mug.jpg" },
      { id: "left", label: "Left View", icon: "☕", image: "assets/ceeprinto_mug_left_stage.webp" }
    ],
    colors: [
      { name: "Dhabba White", hex: "#ffffff" }
    ],
    sizes: ["11 oz Ceramic Mug"]
  },
  {
    id: "prod-classic-white-tee",
    name: "Unisex Luxury Heavyweight White Tee (210 GSM Combed Cotton)",
    theme: "basics",
    category: "tees",
    categoryName: "Luxury Everyday Basics",
    badge: "⭐ BEST SELLER",
    baseCost: 850,
    profit: 600,
    retailPrice: 1450,
    image: "assets/blank_tshirt_front.jpg",
    description: "210 GSM super combed cotton regular cut tee with reinforced collar ribbing, ultra-soft feel, and breathable weave.",
    angles: [
      { id: "front", label: "Front Angle", icon: "👁️", image: "assets/blank_tshirt_front.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_tshirt_back.jpg" }
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" },
      { name: "Deep Navy", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-classic-fleece-hoodie",
    name: "Unisex Heavyweight Fleece Black Hoodie (380 GSM)",
    theme: "basics",
    category: "hoodies",
    categoryName: "Luxury Everyday Basics",
    badge: "⭐ BEST SELLER",
    baseCost: 2100,
    profit: 800,
    retailPrice: 2900,
    image: "assets/product3.jpg",
    description: "Heavyweight 380 GSM thermal brushed fleece hoodie with double-layer hood and deep front pouch pocket.",
    angles: [
      { id: "front", label: "Front Angle", icon: "👁️", image: "assets/product3.jpg" },
      { id: "back", label: "Back Angle", icon: "🔄", image: "assets/blank_hoodie_back.jpg" }
    ],
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Heather Grey", hex: "#9ca3af" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

// 2. Read and Update app.js
const appPath = path.join(__dirname, 'app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

// Replace PRODUCTS array in app.js
const productsStr = 'const PRODUCTS = ' + JSON.stringify(TRENDING_PRODUCTS, null, 2) + ';';
appCode = appCode.replace(/const PRODUCTS = \[[\s\S]*?\n\];/, productsStr);
console.log(`Updated PRODUCTS array with ${TRENDING_PRODUCTS.length} curated trending products.`);

// Update renderProductCard in app.js
const newCardFn = `function renderProductCard(product) {
  const currentVariant = AppState.selectedVariants[product.id] || {
    size: (product.sizes && product.sizes[0]) || "Standard",
    color: (product.colors && product.colors[0] && product.colors[0].name) || "White"
  };

  const angleCount = (product.angles && product.angles.length) || 1;
  const badgeText = product.badge || "⭐ POPULAR";

  return \`
    <article class="product-card" id="card-\${product.id}">
      <div class="product-thumb-wrapper" onclick="openProductDialog('\${product.id}')" style="cursor: pointer;">
        <img src="\${product.image}" alt="\${product.name}" class="product-img" loading="lazy">
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
            Color: <span style="color: #0f172a; font-weight: 800;">\${currentVariant.color}</span>
          </div>
          <div class="color-dots" style="display: flex; gap: 8px;">
            \${(product.colors || []).map(c => \`
              <div 
                class="color-dot \${c.name === currentVariant.color ? 'active' : ''}" 
                style="background-color: \${c.hex}; \${c.hex === '#ffffff' ? 'border: 1px solid #cbd5e1;' : ''}" 
                title="\${c.name}"
                onclick="event.stopPropagation(); selectColor('\${product.id}', '\${c.name}')">
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="product-actions" style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 8px; margin-top: auto;">
          <button class="btn-secondary" onclick="openProductDialog('\${product.id}')" style="padding: 11px 8px; font-size: 0.82rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 4px; border: 1.5px solid #cbd5e1; background: #f8fafc;" title="View multi-angle details">
            <span>👁️ 360° View</span>
          </button>
          <button class="btn-add-cart" onclick="openProductDialog('\${product.id}')" style="padding: 11px 8px; font-size: 0.82rem; font-weight: 800; background: #0f172a; color: #fff; border-radius: 8px; border: none; cursor: pointer;">
            <span>Select & Buy ➔</span>
          </button>
        </div>
      </div>
    </article>
  \`;
}`;

appCode = appCode.replace(/function renderProductCard\(product\) \{[\s\S]*?\n\}/, newCardFn);

// Update renderProducts to support theme filters + category filters
const newRenderProductsFn = `function renderProducts() {
  const container = document.getElementById("products-grid-container");
  if (!container) return;

  const allBtn = document.querySelector(".filter-btn[data-filter='all']");
  if (allBtn) allBtn.textContent = \`All Trending (\${PRODUCTS.length})\`;

  const filter = AppState.activeFilter || "all";
  let items = PRODUCTS;

  if (filter === "cricket") items = PRODUCTS.filter(p => p.theme === "cricket");
  else if (filter === "eid") items = PRODUCTS.filter(p => p.theme === "eid");
  else if (filter === "couple") items = PRODUCTS.filter(p => p.theme === "couple");
  else if (filter === "birthday") items = PRODUCTS.filter(p => p.theme === "birthday");
  else if (filter === "tees") items = PRODUCTS.filter(p => p.category === "tees");
  else if (filter === "mugs") items = PRODUCTS.filter(p => p.category === "mugs");
  else if (filter === "hoodies") items = PRODUCTS.filter(p => p.category === "hoodies");
  else if (filter === "caps") items = PRODUCTS.filter(p => p.category === "caps");
  else if (filter === "laptop-bags") items = PRODUCTS.filter(p => p.category === "laptop-bags");

  container.innerHTML = \`
    <div style="grid-column: 1 / -1; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 0.86rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
        Showing \${items.length} Products
      </span>
      <span style="font-size: 0.8rem; color: #047857; font-weight: 700; background: #dcfce7; padding: 4px 12px; border-radius: 99px;">
        🚚 Cash on Delivery Across Pakistan
      </span>
    </div>
    \${items.map(p => renderProductCard(p)).join('')}
  \`;
}`;

appCode = appCode.replace(/function renderProducts\(\) \{[\s\S]*?container\.innerHTML = `[\s\S]*?<\/div>[\s\S]*?\`;\s*\}\s*\}/, newRenderProductsFn);

// Ensure dialog customize button is hidden/removed in setupProductDialogEventListeners
appCode = appCode.replace(/if \(customizeBtn\) \{[\s\S]*?\}\s*\}/, `if (customizeBtn) customizeBtn.style.display = "none"; }`);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Updated app.js successfully with curated catalog & clean rendering.');

// 3. Update index.html: Remove Customizer Studio and Update Header/Hero/Filters
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// A. Clean Top Navigation
indexHtml = indexHtml.replace(/<nav aria-label="Primary Navigation">[\s\S]*?<\/nav>/, `<nav aria-label="Primary Navigation">
        <ul class="nav-links">
          <li><a href="#catalog" class="nav-link active" onclick="setCatalogFilter('all')">🛍️ All Products</a></li>
          <li><a href="#catalog" class="nav-link" onclick="setCatalogFilter('cricket')" style="color: #15803d; font-weight: 800;">🏏 Pakistan Cricket</a></li>
          <li><a href="#catalog" class="nav-link" onclick="setCatalogFilter('eid')" style="color: #b45309; font-weight: 800;">🌙 Eid Specials</a></li>
          <li><a href="#catalog" class="nav-link" onclick="setCatalogFilter('couple')" style="color: #be123c; font-weight: 800;">💍 Couple Sets</a></li>
          <li><a href="#catalog" class="nav-link" onclick="setCatalogFilter('birthday')" style="color: #6366f1; font-weight: 800;">🎂 Birthday Gifts</a></li>
          <li><a href="#orders-tracker" class="nav-link">📦 Track Order</a></li>
        </ul>
      </nav>`);

// B. Clean Top Header Action
indexHtml = indexHtml.replace(/<a href="#customizer-studio" class="btn-primary"[\s\S]*?<\/a>/, `<a href="#catalog" class="btn-primary" style="padding: 10px 22px; font-size: 0.84rem; display: inline-flex;">
          <span>Explore Catalog</span>
        </a>`);

// C. Clean Hero Section
indexHtml = indexHtml.replace(/<div class="hero-content">[\s\S]*?<\/div>\s*<div class="hero-media">/, `<div class="hero-content">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 6px 14px; border-radius: 99px; margin-bottom: 16px;">
            <span style="font-size: 0.8rem; font-weight: 800; color: #065f46;">🇵🇰 OFFICIAL PAKISTAN MERCHANDISE & GIFTING</span>
          </div>
          <h1 class="hero-title" style="font-size: 2.8rem; line-height: 1.15; font-weight: 900; color: #0f172a; margin-bottom: 16px;">
            Premium Printed Apparel & <br>
            <span class="serif-accent" style="color: #b45309; font-style: italic;">Memorable Lifestyle Gifts.</span>
          </h1>
          <p class="hero-desc" style="font-size: 1.05rem; color: #475569; line-height: 1.6; max-width: 540px; margin-bottom: 24px;">
            Shop official Pakistan Cricket jerseys, luxury gold-foil Eid Mubarak apparel, matching Husband & Wife couple sets, and festive Birthday gift merchandise. Nationwide Express Cash on Delivery.
          </p>

          <div class="hero-cta-group" style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="#catalog" class="btn-primary" style="padding: 14px 26px; font-size: 0.95rem; font-weight: 800;">
              <span>Shop All Products</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <a href="#catalog" onclick="setCatalogFilter('cricket')" class="btn-secondary" style="padding: 14px 22px; font-size: 0.95rem; font-weight: 800; border: 1.5px solid #15803d; color: #15803d; background: #f0fdf4;">
              <span>🏏 Cricket Edition</span>
            </a>
            <a href="#catalog" onclick="setCatalogFilter('eid')" class="btn-secondary" style="padding: 14px 22px; font-size: 0.95rem; font-weight: 800; border: 1.5px solid #b45309; color: #b45309; background: #fffbeb;">
              <span>🌙 Eid Specials</span>
            </a>
          </div>
        </div>
        <div class="hero-media">`);

// D. Clean Filter Tabs on Catalog Section
const newFiltersHtml = `<div class="filter-tabs" id="catalog-filters" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;">
            <button class="filter-btn active" data-filter="all">All Products</button>
            <button class="filter-btn" data-filter="cricket">🏏 Pakistan Cricket</button>
            <button class="filter-btn" data-filter="eid">🌙 Eid Mubarak</button>
            <button class="filter-btn" data-filter="couple">💍 Husband & Wife</button>
            <button class="filter-btn" data-filter="birthday">🎂 Birthday Specials</button>
            <button class="filter-btn" data-filter="tees">👕 T-Shirts</button>
            <button class="filter-btn" data-filter="mugs">☕ Cups / Mugs</button>
            <button class="filter-btn" data-filter="hoodies">🧥 Hoodies</button>
            <button class="filter-btn" data-filter="caps">🧢 Caps</button>
            <button class="filter-btn" data-filter="laptop-bags">💼 Laptop Bags</button>
          </div>`;

indexHtml = indexHtml.replace(/<div class="filter-tabs" id="catalog-filters">[\s\S]*?<\/div>/, newFiltersHtml);

// E. Remove Customizer Studio Section and its Modal completely
indexHtml = indexHtml.replace(/<!-- ==========================================================================\s*INTERACTIVE CUSTOMIZER STUDIO[\s\S]*?<\/section>\s*<!-- Change Product Modal/m, '<!-- Change Product Modal');
indexHtml = indexHtml.replace(/<!-- Change Product Modal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m, '');

// F. In Dialog Modal, make Add to Bag full width and hide customize button
indexHtml = indexHtml.replace(/<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: auto;">\s*<button class="btn-primary" id="dialog-add-to-cart-btn"[\s\S]*?<\/div>/, `<div style="margin-top: auto;">
            <button class="btn-primary" id="dialog-add-to-cart-btn" style="width: 100%; padding: 16px 20px; font-size: 0.95rem; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 8px; background: #0f172a; color: #fff; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
              <span>🛒 Add to Shopping Bag</span>
            </button>
          </div>`);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Updated index.html successfully with clean luxury layout, themes, and removed customizer clutter.');

// 4. Add window.setCatalogFilter helper in app.js
let appUpdatedCode = fs.readFileSync(appPath, 'utf8');
if (!appUpdatedCode.includes('window.setCatalogFilter')) {
  appUpdatedCode += `
window.setCatalogFilter = function(filterId) {
  AppState.activeFilter = filterId;
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  filterBtns.forEach(btn => {
    if (btn.dataset.filter === filterId) btn.classList.add("active");
    else btn.classList.remove("active");
  });
  renderProducts();
  const catalogEl = document.getElementById("catalog");
  if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
};
`;
  fs.writeFileSync(appPath, appUpdatedCode, 'utf8');
  console.log('Added setCatalogFilter helper to app.js');
}

console.log('Revamp completed successfully!');
