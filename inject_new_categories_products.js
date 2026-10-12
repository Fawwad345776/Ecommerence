const fs = require('fs');
const path = require('path');

const NEW_PRODUCTS = [
  // 1. HOODIES (4 New)
  {
    "id": "prod-hoodie-couple-soulmates",
    "name": "'Soulmates - دو دل ایک جان' Romantic Couple Fleece Hoodies (Pair of 2)",
    "theme": "couple",
    "category": "hoodies",
    "categoryName": "Couple Winterwear",
    "badge": "💍 COUPLE SPECIAL",
    "baseCost": 3200,
    "profit": 1800,
    "retailPrice": 5000,
    "image": "assets/trending/soulmates_hoodie_pair.jpg",
    "description": "Premium 380 GSM thermal brushed fleece matching hoodies for husband & wife. Left hoodie in black, right in warm beige with golden Urdu calligraphy 'دو دل ایک جان'.",
    "colors": [
      { "name": "Black & Beige Duo", "hex": "#111216" },
      { "name": "Black & White Duo", "hex": "#ffffff" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Black & Beige Duo": "assets/trending/soulmates_hoodie_pair.jpg",
      "Black & White Duo": "assets/trending/soulmates_hoodie_white.jpg"
    }
  },
  {
    "id": "prod-hoodie-city-street",
    "name": "'021 // 042' Pakistan Streetwear Heavy Fleece Hoodie",
    "theme": "cricket",
    "category": "hoodies",
    "categoryName": "Urban Streetwear",
    "badge": "🔥 TRENDING STREET",
    "baseCost": 1800,
    "profit": 1150,
    "retailPrice": 2950,
    "image": "assets/trending/city_street_hoodie_black.jpg",
    "description": "Raw Karachi (021) and Lahore (042) typographic streetwear hoodie on 380 GSM heavy brushed fleece. Thermal hood with ribbed hems.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Heather Grey", "hex": "#9ca3af" },
      { "name": "Deep Navy", "hex": "#1e3a8a" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Onyx Black": "assets/trending/city_street_hoodie_black.jpg",
      "Heather Grey": "assets/trending/city_street_hoodie_grey.jpg",
      "Deep Navy": "assets/trending/city_street_hoodie_navy.jpg"
    }
  },
  {
    "id": "prod-hoodie-chai-sardi",
    "name": "'Chai & Sardi' Pakistani Winter Comfort Fleece Hoodie",
    "theme": "eid",
    "category": "hoodies",
    "categoryName": "Winter Culture Edition",
    "badge": "☕ WINTER COMFORT",
    "baseCost": 1750,
    "profit": 1100,
    "retailPrice": 2850,
    "image": "assets/trending/chai_winter_hoodie_brown.jpg",
    "description": "Cozy winter streetwear hoodie with 'گرما گرم چائے اور سرد شامیں' Urdu print. Perfect warm kangaroo pocket and super plush inner lining.",
    "colors": [
      { "name": "Mocha Brown", "hex": "#78350f" },
      { "name": "Warm Beige", "hex": "#d4b996" },
      { "name": "Forest Green", "hex": "#15803d" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Mocha Brown": "assets/trending/chai_winter_hoodie_brown.jpg",
      "Warm Beige": "assets/trending/chai_winter_hoodie_beige.jpg",
      "Forest Green": "assets/trending/chai_winter_hoodie_green.jpg"
    }
  },
  {
    "id": "prod-hoodie-babar56",
    "name": "Babar Azam 56 'Cover Drive King' Heavyweight Fleece Hoodie",
    "theme": "cricket",
    "category": "hoodies",
    "categoryName": "Athlete Signature Edition",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 1900,
    "profit": 1200,
    "retailPrice": 3100,
    "image": "assets/trending/babar56_hoodie_white.jpg",
    "description": "Iconic #56 cover drive typographic tribute printed on 380 GSM thermal combed fleece. Thick drawstrings and double-stitched kangaroo pocket.",
    "colors": [
      { "name": "Pure White", "hex": "#ffffff" },
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pakistan Green", "hex": "#15803d" }
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "colorImages": {
      "Pure White": "assets/trending/babar56_hoodie_white.jpg",
      "Onyx Black": "assets/trending/babar56_hoodie_black.jpg",
      "Pakistan Green": "assets/trending/babar56_hoodie_green.jpg"
    }
  },

  // 2. MUGS (4 New)
  {
    "id": "prod-mug-king-queen",
    "name": "'KING & QUEEN' Crown 24k Gold Luster Couple Mugs Set (Pair of 2)",
    "theme": "couple",
    "category": "mugs",
    "categoryName": "Couple Drinkware",
    "badge": "👑 LUXURY DUO",
    "baseCost": 1050,
    "profit": 800,
    "retailPrice": 1850,
    "image": "assets/trending/king_queen_mugs.jpg",
    "description": "Matching King & Queen crown coffee mugs set. Matte black finish for King and pure white gloss for Queen with reflective metallic gold crowns.",
    "colors": [
      { "name": "Matte Black & Gloss White", "hex": "#111216" }
    ],
    "sizes": ["11 oz Ceramic Pair (Set of 2)"],
    "colorImages": {
      "Matte Black & Gloss White": "assets/trending/king_queen_mugs.jpg"
    }
  },
  {
    "id": "prod-mug-babar56",
    "name": "Babar Azam 56 'Cover Drive King' Signature Ceramic Mug",
    "theme": "cricket",
    "category": "mugs",
    "categoryName": "Cricket Drinkware",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 550,
    "profit": 600,
    "retailPrice": 1150,
    "image": "assets/trending/babar56_mug_green.jpg",
    "description": "High-gloss ceramic mug featuring Babar Azam's signature #56 Cover Drive emblem. Dishwasher and microwave safe with ergonomic handle.",
    "colors": [
      { "name": "Pakistan Green", "hex": "#15803d" },
      { "name": "Pure White", "hex": "#ffffff" }
    ],
    "sizes": ["11 oz Ceramic Mug"],
    "colorImages": {
      "Pakistan Green": "assets/trending/babar56_mug_green.jpg",
      "Pure White": "assets/trending/babar56_mug_white.jpg"
    }
  },
  {
    "id": "prod-mug-suno-chanda",
    "name": "'Suno Chanda - چاند رات' Aesthetic Crescent Moonlight Mug",
    "theme": "eid",
    "category": "mugs",
    "categoryName": "Aesthetic Poetry Drinkware",
    "badge": "🌙 AESTHETIC SPECIAL",
    "baseCost": 580,
    "profit": 620,
    "retailPrice": 1200,
    "image": "assets/trending/suno_chanda_mug_blue.jpg",
    "description": "Romantic moonlight poetry ceramic mug with gold crescent star and 'سنو چندا' Urdu calligraphy. Perfect bedside or chai station accessory.",
    "colors": [
      { "name": "Midnight Blue", "hex": "#1e3a8a" },
      { "name": "Glossy Black", "hex": "#111216" }
    ],
    "sizes": ["11 oz Ceramic Mug"],
    "colorImages": {
      "Midnight Blue": "assets/trending/suno_chanda_mug_blue.jpg",
      "Glossy Black": "assets/trending/suno_chanda_mug_black.jpg"
    }
  },
  {
    "id": "prod-mug-boss-couple",
    "name": "'The Boss & The Real Boss' Funny Couple Ceramic Mugs (Pair of 2)",
    "theme": "couple",
    "category": "mugs",
    "categoryName": "Humorous Couple Drinkware",
    "badge": "💍 COUPLE FAVORITE",
    "baseCost": 1050,
    "profit": 800,
    "retailPrice": 1850,
    "image": "assets/trending/boss_couple_mugs.jpg",
    "description": "Humorous morning coffee mug set for husband & wife: 'The Boss' in charcoal and 'The Real Boss' in pink & white. Guaranteed morning smile.",
    "colors": [
      { "name": "Black & White Pair", "hex": "#111216" }
    ],
    "sizes": ["11 oz Ceramic Pair (Set of 2)"],
    "colorImages": {
      "Black & White Pair": "assets/trending/boss_couple_mugs.jpg"
    }
  },

  // 3. CAPS (4 New)
  {
    "id": "prod-cap-babar56",
    "name": "Babar Azam 56 'Cover Drive' 3D Raised Embroidered Athlete Cap",
    "theme": "cricket",
    "category": "caps",
    "categoryName": "Athlete Headwear",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 650,
    "profit": 640,
    "retailPrice": 1290,
    "image": "assets/trending/babar56_cap_black.jpg",
    "description": "Structured 6-panel twill baseball cap with 3D raised embroidery of Babar Azam's iconic #56. Curved brim with antique buckle strapback.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Pure White", "hex": "#ffffff" },
      { "name": "Forest Green", "hex": "#15803d" }
    ],
    "sizes": ["Adjustable Strapback (One Size)"],
    "colorImages": {
      "Onyx Black": "assets/trending/babar56_cap_black.jpg",
      "Pure White": "assets/trending/babar56_cap_white.jpg",
      "Forest Green": "assets/trending/babar56_cap_green.jpg"
    }
  },
  {
    "id": "prod-cap-king-queen",
    "name": "'KING & QUEEN' Crown 3D Embroidered Couple Caps (Pair of 2)",
    "theme": "couple",
    "category": "caps",
    "categoryName": "Couple Headwear",
    "badge": "👑 COUPLE DUO",
    "baseCost": 1100,
    "profit": 850,
    "retailPrice": 1950,
    "image": "assets/trending/king_queen_caps.jpg",
    "description": "Matching King & Queen couple caps set with raised 3D gold-thread crown embroidery. Breathable cotton eyelets and custom metal strap closure.",
    "colors": [
      { "name": "Black (King) + White (Queen)", "hex": "#111216" },
      { "name": "Both Jet Black", "hex": "#000000" }
    ],
    "sizes": ["Adjustable Strapback Pair"],
    "colorImages": {
      "Black (King) + White (Queen)": "assets/trending/king_queen_caps.jpg",
      "Both Jet Black": "assets/trending/king_queen_caps_black.jpg"
    }
  },
  {
    "id": "prod-cap-pakistan-city",
    "name": "'021 // 042 Karachi & Lahore' Vintage Washed Cotton Dad Cap",
    "theme": "cricket",
    "category": "caps",
    "categoryName": "Vintage Street Headwear",
    "badge": "🇵🇰 CITY EDITION",
    "baseCost": 580,
    "profit": 610,
    "retailPrice": 1190,
    "image": "assets/trending/pakistan_city_cap_charcoal.jpg",
    "description": "Relaxed unstructured dad cap crafted from vintage washed cotton twill. Minimalist 'KHI • LHR' embroidery with soft sweatband.",
    "colors": [
      { "name": "Washed Charcoal", "hex": "#374151" },
      { "name": "Vintage Khaki", "hex": "#d4b996" },
      { "name": "Navy Blue", "hex": "#1e3a8a" }
    ],
    "sizes": ["Adjustable Brass Buckle (One Size)"],
    "colorImages": {
      "Washed Charcoal": "assets/trending/pakistan_city_cap_charcoal.jpg",
      "Vintage Khaki": "assets/trending/pakistan_city_cap_khaki.jpg",
      "Navy Blue": "assets/trending/pakistan_city_cap_navy.jpg"
    }
  },
  {
    "id": "prod-cap-truck-art",
    "name": "'Truck Art Peacock Chamakpatti' Vibrant Embroidered Cap",
    "theme": "eid",
    "category": "caps",
    "categoryName": "Cultural Heritage Headwear",
    "badge": "🦚 TRUCK ART POP",
    "baseCost": 680,
    "profit": 670,
    "retailPrice": 1350,
    "image": "assets/trending/truck_art_cap_black.jpg",
    "description": "Celebrate Pakistani truck art chamakpatti culture with multi-color neon peacock embroidery on heavy structured twill.",
    "colors": [
      { "name": "Onyx Black", "hex": "#111216" },
      { "name": "Deep Navy", "hex": "#1e3a8a" }
    ],
    "sizes": ["Adjustable Strapback (One Size)"],
    "colorImages": {
      "Onyx Black": "assets/trending/truck_art_cap_black.jpg",
      "Deep Navy": "assets/trending/truck_art_cap_blue.jpg"
    }
  },

  // 4. LAPTOP BAGS (4 New)
  {
    "id": "prod-bag-executive-tech",
    "name": "Executive Minimalist Shockproof 15.6\" Waterproof Laptop Briefcase",
    "theme": "cricket",
    "category": "laptop-bags",
    "categoryName": "Professional Tech Luggage",
    "badge": "🛡️ SHOCKPROOF PRO",
    "baseCost": 1600,
    "profit": 1150,
    "retailPrice": 2750,
    "image": "assets/trending/executive_tech_bag_grey.jpg",
    "description": "Ballistic waterproof oxford cloth briefcase with 360° air-cushion corner drop protection, YKK luggage zippers, and detachable padded shoulder strap.",
    "colors": [
      { "name": "Charcoal Grey", "hex": "#374151" },
      { "name": "Obsidian Black", "hex": "#111216" },
      { "name": "Midnight Navy", "hex": "#1e3a8a" }
    ],
    "sizes": ["15.6\" Padded Laptop Briefcase"],
    "colorImages": {
      "Charcoal Grey": "assets/trending/executive_tech_bag_grey.jpg",
      "Obsidian Black": "assets/trending/executive_tech_bag_black.jpg",
      "Midnight Navy": "assets/trending/executive_tech_bag_navy.jpg"
    }
  },
  {
    "id": "prod-bag-truck-art-sleeve",
    "name": "Karachi Truck Art Peacock Pop-Art Padded Shockproof Laptop Sleeve",
    "theme": "eid",
    "category": "laptop-bags",
    "categoryName": "Artisan Tech Luggage",
    "badge": "🦚 CULTURAL POP",
    "baseCost": 1300,
    "profit": 950,
    "retailPrice": 2250,
    "image": "assets/trending/truck_art_laptop_sleeve_yellow.jpg",
    "description": "Statement laptop sleeve celebrating authentic Pakistani truck art chamakpatti peacock floral motifs. Anti-scratch fleece interior lining.",
    "colors": [
      { "name": "Chamakpatti Yellow", "hex": "#eab308" },
      { "name": "Midnight Black", "hex": "#111216" }
    ],
    "sizes": ["14\"-15.6\" Universal Laptop Sleeve"],
    "colorImages": {
      "Chamakpatti Yellow": "assets/trending/truck_art_laptop_sleeve_yellow.jpg",
      "Midnight Black": "assets/trending/truck_art_laptop_sleeve_black.jpg"
    }
  },
  {
    "id": "prod-bag-babar56",
    "name": "Babar Azam 56 'Cover Drive' Pro Athlete Padded Laptop Messenger",
    "theme": "cricket",
    "category": "laptop-bags",
    "categoryName": "Athlete Gear Luggage",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 1650,
    "profit": 1200,
    "retailPrice": 2850,
    "image": "assets/trending/babar56_laptop_bag_black.jpg",
    "description": "High-durability athlete tech messenger with #56 Babar Azam cover drive crest. Dedicated 15.6\" shockproof sleeve, tablet pouch, and water bottle pocket.",
    "colors": [
      { "name": "Obsidian Black", "hex": "#111216" },
      { "name": "Deep Forest Green", "hex": "#15803d" }
    ],
    "sizes": ["15.6\" Messenger Briefcase"],
    "colorImages": {
      "Obsidian Black": "assets/trending/babar56_laptop_bag_black.jpg",
      "Deep Forest Green": "assets/trending/babar56_laptop_bag_green.jpg"
    }
  },
  {
    "id": "prod-bag-king-queen",
    "name": "'KING & QUEEN' Luxury Monogram Couple Laptop Travel Bag",
    "theme": "couple",
    "category": "laptop-bags",
    "categoryName": "Luxury Couple Luggage",
    "badge": "👑 COUPLE EDITION",
    "baseCost": 1700,
    "profit": 1200,
    "retailPrice": 2900,
    "image": "assets/trending/king_queen_laptop_bag_black.jpg",
    "description": "Executive couple laptop briefcase embossed with King & Queen crown monograms in gold foil. High-density padding with trolley sleeve for hassle-free travel.",
    "colors": [
      { "name": "Matte Black Monogram", "hex": "#111216" },
      { "name": "Vintage Brown Monogram", "hex": "#78350f" }
    ],
    "sizes": ["15.6\" Travel Briefcase"],
    "colorImages": {
      "Matte Black Monogram": "assets/trending/king_queen_laptop_bag_black.jpg",
      "Vintage Brown Monogram": "assets/trending/king_queen_laptop_bag_brown.jpg"
    }
  }
];

const appPath = path.join(__dirname, 'app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

const productsMatch = appCode.match(/const PRODUCTS = (\[[\s\S]*?\]);\r?\n/);
if (!productsMatch) {
  console.error("Could not find const PRODUCTS in app.js");
  process.exit(1);
}

let existingProducts = eval(productsMatch[1]);
console.log(`Initial products count: ${existingProducts.length}`);

// Filter out any duplicates if previously added
const existingIds = new Set(existingProducts.map(p => p.id));
const toAdd = NEW_PRODUCTS.filter(p => !existingIds.has(p.id));

existingProducts.push(...toAdd);
console.log(`Added ${toAdd.length} new products. Total: ${existingProducts.length}`);

const newProductsJson = 'const PRODUCTS = ' + JSON.stringify(existingProducts, null, 2) + ';\n';
appCode = appCode.replace(productsMatch[0], newProductsJson);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Successfully injected 16 new products across Hoodies, Mugs, Caps, and Laptop Bags into app.js!');
