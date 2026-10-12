const fs = require('fs');
const path = require('path');

const MODERN_FULL_SLEEVE_PRODUCTS = [
  // 1. Tokyo Cyberpunk Japanese Streetwear
  {
    id: "prod-fs-tokyo-cyber",
    name: "Tokyo Neo-Cyberpunk '東京' Japanese Graphic Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Tokyo Streetwear",
    badge: "🔥 TOKYO STREETWEAR",
    baseCost: 990,
    profit: 860,
    retailPrice: 1850,
    image: "assets/trending/fs_tokyo_cyberpunk_black.jpg",
    description: "Heavyweight 260 GSM combed cotton long sleeve tee with ribbed elastic cuffs. High-density screenprint featuring Tokyo neo-cyberpunk grid typography, crimson Kanji accents, and futuristic cityscape skyline.",
    colors: [
      { name: "Onyx Black", hex: "#111216" },
      { name: "Harajuku Jet Black", hex: "#000000" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Onyx Black": "assets/trending/fs_tokyo_cyberpunk_black.jpg",
      "Harajuku Jet Black": "assets/trending/fs_harajuku_samurai_black.jpg"
    }
  },

  // 2. Pacific Northwest Adventure Club
  {
    id: "prod-fs-pacific-outdoors",
    name: "Pacific Northwest Adventure Club Vintage Mountain Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Vintage Outdoor Apparel",
    badge: "🌲 PACIFIC OUTDOORS",
    baseCost: 950,
    profit: 740,
    retailPrice: 1690,
    image: "assets/trending/fs_pacific_outdoors_green.jpg",
    description: "Retro 70s adventure club circular crest with pine forest, snowcapped mountains and winding river trail. Washed forest green 240 GSM organic cotton with ribbed collar and wrist cuffs.",
    colors: [
      { name: "Forest Green", hex: "#15803d" },
      { name: "Alpine Sage", hex: "#22c55e" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Forest Green": "assets/trending/fs_pacific_outdoors_green.jpg",
      "Alpine Sage": "assets/trending/fs_botanical_fern_cream.jpg"
    }
  },

  // 3. Swiss Brutalist Studio Archive 2026
  {
    id: "prod-fs-brutalist-archive",
    name: "Studio Archive // 2026 Edition Swiss Brutalist Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Editorial Streetwear",
    badge: "🏛️ SWISS BRUTALIST",
    baseCost: 980,
    profit: 810,
    retailPrice: 1790,
    image: "assets/trending/fs_brutalist_archive_white.jpg",
    description: "High-fashion brutalist typography with geographic Zurich coordinates, barcode badge and full-length vertical sleeve print. Heavyweight pure white combed cotton.",
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Bauhaus Cream", hex: "#f1f1ee" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Pure White": "assets/trending/fs_brutalist_archive_white.jpg",
      "Bauhaus Cream": "assets/trending/fs_bauhaus_geometric_cream.jpg"
    }
  },

  // 4. Y2K Metallic Chrome Liquid Butterfly
  {
    id: "prod-fs-cyber-butterfly",
    name: "Y2K Liquid Chrome Cyber Butterfly Mineral Wash Long Sleeve Tee",
    theme: "couple",
    category: "full-sleeves",
    categoryName: "Y2K Cybercore Streetwear",
    badge: "🦋 Y2K AESTHETIC",
    baseCost: 990,
    profit: 860,
    retailPrice: 1850,
    image: "assets/trending/fs_cyber_butterfly_charcoal.jpg",
    description: "Metallic liquid chrome iridescent butterfly graphic with tribal thorny cyber-sigilism details on mineral washed charcoal grey heavyweight cotton. 1x1 ribbed cuffs.",
    colors: [
      { name: "Mineral Charcoal", hex: "#374151" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Mineral Charcoal": "assets/trending/fs_cyber_butterfly_charcoal.jpg",
      "Onyx Black": "assets/trending/fs_tokyo_cyberpunk_black.jpg"
    }
  },

  // 5. Monaco Grand Prix 1977 Speed Division
  {
    id: "prod-fs-monaco-motorsport",
    name: "Monaco Grand Prix '77 Circuit de Monte-Carlo Motorsport Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Vintage Racing Division",
    badge: "🏎️ VINTAGE RACING",
    baseCost: 980,
    profit: 810,
    retailPrice: 1790,
    image: "assets/trending/fs_monaco_motorsport_cream.jpg",
    description: "Authentic 1977 Monaco GP racing division graphic with crossed checkered flags, #77 racing badge, and vintage navy/orange inks on heavyweight cream cotton.",
    colors: [
      { name: "Vintage Cream", hex: "#fdfbf7" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Vintage Cream": "assets/trending/fs_monaco_motorsport_cream.jpg",
      "Pure White": "assets/trending/fs_coffee_vinyl_white.jpg"
    }
  },

  // 6. Celestial Deep Space Lunar & Solar Orbit
  {
    id: "prod-fs-celestial-navy",
    name: "Celestial Orbit & Lunar Phases Astronomical Long Sleeve Tee",
    theme: "eid",
    category: "full-sleeves",
    categoryName: "Astronomy Streetwear",
    badge: "🌙 CELESTIAL ORBIT",
    baseCost: 990,
    profit: 860,
    retailPrice: 1850,
    image: "assets/trending/fs_celestial_deepspace_navy.jpg",
    description: "Deep midnight navy combed jersey featuring intricate lunar phase cycles, solar system planetary orbits, and gold constellation maps. Super soft 240 GSM luxury knit.",
    colors: [
      { name: "Midnight Navy", hex: "#1e3a8a" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Midnight Navy": "assets/trending/fs_celestial_deepspace_navy.jpg",
      "Onyx Black": "assets/trending/fs_tokyo_cyberpunk_black.jpg"
    }
  },

  // 7. Harajuku Cyber Samurai 2077
  {
    id: "prod-fs-cyber-samurai",
    name: "Cyberpunk Samurai 2077 Harajuku Urban Dark Manga Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Anime Streetwear",
    badge: "⚔️ CYBER SAMURAI",
    baseCost: 990,
    profit: 860,
    retailPrice: 1850,
    image: "assets/trending/fs_harajuku_samurai_black.jpg",
    description: "Oversized Harajuku graphic featuring neon cyan & magenta armored cyber samurai with dual katanas and Kanji typography. Drop-shoulder cut with ribbed wrist cuffs.",
    colors: [
      { name: "Jet Black", hex: "#000000" },
      { name: "Tokyo Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Jet Black": "assets/trending/fs_harajuku_samurai_black.jpg",
      "Tokyo Black": "assets/trending/fs_tokyo_cyberpunk_black.jpg"
    }
  },

  // 8. Bauhaus Weimar Form Follows Function
  {
    id: "prod-fs-bauhaus-weimar",
    name: "Bauhaus 1919 Weimar 'Form Follows Function' Modernist Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Modernist Design Apparel",
    badge: "🎨 BAUHAUS 1919",
    baseCost: 950,
    profit: 740,
    retailPrice: 1690,
    image: "assets/trending/fs_bauhaus_geometric_cream.jpg",
    description: "Iconic primary geometric shapes (red circle, blue square, yellow triangle) celebrating Bauhaus Weimar 1919 exhibition. Screenprinted on heavyweight cream combed knit.",
    colors: [
      { name: "Bauhaus Cream", hex: "#f1f1ee" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Bauhaus Cream": "assets/trending/fs_bauhaus_geometric_cream.jpg",
      "Pure White": "assets/trending/fs_brutalist_archive_white.jpg"
    }
  },

  // 9. Sunday Morning Coffee & Vinyl Society
  {
    id: "prod-fs-coffee-vinyl",
    name: "Sunday Morning Coffee & Vinyl Society 33⅓ RPM Long Sleeve Tee",
    theme: "birthday",
    category: "full-sleeves",
    categoryName: "Aesthetic Lifestyle Apparel",
    badge: "☕ COFFEE & VINYL",
    baseCost: 950,
    profit: 740,
    retailPrice: 1690,
    image: "assets/trending/fs_coffee_vinyl_white.jpg",
    description: "Minimalist vinyl record line-art with pour-over coffee cup motif. Dedicated to analog audiophiles and weekend cafe mornings. Ultra-soft breathable combed cotton.",
    colors: [
      { name: "Crisp White", hex: "#ffffff" },
      { name: "Vintage Cream", hex: "#fdfbf7" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Crisp White": "assets/trending/fs_coffee_vinyl_white.jpg",
      "Vintage Cream": "assets/trending/fs_monaco_motorsport_cream.jpg"
    }
  },

  // 10. Alpine Herbarium & Fern Field Study
  {
    id: "prod-fs-botanical-fern",
    name: "Botanica Herbarium Vol. VII Alpine Fern Scientific Long Sleeve Tee",
    theme: "eid",
    category: "full-sleeves",
    categoryName: "Botanical Nature Apparel",
    badge: "🌿 HERBARIUM",
    baseCost: 950,
    profit: 740,
    retailPrice: 1690,
    image: "assets/trending/fs_botanical_fern_cream.jpg",
    description: "Scientific botanical field illustration of Alpine Polypodiopsida Fern with vintage classification typography in rich forest green ink on natural ecru cotton.",
    colors: [
      { name: "Natural Ecru", hex: "#f5f5f0" },
      { name: "Forest Green", hex: "#15803d" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Natural Ecru": "assets/trending/fs_botanical_fern_cream.jpg",
      "Forest Green": "assets/trending/fs_pacific_outdoors_green.jpg"
    }
  },

  // 11. Faiz Ahmad Faiz Urdu Literary Streetwear
  {
    id: "prod-fs-faiz-poetry",
    name: "Faiz Ahmad Faiz 'Bol Ke Lab Azad Hain Tere' Urdu Streetwear Long Sleeve",
    theme: "eid",
    category: "full-sleeves",
    categoryName: "Urdu Poetry Streetwear",
    badge: "📜 URDU POETRY",
    baseCost: 990,
    profit: 860,
    retailPrice: 1850,
    image: "assets/trending/fs_faiz_poetry_white.jpg",
    description: "Immortal revolutionary verse by Faiz Ahmad Faiz 'بول کہ لب آزاد ہیں ترے' in modern editorial typography. 240 GSM heavy combed cotton with double-stitched ribbed cuffs.",
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Pure White": "assets/trending/fs_faiz_poetry_white.jpg",
      "Onyx Black": "assets/trending/fs_luxury_urdu_black.jpg"
    }
  },

  // 12. California 1984 Sunset Drive Synthwave
  {
    id: "prod-fs-synthwave-sunset",
    name: "California Highway 1984 'Sunset Drive' Retro Synthwave Long Sleeve Tee",
    theme: "cricket",
    category: "full-sleeves",
    categoryName: "Retro 80s Streetwear",
    badge: "🌴 1984 SYNTHWAVE",
    baseCost: 980,
    profit: 810,
    retailPrice: 1790,
    image: "assets/trending/fs_synthwave_sunset_grey.jpg",
    description: "Outrun aesthetic neon sunset horizon with tropical palm tree silhouettes and synthwave grid lines. Heather grey vintage cotton with ribbed cuffs.",
    colors: [
      { name: "Heather Grey", hex: "#94a3b8" },
      { name: "Onyx Black", hex: "#111216" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorImages: {
      "Heather Grey": "assets/trending/fs_synthwave_sunset_grey.jpg",
      "Onyx Black": "assets/trending/fs_tokyo_cyberpunk_black.jpg"
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
// Remove existing full-sleeves
existingProducts = existingProducts.filter(p => p.category !== 'full-sleeves');

// Append the 12 new modern full sleeve products
existingProducts.push(...MODERN_FULL_SLEEVE_PRODUCTS);

console.log(`Updated products count: ${existingProducts.length}`);
console.log(`Full sleeves count: ${existingProducts.filter(p => p.category === 'full-sleeves').length}`);

const newProductsJson = 'const PRODUCTS = ' + JSON.stringify(existingProducts, null, 2) + ';\n';
appCode = appCode.replace(productsMatch[0], newProductsJson);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('app.js updated successfully with 12 modern full sleeve products!');
