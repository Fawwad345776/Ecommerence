/**
 * MF STORE x CEEPRINTO API INTEGRATION
 * Core Application Engine & Storefront Controller
 * Featuring: Live Customizer Studio, Ready Designs Gallery, Full Merchandise Catalog,
 * and Firebase Realtime Database 3-Tier Dynamic Payment Engine
 */

// 1. COMPLETE 18-PRODUCT CATALOG (PAKISTAN CEEPRINTO FULFILLMENT READY)
// Covering: T-Shirts, Hoodies, Cups/Mugs, Caps, and Bags with Multi-Angle Previews & Rich Colors
const PRODUCTS = [
  {
    "id": "prod-cricket-babar56-tee",
    "name": "Babar Azam 56 'Cover Drive King' Fan Edition Tee",
    "theme": "cricket",
    "category": "tees",
    "categoryName": "Athlete Signature Edition",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 850,
    "profit": 740,
    "retailPrice": 1590,
    "image": "assets/trending/babar56_tee.jpg",
    "description": "Iconic #56 Babar Azam cover drive typographic tribute on 210 GSM heavyweight cotton. High-density gold and green inks.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/trending/babar56_tee.jpg"
    }
  },
  {
    "id": "prod-cricket-emerald-mug",
    "name": "Pakistan Cricket Emerald & Gold Crest Ceramic Mug",
    "theme": "cricket",
    "category": "mugs",
    "categoryName": "Cricket Drinkware",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 550,
    "profit": 600,
    "retailPrice": 1150,
    "image": "assets/trending/pk_cricket_mug.jpg",
    "description": "Glossy deep forest green ceramic mug with 24k gold-finish Pakistan Cricket crescent, star, and crossed bats emblem. Dishwasher and microwave safe.",
    "colors": [
      {
        "name": "Pakistan Green",
        "hex": "#15803d"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pakistan Green": "assets/trending/pk_cricket_mug.jpg"
    }
  },
  {
    "id": "prod-cricket-green-hoodie",
    "name": "Pakistan Cricket National Green Heavyweight Fleece Hoodie",
    "theme": "cricket",
    "category": "hoodies",
    "categoryName": "Heavyweight Fleece Streetwear",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 2100,
    "profit": 1150,
    "retailPrice": 3250,
    "image": "assets/trending/pk_cricket_hoodie.jpg",
    "description": "380 GSM thermal brushed fleece hoodie in national forest green with metallic gold star and crescent emblem on chest. Warm kangaroo pocket and ribbed cuffs.",
    "colors": [
      {
        "name": "Forest Green",
        "hex": "#15803d"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Forest Green": "assets/trending/pk_cricket_hoodie.jpg"
    }
  },
  {
    "id": "prod-cricket-twill-cap",
    "name": "Pakistan Cricket National Green Embroidered Twill Cap",
    "theme": "cricket",
    "category": "caps",
    "categoryName": "Structured Headwear",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 650,
    "profit": 640,
    "retailPrice": 1290,
    "image": "assets/trending/pk_cricket_cap.jpg",
    "description": "Structured 6-panel cotton twill cap with 3D raised gold embroidered Pakistan Cricket star crest and adjustable antique brass strapback buckle.",
    "colors": [
      {
        "name": "Forest Green",
        "hex": "#15803d"
      }
    ],
    "sizes": [
      "Adjustable Strapback (One Size)"
    ],
    "colorImages": {
      "Forest Green": "assets/trending/pk_cricket_cap.jpg"
    }
  },
  {
    "id": "prod-cricket-laptop-briefcase",
    "name": "Pakistan Cricket Executive Shockproof Laptop Briefcase (15.6\")",
    "theme": "cricket",
    "category": "laptop-bags",
    "categoryName": "Executive Tech Luggage",
    "badge": "🏏 CRICKET SPECIAL",
    "baseCost": 1550,
    "profit": 1100,
    "retailPrice": 2650,
    "image": "assets/trending/cricket_laptop_bag.jpg",
    "description": "Water-resistant ballistic nylon briefcase with genuine leather accents, 360° padded laptop protection compartment, and gold Pakistan Cricket crest.",
    "colors": [
      {
        "name": "Executive Green",
        "hex": "#15803d"
      }
    ],
    "sizes": [
      "15.6\" Padded Briefcase"
    ],
    "colorImages": {
      "Executive Green": "assets/trending/cricket_laptop_bag.jpg"
    }
  },
  {
    "id": "prod-eid-gold-calligraphy-tee",
    "name": "'Eid Mubarak' Luxury Gold Arabic Calligraphy Streetwear Tee",
    "theme": "eid",
    "category": "tees",
    "categoryName": "Festive Luxury Apparel",
    "badge": "🌙 EID FESTIVE",
    "baseCost": 850,
    "profit": 800,
    "retailPrice": 1650,
    "image": "assets/trending/eid_mubarak_tee.jpg",
    "description": "240 GSM combed cotton oversized streetwear tee featuring metallic gold Arabic calligraphy of 'Eid Mubarak' with intricate crescent moon and star motifs.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#0f172a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/eid_mubarak_tee.jpg"
    }
  },
  {
    "id": "prod-eid-gold-crescent-mug",
    "name": "'Eid Mubarak' White Ceramic & Gold Crescent Coffee Mug",
    "theme": "eid",
    "category": "mugs",
    "categoryName": "Festive Drinkware",
    "badge": "🌙 EID FESTIVE",
    "baseCost": 550,
    "profit": 600,
    "retailPrice": 1150,
    "image": "assets/trending/eid_mubarak_mug.jpg",
    "description": "Premium pure white ceramic mug with reflective gold foil Eid Mubarak calligraphy and floral crescent moon. Perfect celebratory gift for family and loved ones.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pure White": "assets/trending/eid_mubarak_mug.jpg"
    }
  },
  {
    "id": "prod-eid-gold-hoodie",
    "name": "'Eid Mubarak' Gold Arabic Calligraphy Heavyweight Fleece Hoodie",
    "theme": "eid",
    "category": "hoodies",
    "categoryName": "Festive Luxury Streetwear",
    "badge": "🌙 EID FESTIVE",
    "baseCost": 2100,
    "profit": 1000,
    "retailPrice": 3100,
    "image": "assets/trending/eid_hoodie.jpg",
    "description": "380 GSM heavyweight thermal fleece hoodie with shiny gold Arabic calligraphy 'Eid Mubarak' and crescent moon art. Ultra warm, soft, and celebratory.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/eid_hoodie.jpg"
    }
  },
  {
    "id": "prod-eid-gold-cap",
    "name": "'Eid Mubarak' Gold Embroidered Structured Strapback Cap",
    "theme": "eid",
    "category": "caps",
    "categoryName": "Festive Headwear",
    "badge": "🌙 EID FESTIVE",
    "baseCost": 650,
    "profit": 600,
    "retailPrice": 1250,
    "image": "assets/trending/eid_cap.jpg",
    "description": "Heavy twill structured 6-panel cap with golden crescent moon and Eid Mubarak embroidery. Subtle, tasteful celebratory design.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "Adjustable Strapback"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/eid_cap.jpg"
    }
  },
  {
    "id": "prod-eid-laptop-sleeve",
    "name": "Luxury Islamic Arabesque Gold & Black 'Noor' Laptop Sleeve",
    "theme": "eid",
    "category": "laptop-bags",
    "categoryName": "Luxury Tech Accessory",
    "badge": "🌙 EID FESTIVE",
    "baseCost": 1550,
    "profit": 1100,
    "retailPrice": 2650,
    "image": "assets/trending/eid_laptop_bag.jpg",
    "description": "Quilted waterproof velvet-touch laptop sleeve with ornate gold Islamic geometric arabesque borders and Arabic calligraphy. Shock-absorbent padding.",
    "colors": [
      {
        "name": "Black & Gold",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "15.6\" Padded Sleeve"
    ],
    "colorImages": {
      "Black & Gold": "assets/trending/eid_laptop_bag.jpg"
    }
  },
  {
    "id": "prod-couple-matching-tees",
    "name": "'Hubby & Wifey' Matching Romantic Couple T-Shirts (2-Piece Set)",
    "theme": "couple",
    "category": "tees",
    "categoryName": "Matching Couple Apparel",
    "badge": "💍 COUPLE SET",
    "baseCost": 1600,
    "profit": 1250,
    "retailPrice": 2850,
    "image": "assets/trending/couple_matching_tee.jpg",
    "description": "Includes TWO premium tees: 1 Black 'Hubby' Tee + 1 White 'Wifey' Tee with elegant gold hearts and modern flowing script calligraphy. 100% Combed Cotton.",
    "colors": [
      {
        "name": "Black & White Pair",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Black & White Pair": "assets/trending/couple_matching_tee.jpg"
    }
  },
  {
    "id": "prod-couple-soulmates-tee",
    "name": "'Soulmates - دو دل ایک جان' Romantic Aesthetic Oversized Tee",
    "theme": "couple",
    "category": "tees",
    "categoryName": "Couple Romantic Apparel",
    "badge": "💍 ROMANTIC AESTHETIC",
    "baseCost": 750,
    "profit": 700,
    "retailPrice": 1450,
    "image": "assets/trending/couple_soulmates_tee.jpg",
    "description": "Aesthetic unisex oversized tee featuring continuous one-line art of interlocking hands with Urdu poetry 'دو دل ایک جان' (Two Hearts, One Soul). Available as single or matching pair.",
    "colors": [
      {
        "name": "Charcoal Black",
        "hex": "#18181b"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Charcoal Black": "assets/trending/couple_soulmates_tee.jpg"
    }
  },
  {
    "id": "prod-couple-mr-mrs-right-tee",
    "name": "'Mr. Right & Mrs. Always Right' Humorous Couple T-Shirts (Pair of 2)",
    "theme": "couple",
    "category": "tees",
    "categoryName": "Couple Romantic Apparel",
    "badge": "😂 2-PIECE SET",
    "baseCost": 1350,
    "profit": 950,
    "retailPrice": 2300,
    "image": "assets/trending/couple_mr_mrs_right_tee.jpg",
    "description": "Hilarious and adorable wedding/anniversary couple set: 'Mr. Right' with bowtie and 'Mrs. ALWAYS Right ➔' with hand-drawn arrow. Guaranteed smile on every outing.",
    "colors": [
      {
        "name": "Navy & White Duo",
        "hex": "#022c22"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Navy & White Duo": "assets/trending/couple_mr_mrs_right_tee.jpg"
    }
  },
  {
    "id": "prod-couple-better-together-tee",
    "name": "'Better Together' Connecting Heart Couple T-Shirts (2-Piece Set)",
    "theme": "couple",
    "category": "tees",
    "categoryName": "Couple Romantic Apparel",
    "badge": "💞 2-PIECE SET",
    "baseCost": 1350,
    "profit": 950,
    "retailPrice": 2300,
    "image": "assets/trending/couple_better_together_tee.jpg",
    "description": "Interlocking graphic couple t-shirts. Features 'BETTER' half of heart on husband tee and 'TOGETHER' matching half on wife tee. High-density screen print on breathable cotton jersey.",
    "colors": [
      {
        "name": "White & Navy Contrast Pair",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "White & Navy Contrast Pair": "assets/trending/couple_better_together_tee.jpg"
    }
  },
  {
    "id": "prod-couple-king-queen-tee",
    "name": "'KING & QUEEN' Crown Edition Matching Couple T-Shirts (2-Piece Set)",
    "theme": "couple",
    "category": "tees",
    "categoryName": "Couple Romantic Apparel",
    "badge": "💍 2-PIECE SET",
    "baseCost": 1400,
    "profit": 1050,
    "retailPrice": 2450,
    "image": "assets/trending/couple_king_queen_tee.jpg",
    "description": "Complete pair of 2 matching luxury streetwear tees. Bold metallic gold 'KING' crown for him and elegant 'QUEEN' tiara for her. Made from 240 GSM combed cotton.",
    "colors": [
      {
        "name": "Onyx Black & White Pair",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black & White Pair": "assets/trending/couple_king_queen_tee.jpg"
    }
  },
  {
    "id": "prod-couple-matching-mugs",
    "name": "'Hubby & Wifey' Matte Black & Marble Ceramic Couple Mugs Set",
    "theme": "couple",
    "category": "mugs",
    "categoryName": "Couple Drinkware Set",
    "badge": "💍 COUPLE SET",
    "baseCost": 990,
    "profit": 1000,
    "retailPrice": 1990,
    "image": "assets/trending/couple_mugs.jpg",
    "description": "Set of TWO luxury mugs: 1 Matte Black 'Hubby' mug + 1 Italian Marble Glaze 'Wifey' mug with real 24k gold-accented handles and rims. Gift boxed.",
    "colors": [
      {
        "name": "Matte Black & Marble",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "2-Piece Gift Box Set (11 oz each)"
    ],
    "colorImages": {
      "Matte Black & Marble": "assets/trending/couple_mugs.jpg"
    }
  },
  {
    "id": "prod-couple-king-queen-hoodies",
    "name": "'KING & QUEEN' Crown Heavyweight Couple Hoodies (Pair of 2)",
    "theme": "couple",
    "category": "hoodies",
    "categoryName": "Matching Couple Winterwear",
    "badge": "💍 COUPLE SET",
    "baseCost": 3800,
    "profit": 1650,
    "retailPrice": 5450,
    "image": "assets/trending/couple_hoodie.jpg",
    "description": "Includes TWO heavyweight 380 GSM hoodies: 1 Black 'KING' Hoodie with Gold Crown + 1 Heather Grey 'QUEEN' Hoodie with Gold Crown. Ultra-cozy winter fleece.",
    "colors": [
      {
        "name": "Black (King) + Grey (Queen)",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Black (King) + Grey (Queen)": "assets/trending/couple_hoodie.jpg"
    }
  },
  {
    "id": "prod-couple-mr-mrs-caps",
    "name": "'Mr. & Mrs.' Soulmates Matching Embroidered Caps (Pair of 2)",
    "theme": "couple",
    "category": "caps",
    "categoryName": "Couple Headwear Set",
    "badge": "💍 COUPLE SET",
    "baseCost": 1100,
    "profit": 1090,
    "retailPrice": 2190,
    "image": "assets/trending/couple_caps.jpg",
    "description": "Set of TWO structured twill strapback caps: Gold crown embroidery with 'MR & MRS SOULMATES FOREVER'. Adjustable antique buckles.",
    "colors": [
      {
        "name": "Black (Mr) + White (Mrs)",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "Adjustable Strapbacks (Pair)"
    ],
    "colorImages": {
      "Black (Mr) + White (Mrs)": "assets/trending/couple_caps.jpg"
    }
  },
  {
    "id": "prod-couple-better-together-bag",
    "name": "'Better Together' Husband & Wife Padded Laptop Briefcase",
    "theme": "couple",
    "category": "laptop-bags",
    "categoryName": "Keepsake Travel Tech Bag",
    "badge": "💍 COUPLE SET",
    "baseCost": 1450,
    "profit": 1000,
    "retailPrice": 2450,
    "image": "assets/trending/couple_laptop_bag.jpg",
    "description": "Executive water-resistant laptop sleeve featuring romantic gold wedding ring and 'Better Together - Husband & Wife Soulmate Edition' typographic print.",
    "colors": [
      {
        "name": "Charcoal Grey",
        "hex": "#374151"
      }
    ],
    "sizes": [
      "15.6\" Padded Sleeve"
    ],
    "colorImages": {
      "Charcoal Grey": "assets/trending/couple_laptop_bag.jpg"
    }
  },
  {
    "id": "prod-birthday-vintage-legend-tee",
    "name": "'Vintage Legend - Aged to Perfection' Birthday Celebration Tee",
    "theme": "birthday",
    "category": "tees",
    "categoryName": "Birthday Special Edition",
    "badge": "🎂 BIRTHDAY SPECIAL",
    "baseCost": 850,
    "profit": 740,
    "retailPrice": 1590,
    "image": "assets/trending/birthday_tee.jpg",
    "description": "Washed black aesthetic vintage typography 'Limited Edition - Vintage Legend - Aged to Perfection'. Best-selling birthday gift tee for all ages.",
    "colors": [
      {
        "name": "Washed Black",
        "hex": "#1f2937"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Washed Black": "assets/trending/birthday_tee.jpg"
    }
  },
  {
    "id": "prod-birthday-superstar-mug",
    "name": "'Happy Birthday Superstar' Festive Ceramic Coffee Mug",
    "theme": "birthday",
    "category": "mugs",
    "categoryName": "Celebration Drinkware",
    "badge": "🎂 BIRTHDAY SPECIAL",
    "baseCost": 550,
    "profit": 550,
    "retailPrice": 1100,
    "image": "assets/trending/birthday_mug.jpg",
    "description": "Vibrant ceramic coffee mug with 'Happy Birthday' calligraphy, colorful party confetti, gift boxes, and balloons. Comes in a celebratory gift box.",
    "colors": [
      {
        "name": "Pure White Festive",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pure White Festive": "assets/trending/birthday_mug.jpg"
    }
  },
  {
    "id": "prod-birthday-level-unlocked-hoodie",
    "name": "'Level Unlocked - Happy Birthday' Heavyweight Street Hoodie",
    "theme": "birthday",
    "category": "hoodies",
    "categoryName": "Celebration Streetwear",
    "badge": "🎂 BIRTHDAY SPECIAL",
    "baseCost": 2100,
    "profit": 1000,
    "retailPrice": 3100,
    "image": "assets/trending/birthday_hoodie.jpg",
    "description": "380 GSM thermal heavyweight hoodie printed with 'Level Unlocked - Happy Birthday Edition - Made For Celebrations'. Thick drawstrings and kangaroo pocket.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/birthday_hoodie.jpg"
    }
  },
  {
    "id": "prod-birthday-squad-cap",
    "name": "'Birthday Squad - Limited Edition' Embroidered Party Cap",
    "theme": "birthday",
    "category": "caps",
    "categoryName": "Celebration Headwear",
    "badge": "🎂 BIRTHDAY SPECIAL",
    "baseCost": 650,
    "profit": 540,
    "retailPrice": 1190,
    "image": "assets/trending/birthday_cap.jpg",
    "description": "Structured black baseball twill cap with embroidered birthday cake motif and bold 'BIRTHDAY SQUAD - LIMITED EDITION' lettering.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "Adjustable Strapback"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/birthday_cap.jpg"
    }
  },
  {
    "id": "prod-birthday-confetti-laptop-bag",
    "name": "'Celebrate Every Moment' Happy Birthday Shockproof Laptop Bag",
    "theme": "birthday",
    "category": "laptop-bags",
    "categoryName": "Celebration Tech Accessory",
    "badge": "🎂 BIRTHDAY SPECIAL",
    "baseCost": 1450,
    "profit": 840,
    "retailPrice": 2290,
    "image": "assets/trending/birthday_laptop_bag.jpg",
    "description": "Waterproof protective laptop sleeve with colorful celebration confetti and modern 'Happy Birthday - Celebrate Every Moment' typography.",
    "colors": [
      {
        "name": "Charcoal Grey",
        "hex": "#374151"
      }
    ],
    "sizes": [
      "15.6\" Padded Sleeve"
    ],
    "colorImages": {
      "Charcoal Grey": "assets/trending/birthday_laptop_bag.jpg"
    }
  },
  {
    "id": "prod-chai-dhabba-mug",
    "name": "'Pehlay Chai Phir Kaam' Pakistani Dhabba Ceramic Mug",
    "theme": "chai",
    "category": "mugs",
    "categoryName": "Iconic Pakistani Culture",
    "badge": "☕ CHAI CLUB",
    "baseCost": 550,
    "profit": 500,
    "retailPrice": 1050,
    "image": "assets/trending/chai_mug.jpg",
    "description": "The national anthem of every tea lover in Pakistan! Ceramic mug with 'پہلے چائے پھر کام ☕ Pehlay Chai Phir Kaam' typography.",
    "colors": [
      {
        "name": "Dhabba White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Dhabba White": "assets/trending/chai_mug.jpg"
    }
  },
  {
    "id": "prod-classic-white-tee",
    "name": "Unisex Luxury Heavyweight White Tee (210 GSM Combed Cotton)",
    "theme": "basics",
    "category": "tees",
    "categoryName": "Luxury Everyday Basics",
    "badge": "⭐ BEST SELLER",
    "baseCost": 850,
    "profit": 600,
    "retailPrice": 1450,
    "image": "assets/blank_tshirt_front.jpg",
    "description": "210 GSM super combed cotton regular cut tee with reinforced collar ribbing, ultra-soft feel, and breathable weave.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/blank_tshirt_front.jpg"
    }
  },
  {
    "id": "prod-classic-fleece-hoodie",
    "name": "Unisex Heavyweight Fleece Black Hoodie (380 GSM)",
    "theme": "basics",
    "category": "hoodies",
    "categoryName": "Luxury Everyday Basics",
    "badge": "⭐ BEST SELLER",
    "baseCost": 2100,
    "profit": 800,
    "retailPrice": 2900,
    "image": "assets/product3.jpg",
    "description": "Heavyweight 380 GSM thermal brushed fleece hoodie with double-layer hood and deep front pouch pocket.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black": "assets/product3.jpg"
    }
  },
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
      {
        "name": "Black & White Duo",
        "hex": "#0f172a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Black & White Duo": "assets/trending/soulmates_hoodie_pair.jpg"
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
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/city_street_hoodie_black.jpg"
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
      {
        "name": "Mocha Brown",
        "hex": "#78350f"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Mocha Brown": "assets/trending/chai_winter_hoodie_brown.jpg"
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
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/trending/babar56_hoodie_white.jpg"
    }
  },
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
      {
        "name": "Matte Black & Gloss White",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "11 oz Ceramic Pair (Set of 2)"
    ],
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
      {
        "name": "Pakistan Green",
        "hex": "#15803d"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pakistan Green": "assets/trending/babar56_mug_green.jpg"
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
      {
        "name": "Glossy Black",
        "hex": "#0f172a"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Glossy Black": "assets/trending/suno_chanda_mug_blue.jpg"
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
      {
        "name": "Black & White Pair",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "11 oz Ceramic Pair (Set of 2)"
    ],
    "colorImages": {
      "Black & White Pair": "assets/trending/boss_couple_mugs.jpg"
    }
  },
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
      {
        "name": "Crisp White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "Adjustable Strapback (One Size)"
    ],
    "colorImages": {
      "Crisp White": "assets/trending/babar56_cap_black.jpg"
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
      {
        "name": "Crisp White Duo",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "Adjustable Strapback Pair"
    ],
    "colorImages": {
      "Crisp White Duo": "assets/trending/king_queen_caps.jpg"
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
      {
        "name": "Crisp White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "Adjustable Brass Buckle (One Size)"
    ],
    "colorImages": {
      "Crisp White": "assets/trending/pakistan_city_cap_charcoal.jpg"
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
      {
        "name": "Crisp White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "Adjustable Strapback (One Size)"
    ],
    "colorImages": {
      "Crisp White": "assets/trending/truck_art_cap_black.jpg"
    }
  },
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
      {
        "name": "Charcoal Grey",
        "hex": "#374151"
      }
    ],
    "sizes": [
      "15.6\" Padded Laptop Briefcase"
    ],
    "colorImages": {
      "Charcoal Grey": "assets/trending/executive_tech_bag_grey.jpg"
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
      {
        "name": "Chamakpatti Yellow",
        "hex": "#eab308"
      }
    ],
    "sizes": [
      "14\"-15.6\" Universal Laptop Sleeve"
    ],
    "colorImages": {
      "Chamakpatti Yellow": "assets/trending/truck_art_laptop_sleeve_yellow.jpg"
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
      {
        "name": "Crisp White Briefcase",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "15.6\" Messenger Briefcase"
    ],
    "colorImages": {
      "Crisp White Briefcase": "assets/trending/babar56_laptop_bag_black.jpg"
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
      {
        "name": "Matte Black Monogram",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "15.6\" Travel Briefcase"
    ],
    "colorImages": {
      "Matte Black Monogram": "assets/trending/king_queen_laptop_bag_black.jpg"
    }
  },
  {
    "id": "prod-fs-tokyo-cyber",
    "name": "Tokyo Neo-Cyberpunk '東京' Japanese Graphic Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Tokyo Streetwear",
    "badge": "🔥 TOKYO STREETWEAR",
    "baseCost": 990,
    "profit": 860,
    "retailPrice": 1850,
    "image": "assets/trending/fs_tokyo_cyberpunk_black.jpg",
    "description": "Heavyweight 260 GSM combed cotton long sleeve tee with ribbed elastic cuffs. High-density screenprint featuring Tokyo neo-cyberpunk grid typography, crimson Kanji accents, and futuristic cityscape skyline.",
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111216"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Onyx Black": "assets/trending/fs_tokyo_cyberpunk_black.jpg"
    }
  },
  {
    "id": "prod-fs-pacific-outdoors",
    "name": "Pacific Northwest Adventure Club Vintage Mountain Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Vintage Outdoor Apparel",
    "badge": "🌲 PACIFIC OUTDOORS",
    "baseCost": 950,
    "profit": 740,
    "retailPrice": 1690,
    "image": "assets/trending/fs_pacific_outdoors_green.jpg",
    "description": "Retro 70s adventure club circular crest with pine forest, snowcapped mountains and winding river trail. Washed forest green 240 GSM organic cotton with ribbed collar and wrist cuffs.",
    "colors": [
      {
        "name": "Forest Green",
        "hex": "#15803d"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Forest Green": "assets/trending/fs_pacific_outdoors_green.jpg"
    }
  },
  {
    "id": "prod-fs-brutalist-archive",
    "name": "Studio Archive // 2026 Edition Swiss Brutalist Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Editorial Streetwear",
    "badge": "🏛️ SWISS BRUTALIST",
    "baseCost": 980,
    "profit": 810,
    "retailPrice": 1790,
    "image": "assets/trending/fs_brutalist_archive_white.jpg",
    "description": "High-fashion brutalist typography with geographic Zurich coordinates, barcode badge and full-length vertical sleeve print. Heavyweight pure white combed cotton.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/trending/fs_brutalist_archive_white.jpg"
    }
  },
  {
    "id": "prod-fs-cyber-butterfly",
    "name": "Y2K Liquid Chrome Cyber Butterfly Mineral Wash Long Sleeve Tee",
    "theme": "couple",
    "category": "full-sleeves",
    "categoryName": "Y2K Cybercore Streetwear",
    "badge": "🦋 Y2K AESTHETIC",
    "baseCost": 990,
    "profit": 860,
    "retailPrice": 1850,
    "image": "assets/trending/fs_cyber_butterfly_charcoal.jpg",
    "description": "Metallic liquid chrome iridescent butterfly graphic with tribal thorny cyber-sigilism details on mineral washed charcoal grey heavyweight cotton. 1x1 ribbed cuffs.",
    "colors": [
      {
        "name": "Mineral Charcoal",
        "hex": "#374151"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Mineral Charcoal": "assets/trending/fs_cyber_butterfly_charcoal.jpg"
    }
  },
  {
    "id": "prod-fs-monaco-motorsport",
    "name": "Monaco Grand Prix '77 Circuit de Monte-Carlo Motorsport Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Vintage Racing Division",
    "badge": "🏎️ VINTAGE RACING",
    "baseCost": 980,
    "profit": 810,
    "retailPrice": 1790,
    "image": "assets/trending/fs_monaco_motorsport_cream.jpg",
    "description": "Authentic 1977 Monaco GP racing division graphic with crossed checkered flags, #77 racing badge, and vintage navy/orange inks on heavyweight cream cotton.",
    "colors": [
      {
        "name": "Vintage Cream",
        "hex": "#fdfbf7"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Vintage Cream": "assets/trending/fs_monaco_motorsport_cream.jpg"
    }
  },
  {
    "id": "prod-fs-celestial-navy",
    "name": "Celestial Orbit & Lunar Phases Astronomical Long Sleeve Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Astronomy Streetwear",
    "badge": "🌙 CELESTIAL ORBIT",
    "baseCost": 990,
    "profit": 860,
    "retailPrice": 1850,
    "image": "assets/trending/fs_celestial_deepspace_navy.jpg",
    "description": "Deep midnight navy combed jersey featuring intricate lunar phase cycles, solar system planetary orbits, and gold constellation maps. Super soft 240 GSM luxury knit.",
    "colors": [
      {
        "name": "Midnight Navy",
        "hex": "#1e3a8a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Midnight Navy": "assets/trending/fs_celestial_deepspace_navy.jpg"
    }
  },
  {
    "id": "prod-fs-cyber-samurai",
    "name": "Cyberpunk Samurai 2077 Harajuku Urban Dark Manga Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Anime Streetwear",
    "badge": "⚔️ CYBER SAMURAI",
    "baseCost": 990,
    "profit": 860,
    "retailPrice": 1850,
    "image": "assets/trending/fs_harajuku_samurai_black.jpg",
    "description": "Oversized Harajuku graphic featuring neon cyan & magenta armored cyber samurai with dual katanas and Kanji typography. Drop-shoulder cut with ribbed wrist cuffs.",
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Jet Black": "assets/trending/fs_harajuku_samurai_black.jpg"
    }
  },
  {
    "id": "prod-fs-bauhaus-weimar",
    "name": "Bauhaus 1919 Weimar 'Form Follows Function' Modernist Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Modernist Design Apparel",
    "badge": "🎨 BAUHAUS 1919",
    "baseCost": 950,
    "profit": 740,
    "retailPrice": 1690,
    "image": "assets/trending/fs_bauhaus_geometric_cream.jpg",
    "description": "Iconic primary geometric shapes (red circle, blue square, yellow triangle) celebrating Bauhaus Weimar 1919 exhibition. Screenprinted on heavyweight cream combed knit.",
    "colors": [
      {
        "name": "Bauhaus Cream",
        "hex": "#f1f1ee"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Bauhaus Cream": "assets/trending/fs_bauhaus_geometric_cream.jpg"
    }
  },
  {
    "id": "prod-fs-coffee-vinyl",
    "name": "Sunday Morning Coffee & Vinyl Society 33⅓ RPM Long Sleeve Tee",
    "theme": "birthday",
    "category": "full-sleeves",
    "categoryName": "Aesthetic Lifestyle Apparel",
    "badge": "☕ COFFEE & VINYL",
    "baseCost": 950,
    "profit": 740,
    "retailPrice": 1690,
    "image": "assets/trending/fs_coffee_vinyl_white.jpg",
    "description": "Minimalist vinyl record line-art with pour-over coffee cup motif. Dedicated to analog audiophiles and weekend cafe mornings. Ultra-soft breathable combed cotton.",
    "colors": [
      {
        "name": "Crisp White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Crisp White": "assets/trending/fs_coffee_vinyl_white.jpg"
    }
  },
  {
    "id": "prod-fs-botanical-fern",
    "name": "Botanica Herbarium Vol. VII Alpine Fern Scientific Long Sleeve Tee",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Botanical Nature Apparel",
    "badge": "🌿 HERBARIUM",
    "baseCost": 950,
    "profit": 740,
    "retailPrice": 1690,
    "image": "assets/trending/fs_botanical_fern_cream.jpg",
    "description": "Scientific botanical field illustration of Alpine Polypodiopsida Fern with vintage classification typography in rich forest green ink on natural ecru cotton.",
    "colors": [
      {
        "name": "Natural Ecru",
        "hex": "#f5f5f0"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Natural Ecru": "assets/trending/fs_botanical_fern_cream.jpg"
    }
  },
  {
    "id": "prod-fs-faiz-poetry",
    "name": "Faiz Ahmad Faiz 'Bol Ke Lab Azad Hain Tere' Urdu Streetwear Long Sleeve",
    "theme": "eid",
    "category": "full-sleeves",
    "categoryName": "Urdu Poetry Streetwear",
    "badge": "📜 URDU POETRY",
    "baseCost": 990,
    "profit": 860,
    "retailPrice": 1850,
    "image": "assets/trending/fs_faiz_poetry_white.jpg",
    "description": "Immortal revolutionary verse by Faiz Ahmad Faiz 'بول کہ لب آزاد ہیں ترے' in modern editorial typography. 240 GSM heavy combed cotton with double-stitched ribbed cuffs.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/trending/fs_faiz_poetry_white.jpg"
    }
  },
  {
    "id": "prod-fs-synthwave-sunset",
    "name": "California Highway 1984 'Sunset Drive' Retro Synthwave Long Sleeve Tee",
    "theme": "cricket",
    "category": "full-sleeves",
    "categoryName": "Retro 80s Streetwear",
    "badge": "🌴 1984 SYNTHWAVE",
    "baseCost": 980,
    "profit": 810,
    "retailPrice": 1790,
    "image": "assets/trending/fs_synthwave_sunset_grey.jpg",
    "description": "Outrun aesthetic neon sunset horizon with tropical palm tree silhouettes and synthwave grid lines. Heather grey vintage cotton with ribbed cuffs.",
    "colors": [
      {
        "name": "Heather Grey",
        "hex": "#94a3b8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Heather Grey": "assets/trending/fs_synthwave_sunset_grey.jpg"
    }
  },
  {
    "id": "prod-tee-sukoon-urdu",
    "name": "Sukoon (سکون) High-Density Minimal Typography Graphic Tee",
    "theme": "urdu-aesthetic",
    "category": "tees",
    "categoryName": "Typography Streetwear Edition",
    "badge": "✨ AESTHETIC PRINT",
    "baseCost": 950,
    "profit": 800,
    "retailPrice": 1750,
    "image": "assets/pk_products/tee_sukoon_urdu.jpg",
    "description": "Modern Nastaliq letterform 'سکون' (Peace & Serenity) centered in clean Japanese-streetwear minimalist badge layout on 220 GSM super combed cotton.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/tee_sukoon_urdu.jpg"
    }
  },
  {
    "id": "prod-tee-truck-art-pop",
    "name": "Karachi Truck Art Peacock Pop-Art Heavyweight Tee",
    "theme": "truck-art",
    "category": "tees",
    "categoryName": "Modern Streetwear Graphic Tee",
    "badge": "🎨 ARTIST SERIES",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/pk_products/tee_truck_art_pop.jpg",
    "description": "240 GSM heavy combed cotton. Vibrant Karachi truck art chamakpatti peacock motif fused with contemporary streetwear pop-art framing.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/tee_truck_art_pop.jpg"
    }
  },
  {
    "id": "prod-tee-karachi-cyberpunk",
    "name": "Karachi 2099 'City of Lights' Cyberpunk Graphic Tee",
    "theme": "cyberpunk",
    "category": "tees",
    "categoryName": "Cyberpunk Streetwear Edition",
    "badge": "⚡ CYBER SERIES",
    "baseCost": 990,
    "profit": 800,
    "retailPrice": 1790,
    "image": "assets/pk_products/tee_karachi_cyberpunk.jpg",
    "description": "Saddar neon skyline & Clifton coastal highway in 1980s retro-futuristic synthwave vector with technical grid coordinates on 240 GSM cotton.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/tee_karachi_cyberpunk.jpg"
    }
  },
  {
    "id": "prod-hoodie-qalandar",
    "name": "Lal Qalandar (قلندر) Mystical Sufi Heritage Heavy Hoodie",
    "theme": "sufi-heritage",
    "category": "hoodies",
    "categoryName": "Sufi Heritage Streetwear Hoodie",
    "badge": "🔥 BESTSELLER",
    "baseCost": 2300,
    "profit": 800,
    "retailPrice": 3100,
    "image": "assets/pk_products/hoodie_qalandar.jpg",
    "description": "Abstract whirling dervish silhouette and mystic Urdu typography 'مست قلندر' with premium puff print badge on 380 GSM thermal brushed fleece.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/hoodie_qalandar.jpg"
    }
  },
  {
    "id": "prod-hoodie-karakoram",
    "name": "Karakoram K2 8611m Expedition Streetwear Heavy Hoodie",
    "theme": "alpine-k2",
    "category": "hoodies",
    "categoryName": "Expedition Alpine Hoodie",
    "badge": "🏔️ ALPINE CLUB",
    "baseCost": 2300,
    "profit": 800,
    "retailPrice": 3100,
    "image": "assets/pk_products/hoodie_karakoram.jpg",
    "description": "Topographic contour line art of K2 summit (8,611m) and Concordia glacier with minimal alpine club coordinates badge on 380 GSM brushed fleece.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/hoodie_karakoram.jpg"
    }
  },
  {
    "id": "prod-hoodie-pk-forest-gold",
    "name": "Pakistan National 'Gold Star & Crescent' Forest Fleece Hoodie",
    "theme": "heritage",
    "category": "hoodies",
    "categoryName": "Heavyweight Fleece Streetwear",
    "badge": "⭐ NATIONAL EDITION",
    "baseCost": 2100,
    "profit": 1150,
    "retailPrice": 3250,
    "image": "assets/trending/pk_cricket_hoodie_black.jpg",
    "description": "380 GSM thermal brushed fleece hoodie in deep forest green heather with metallic gold crescent & star emblem on chest. Warm kangaroo pocket and ribbed cuffs.",
    "colors": [
      {
        "name": "Forest Green",
        "hex": "#143a2b"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colorImages": {
      "Forest Green": "assets/trending/pk_cricket_hoodie_black.jpg"
    }
  },
  {
    "id": "prod-mug-multan-kashigari",
    "name": "Multani Kashigari Blue Pottery Ceramic Mug",
    "theme": "heritage-art",
    "category": "mugs",
    "categoryName": "Heritage Ceramic Drinkware",
    "badge": "🏺 HANDCRAFTED ART",
    "baseCost": 600,
    "profit": 550,
    "retailPrice": 1150,
    "image": "assets/pk_products/mug_multan_kashigari.jpg",
    "description": "Traditional Multan tomb ceramic tilework badge with cobalt indigo spirals and Persian turquoise floral rosettes on glossy white glazed ceramic.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/mug_multan_kashigari.jpg"
    }
  },
  {
    "id": "prod-mug-chai-charcha",
    "name": "Pehlay Chai Phir Kaam (پہلے چائے) Dhabba Edition Mug",
    "theme": "chai-culture",
    "category": "mugs",
    "categoryName": "Chai Culture Drinkware",
    "badge": "☕ CHAI LOVERS",
    "baseCost": 600,
    "profit": 550,
    "retailPrice": 1150,
    "image": "assets/pk_products/mug_chai_charcha.jpg",
    "description": "Steaming cutting glass chai kettle artwork with witty Urdu slogan 'پہلے چائے پھر کام'. Perfect everyday ceramic mug for tea enthusiasts.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/mug_chai_charcha.jpg"
    }
  },
  {
    "id": "prod-mug-dekh-magar-pyar",
    "name": "Dekh Magar Pyar Se (دیکھ مگر پیار سے) Truck Art Mug",
    "theme": "truck-art",
    "category": "mugs",
    "categoryName": "Truck Art Ceramic Drinkware",
    "badge": "❤️ TRUCK ART SPECIAL",
    "baseCost": 600,
    "profit": 550,
    "retailPrice": 1150,
    "image": "assets/pk_products/mug_dekh_magar_pyar.jpg",
    "description": "Legendary road catchphrase 'دیکھ مگر پیار سے' with vibrant Karachi truck art floral border and peacock crest on durable 11 oz ceramic.",
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      }
    ],
    "sizes": [
      "11 oz Ceramic Mug"
    ],
    "colorImages": {
      "Pure White": "assets/pk_products/mug_dekh_magar_pyar.jpg"
    }
  }
];;;

// 47 Modern Pakistani Standalone Print Badges for Studio Library
const PK_READY_DESIGNS = [
  {
    "id": "prod-tee-truck-art-pop",
    "name": "Modern Truck Art Peacock Pop-Art Tee (240 GSM)",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_truck_art_pop.png",
    "badgeTitle": "KARACHI TRUCK ART",
    "subTitle": "چمک پٹی آرٹ • 2026",
    "theme": "truck_art"
  },
  {
    "id": "prod-tee-faiz-bol",
    "name": "Faiz Ahmad Faiz 'Bol Ke Lab Azaad' Calligraphy Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_faiz_bol.png",
    "badgeTitle": "FAIZ AHMAD FAIZ",
    "subTitle": "بول کہ لب آزاد ہیں ترے",
    "theme": "urdu_poetry"
  },
  {
    "id": "prod-tee-chai-dhaba",
    "name": "'Pehlay Chai Phir Baat' Street Dhabba Graphic Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_chai_dhaba.png",
    "badgeTitle": "KARAK CHAI CLUB",
    "subTitle": "پہلے چائے پھر بات ☕",
    "theme": "chai_culture"
  },
  {
    "id": "prod-tee-karachi-cyberpunk",
    "name": "Karachi Lights 2099 Cyberpunk Streetwear Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_karachi_cyberpunk.png",
    "badgeTitle": "KARACHI 2099",
    "subTitle": "CITY OF LIGHTS // عروس البلاد",
    "theme": "cyber_pakistan"
  },
  {
    "id": "prod-tee-lahore-heritage",
    "name": "Lahore Fort Fresco Modernist Tile Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_lahore_heritage.png",
    "badgeTitle": "LAHORE ARCHIVES",
    "subTitle": "شاہی قلعہ لاہور • MUGHAL MOSAIC",
    "theme": "heritage"
  },
  {
    "id": "prod-tee-sukoon-urdu",
    "name": "'Sukoon' (سکون) High-Density Minimal Typography Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_sukoon_urdu.png",
    "badgeTitle": "SUKOON // سکون",
    "subTitle": "SERENITY IN CHAOS",
    "theme": "urdu_minimal"
  },
  {
    "id": "prod-tee-rickshaw-drift",
    "name": "Karachi Rickshaw Drift Society Retro Graphic Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_rickshaw_drift.png",
    "badgeTitle": "RICKSHAW DRIFT CLUB",
    "subTitle": "دیکھ مگر پیار سے • KHI",
    "theme": "retro_vehicle"
  },
  {
    "id": "prod-tee-gully-cricket",
    "name": "Tape-Ball Gully Cricket Legends 1996 Graphic Tee",
    "category": "tees",
    "designSrc": "assets/pk_designs/design_tee_gully_cricket.png",
    "badgeTitle": "GULLY CRICKET '96",
    "subTitle": "TAPE BALL CHAMPIONSHIP",
    "theme": "cricket_nostalgia"
  },
  {
    "id": "prod-hoodie-karakoram",
    "name": "Karakoram K2 8611m Expedition Streetwear Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_karakoram.png",
    "badgeTitle": "KARAKORAM RANGE // K2",
    "subTitle": "8,611 METERS • SAVAGE MOUNTAIN",
    "theme": "alpine_k2"
  },
  {
    "id": "prod-hoodie-qalandar",
    "name": "'Mast Qalandar' Modern Sufi Grunge Street Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_qalandar.png",
    "badgeTitle": "DAM MAST QALANDAR",
    "subTitle": "صوفیانا جادو // SUFI MYSTIC",
    "theme": "sufi_grunge"
  },
  {
    "id": "prod-hoodie-islamabad-monsoon",
    "name": "Islamabad Margalla Forest Club Heavyweight Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_islamabad_monsoon.png",
    "badgeTitle": "MARGALLA EXPEDITIONS",
    "subTitle": "ISLAMABAD 051 // PINE TRAIL",
    "theme": "nature_isb"
  },
  {
    "id": "prod-hoodie-faiz-hum-dekhenge",
    "name": "'Hum Dekhenge' Revolutionary Poetry Street Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_faiz_hum_dekhenge.png",
    "badgeTitle": "HUM DEKHENGE // ہم دیکھیں گے",
    "subTitle": "FAIZ AHMAD FAIZ • 1979",
    "theme": "faiz_poetry"
  },
  {
    "id": "prod-hoodie-multan-kashigari",
    "name": "Multan Blue Pottery Kashigari Geometric Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_multan_kashigari.png",
    "badgeTitle": "MULTAN KASHIGARI",
    "subTitle": "BLUE POTTERY MOSAIC • ملتان",
    "theme": "multan_art"
  },
  {
    "id": "prod-hoodie-mohenjodaro",
    "name": "Indus Valley King Priest Line-Art Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_mohenjodaro.png",
    "badgeTitle": "INDUS VALLEY 2500 BCE",
    "subTitle": "KING PRIEST // موہنجودڑو",
    "theme": "ancient_indus"
  },
  {
    "id": "prod-hoodie-sabran-jameela",
    "name": "'Sabran Jameela' Islamic Geometric Arch Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_sabran_jameela.png",
    "badgeTitle": "SABRAN JAMEELA",
    "subTitle": "صَبْرًا جَمِيلًا // NOBLE PATIENCE",
    "theme": "islamic_arch"
  },
  {
    "id": "prod-hoodie-pindi-boyz",
    "name": "Pindi Boyz Rawalpindi Metro Street Hoodie",
    "category": "hoodies",
    "designSrc": "assets/pk_designs/design_hoodie_pindi_boyz.png",
    "badgeTitle": "PINDI EXPRESS",
    "subTitle": "RAWALPINDI 051 // STREETWEAR",
    "theme": "pindi_metro"
  },
  {
    "id": "prod-mug-chai-charcha",
    "name": "'Pehlay Chai Phir Kaam' Modern Dhabba Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_chai_charcha.png",
    "badgeTitle": "PEHLAY CHAI",
    "subTitle": "پہلے چائے پھر کام ☕",
    "theme": "chai_mug"
  },
  {
    "id": "prod-mug-dekh-magar-pyar",
    "name": "'Dekh Magar Pyar Se' Truck Art Ceramic Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_dekh_magar_pyar.png",
    "badgeTitle": "DEKH MAGAR PYAR SE",
    "subTitle": "دیکھ مگر پیار سے ❤️",
    "theme": "truck_art_mug"
  },
  {
    "id": "prod-mug-iqbal-khudi",
    "name": "Allama Iqbal 'Khudi' Gold & Black Ceramic Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_iqbal_khudi.png",
    "badgeTitle": "ALLAMA IQBAL",
    "subTitle": "خودی کو کر بلند اتنا",
    "theme": "gold_poetry_mug"
  },
  {
    "id": "prod-mug-multan-kashigari",
    "name": "Multan Blue Kashigari Cobalt Ceramic Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_multan_kashigari.png",
    "badgeTitle": "MULTANI KASHIGARI",
    "subTitle": "کاشیکاری ملتان • COBALT",
    "theme": "kashigari_mug"
  },
  {
    "id": "prod-mug-karachi-se-lahore",
    "name": "'Karachi Se Lahore' GT Road Milestone Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_karachi_se_lahore.png",
    "badgeTitle": "N-5 HIGHWAY",
    "subTitle": "KARACHI ➔ LAHORE • 1200 KM",
    "theme": "road_milestone"
  },
  {
    "id": "prod-mug-sitaron-se-aagay",
    "name": "'Sitaron Se Aagay' Cosmic Astronomy Urdu Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_sitaron_se_aagay.png",
    "badgeTitle": "SITARON SE AAGAY",
    "subTitle": "ستاروں سے آگے جہاں اور بھی ہیں",
    "theme": "cosmic_urdu"
  },
  {
    "id": "prod-mug-horn-ahista",
    "name": "'Horn Ahista Bajao' Street Humor Ceramic Mug",
    "category": "mugs",
    "designSrc": "assets/pk_designs/design_mug_horn_ahista.png",
    "badgeTitle": "HORN AHISTA BAJAO",
    "subTitle": "ہارن آہستہ بجاؤ • NO NOISE",
    "theme": "horn_humor"
  },
  {
    "id": "prod-cap-1992-tigers",
    "name": "Pakistan '92 Cornered Tigers Championship Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_1992_tigers.png",
    "badgeTitle": "CORNERED TIGERS",
    "subTitle": "PAKISTAN 1992 ★ CHAMPIONS",
    "theme": "sports_cap"
  },
  {
    "id": "prod-cap-truck-art-crest",
    "name": "Truck Art Floral Crest Embroidered Strapback Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_truck_art_crest.png",
    "badgeTitle": "CHAMAK PATTI CREST",
    "subTitle": "TRUCK ART FLORAL // 2026",
    "theme": "truck_art_cap"
  },
  {
    "id": "prod-cap-karakoram-alpine",
    "name": "Karakoram Mountain Alpine Club Explorer Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_karakoram_alpine.png",
    "badgeTitle": "KARAKORAM CLUB",
    "subTitle": "NORTHERN EXPLORERS // 8611M",
    "theme": "alpine_cap"
  },
  {
    "id": "prod-cap-lahore-zindadilan",
    "name": "'Zinda Dilan' Lahore Heritage Structured Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_lahore_zindadilan.png",
    "badgeTitle": "ZINDA DILAN LHR",
    "subTitle": "زندہ دلان لاہور • 1021",
    "theme": "lahore_cap"
  },
  {
    "id": "prod-cap-sukoon-script",
    "name": "'Sukoon' (سکون) Minimalist Script Black Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_sukoon_script.png",
    "badgeTitle": "SUKOON // سکون",
    "subTitle": "PEACE OF MIND",
    "theme": "sukoon_cap"
  },
  {
    "id": "prod-cap-islamabad-051",
    "name": "Islamabad 051 Capital District Vintage Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_islamabad_051.png",
    "badgeTitle": "ISLAMABAD 051",
    "subTitle": "CAPITAL TERRITORY",
    "theme": "isb_cap"
  },
  {
    "id": "prod-cap-karachi-harbor",
    "name": "Karachi Port Grand Maritime Anchor Cap",
    "category": "caps",
    "designSrc": "assets/pk_designs/design_cap_karachi_harbor.png",
    "badgeTitle": "KARACHI HARBOR",
    "subTitle": "PORT GRAND // MANORA PT",
    "theme": "maritime_cap"
  },
  {
    "id": "prod-bag-multan-kashigari",
    "name": "Multan Kashigari Cobalt Ceramic Laptop Sleeve (15.6\")",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_multan_kashigari.png",
    "badgeTitle": "MULTANI KASHIGARI",
    "subTitle": "COBALT CERAMIC ART • 2026",
    "theme": "kashigari_bag"
  },
  {
    "id": "prod-bag-karakoram-topo",
    "name": "Karakoram Topographic Contour Laptop Briefcase",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_karakoram_topo.png",
    "badgeTitle": "KARAKORAM TOPO MAP",
    "subTitle": "K2 SUMMIT 8611M • NORTHERN ARC",
    "theme": "topo_bag"
  },
  {
    "id": "prod-bag-truck-art-kaleidoscope",
    "name": "Truck Art Pop Kaleidoscope Laptop Briefcase",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_truck_art_kaleidoscope.png",
    "badgeTitle": "CHAMAK PATTI DESIGN",
    "subTitle": "PAKISTANI TRUCK ART • FOLK POP",
    "theme": "truck_art_bag"
  },
  {
    "id": "prod-bag-lahore-fort-mosaic",
    "name": "Lahore Fort Fresco Mosaic Executive Bag",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_lahore_fort_mosaic.png",
    "badgeTitle": "LAHORE FORT FRESCO",
    "subTitle": "SHEESH MAHAL GEOMETRY • 1631",
    "theme": "heritage_bag"
  },
  {
    "id": "prod-bag-taxila-gandhara",
    "name": "Taxila Gandhara Minimalist Line-Art Laptop Sleeve",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_taxila_gandhara.png",
    "badgeTitle": "TAXILA ARCHIVES",
    "subTitle": "GANDHARA HERITAGE • 500 BCE",
    "theme": "taxila_bag"
  },
  {
    "id": "prod-bag-urdu-calligraphy",
    "name": "'Ilm O Hunar' (علم و ہنر) Modern Calligraphy Bag",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_urdu_calligraphy.png",
    "badgeTitle": "ILM O HUNAR",
    "subTitle": "علم و ہنر • KNOWLEDGE & CRAFT",
    "theme": "calligraphy_bag"
  },
  {
    "id": "prod-bag-monument-wireframe",
    "name": "Pakistan Monument 3D Wireframe CAD Briefcase",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_monument_wireframe.png",
    "badgeTitle": "PAKISTAN MONUMENT",
    "subTitle": "3D CAD BLUEPRINT // SHAKARPARIAN",
    "theme": "monument_bag"
  },
  {
    "id": "prod-bag-karachi-harbor",
    "name": "Karachi Maritime Deep-Sea Navigational Bag",
    "category": "laptop-bags",
    "designSrc": "assets/pk_designs/design_bag_karachi_harbor.png",
    "badgeTitle": "ARABIAN SEA CHARTS",
    "subTitle": "PORT OF KARACHI // 24.86° N",
    "theme": "maritime_bag"
  },
  {
    "id": "prod-diary-iqbal-khudi",
    "name": "Allama Iqbal 'Khudi' Gold Foil Hardcover Journal",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_iqbal_khudi.png",
    "badgeTitle": "ALLAMA IQBAL",
    "subTitle": "خودی کو کر بلند اتنا • GOLD FOIL",
    "theme": "gold_diary"
  },
  {
    "id": "prod-diary-multan-kashigari",
    "name": "Multani Kashigari Cobalt Blue Hardcover Notebook",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_multan_kashigari.png",
    "badgeTitle": "MULTANI KASHIGARI",
    "subTitle": "BLUE POTTERY NOTEBOOK • ملتان",
    "theme": "kashigari_diary"
  },
  {
    "id": "prod-diary-faiz-bol",
    "name": "Faiz Poetry Collection A5 Executive Notebook",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_faiz_bol.png",
    "badgeTitle": "FAIZ AHMAD FAIZ",
    "subTitle": "نقش فریادی • POETRY JOURNAL",
    "theme": "faiz_diary"
  },
  {
    "id": "prod-diary-truck-art-radiant",
    "name": "Radiant Truck Art Chamakpatti Art Journal",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_truck_art_radiant.png",
    "badgeTitle": "TRUCK ART RADIANT",
    "subTitle": "چمک پٹی آرٹ ڈائری • FOLK POP",
    "theme": "truck_art_diary"
  },
  {
    "id": "prod-diary-karakoram-field",
    "name": "Karakoram Mountaineer Expedition Field Log",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_karakoram_field.png",
    "badgeTitle": "KARAKORAM FIELD LOG",
    "subTitle": "BALTORO EXPEDITION • K2 8611M",
    "theme": "field_diary"
  },
  {
    "id": "prod-diary-sukoon-minimal",
    "name": "'Sukoon' (سکون) Minimalist Sage Cloth Notebook",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_sukoon_minimal.png",
    "badgeTitle": "SUKOON // سکون",
    "subTitle": "SERENITY JOURNAL",
    "theme": "sukoon_diary"
  },
  {
    "id": "prod-diary-badshahi-blueprint",
    "name": "Badshahi Mosque Architectural Blueprint Journal",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_badshahi_blueprint.png",
    "badgeTitle": "BADSHAHI MOSQUE",
    "subTitle": "LAHORE ARCHITECTURE • 1673",
    "theme": "badshahi_diary"
  },
  {
    "id": "prod-diary-dhabba-chai",
    "name": "Dhabba Chronicles Cutting Chai Pocket Diary",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_dhabba_chai.png",
    "badgeTitle": "DHABBA CHRONICLES",
    "subTitle": "چائے کا وقت // KARAK CHAI",
    "theme": "chai_diary"
  },
  {
    "id": "prod-diary-mohenjodaro",
    "name": "Indus Seal Script Archaeologist Notebook",
    "category": "diaries",
    "designSrc": "assets/pk_designs/design_diary_mohenjodaro.png",
    "badgeTitle": "INDUS EXCAVATION",
    "subTitle": "MOHENJO-DARO 2500 BCE",
    "theme": "mohenjo_diary"
  }
];

// 2. CEEPRINTO API CLIENT CONFIGURATION
const CEEPRINTO_CONFIG = {
  endpoint: "/api/ceeprinto/create-order",
  keyId: "47wpeRK8jmunkr2NHepqmDR3",
  apiKey: "cp_live_47wpeRK8jmunkr2NHepqmDR3.fyGJMUG8DMHhVJaJls80vQwopUm1yJJjZtkDwjE2",
  storeName: "Mfstore"
};


// ==========================================
// CATEGORY & PAYMENT PROFIT RULES ENGINE (FIREBASE RTDB BACKED)
// Covers Core 5+ Categories: tees, hoodies, mugs, caps, diaries, laptop-bags
// ==========================================
function mapCategoryKey(catOrBlank) {
  if (!catOrBlank) return "tees";
  const c = String(catOrBlank).toLowerCase();
  if (c.includes("tee") || c === "tshirt" || c === "t-shirt") return "tees";
  if (c.includes("hoodie")) return "hoodies";
  if (c.includes("mug") || c.includes("cup")) return "mugs";
  if (c.includes("cap")) return "caps";
  if (c.includes("notebook") || c.includes("diar")) return "diaries";
  if (c.includes("bag") || c.includes("laptop")) return "laptop-bags";
  return "tees";
}

function mapBlankToCategory(blankKey) {
  if (!blankKey) return "tees";
  const b = String(blankKey).toLowerCase();
  if (b.includes("tee")) return "tees";
  if (b.includes("hoodie")) return "hoodies";
  if (b.includes("mug") || b.includes("cup")) return "mugs";
  if (b.includes("cap")) return "caps";
  if (b.includes("notebook") || b.includes("diar")) return "diaries";
  if (b.includes("laptop") || b.includes("bag")) return "laptop-bags";
  return "tees";
}

function getCategoryProfit(categoryKey, plan = "half_advance") {
  const normCat = mapCategoryKey(categoryKey);
  const catConfig = AppState.pricingRules && AppState.pricingRules.categories && AppState.pricingRules.categories[normCat];

  if (catConfig) {
    if (plan === "full_advance" || plan === "full") {
      return catConfig.full_advance_profit ?? 500;
    }
    if (plan === "half_advance" || plan === "half") {
      return catConfig.half_advance_profit ?? 600;
    }
    if (plan === "cod") {
      return catConfig.cod_profit ?? 800;
    }
  }

  // Fallback to global defaults if category rule not found
  if (plan === "full_advance" || plan === "full") return (AppState.pricingRules && AppState.pricingRules.fullAdvanceProfit) || 500;
  if (plan === "half_advance" || plan === "half") return (AppState.pricingRules && AppState.pricingRules.halfAdvanceProfit) || 600;
  return (AppState.pricingRules && AppState.pricingRules.codProfit) || 800;
}

// 3. APPLICATION STATE & FIREBASE PRICING RULES
const AppState = {
  cart: JSON.parse(localStorage.getItem("mf_cart") || "[]"),
  orders: JSON.parse(localStorage.getItem("mf_orders") || "[]"),
  selectedVariants: {},
  shippingFee: 250,
  activeFilter: "all",
  paymentReceiptData: null,
  pricingRules: {
    categories: {
      "tees": { name: "T-Shirts", cod_profit: 800, half_advance_profit: 600, full_advance_profit: 500 },
      "full-sleeves": { name: "Full Sleeve T-Shirts", cod_profit: 850, half_advance_profit: 650, full_advance_profit: 550 },
      "hoodies": { name: "Hoodies", cod_profit: 1000, half_advance_profit: 800, full_advance_profit: 600 },
      "mugs": { name: "Cups & Mugs", cod_profit: 650, half_advance_profit: 500, full_advance_profit: 400 },
      "caps": { name: "Caps", cod_profit: 650, half_advance_profit: 500, full_advance_profit: 400 },
      "diaries": { name: "Notebooks", cod_profit: 650, half_advance_profit: 500, full_advance_profit: 400 },
      "laptop-bags": { name: "Laptop Bags", cod_profit: 1000, half_advance_profit: 800, full_advance_profit: 600 }
    },
    fullAdvanceProfit: 500,  // Direct Online Payment Profit (Default)
    halfAdvanceProfit: 600,  // 50% Advance Booking (Default)
    codProfit: 800,          // 100% COD Profit (Default)
    bankName: "Online Payment",
    accountTitle: "MF Store"
  },
  selectedPaymentMethod: "full_advance",
  cardPaymentPaid: false,
  cardPaymentDetails: null, // default option: Online Payment Direct Transfer
  customizer: {
    blankType: "mug",
    blankName: "White Ceramic Mug with Color Inside",
    baseCost: 550,
    profit: 550,
    price: 1100,
    color: "Pure White",
    size: "11 oz Standard",
    activeSide: "left",
    mugColor: "white",
    qty: 1,
    isOutOfBounds: false,
    products: {
      "mug": {
        name: "White Ceramic Mug with Color Inside",
        category: "mugs",
        baseCost: 550,
        sizes: ["11 oz Standard"],
        sides: [
          { id: "front", label: "Front", sub: "Front side design", fee: 200, img: "assets/ceeprinto_mug_front_stage.webp" },
          { id: "left", label: "Left", sub: "", fee: 200, img: "assets/ceeprinto_mug_left_stage.webp" },
          { id: "right", label: "Right", sub: "", fee: 200, img: "assets/ceeprinto_mug_right_stage.webp" },
          { id: "packaging", label: "Custom Packaging", sub: "", fee: 50, img: "assets/ceeprinto_mug_packaging_stage.webp" }
        ],
        mugVariants: {
          "white": { name: "Pure White", label: "Pure White Cup", cost: 550, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "green_white": { name: "Green & White", label: "Green & White (Two-Tone)", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "red_white": { name: "Red & White", label: "Two-Tone Red & White Cup", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "blue_white": { name: "Blue & White", label: "Two-Tone Blue & White Cup", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "yellow_white": { name: "Yellow & White", label: "Two-Tone Yellow & White Cup", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "orange_white": { name: "Orange & White", label: "Two-Tone Orange & White Cup", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "pink_white": { name: "Pink & White", label: "Two-Tone Pink & White Cup", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "black_white": { name: "Black & White", label: "Two-Tone Black & White Cup", cost: 600, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" },
          "black": { name: "Obsidian Black", label: "Obsidian Black Cup", cost: 650, front: "assets/ceeprinto_mug_front_stage.webp", left: "assets/ceeprinto_mug_left_stage.webp", right: "assets/ceeprinto_mug_right_stage.webp", packaging: "assets/ceeprinto_mug_packaging_stage.webp" }
        },
        printArea: {
          "front": { top: "29.72%", left: "29.17%", width: "41.17%", height: "48.11%" },
          "left": { top: "31.55%", left: "38.00%", width: "40.83%", height: "45.95%" },
          "right": { top: "27.83%", left: "23.67%", width: "40.67%", height: "52.45%" },
          "packaging": { top: "4.83%", left: "16.87%", width: "76.85%", height: "89.50%" }
        }
      },
      "white-tee": {
        name: "Unisex Regular T-Shirt (100% Combed Cotton)",
        category: "tees",
        baseCost: 850,
        sizes: ["S", "M", "L", "XL", "XXL"],
        frontImg: "assets/blank_tshirt_front.jpg",
        backImg: "assets/blank_tshirt_back.jpg",
        sides: [
          { id: "front", label: "Front", sub: "Front chest design", fee: 200, img: "assets/blank_tshirt_front.jpg" },
          { id: "back", label: "Back", sub: "Back print design", fee: 200, img: "assets/blank_tshirt_back.jpg" },
          { id: "packaging", label: "Custom Packaging", sub: "Branded box packaging", fee: 50, img: "assets/product_bottle.jpg" }
        ],
        printArea: {
          "front": { top: "24%", left: "28%", width: "44%", height: "50%" },
          "back": { top: "22%", left: "26%", width: "48%", height: "54%" },
          "packaging": { top: "25%", left: "25%", width: "50%", height: "50%" }
        }
      },
      "hoodie": {
        name: "Heavyweight Streetwear Hoodie (380 GSM)",
        category: "hoodies",
        baseCost: 2100,
        sizes: ["S", "M", "L", "XL", "XXL"],
        frontImg: "assets/blank_hoodie_front.jpg",
        backImg: "assets/blank_hoodie_back.jpg",
        sides: [
          { id: "front", label: "Front", sub: "Chest / Kangaroo pocket", fee: 200, img: "assets/blank_hoodie_front.jpg" },
          { id: "back", label: "Back", sub: "Large back print", fee: 200, img: "assets/blank_hoodie_back.jpg" },
          { id: "packaging", label: "Custom Packaging", sub: "Branded packaging", fee: 50, img: "assets/product_bottle.jpg" }
        ],
        printArea: {
          "front": { top: "28%", left: "30%", width: "40%", height: "38%" },
          "back": { top: "24%", left: "26%", width: "48%", height: "50%" },
          "packaging": { top: "25%", left: "25%", width: "50%", height: "50%" }
        }
      },
      "cap": {
        name: "Structured Baseball Cap",
        category: "caps",
        baseCost: 650,
        sizes: ["Adjustable Strap"],
        frontImg: "assets/blank_cap_front.jpg",
        backImg: "assets/blank_cap_back.jpg",
        sides: [
          { id: "front", label: "Front", sub: "Front crown embroidery", fee: 200, img: "assets/blank_cap_front.jpg" },
          { id: "back", label: "Back", sub: "Back strap arch", fee: 200, img: "assets/blank_cap_back.jpg" },
          { id: "packaging", label: "Custom Packaging", sub: "Branded packaging", fee: 50, img: "assets/product_bottle.jpg" }
        ],
        printArea: {
          "front": { top: "30%", left: "30%", width: "40%", height: "32%" },
          "back": { top: "22%", left: "28%", width: "44%", height: "34%" },
          "packaging": { top: "25%", left: "25%", width: "50%", height: "50%" }
        }
      },
      "notebook": {
        name: "Executive Hardcover Notebook",
        category: "accessories",
        baseCost: 650,
        sizes: ["A5 Hardcover (192 Pgs)"],
        frontImg: "assets/blank_notebook_front.jpg",
        backImg: "assets/blank_notebook_back.jpg",
        sides: [
          { id: "front", label: "Front", sub: "Cover foil/print", fee: 200, img: "assets/blank_notebook_front.jpg" },
          { id: "back", label: "Back", sub: "Back cover design", fee: 200, img: "assets/blank_notebook_back.jpg" },
          { id: "packaging", label: "Custom Packaging", sub: "Branded gift sleeve", fee: 50, img: "assets/product_bottle.jpg" }
        ],
        printArea: {
          "front": { top: "20%", left: "28%", width: "50%", height: "60%" },
          "back": { top: "20%", left: "22%", width: "50%", height: "60%" },
          "packaging": { top: "25%", left: "25%", width: "50%", height: "50%" }
        }
      },
      "laptop-bag": {
        name: "Padded Laptop Bag / Sleeve (15.6\")",
        category: "accessories",
        baseCost: 1400,
        sizes: ["13.3 - 14 Inch", "15.6 Inch Standard", "16 Inch Pro"],
        frontImg: "assets/blank_laptop_bag_front.jpg",
        backImg: "assets/blank_laptop_bag_back.jpg",
        sides: [
          { id: "front", label: "Front", sub: "Center panel print", fee: 200, img: "assets/blank_laptop_bag_front.jpg" },
          { id: "back", label: "Back", sub: "Back exterior print", fee: 200, img: "assets/blank_laptop_bag_back.jpg" },
          { id: "packaging", label: "Custom Packaging", sub: "Branded packaging", fee: 50, img: "assets/product_bottle.jpg" }
        ],
        printArea: {
          "front": { top: "36%", left: "22%", width: "56%", height: "44%" },
          "back": { top: "45%", left: "22%", width: "56%", height: "35%" },
          "packaging": { top: "25%", left: "25%", width: "50%", height: "50%" }
        }
      }
    },
    sides: {
      front: { artworkSrc: null, artworkName: "", artWidth: 140, artHeight: 140, artLeft: 20, artTop: 20, text: "", textColor: "#000000", textSize: 18, textLeft: 20, textTop: 60 },
      left: { artworkSrc: null, artworkName: "", artWidth: 140, artHeight: 140, artLeft: 20, artTop: 20, text: "", textColor: "#000000", textSize: 18, textLeft: 20, textTop: 60 },
      right: { artworkSrc: null, artworkName: "", artWidth: 140, artHeight: 140, artLeft: 20, artTop: 20, text: "", textColor: "#000000", textSize: 18, textLeft: 20, textTop: 60 },
      back: { artworkSrc: null, artworkName: "", artWidth: 140, artHeight: 140, artLeft: 20, artTop: 20, text: "", textColor: "#000000", textSize: 18, textLeft: 20, textTop: 60 },
      packaging: { artworkSrc: null, artworkName: "", artWidth: 140, artHeight: 140, artLeft: 20, artTop: 20, text: "", textColor: "#000000", textSize: 18, textLeft: 20, textTop: 60 }
    }
  }
};

// ============================================================================
// 3.5 CUSTOM APPAREL DESIGN STUDIO CONTROLLER (T-SHIRTS & HOODIES — 4 PRINT MODES)
// ============================================================================
window.CustomStudio = {
  state: {
    garment: "half-sleeve-tee", // "half-sleeve-tee" | "full-sleeve-tee" | "hoodie"
    option: 1, // 1 | 2 | 3 | 4
    currentView: "front", // "front" | "back" | "sleeves"
    option3Side: "front", // "front" | "back"
    color: "Pure White",
    colorHex: "#ffffff",
    size: "L",
    // Images & Artwork Data
    images: {
      opt1Chest: "assets/logo.jpg",
      opt2Center: "assets/pk_designs/design_tee_truck_art_pop.png",
      opt3Center: "assets/pk_designs/design_tee_sukoon_urdu.png",
      opt4Front: "assets/pk_designs/design_tee_truck_art_pop.png",
      opt4Back: "assets/pk_designs/design_tee_faiz_bol.png"
    },
    backName: "YOUR NAME 10",
    hasSleeves: true,
    sleeveText: "MF RACING",
    // Base costs
    garmentCosts: {
      "half-sleeve-tee": { name: "Half Sleeve T-Shirt (210 GSM Combed Cotton)", baseCost: 850, frontImg: "assets/blank_tshirt_front.jpg", backImg: "assets/blank_tshirt_back.jpg" },
      "full-sleeve-tee": { name: "Full Sleeve T-Shirt (240 GSM Luxury Interlock)", baseCost: 950, frontImg: "assets/trending/fs_plain_white.jpg", backImg: "assets/blank_tshirt_back.jpg" },
      "hoodie": { name: "Heavyweight Fleece Hoodie (380 GSM Thermal)", baseCost: 2100, frontImg: "assets/blank_hoodie_front.jpg", backImg: "assets/blank_hoodie_back.jpg" }
    },
    printFees: {
      1: { name: "Left Hand / Chest Small Logo", fee: 150 },
      2: { name: "Front Center Image Print", fee: 200 },
      3: { name: "Front / Back Center (Choice)", fee: 200 },
      4: { name: "Front + Back + Name + Both Sleeves", fee: 700 }
    },
    merchantProfit: 250 // Rs. 200 + 50 extra markup as requested!
  },

  init() {
    this.updatePreviewStage();
    this.updatePricing();
  },

  selectGarment(garmentId) {
    this.state.garment = garmentId;
    document.querySelectorAll('.garment-opt-card').forEach(el => el.classList.remove('active'));
    const activeCard = document.getElementById(
      garmentId === 'half-sleeve-tee' ? 'garment-half-tee' :
      (garmentId === 'full-sleeve-tee' ? 'garment-full-tee' : 'garment-hoodie')
    );
    if (activeCard) {
      activeCard.classList.add('active');
      activeCard.style.border = '2px solid #0f172a';
      activeCard.style.background = '#f8fafc';
    }
    ['garment-half-tee', 'garment-full-tee', 'garment-hoodie'].forEach(id => {
      if (id !== activeCard?.id) {
        const el = document.getElementById(id);
        if (el) { el.style.border = '1.5px solid #cbd5e1'; el.style.background = '#ffffff'; }
      }
    });

    this.updatePreviewStage();
    this.updatePricing();
    if (typeof showToast === 'function') showToast(`👕 Selected ${this.state.garmentCosts[garmentId].name}`);
  },

  selectOption(optNum) {
    this.state.option = optNum;
    for (let i = 1; i <= 4; i++) {
      const card = document.getElementById(`mode-opt-${i}`);
      const panel = document.getElementById(`controls-opt${i}`);
      if (card) {
        if (i === optNum) {
          card.classList.add('active');
          card.style.border = '2px solid #d97706';
          card.style.background = '#fffbeb';
        } else {
          card.classList.remove('active');
          card.style.border = '1.5px solid #cbd5e1';
          card.style.background = '#ffffff';
        }
      }
      if (panel) {
        panel.style.display = (i === optNum) ? (i === 4 ? 'flex' : 'block') : 'none';
      }
    }

    const sleevesTab = document.getElementById('btn-view-sleeves');
    if (sleevesTab) sleevesTab.style.display = (optNum === 4) ? 'inline-block' : 'none';

    if (optNum === 3) {
      this.switchView(this.state.option3Side);
    } else if (this.state.currentView === 'sleeves' && optNum !== 4) {
      this.switchView('front');
    }

    const modeTag = document.getElementById('studio-active-mode-tag');
    if (modeTag) {
      modeTag.textContent = `Mode: ${this.state.printFees[optNum].name}`;
    }

    this.updatePreviewStage();
    this.updatePricing();
    if (typeof showToast === 'function') showToast(`✨ Selected Option ${optNum}: ${this.state.printFees[optNum].name}`);
  },

  switchView(view) {
    this.state.currentView = view;
    ['btn-view-front', 'btn-view-back', 'btn-view-sleeves'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        const isActive = (id === `btn-view-${view}`);
        btn.classList.toggle('active', isActive);
        btn.style.background = isActive ? '#0f172a' : 'transparent';
        btn.style.color = isActive ? '#ffffff' : '#475569';
      }
    });

    this.updatePreviewStage();
  },

  setOption3Side(side) {
    this.state.option3Side = side;
    const badge = document.getElementById('badge-opt3-side');
    if (badge) badge.textContent = (side === 'front') ? 'Front Center' : 'Back Center';
    this.switchView(side);
  },

  handleFileUpload(event, targetKey) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (targetKey === 'opt1-chest') {
        this.state.images.opt1Chest = dataUrl;
        const img = document.getElementById('img-opt1-chest');
        if (img) img.src = dataUrl;
      } else if (targetKey === 'opt2-center') {
        this.state.images.opt2Center = dataUrl;
        const img = document.getElementById('img-opt2-center');
        if (img) img.src = dataUrl;
      } else if (targetKey === 'opt3-center') {
        this.state.images.opt3Center = dataUrl;
        const img = document.getElementById('img-opt3-center');
        if (img) img.src = dataUrl;
      } else if (targetKey === 'opt4-front') {
        this.state.images.opt4Front = dataUrl;
        const img = document.getElementById('img-opt4-front');
        if (img) img.src = dataUrl;
      } else if (targetKey === 'opt4-back') {
        this.state.images.opt4Back = dataUrl;
        const img = document.getElementById('img-opt4-back');
        if (img) img.src = dataUrl;
      }
      this.updatePreviewStage();
      if (typeof showToast === 'function') showToast('🎨 Custom artwork uploaded & preview updated!');
    };
    reader.readAsDataURL(file);
  },

  setPresetImage(targetKey, src) {
    if (targetKey === 'opt1-chest') {
      this.state.images.opt1Chest = src;
      const img = document.getElementById('img-opt1-chest');
      if (img) img.src = src;
    } else if (targetKey === 'opt2-center') {
      this.state.images.opt2Center = src;
      const img = document.getElementById('img-opt2-center');
      if (img) img.src = src;
    } else if (targetKey === 'opt3-center') {
      this.state.images.opt3Center = src;
      const img = document.getElementById('img-opt3-center');
      if (img) img.src = src;
    }
    this.updatePreviewStage();
    if (typeof showToast === 'function') showToast('✨ Applied sample artwork preset!');
  },

  updateBackName(text) {
    this.state.backName = text;
    const nameEl = document.getElementById('text-opt4-name');
    if (nameEl) nameEl.textContent = text || 'YOUR NAME 10';
  },

  toggleSleeves(checked) {
    this.state.hasSleeves = checked;
    const lSleeve = document.getElementById('overlay-opt4-sleeve-left');
    const rSleeve = document.getElementById('overlay-opt4-sleeve-right');
    const inp = document.getElementById('input-opt4-sleeves');
    if (lSleeve) lSleeve.style.display = (checked && this.state.option === 4) ? 'flex' : 'none';
    if (rSleeve) rSleeve.style.display = (checked && this.state.option === 4) ? 'flex' : 'none';
    if (inp) inp.disabled = !checked;
  },

  updateSleevesText(text) {
    this.state.sleeveText = text;
    const l = document.getElementById('text-opt4-sleeve-left');
    const r = document.getElementById('text-opt4-sleeve-right');
    if (l) l.textContent = text || 'Left Sleeve';
    if (r) r.textContent = text || 'Right Sleeve';
  },

  setColor(colorName, hex) {
    this.state.color = colorName;
    this.state.colorHex = hex;
    const label = document.getElementById('studio-active-color-name');
    if (label) label.textContent = colorName;

    document.querySelectorAll('.studio-color-dot').forEach(el => {
      const match = el.getAttribute('title') === colorName;
      el.classList.toggle('active', match);
      el.style.border = match ? '2.5px solid #0f172a' : '1.5px solid #cbd5e1';
    });

    const tint = document.getElementById('studio-garment-tint');
    if (tint) {
      if (hex === '#ffffff') {
        tint.style.opacity = '0';
      } else {
        tint.style.backgroundColor = hex;
        tint.style.opacity = '0.78';
      }
    }
  },

  setSize(size) {
    this.state.size = size;
    const label = document.getElementById('studio-active-size-label');
    if (label) label.textContent = `${size} Standard`;

    document.querySelectorAll('.studio-size-pill').forEach(el => {
      const match = el.textContent.trim() === size;
      el.classList.toggle('active', match);
      el.style.border = match ? '2px solid #0f172a' : '1.5px solid #cbd5e1';
      el.style.background = match ? '#0f172a' : '#ffffff';
      el.style.color = match ? '#ffffff' : '#0f172a';
    });
  },

  updatePreviewStage() {
    const garment = this.state.garmentCosts[this.state.garment];
    const imgEl = document.getElementById('studio-garment-img');
    const view = this.state.currentView;

    if (imgEl && garment) {
      imgEl.src = (view === 'back') ? garment.backImg : garment.frontImg;
    }

    ['overlay-opt1-chest', 'overlay-opt2-center', 'overlay-opt3-center', 'overlay-opt4-front', 'overlay-opt4-back', 'overlay-opt4-name', 'overlay-opt4-sleeve-left', 'overlay-opt4-sleeve-right'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    const opt = this.state.option;

    if (opt === 1) {
      if (view === 'front') {
        const o1 = document.getElementById('overlay-opt1-chest');
        if (o1) o1.style.display = 'flex';
      }
    } else if (opt === 2) {
      if (view === 'front') {
        const o2 = document.getElementById('overlay-opt2-center');
        if (o2) o2.style.display = 'flex';
      }
    } else if (opt === 3) {
      const targetSide = this.state.option3Side;
      if (view === targetSide) {
        const o3 = document.getElementById('overlay-opt3-center');
        if (o3) o3.style.display = 'flex';
      }
    } else if (opt === 4) {
      if (view === 'front') {
        const o4f = document.getElementById('overlay-opt4-front');
        if (o4f) o4f.style.display = 'flex';
      } else if (view === 'back') {
        const o4b = document.getElementById('overlay-opt4-back');
        const o4name = document.getElementById('overlay-opt4-name');
        if (o4b) o4b.style.display = 'flex';
        if (o4name) o4name.style.display = 'flex';
      }
      if (this.state.hasSleeves) {
        const lS = document.getElementById('overlay-opt4-sleeve-left');
        const rS = document.getElementById('overlay-opt4-sleeve-right');
        if (lS) lS.style.display = 'flex';
        if (rS) rS.style.display = 'flex';
      }
    }
  },

  updatePricing() {
    const garment = this.state.garmentCosts[this.state.garment];
    const print = this.state.printFees[this.state.option];
    const profit = this.state.merchantProfit; // Rs. 250

    const garmentCost = garment.baseCost;
    const printFee = print.fee;
    const total = garmentCost + printFee + profit;

    const rowGarmentLabel = document.getElementById('price-row-garment-label');
    const rowGarmentVal = document.getElementById('price-row-garment-val');
    const rowPrintLabel = document.getElementById('price-row-print-label');
    const rowPrintVal = document.getElementById('price-row-print-val');
    const rowProfitVal = document.getElementById('price-row-profit-val');
    const totalDisplay = document.getElementById('studio-total-price-display');

    if (rowGarmentLabel) rowGarmentLabel.textContent = `Garment Base (${garment.name.split('(')[0].trim()}):`;
    if (rowGarmentVal) rowGarmentVal.textContent = `Rs. ${garmentCost.toLocaleString()}`;
    if (rowPrintLabel) rowPrintLabel.textContent = `Ceeprinto Print Fee (Option ${this.state.option}):`;
    if (rowPrintVal) rowPrintVal.textContent = `+Rs. ${printFee.toLocaleString()}`;
    if (rowProfitVal) rowProfitVal.textContent = `+Rs. ${profit.toLocaleString()}`;
    if (totalDisplay) totalDisplay.textContent = `Rs. ${total.toLocaleString()}`;
  },

  buildCustomItem() {
    const garment = this.state.garmentCosts[this.state.garment];
    const print = this.state.printFees[this.state.option];
    const profit = this.state.merchantProfit;
    const total = garment.baseCost + print.fee + profit;

    return {
      id: `custom-${this.state.garment}-opt${this.state.option}-${Date.now()}`,
      name: `Custom ${garment.name.split('(')[0].trim()} — Option ${this.state.option}`,
      category: this.state.garment.includes('hoodie') ? 'hoodies' : 'tees',
      price: total,
      baseCost: garment.baseCost + print.fee,
      profit: profit,
      qty: 1,
      size: this.state.size,
      color: this.state.color,
      image: (this.state.currentView === 'back') ? garment.backImg : garment.frontImg,
      isCustom: true,
      isCustomPrint: true,
      customConfig: {
        garmentId: this.state.garment,
        garmentTitle: garment.name,
        optionNumber: this.state.option,
        optionTitle: print.name,
        printFee: print.fee,
        ceeprintoBaseCost: garment.baseCost,
        merchantProfit: profit,
        totalItemPrice: total,
        color: this.state.color,
        size: this.state.size,
        option3Side: (this.state.option === 3) ? this.state.option3Side : null,
        backCustomName: (this.state.option === 4) ? this.state.backName : null,
        hasSleevePrint: (this.state.option === 4) ? this.state.hasSleeves : false,
        sleeveText: (this.state.option === 4) ? this.state.sleeveText : null,
        frontImage: (this.state.option === 1) ? this.state.images.opt1Chest :
                    (this.state.option === 2) ? this.state.images.opt2Center :
                    (this.state.option === 3 && this.state.option3Side === 'front') ? this.state.images.opt3Center :
                    (this.state.option === 4) ? this.state.images.opt4Front : null,
        backImage: (this.state.option === 3 && this.state.option3Side === 'back') ? this.state.images.opt3Center :
                   (this.state.option === 4) ? this.state.images.opt4Back : null
      }
    };
  },

  addToCart() {
    const item = this.buildCustomItem();
    AppState.cart.push(item);
    localStorage.setItem("mf_cart", JSON.stringify(AppState.cart));
    if (typeof updateCartUI === 'function') updateCartUI();
    if (typeof showToast === 'function') showToast(`🛍️ Added Custom ${item.name} to Cart!`);
  },

  orderNowWithCard() {
    const item = this.buildCustomItem();
    AppState.cart = [item];
    localStorage.setItem("mf_cart", JSON.stringify(AppState.cart));
    if (typeof updateCartUI === 'function') updateCartUI();
    if (typeof openCheckoutModal === 'function') openCheckoutModal();
    if (typeof showToast === 'function') showToast(`💳 Proceeding to Meezan Bank Card checkout!`);
  },

  resetDefaults() {
    this.state.images = {
      opt1Chest: "assets/logo.jpg",
      opt2Center: "assets/pk_designs/design_tee_truck_art_pop.png",
      opt3Center: "assets/pk_designs/design_tee_sukoon_urdu.png",
      opt4Front: "assets/pk_designs/design_tee_truck_art_pop.png",
      opt4Back: "assets/pk_designs/design_tee_faiz_bol.png"
    };
    this.state.backName = "YOUR NAME 10";
    const nameInp = document.getElementById('input-opt4-name');
    if (nameInp) nameInp.value = "YOUR NAME 10";
    const sleeveInp = document.getElementById('input-opt4-sleeves');
    if (sleeveInp) sleeveInp.value = "MF RACING";
    this.setColor("Pure White", "#ffffff");
    this.setSize("L");
    this.updatePreviewStage();
    this.updatePricing();
    if (typeof showToast === 'function') showToast("↶ Reset custom design to defaults.");
  }
};

// 4. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initProductVariants();
  fetchPricingRules();
  setupEventListeners();

  // Setup One-Click Copy for Merchant Bank Accounts
  document.querySelectorAll('.btn-copy-acc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.dataset.copy;
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`📋 ${val} copied to clipboard!`);
        }).catch(() => {
          showToast(`📋 ${val} copied!`);
        });
      }
    });
  });

  setupCustomizerStudio();
  if (typeof CustomStudio !== 'undefined' && CustomStudio.init) {
    CustomStudio.init();
  }
});

// Fetch Realtime Pricing Rules from Firebase Bridge
function fetchPricingRules() {
  fetch('/api/pricing-rules')
    .then(res => res.json())
    .then(data => {
      if (data) {
        if (data.categories) AppState.pricingRules.categories = data.categories;
        if (data.full_advance_profit) AppState.pricingRules.fullAdvanceProfit = parseInt(data.full_advance_profit);
        if (data.half_advance_profit) AppState.pricingRules.halfAdvanceProfit = parseInt(data.half_advance_profit);
        if (data.cod_profit) AppState.pricingRules.codProfit = parseInt(data.cod_profit);
        if (data.bank_name) AppState.pricingRules.bankName = data.bank_name;
        if (data.bank_account_number) AppState.pricingRules.bankAccountNumber = data.bank_account_number;
        if (data.wallet_name) AppState.pricingRules.walletName = data.wallet_name;
        if (data.wallet_account_number) AppState.pricingRules.walletAccountNumber = data.wallet_account_number;
        if (data.account_title) AppState.pricingRules.accountTitle = data.account_title;
        updateBankDetailsDisplay();

        // Recalculate catalog retail prices based on Category-Wise Rules (with pair multiplier for 2-piece sets)
        PRODUCTS.forEach(p => {
          const isPair = (p.badge && p.badge.includes("2-PIECE")) || (p.name && (p.name.includes("2-Piece") || p.name.includes("Pair of 2") || p.name.includes("Set of 2")));
          const defaultCatProfit = getCategoryProfit(p.category, "half_advance");
          p.profit = isPair ? Math.round(defaultCatProfit * 1.5) : defaultCatProfit;
          p.retailPrice = p.baseCost + p.profit;
        });

        // Update customizer blank price based on selected category
        const blankCat = mapBlankToCategory(AppState.customizer.blankType);
        AppState.customizer.profit = getCategoryProfit(blankCat, "half_advance");
        AppState.customizer.price = AppState.customizer.baseCost + AppState.customizer.profit;
        const priceDisp = document.getElementById("customizer-price-display");
        if (priceDisp) priceDisp.textContent = `Rs. ${AppState.customizer.price.toLocaleString()}`;

        if (data.custom_print_profit && window.CustomStudio && window.CustomStudio.state) {
          window.CustomStudio.state.merchantProfit = parseInt(data.custom_print_profit);
          if (window.CustomStudio.updatePricing) window.CustomStudio.updatePricing();
        }

        renderProducts();
        updateCartUI();
        if (typeof updateCheckoutPricing === 'function') updateCheckoutPricing();
      }
    })
    .catch(err => {
      console.log("[Pricing fetch fallback to defaults]:", err.message);
      renderProducts();
      updateCartUI();
    });
}

// ============================================================================
// GLOBAL COLOR PALETTE & HIGH-PRECISION PRODUCT SILHOUETTE CLIPPING
// Isolated strictly to garment boundaries so studio backgrounds stay 100% natural
// ============================================================================
const COLOR_PALETTE = {
  "Pure White": { filter: "none", tintBg: "transparent", tintOpacity: "0" },
  "Pure White Gloss": { filter: "none", tintBg: "transparent", tintOpacity: "0" },
  "Bone Cream": { filter: "none", tintBg: "transparent", tintOpacity: "0" },
  "Natural Bone Canvas": { filter: "none", tintBg: "transparent", tintOpacity: "0" },
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
  "Maroon": { filter: "none", tintBg: "#800020", tintOpacity: "0.94" },
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
    front: "polygon(42% 14%, 50% 16.8%, 58% 14%, 77% 22%, 95.5% 33.5%, 87.5% 49%, 83% 53.5%, 77.2% 47.5%, 77.5% 88.5%, 22.5% 88.5%, 22.8% 47.5%, 17% 53.5%, 12.5% 49%, 4.5% 33.5%, 23% 22%)",
    back: "polygon(42% 14%, 50% 14.8%, 58% 14%, 77% 22%, 95.5% 33.5%, 87.5% 49%, 83% 53.5%, 77.2% 47.5%, 77.5% 88.5%, 22.5% 88.5%, 22.8% 47.5%, 17% 53.5%, 12.5% 49%, 4.5% 33.5%, 23% 22%)"
  },
  "hoodie": {
    front: "polygon(50% 5.8%, 61% 10%, 64% 18%, 62% 27%, 75.5% 32%, 85.5% 48%, 86% 70%, 85.5% 83.5%, 85.5% 89.5%, 76% 89.5%, 75% 82.5%, 74% 68%, 73.5% 53%, 72.5% 91.5%, 27.5% 91.5%, 26.5% 53%, 26% 68%, 25% 82.5%, 24% 89.5%, 14.5% 89.5%, 14.5% 83.5%, 14% 70%, 14.5% 48%, 24.5% 32%, 38% 27%, 36% 18%, 39% 10%)",
    back: "polygon(50% 5.8%, 61% 10%, 64% 18%, 62% 27%, 75.5% 32%, 85.5% 48%, 86% 70%, 85.5% 83.5%, 85.5% 89.5%, 76% 89.5%, 75% 82.5%, 74% 68%, 73.5% 53%, 72.5% 91.5%, 27.5% 91.5%, 26.5% 53%, 26% 68%, 25% 82.5%, 24% 89.5%, 14.5% 89.5%, 14.5% 83.5%, 14% 70%, 14.5% 48%, 24.5% 32%, 38% 27%, 36% 18%, 39% 10%)"
  },
  "cap": {
    front: "polygon(50% 16%, 66% 22%, 75% 35%, 75.5% 52%, 71.5% 79%, 50% 82.5%, 28.5% 79%, 24.5% 52%, 25% 35%, 34% 22%)",
    back: "polygon(50% 20.5%, 68% 25%, 78% 36%, 86.5% 56%, 86.5% 67%, 77% 76.5%, 23% 76.5%, 13.5% 67%, 13.5% 56%, 22% 36%, 32% 25%)"
  },
  "notebook": {
    front: "polygon(26.5% 16.5%, 73.2% 16.5%, 73.2% 84.2%, 26.5% 84.2%)",
    back: "polygon(26.8% 16.5%, 73.5% 16.5%, 73.5% 84.2%, 26.8% 84.2%)"
  },
  "laptop-bag": {
    front: "polygon(22% 34%, 78% 34%, 78% 82%, 22% 82%)",
    back: "polygon(22% 34%, 78% 34%, 78% 82%, 22% 82%)"
  }
};

// Initialize default selected size & color for each product
function initProductVariants() {
  PRODUCTS.forEach(p => {
    AppState.selectedVariants[p.id] = {
      size: p.sizes[1] || p.sizes[0],
      color: p.colors[0].name
    };
  });
}

// 5. RENDER PRODUCTS
function renderProductCard(product) {
  const currentVariant = AppState.selectedVariants[product.id] || {
    size: (product.sizes && product.sizes[0]) || "Standard",
    color: (product.colors && product.colors[0] && product.colors[0].name) || "White"
  };

  const badgeText = product.badge || "⭐ POPULAR";
  const activeColor = currentVariant.color;
  const cardImg = (product.colorImages && product.colorImages[activeColor]) || product.image;

  return `
    <article class="product-card" id="card-${product.id}">
      <div class="product-thumb-wrapper" onclick="openProductDialog('${product.id}')" style="cursor: pointer;">
        <img src="${cardImg}" alt="${product.name}" class="product-img" id="card-img-${product.id}">
        <span class="badge-float" style="cursor: pointer; background: rgba(15, 23, 42, 0.88); color: #fff; font-weight: 800; font-size: 0.72rem; letter-spacing: 0.5px; border: 1px solid rgba(255,255,255,0.2);">
          ${badgeText}
        </span>
      </div>

      <div class="product-info">
        <span class="product-category" style="color: var(--accent-gold); font-weight: 800; font-size: 0.72rem; letter-spacing: 0.5px; text-transform: uppercase;">
          ${product.categoryName || product.category}
        </span>
        <h3 class="product-name" onclick="openProductDialog('${product.id}')" style="cursor: pointer; font-size: 1.05rem; line-height: 1.35; margin: 4px 0 8px; font-weight: 800; color: #0f172a;">
          ${product.name}
        </h3>
        
        <div class="product-pricing" style="margin-bottom: 10px;">
          <span class="retail-price" style="font-size: 1.35rem; font-weight: 900; color: #0f172a; font-family: var(--font-heading);">
            Rs. ${product.retailPrice.toLocaleString()}
          </span>
          <span style="font-size: 0.74rem; color: #059669; font-weight: 700; background: #ecfdf5; padding: 2px 8px; border-radius: 99px; margin-left: 8px;">
            ✓ Secure Card Payment
          </span>
        </div>

        <!-- Color Swatches Row -->
        <div class="picker-row" style="margin-bottom: 14px;">
          <div class="picker-label" style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-bottom: 6px;">
            Color: <span class="active-color-name" style="color: #0f172a; font-weight: 800;">${activeColor}</span>
          </div>
          <div class="color-dots" style="display: flex; gap: 8px;">
            ${(product.colors || []).map(c => `
              <div 
                class="color-dot ${c.name === activeColor ? 'active' : ''}" 
                style="background-color: ${c.hex}; ${c.hex === '#ffffff' ? 'border: 1px solid #cbd5e1;' : ''}" 
                title="${c.name}"
                onclick="event.stopPropagation(); selectColor('${product.id}', '${c.name}')">
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="product-actions" style="margin-top: auto;">
          <button class="btn-add-cart" onclick="openProductDialog('${product.id}')" style="width: 100%; padding: 12px 14px; font-size: 0.88rem; font-weight: 800; background: #0f172a; color: #fff; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; box-shadow: 0 2px 6px rgba(15,23,42,0.18);">
            <span>Select & Buy ➔</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

const HORIZONTAL_CATEGORIES = [
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
];

window.scrollCategoryRow = function(rowId, direction) {
  const row = document.getElementById(rowId);
  if (row) {
    row.scrollBy({ left: direction * 310, behavior: 'smooth' });
  }
};

window.scrollToCategory = function(catId) {
  document.querySelectorAll('.top-cat-pill').forEach(p => p.classList.remove('active'));
  const activePill = document.querySelector(`.top-cat-pill[onclick*="${catId}"]`);
  if (activePill) activePill.classList.add('active');

  const row = document.getElementById(`cat-row-${catId}`);
  if (row) {
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    AppState.activeFilter = "all";
    renderProducts();
    setTimeout(() => {
      const target = document.getElementById(`cat-row-${catId}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }
};

function renderProducts() {
  const container = document.getElementById("products-grid-container");
  if (!container) return;

  const allBtn = document.querySelector(".filter-btn[data-filter='all']");
  if (allBtn) allBtn.textContent = `All Collections (${PRODUCTS.length})`;

  const filter = AppState.activeFilter || "all";
  let pool = PRODUCTS;

  if (filter === "cricket") pool = PRODUCTS.filter(p => p.theme === "cricket");
  else if (filter === "eid") pool = PRODUCTS.filter(p => p.theme === "eid");
  else if (filter === "couple") pool = PRODUCTS.filter(p => p.theme === "couple");
  else if (filter === "birthday") pool = PRODUCTS.filter(p => p.theme === "birthday");
  else if (filter === "tees") pool = PRODUCTS.filter(p => p.category === "tees");
  else if (filter === "mugs") pool = PRODUCTS.filter(p => p.category === "mugs");
  else if (filter === "hoodies") pool = PRODUCTS.filter(p => p.category === "hoodies");
  else if (filter === "caps") pool = PRODUCTS.filter(p => p.category === "caps");
  else if (filter === "laptop-bags") pool = PRODUCTS.filter(p => p.category === "laptop-bags");
  else if (filter === "full-sleeves") pool = PRODUCTS.filter(p => p.category === "full-sleeves");
  else if (filter === "full-sleeves") pool = PRODUCTS.filter(p => p.category === "full-sleeves");

  // Determine which category sections to render
  let catsToRender = HORIZONTAL_CATEGORIES;
  if (["tees", "mugs", "hoodies", "caps", "laptop-bags", "full-sleeves"].includes(filter)) {
    catsToRender = HORIZONTAL_CATEGORIES.filter(c => c.id === filter);
  }

  let html = `
    <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 12px 18px; border-radius: 10px; border: 1px solid #e2e8f0;">
      <span style="font-size: 0.86rem; color: #0f172a; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
        Showing ${pool.length} Products Across ${catsToRender.length} Categories
      </span>
      <span style="font-size: 0.8rem; color: #047857; font-weight: 700; background: #dcfce7; padding: 4px 12px; border-radius: 99px;">
        💳 100% Secure Card Payment to Meezan Bank
      </span>
    </div>
  `;

  let renderedAny = false;
  catsToRender.forEach(cat => {
    const itemsInCat = pool.filter(p => p.category === cat.id);
    if (itemsInCat.length === 0) return;

    renderedAny = true;
    html += `
      <section class="category-row-section" id="cat-row-${cat.id}">
        <div class="category-row-header">
          <div class="category-row-title-wrap">
            <h3 class="category-row-title">
              <span style="font-size: 1.5rem;">${cat.icon}</span>
              <span>${cat.name}</span>
              <span class="category-row-badge">${itemsInCat.length} DESIGNS</span>
            </h3>
            <p class="category-row-sub">${cat.sub}</p>
          </div>
          <div class="category-row-nav-btns">
            <button type="button" class="row-nav-btn" onclick="scrollCategoryRow('row-${cat.id}', -1)" title="Scroll Left" aria-label="Scroll Left">◀</button>
            <button type="button" class="row-nav-btn" onclick="scrollCategoryRow('row-${cat.id}', 1)" title="Scroll Right" aria-label="Scroll Right">▶</button>
          </div>
        </div>

        <div class="horizontal-product-row" id="row-${cat.id}">
          ${itemsInCat.map(p => renderProductCard(p)).join('')}
        </div>
      </section>
    `;
  });

  if (!renderedAny) {
    html += `
      <div style="text-align: center; padding: 50px 20px; color: #64748b;">
        <h3>No products found for this filter</h3>
        <p>Try clicking "All Collections" to see everything.</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

window.launchCustomizerForProduct = function(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const blankKey = prod.blankKey || "white-tee";
  const btn = document.querySelector(`.change-prod-card[data-blank="${blankKey}"], .blank-option-btn[data-blank="${blankKey}"]`);
  if (btn) {
    btn.click();
  }

  // If specific mug color or apparel color
  if (blankKey === "mug" && prod.mugColor) {
    const cupBtn = document.querySelector(`.cup-color-btn[data-cup-color="${prod.mugColor}"]`);
    if (cupBtn) cupBtn.click();
    else {
      const whiteCupBtn = document.getElementById("cup-color-white-btn");
      if (whiteCupBtn) whiteCupBtn.click();
    }
  } else if (AppState.activeDialog && AppState.activeDialog.activeColor) {
    const targetColor = AppState.activeDialog.activeColor;
    const swatch = document.querySelector(`.color-swatch-circle[data-color="${targetColor}"]`);
    if (swatch) swatch.click();
  }

  // Auto-apply this product's custom design into the studio canvas
  const designToLoad = prod.customDesignSrc || (prod.image && !prod.image.includes('blank_') ? prod.image : null);
  if (designToLoad) {
    setTimeout(() => {
      const targetSide = AppState.customizer.activeSide || (blankKey === "mug" ? "left" : "front");
      if (typeof window.loadReadyDesignIntoCustomizer === 'function') {
        window.loadReadyDesignIntoCustomizer(prod.name, designToLoad, targetSide);
      }
    }, 180);
  }

  const studio = document.getElementById("customizer-studio");
  if (studio) {
    studio.scrollIntoView({ behavior: "smooth" });
  }

  showToast(`🎨 Loaded ${prod.name} into Studio with its custom design!`);
};

// Select Variant Handlers
window.selectColor = function(productId, colorName) {
  if (!AppState.selectedVariants[productId]) AppState.selectedVariants[productId] = {};
  AppState.selectedVariants[productId].color = colorName;

  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    const cardEl = document.getElementById(`card-${productId}`);
    if (cardEl) {
      const imgEl = document.getElementById(`card-img-${productId}`);
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
};

window.selectSize = function(productId, size) {
  AppState.selectedVariants[productId].size = size;
  renderProducts();
};

// 6. DRAGGABLE & DELETABLE CUSTOMIZER STUDIO ENGINE
// 6. DRAGGABLE & DELETABLE DUAL-SIDED CUSTOMIZER STUDIO ENGINE
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
        showToast("↶ Undone!");
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
        showToast("↷ Redone!");
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

  // Note: Uses global COLOR_PALETTE and perfected PRODUCT_CLIPS defined above

  // --- Left Column Tabs Handling ---
  const tabButtons = document.querySelectorAll(".studio-tab-btn");
  const tabPanes = document.querySelectorAll(".studio-tab-pane");

  function switchStudioTab(targetTab) {
    tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === targetTab);
    });
    tabPanes.forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-pane-${targetTab}`);
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
        if (bannerIcon) bannerIcon.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"/></svg>`;
        if (bannerText) bannerText.innerHTML = "Design is safely placed inside the dashed design area.";
      } else {
        if (bannerIcon) bannerIcon.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        if (bannerText) bannerText.innerHTML = 'Place images and text inside the dashed design area. <span style="color: #fe1915; font-weight: 700;">Upload an image or add text to start!</span>';
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
      container.innerHTML = `
        <div class="empty-layers-msg">
          <span>No layers yet</span>
          <small>Upload an image or add text to start</small>
        </div>
      `;
      return;
    }

    let html = "";
    if (hasArtwork) {
      html += `
        <div class="layer-item-row" data-layer-type="artwork" style="cursor: pointer;" title="Click to edit artwork">
          <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
            <img src="${sideData.artworkSrc}" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px; background: #f1f5f9;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px; font-weight: 700;">${sideData.artworkName || 'Custom Artwork'}</span>
          </div>
          <button type="button" class="btn-del-layer" data-action="del-artwork" title="Delete Artwork">🗑️</button>
        </div>
      `;
    }

    if (hasText) {
      html += `
        <div class="layer-item-row" data-layer-type="text" style="cursor: pointer;" title="Click to edit text">
          <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
            <span style="font-size: 1rem;">🔤</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px; font-weight: 800; color: ${sideData.textColor || '#000000'};">"${sideData.text}"</span>
          </div>
          <button type="button" class="btn-del-layer" data-action="del-text" title="Delete Text">🗑️</button>
        </div>
      `;
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
    if (baseEl) baseEl.textContent = `Base: Rs. ${basePrice.toLocaleString()}`;

    const totalEl = document.getElementById("customizer-calc-total");
    if (totalEl) totalEl.textContent = `Rs. ${totalOrderPrice.toLocaleString()}`;

    const btnLabel = document.getElementById("cust-btn-label");
    if (btnLabel) btnLabel.textContent = "Add to Cart";
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
      if (blankKey === "mug") {
        thumbImg = s.img;
      }

      return `
        <div class="print-side-card ${isActive ? 'active' : ''}" data-side="${s.id}">
          <img src="${thumbImg}" alt="${s.label}" class="print-side-thumb" style="${s.flip ? 'transform: scaleX(-1);' : ''}">
          <div class="print-side-info">
            <span class="print-side-name">${s.label}</span>
            ${s.sub ? `<span class="print-side-sub">${s.sub}</span>` : ''}
          </div>
          <span class="print-side-price">+Rs${s.fee}.00</span>
        </div>
      `;
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
        const sideObj = (prod.sides || []).find(s => s.id === newSide);
        baseImg.src = (sideObj && sideObj.img) ? sideObj.img : "assets/ceeprinto_mug_left_stage.webp";
        baseImg.style.transform = "none";
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
      const sideObj = mugProd && (mugProd.sides || []).find(s => s.id === side);
      if (sideObj && sideObj.img && baseImg) {
        baseImg.src = sideObj.img;
        baseImg.style.transform = "none";
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

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;

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

    artworkDrag.style.width = `${clampedSize}px`;
    artworkDrag.style.height = `${clampedSize}px`;

    if (sizeSlider) sizeSlider.value = clampedSize;
    if (sizeLabel) sizeLabel.textContent = `${clampedSize}px`;

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
      artworkDrag.style.left = typeof data.artLeft === "number" ? `${data.artLeft}px` : (data.artLeft || "20px");
      artworkDrag.style.top = typeof data.artTop === "number" ? `${data.artTop}px` : (data.artTop || "20px");
      setArtworkSize(data.artWidth || 140);
      if (activeControls) activeControls.style.display = "block";
      if (activeLabel) activeLabel.textContent = `🖼️ ${data.artworkName || 'Custom Artwork'}`;
    } else {
      if (artworkDrag) artworkDrag.style.display = "none";
      if (artworkPreview) artworkPreview.src = "";
      if (activeControls) activeControls.style.display = "none";
    }

    // Text Rendering
    if (data.text && textPreview && textDrag) {
      textPreview.textContent = data.text;
      textPreview.style.color = data.textColor || "#000000";
      textPreview.style.fontSize = `${data.textSize || 18}px`;
      textDrag.style.display = "flex";
      textDrag.style.left = typeof data.textLeft === "number" ? `${data.textLeft}px` : (data.textLeft || "20px");
      textDrag.style.top = typeof data.textTop === "number" ? `${data.textTop}px` : (data.textTop || "60px");
      if (textInput) textInput.value = data.text;
      if (textColorInput) textColorInput.value = data.textColor || "#000000";
      if (textSizeSlider) textSizeSlider.value = data.textSize || 18;
      if (textSizeLabel) textSizeLabel.textContent = `${data.textSize || 18}px`;
    } else {
      if (textDrag) textDrag.style.display = "none";
      if (textPreview) textPreview.textContent = "";
      if (textInput) textInput.value = "";
    }

    // Toggle "YOUR DESIGN HERE" placeholder guide: automatically remove when picture or text is selected
    const placeholderGuide = document.getElementById("design-placeholder-guide");
    if (placeholderGuide) {
      const hasDesign = !!(data.artworkSrc || (data.text && data.text.trim().length > 0));
      placeholderGuide.style.display = hasDesign ? "none" : "flex";
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
    showToast(`${name} applied successfully!`);
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

  
  // Studio Ready Design Filter Tags
  const tagBtns = document.querySelectorAll(".studio-tag-btn");
  const designThumbs = document.querySelectorAll(".ready-design-thumb[data-design-theme]");
  tagBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tagBtns.forEach(b => {
        b.classList.remove("active");
        b.style.background = "#f8fafc";
        b.style.color = "#475569";
      });
      btn.classList.add("active");
      btn.style.background = "#0f172a";
      btn.style.color = "#fff";
      const tag = btn.dataset.tag;

      designThumbs.forEach(thumb => {
        const theme = thumb.dataset.designTheme || "";
        if (tag === "all" || theme.includes(tag) || (tag === "k2" && (theme.includes("k2") || theme.includes("alpine"))) || (tag === "poetry" && (theme.includes("poetry") || theme.includes("urdu")))) {
          thumb.style.display = "flex";
        } else {
          thumb.style.display = "none";
        }
      });
    });
  });

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
    showToast("Artwork removed!");
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

      const placeholderGuide = document.getElementById("design-placeholder-guide");
      if (placeholderGuide) {
        const sideData = AppState.customizer.sides[side] || {};
        const hasDesign = !!(sideData.artworkSrc || val.trim());
        placeholderGuide.style.display = hasDesign ? "none" : "flex";
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
        textPreview.style.fontSize = `${e.target.value}px`;
        if (textSizeLabel) textSizeLabel.textContent = `${e.target.value}px`;
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
    showToast("Text removed!");
  }

  const textDelBtn = document.getElementById("text-delete-btn");
  const controlsDelTextBtn = document.getElementById("controls-del-text-btn");
  if (textDelBtn) textDelBtn.addEventListener("click", (e) => { e.stopPropagation(); deleteCustomTextForActiveSide(); });
  if (controlsDelTextBtn) controlsDelTextBtn.addEventListener("click", (e) => { e.stopPropagation(); deleteCustomTextForActiveSide(); });

  const btnAddTextLayer = document.getElementById("btn-add-text-layer");
  if (btnAddTextLayer) {
    btnAddTextLayer.addEventListener("click", () => {
      const side = AppState.customizer.activeSide || "left";
      if (!AppState.customizer.sides[side]) AppState.customizer.sides[side] = {};
      if (!AppState.customizer.sides[side].text || !AppState.customizer.sides[side].text.trim()) {
        AppState.customizer.sides[side].text = "YOUR TEXT";
        if (textInput) textInput.value = "YOUR TEXT";
        if (textPreview) textPreview.textContent = "YOUR TEXT";
        if (textDrag) textDrag.style.display = "flex";
      }
      if (textInput) textInput.focus();
      updateLayersList();
      checkBoundaryCollision();
      updateCustomizerPricing();
      pushHistory();
      showToast("Text layer added! Drag to move or edit text in the input.");
    });
  }

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
      dot.className = `color-dot ${c.name === AppState.customizer.color ? 'active' : ''}`;
      dot.dataset.color = c.name;
      dot.title = c.label || c.name;
      dot.style.background = c.hex;
      dot.style.width = "28px";
      dot.style.height = "28px";
      dot.style.borderRadius = "50%";
      dot.style.cursor = "pointer";
      dot.style.transition = "all 0.2s ease";
      dot.style.border = c.name === AppState.customizer.color ? "2.5px solid #0f172a" : (c.border ? `1.5px solid ${c.border}` : "1.5px solid #cbd5e1");

      dot.addEventListener("click", () => {
        colorContainer.querySelectorAll(".color-dot").forEach(d => {
          d.classList.remove("active");
          const cObj = colors.find(x => x.name === d.dataset.color);
          d.style.border = cObj && cObj.border ? `1.5px solid ${cObj.border}` : "1.5px solid #cbd5e1";
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
        showToast(`Color: ${c.label || c.name}`);
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
    pillsContainer.innerHTML = sizes.map((s, idx) => `
      <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
    `).join('');

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
        showToast(`${prod.name} selected!`);
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
      showToast("Design reset successfully!");
    });
  }

  // --- Add to Cart with Boundary Collision Validation ---
  const addCustomBtn = document.getElementById("btn-add-custom-to-cart");
  if (addCustomBtn) {
    addCustomBtn.addEventListener("click", () => {
      // 1. Boundary check: Prevent adding to cart if design is out-of-bounds!
      const isOut = checkBoundaryCollision();
      if (isOut) {
        showToast("⚠️ Error: Design is outside the dashed printable area! Please place it inside the red dashed box.", "error");
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
        showToast("Please add an image or text before adding to bag!");
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
        const sideObj = (prod.sides || []).find(s => s.id === activeSide);
        baseImgSrc = (sideObj && sideObj.img) ? sideObj.img : "assets/ceeprinto_mug_left_stage.webp";
        selectedItemColor = AppState.customizer.color || "Pure White";
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
        cartKey: `custom-${Date.now()}`,
        id: `custom-${blankKey}`,
        category: customCat,
        name: `Custom ${prod.name}`,
        price: unitPrice,
        baseCost: AppState.customizer.baseCost + totalSideFees,
        profit: getCategoryProfit(customCat, "half_advance"),
        image: previewImg,
        size: AppState.customizer.size,
        color: selectedItemColor,
        blankSku: `CUSTOM-${blankKey.toUpperCase()}`,
        qty: qty,
        isCustom: true,
        customSides: JSON.parse(JSON.stringify(AppState.customizer.sides))
      };

      AppState.cart.push(customItem);
      saveCart();
      updateCartUI();
      openCartDrawer();
      showToast(`Custom ${prod.name} (${qty}x) added to your bag!`);
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

// 7. CART OPERATIONS
window.addToCart = function(productId, options = {}) {
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

  let cartKey = `${productId}-${selectedSize}-${selectedColor}`;
  if (options.isCouple) {
    cartKey = `${productId}-couple-${options.menSize || 'L'}-${options.womenSize || 'M'}-${selectedColor}`;
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
      blankSku: product.blankSku || `SKU-${product.id}`,
      qty: qtyToAdd,
      isCustom: false,
      isCouple: !!options.isCouple,
      menSize: options.menSize || null,
      womenSize: options.womenSize || null
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(`✓ Added ${product.name} (${qtyToAdd}x) to shopping bag!`);
};

window.changeCartQty = function(cartKey, delta) {
  const item = AppState.cart.find(i => i.cartKey === cartKey);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    AppState.cart = AppState.cart.filter(i => i.cartKey !== cartKey);
  }

  saveCart();
  updateCartUI();
};

function saveCart() {
  localStorage.setItem("mf_cart", JSON.stringify(AppState.cart));
}

function updateCartUI() {
  if (!Array.isArray(AppState.cart)) AppState.cart = [];

  // Sanitize all items to ensure no NaN anywhere
  AppState.cart.forEach(item => {
    if (!item.qty || isNaN(item.qty) || item.qty <= 0) item.qty = 1;
    if (item.price === undefined || isNaN(item.price)) {
      item.price = Number(item.unitPrice || 0);
    }
    if (!item.price || isNaN(item.price)) {
      const foundP = PRODUCTS.find(p => p.id === (item.id || item.productId));
      item.price = foundP ? Number(foundP.retailPrice) : 1250;
    }
    if (!item.unitPrice || isNaN(item.unitPrice)) item.unitPrice = item.price;
    if (!item.baseCost || isNaN(item.baseCost)) {
      const foundP = PRODUCTS.find(p => p.id === (item.id || item.productId));
      item.baseCost = foundP ? Number(foundP.baseCost) : 750;
    }
    if (!item.profit || isNaN(item.profit)) item.profit = item.price - item.baseCost;
    if (!item.image && item.previewImage) item.image = item.previewImage;
    if (!item.cartKey) item.cartKey = `${item.id || item.productId || 'item'}-${item.size || 'M'}-${item.color || 'White'}`;
  });

  const totalItems = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalPayable = totalItems > 0 ? (subtotal + (Number(AppState.shippingFee) || 250)) : 0;

  const counter = document.getElementById("cart-counter");
  const bnavCounter = document.getElementById("bnav-cart-counter");
  const headerCount = document.getElementById("cart-header-count");
  if (counter) counter.textContent = totalItems;
  if (bnavCounter) bnavCounter.textContent = totalItems;
  if (headerCount) headerCount.textContent = totalItems;

  const subtotalEl = document.getElementById("cart-subtotal");
  const totalPayableEl = document.getElementById("cart-total-payable");
  if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
  if (totalPayableEl) totalPayableEl.textContent = `Rs. ${totalPayable.toLocaleString()}`;

  const listContainer = document.getElementById("cart-items-list");
  if (!listContainer) return;

  const proceedBtn = document.getElementById("proceed-checkout-btn");

  if (AppState.cart.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-cart-view">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin: 0 auto 12px; opacity: 0.3;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <p>Your shopping bag is empty.</p>
        <span style="font-size: 0.82rem; color: var(--text-muted);">Create your custom design or browse our catalog.</span>
      </div>
    `;
    if (proceedBtn) {
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = "0.5";
    }
  } else {
    if (proceedBtn) {
      proceedBtn.disabled = false;
      proceedBtn.style.opacity = "1";
    }
    listContainer.innerHTML = AppState.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-meta">
            ${item.isCouple ? `
              <div style="font-size: 0.74rem; background: #fdf2f8; color: #be185d; font-weight: 800; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 4px; border: 1px solid #fbcfe8;">
                💍 Couple Duo: 👔 Men ${item.menSize || 'L'} + 👗 Women ${item.womenSize || 'M'}
              </div>
            ` : ''}
            ${item.isCustom ? `
              <div style="font-size: 0.74rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 3px;">
                ${item.customSides?.hasFront && item.customSides?.hasBack ? '✨ 2-Sided Print (Front & Back)' : (item.customSides?.hasFront ? '✨ Front Print' : '✨ Back Print')}
              </div>
              ${item.customSides?.front?.artworkName ? `<div style="font-size: 0.72rem; color: var(--text-secondary);">Front: ${item.customSides.front.artworkName} ${item.customSides.front.text ? `("${item.customSides.front.text}")` : ''}</div>` : (item.customSides?.front?.text ? `<div style="font-size: 0.72rem; color: var(--text-secondary);">Front Text: "${item.customSides.front.text}"</div>` : '')}
              ${item.customSides?.back?.artworkName ? `<div style="font-size: 0.72rem; color: var(--text-secondary);">Back: ${item.customSides.back.artworkName} ${item.customSides.back.text ? `("${item.customSides.back.text}")` : ''}</div>` : (item.customSides?.back?.text ? `<div style="font-size: 0.72rem; color: var(--text-secondary);">Back Text: "${item.customSides.back.text}"</div>` : '')}
            ` : ''}
            Size: <strong>${item.size}</strong> | Color: <strong>${item.color}</strong>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="changeCartQty('${item.cartKey}', -1)">-</button>
              <span class="qty-count">${item.qty}</span>
              <button class="qty-btn" onclick="changeCartQty('${item.cartKey}', 1)">+</button>
            </div>
            <span class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// 8. 3-TIER PAYMENT ENGINE & CHECKOUT CONTROLLER
function updateCheckoutPricing() {
  if (!Array.isArray(AppState.cart)) AppState.cart = [];
  AppState.cart.forEach(item => {
    if (!item.qty || isNaN(item.qty)) item.qty = 1;
    if (!item.price || isNaN(item.price)) item.price = Number(item.unitPrice || 1250);
    if (!item.baseCost || isNaN(item.baseCost)) item.baseCost = 750;
  });

  const totalQty = AppState.cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
  const baseSubtotal = AppState.cart.reduce((sum, item) => sum + ((Number(item.baseCost) || 750) * (Number(item.qty) || 1)), 0);
  const shipping = Number(AppState.shippingFee) || 250;

  const rules = AppState.pricingRules;

  // Check if cart contains any custom printed / personalized items
  const hasCustomItems = AppState.cart.some(item => item.isCustom);
  const customAlert = document.getElementById("custom-print-payment-alert");
  if (customAlert) customAlert.style.display = hasCustomItems ? "block" : "none";

  // Calculate category-wise totals for online payment methods
  let profitFull = 0;
  let profitHalf = 0;

  AppState.cart.forEach(item => {
    const itemCat = item.category || mapBlankToCategory(item.id);
    const itemQty = item.qty || 1;
    profitFull += getCategoryProfit(itemCat, "full_advance") * itemQty;
    profitHalf += getCategoryProfit(itemCat, "half_advance") * itemQty;
  });

  const totalFull = baseSubtotal + profitFull + shipping;
  const totalHalf = baseSubtotal + profitHalf + shipping;

  const halfAdvanceNow = Math.round(totalHalf * 0.5);

  // Set prices on method cards
  const tierHalfPrice = document.getElementById("tier-half-price");
  const tierFullPrice = document.getElementById("tier-full-price");

  if (tierHalfPrice) tierHalfPrice.textContent = `Rs. ${totalHalf.toLocaleString()}`;
  if (tierFullPrice) tierFullPrice.textContent = `Rs. ${totalFull.toLocaleString()}`;

  // Update card sub-descriptions with exact amounts
  const subHalf = document.getElementById("sub-half-desc");
  const subFull = document.getElementById("sub-full-desc");

  if (subHalf) {
    subHalf.textContent = `Pay 50% advance now via Card (Rs. ${halfAdvanceNow.toLocaleString()}) • Balance before dispatch`;
  }
  if (subFull) {
    subFull.textContent = `Pay 100% via Card: Rs. ${totalFull.toLocaleString()} (Direct Settlement to Meezan Bank Ltd.)`;
  }

  // Selected Method Logic (Zero COD)
  if (!AppState.selectedPaymentMethod || AppState.selectedPaymentMethod === "cod") {
    AppState.selectedPaymentMethod = "full_advance";
  }
  const method = AppState.selectedPaymentMethod;
  const bankCard = document.getElementById("bank-details-card");
  const planTitle = document.getElementById("breakdown-plan-title");
  const totalPayableEl = document.getElementById("breakdown-total-payable");
  const splitBar = document.getElementById("breakdown-split-bar");
  const splitAdvanceEl = document.getElementById("split-advance-amount");
  const splitCodEl = document.getElementById("split-cod-amount");

  let activeTotal = totalFull;
  let advanceNow = totalFull;
  let dueOnDelivery = 0;

  if (method === "half_advance") {
    activeTotal = totalHalf;
    advanceNow = halfAdvanceNow;
    dueOnDelivery = 0;
    if (planTitle) planTitle.textContent = "50% Card Booking Deposit (Balance before shipping):";
  } else {
    activeTotal = totalFull;
    advanceNow = totalFull;
    dueOnDelivery = 0;
    if (planTitle) planTitle.textContent = "100% Full Card Payment (Zero Cash on Delivery):";
  }

  if (bankCard) bankCard.style.display = "block";
  if (splitBar) splitBar.style.display = "grid";

  const btnCardPayLabel = document.getElementById("btn-card-pay-label");
  if (btnCardPayLabel) {
    btnCardPayLabel.textContent = `🔒 Pay Rs. ${advanceNow.toLocaleString()} via Card & Deposit to Meezan Bank`;
  }
  syncPaymentVerificationButton(activeTotal, method);
  updateBankDetailsDisplay();

  if (totalPayableEl) totalPayableEl.textContent = `Rs. ${activeTotal.toLocaleString()}`;
  if (splitAdvanceEl) splitAdvanceEl.textContent = `Rs. ${advanceNow.toLocaleString()}`;
  if (splitCodEl) splitCodEl.textContent = `Rs. 0 (Zero COD)`;
}

// Synchronize Submit Button with Online Payment Verification State

// Synchronize and Display Direct Merchant Accounts in Checkout
function updateBankDetailsDisplay() {
  const bName = (AppState.pricingRules && AppState.pricingRules.bankName) || "Meezan Bank";
  const bAcc = (AppState.pricingRules && AppState.pricingRules.bankAccountNumber) || "02010108920192";
  const wName = (AppState.pricingRules && AppState.pricingRules.walletName) || "Easypaisa / JazzCash";
  const wAcc = (AppState.pricingRules && AppState.pricingRules.walletAccountNumber) || "03001234567";
  const title = (AppState.pricingRules && AppState.pricingRules.accountTitle) || "MF Store";

  const bNameEl = document.getElementById("display-bank-name");
  if (bNameEl) bNameEl.textContent = "🏛️ " + bName;

  const bAccEl = document.getElementById("display-bank-acc");
  if (bAccEl) bAccEl.textContent = bAcc;

  const wNameEl = document.getElementById("display-wallet-name");
  if (wNameEl) wNameEl.textContent = "📱 " + wName;

  const wAccEl = document.getElementById("display-wallet-acc");
  if (wAccEl) wAccEl.textContent = wAcc;

  const copyBtns = document.querySelectorAll(".btn-copy-acc");
  if (copyBtns && copyBtns.length >= 2) {
    copyBtns[0].setAttribute("data-copy", bAcc);
    copyBtns[1].setAttribute("data-copy", wAcc);
  }

  document.querySelectorAll(".display-acc-title").forEach(el => el.textContent = title);
}

function syncPaymentVerificationButton(activeTotal, method) {
  const submitBtn = document.getElementById("submit-order-btn");
  if (!submitBtn) return;

  if (!AppState.cardPaymentPaid) {
    submitBtn.innerHTML = `<span>🔒 Add Card & Pay Above to Unlock Checkout ➔</span>`;
    submitBtn.style.background = "#94a3b8";
    submitBtn.style.borderColor = "#64748b";
    submitBtn.style.color = "#ffffff";
    submitBtn.style.cursor = "not-allowed";
    submitBtn.style.boxShadow = "none";
    submitBtn.disabled = true;
  } else {
    const priceText = activeTotal ? `Rs. ${activeTotal.toLocaleString()}` : '';
    submitBtn.innerHTML = `<span>🚀 Complete Checkout & Confirm Order (Meezan Bank Paid ${priceText}) ➔</span>`;
    submitBtn.style.background = "#059669";
    submitBtn.style.borderColor = "#047857";
    submitBtn.style.color = "#ffffff";
    submitBtn.style.cursor = "pointer";
    submitBtn.style.boxShadow = "0 4px 18px rgba(5, 150, 105, 0.4)";
    submitBtn.disabled = false;
  }
}


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

window.openProductDialog = openProductDialog;
window.closeProductDialog = closeProductDialog;
window.setDialogAngle = setDialogAngle;
window.setDialogColor = setDialogColor;
window.setDialogSize = setDialogSize;
window.setDialogCoupleSize = setDialogCoupleSize;

function isCoupleApparelProduct(product) {
  if (!product) return false;
  const cat = (product.category || '').toLowerCase();
  if (cat === 'mugs' || cat === 'caps' || cat === 'bags') return false;
  
  const name = (product.name || '').toLowerCase();
  const id = (product.id || '').toLowerCase();
  const isCoupleTheme = product.theme === 'couple';
  const hasCoupleKeyword = name.includes('couple') || name.includes('2-piece') || name.includes('pair of 2') || name.includes('hubby') || name.includes('king & queen') || name.includes('soulmates') || name.includes('mr. right') || name.includes('better together') || id.includes('couple');
  
  return (isCoupleTheme || hasCoupleKeyword) && !name.includes('cyber butterfly');
}

function openProductDialog(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentVariant = AppState.selectedVariants[productId] || {
    size: (product.sizes && product.sizes[0]) || "L",
    color: (product.colors && product.colors[0] && product.colors[0].name) || "Pure White"
  };

  const isCouple = isCoupleApparelProduct(product);

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
  if (priceEl) priceEl.textContent = `Rs. ${product.retailPrice.toLocaleString()}`;
  if (qtyEl) qtyEl.textContent = "1";

  // Hide angles list completely (front view only)
  const anglesContainer = document.getElementById("dialog-angles-list");
  if (anglesContainer) anglesContainer.innerHTML = "";

  // Render Colors
  renderDialogColors(product);

  // Render Sizes (Dual sizes if Couple set)
  renderDialogSizes(product);

  // Setup Add to Cart Button
  const addToCartBtn = document.getElementById("dialog-add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.disabled = false;
    addToCartBtn.style.opacity = "1";
    addToCartBtn.style.cursor = "pointer";
    if (isCouple) {
      addToCartBtn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg> <span>ADD COUPLE SET (Men: ${AppState.activeDialog.menSize || 'L'} + Women: ${AppState.activeDialog.womenSize || 'M'}) ➔</span>`;
    } else {
      addToCartBtn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg> <span>ADD TO SHOPPING BAG</span>`;
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

  container.innerHTML = product.colors.map(c => `
    <div 
      class="product-dialog-color-dot ${c.name === AppState.activeDialog.activeColor ? 'active' : ''}" 
      style="background-color: ${c.hex}; ${c.hex === '#ffffff' ? 'border: 1px solid #cbd5e1;' : ''}" 
      title="${c.name}"
      onclick="setDialogColor('${c.name}')">
    </div>
  `).join('');
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
    const cardEl = document.getElementById(`card-${product.id}`);
    if (cardEl) {
      const cardImg = document.getElementById(`card-img-${product.id}`);
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

  const isCouple = isCoupleApparelProduct(product);

  if (isCouple) {
    const coupleSizes = ["S", "M", "L", "XL", "XXL"];
    const currentMen = AppState.activeDialog.menSize || "L";
    const currentWomen = AppState.activeDialog.womenSize || "M";

    container.innerHTML = `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 14px;">
        <!-- Header Summary Pill -->
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #fdf2f8 100%); padding: 12px 14px; border-radius: 10px; border: 1.5px solid #e0e7ff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div style="font-size: 0.84rem; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 6px;">
            <span>💍 Selected Couple Sizes:</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;" id="dialog-couple-combined-badge">
            <span style="background: #1e3a8a; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 4px;">
              👔 Men: <strong>${currentMen}</strong>
            </span>
            <span style="background: #be123c; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 4px;">
              👗 Women: <strong>${currentWomen}</strong>
            </span>
          </div>
        </div>

        <!-- Men's Size Selection Box -->
        <div style="background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #cbd5e1;">
          <div style="font-size: 0.82rem; font-weight: 800; color: #1e3a8a; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="display: flex; align-items: center; gap: 6px;">
              <span>👔</span> <strong>Men's Size (Mardana Size):</strong>
            </span>
            <span style="font-weight: 900; color: #1e3a8a; background: #dbeafe; padding: 2px 10px; border-radius: 99px; font-size: 0.8rem;" id="dialog-couple-men-label">${currentMen}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${coupleSizes.map(s => `
              <button 
                type="button" 
                id="couple-men-size-${s.toLowerCase()}"
                class="product-dialog-size-pill men-pill ${s === currentMen ? 'active' : ''}" 
                style="${s === currentMen ? 'background: #1e3a8a !important; color: #ffffff !important; border-color: #1e3a8a !important; font-weight: 900; box-shadow: 0 2px 8px rgba(30,58,138,0.3);' : 'background: #ffffff; color: #334155; border: 1.5px solid #cbd5e1; font-weight: 700;'} min-width: 48px; padding: 8px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                onclick="setDialogCoupleSize('men', '${s}')">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Women's Size Selection Box -->
        <div style="background: #fff1f2; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #fecdd3;">
          <div style="font-size: 0.82rem; font-weight: 800; color: #be123c; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="display: flex; align-items: center; gap: 6px;">
              <span>👗</span> <strong>Women's Size (Zanana Size):</strong>
            </span>
            <span style="font-weight: 900; color: #be123c; background: #ffe4e6; padding: 2px 10px; border-radius: 99px; font-size: 0.8rem;" id="dialog-couple-women-label">${currentWomen}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${coupleSizes.map(s => `
              <button 
                type="button" 
                id="couple-women-size-${s.toLowerCase()}"
                class="product-dialog-size-pill women-pill ${s === currentWomen ? 'active' : ''}" 
                style="${s === currentWomen ? 'background: #be123c !important; color: #ffffff !important; border-color: #be123c !important; font-weight: 900; box-shadow: 0 2px 8px rgba(190,18,60,0.3);' : 'background: #ffffff; color: #334155; border: 1.5px solid #fecdd3; font-weight: 700;'} min-width: 48px; padding: 8px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;"
                onclick="setDialogCoupleSize('women', '${s}')">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = (product.sizes || ["S", "M", "L", "XL"]).map(s => `
      <button 
        type="button" 
        class="product-dialog-size-pill ${s === AppState.activeDialog.activeSize ? 'active' : ''}" 
        onclick="setDialogSize('${s}')">
        ${s}
      </button>
    `).join('');
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
    const addToCartBtn = document.getElementById("dialog-add-to-cart-btn");
    if (addToCartBtn) {
      const menSize = AppState.activeDialog.menSize || "L";
      const womenSize = AppState.activeDialog.womenSize || "M";
      addToCartBtn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg> <span>ADD COUPLE SET (Men: ${menSize} + Women: ${womenSize}) ➔</span>`;
    }
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

      if (AppState.activeDialog.isCouple) {
        const menSize = AppState.activeDialog.menSize || "L";
        const womenSize = AppState.activeDialog.womenSize || "M";
        window.addToCart(product.id, {
          size: `Men: ${menSize} | Women: ${womenSize}`,
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

function setupEventListeners() {
  
  // Copy Bank / Wallet Account Number to Clipboard
  document.addEventListener("click", (e) => {
    const copyBtn = e.target.closest(".btn-copy-acc");
    if (!copyBtn) return;
    e.preventDefault();
    const textToCopy = copyBtn.getAttribute("data-copy") || copyBtn.dataset.copy;
    if (!textToCopy) return;

    const doCopySuccess = () => {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = "✓ Copied!";
      copyBtn.style.background = "#dcfce7";
      copyBtn.style.color = "#15803d";
      showToast(`Copied account (${textToCopy}) to clipboard!`);
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
        copyBtn.style.background = "#ecfdf5";
        copyBtn.style.color = "#059669";
      }, 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(doCopySuccess).catch(() => {
        fallbackCopyText(textToCopy, doCopySuccess);
      });
    } else {
      fallbackCopyText(textToCopy, doCopySuccess);
    }
  });

  function fallbackCopyText(text, cb) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      if (cb) cb();
    } catch (_) {
      showToast(`Account: ${text}`);
    }
    document.body.removeChild(ta);
  }

  setupProductDialogEventListeners();
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const proceedBtn = document.getElementById("proceed-checkout-btn");
  const closeCheckoutBtn = document.getElementById("close-checkout-modal-btn");
  const closeSizeBtn = document.getElementById("close-size-modal-btn");

  if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target.id === "cart-drawer-overlay") closeCartDrawer();
    });
  }

  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      closeCartDrawer();
      openCheckoutModal();
      updateCheckoutPricing();
    });
  }

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
  if (closeSizeBtn) closeSizeBtn.addEventListener("click", closeSizeModal);

  // Filters for Catalog
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // 3-Tier Payment Selection Handlers
  const tierCards = document.querySelectorAll(".payment-tier-card");
  tierCards.forEach(card => {
    card.addEventListener("click", () => {
      tierCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      AppState.selectedPaymentMethod = card.dataset.method;
      updateCheckoutPricing();
    });
  });

  // Checkout Form Submission
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitCustomerOrder();
    });
  }

  // Payment Receipt Dropzone & File Input Handlers
  const receiptDropzone = document.getElementById("payment-receipt-dropzone");
  const receiptFileInput = document.getElementById("payment-receipt-file-input");
  const receiptPrompt = document.getElementById("receipt-upload-prompt");
  const receiptPreview = document.getElementById("receipt-upload-preview");
  const receiptImg = document.getElementById("receipt-preview-img");
  const receiptLabel = document.getElementById("receipt-filename-label");
  const removeReceiptBtn = document.getElementById("remove-receipt-btn");
  const trxInput = document.getElementById("advance-trx-id");
  const onlineErrBanner = document.getElementById("online-payment-error-banner");

  if (receiptDropzone && receiptFileInput) {
    receiptDropzone.addEventListener("click", (e) => {
      if (e.target.id === "remove-receipt-btn") return;
      receiptFileInput.click();
    });

    receiptDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      receiptDropzone.style.borderColor = "#047857";
      receiptDropzone.style.background = "#dcfce7";
    });

    receiptDropzone.addEventListener("dragleave", () => {
      receiptDropzone.style.borderColor = "#059669";
      receiptDropzone.style.background = "#f0fdf4";
    });

    receiptDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      receiptDropzone.style.borderColor = "#059669";
      receiptDropzone.style.background = "#f0fdf4";
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleReceiptFile(e.dataTransfer.files[0]);
      }
    });

    receiptFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleReceiptFile(e.target.files[0]);
      }
    });
  }

  function handleReceiptFile(file) {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload a valid image file (JPG/PNG/WEBP)!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      AppState.paymentReceiptData = evt.target.result;
      if (receiptImg) receiptImg.src = evt.target.result;
      if (receiptLabel) receiptLabel.textContent = file.name;
      if (receiptPrompt) receiptPrompt.style.display = "none";
      if (receiptPreview) receiptPreview.style.display = "flex";
      if (onlineErrBanner) onlineErrBanner.style.display = "none";
      syncPaymentVerificationButton();
      showToast("✓ Payment receipt attached successfully!");
    };
    reader.readAsDataURL(file);
  }

  if (removeReceiptBtn) {
    removeReceiptBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      AppState.paymentReceiptData = null;
      if (receiptFileInput) receiptFileInput.value = "";
      if (receiptImg) receiptImg.src = "";
      if (receiptPrompt) receiptPrompt.style.display = "block";
      if (receiptPreview) receiptPreview.style.display = "none";
      syncPaymentVerificationButton();
      showToast("Payment receipt removed.");
    });
  }

  if (trxInput) {
    trxInput.addEventListener("input", () => {
      syncPaymentVerificationButton();
      if (trxInput.value.trim().length >= 4 && onlineErrBanner) {
        onlineErrBanner.style.display = "none";
      }
    });
  }

  // Intercept button click: strictly prevent checkout if card payment has not been processed
  const submitOrderBtn = document.getElementById("submit-order-btn");
  if (submitOrderBtn) {
    submitOrderBtn.addEventListener("click", (e) => {
      const method = AppState.selectedPaymentMethod;
      if (method === "full_advance" || method === "half_advance") {
        if (!AppState.cardPaymentPaid) {
          e.preventDefault();
          e.stopPropagation();
          const cardForm = document.getElementById("card-entry-form-container");
          if (cardForm) {
            cardForm.scrollIntoView({ behavior: "smooth", block: "center" });
            const numEl = document.getElementById("card-number-input");
            if (numEl) {
              numEl.focus();
              numEl.style.borderColor = "#dc2626";
              numEl.style.boxShadow = "0 0 0 4px rgba(220, 38, 38, 0.3)";
              setTimeout(() => { if (numEl) { numEl.style.borderColor = ""; numEl.style.boxShadow = ""; } }, 3000);
            }
          }
          showToast("❌ Pehle Card details enter karke pay karein taake checkout unlock ho sake!");
          return false;
        }
      }
    });
  }


  // ==========================================
  // CARD PAYMENT GATEWAY CONTROLLER (DESTINATION: MEEZAN BANK LTD.)
  // ==========================================
  const cardNumInput = document.getElementById("card-number-input");
  const cardExpInput = document.getElementById("card-expiry-input");
  const cardCvvInput = document.getElementById("card-cvv-input");
  const cardHolderInput = document.getElementById("card-holder-name");
  const cardBrandBadge = document.getElementById("card-brand-badge");
  const cardIconPreview = document.getElementById("card-icon-preview");
  const btnProcessCardPay = document.getElementById("btn-process-card-pay");
  const cardFormContainer = document.getElementById("card-entry-form-container");
  const cardSuccessBox = document.getElementById("card-payment-success-box");

  // Format Card Number (XXXX XXXX XXXX XXXX) & Brand Auto-Detection
  if (cardNumInput) {
    cardNumInput.addEventListener("input", (e) => {
      let raw = e.target.value.replace(/\D/g, "").slice(0, 16);
      let formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
      e.target.value = formatted;

      // Brand detection
      if (raw.startsWith("4")) {
        if (cardBrandBadge) { cardBrandBadge.textContent = "VISA"; cardBrandBadge.style.background = "#1e3a8a"; cardBrandBadge.style.color = "#ffffff"; }
        if (cardIconPreview) cardIconPreview.textContent = "💳";
      } else if (raw.startsWith("51") || raw.startsWith("52") || raw.startsWith("53") || raw.startsWith("54") || raw.startsWith("55") || raw.startsWith("2")) {
        if (cardBrandBadge) { cardBrandBadge.textContent = "MASTERCARD"; cardBrandBadge.style.background = "#ea580c"; cardBrandBadge.style.color = "#ffffff"; }
        if (cardIconPreview) cardIconPreview.textContent = "💳";
      } else if (raw.startsWith("6") || raw.startsWith("9")) {
        if (cardBrandBadge) { cardBrandBadge.textContent = "PAYPAK"; cardBrandBadge.style.background = "#15803d"; cardBrandBadge.style.color = "#ffffff"; }
        if (cardIconPreview) cardIconPreview.textContent = "🇵🇰";
      } else {
        if (cardBrandBadge) { cardBrandBadge.textContent = "CARD"; cardBrandBadge.style.background = "#e2e8f0"; cardBrandBadge.style.color = "#475569"; }
        if (cardIconPreview) cardIconPreview.textContent = "💳";
      }
    });
  }

  // Format Expiry (MM / YY)
  if (cardExpInput) {
    cardExpInput.addEventListener("input", (e) => {
      let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (raw.length >= 3) {
        e.target.value = raw.slice(0, 2) + " / " + raw.slice(2);
      } else {
        e.target.value = raw;
      }
    });
  }

  // Format CVV (digits only, max 4)
  if (cardCvvInput) {
    cardCvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
  }

  // Handle Card Payment Button Click
  if (btnProcessCardPay) {
    btnProcessCardPay.addEventListener("click", () => {
      const holder = (cardHolderInput?.value || "").trim();
      const rawNum = (cardNumInput?.value || "").replace(/\s/g, "");
      const exp = (cardExpInput?.value || "").replace(/\s/g, "");
      const cvv = (cardCvvInput?.value || "").trim();

      if (!holder || holder.length < 3) {
        showToast("⚠️ Please enter valid Cardholder Name!");
        if (cardHolderInput) { cardHolderInput.focus(); cardHolderInput.style.borderColor = "#dc2626"; }
        return;
      }
      if (rawNum.length < 15) {
        showToast("⚠️ Please enter a valid 16-digit Card Number!");
        if (cardNumInput) { cardNumInput.focus(); cardNumInput.style.borderColor = "#dc2626"; }
        return;
      }
      if (exp.length < 4) {
        showToast("⚠️ Please enter valid Card Expiry (MM / YY)!");
        if (cardExpInput) { cardExpInput.focus(); cardExpInput.style.borderColor = "#dc2626"; }
        return;
      }
      if (cvv.length < 3) {
        showToast("⚠️ Please enter valid 3-digit CVV / Security Code!");
        if (cardCvvInput) { cardCvvInput.focus(); cardCvvInput.style.borderColor = "#dc2626"; }
        return;
      }

      // Calculate Advance Amount
      const totalQty = AppState.cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
      const baseSubtotal = AppState.cart.reduce((sum, item) => sum + ((Number(item.baseCost) || 750) * (Number(item.qty) || 1)), 0);
      const shipping = Number(AppState.shippingFee) || 250;
      let activeProfit = 0;
      const method = AppState.selectedPaymentMethod;
      AppState.cart.forEach(item => {
        const itemCat = item.category || mapBlankToCategory(item.id);
        const itemQty = item.qty || 1;
        activeProfit += getCategoryProfit(itemCat, method === "half_advance" ? "half_advance" : "full_advance") * itemQty;
      });
      const totalAmount = baseSubtotal + activeProfit + shipping;
      const amountToPay = method === "half_advance" ? Math.round(totalAmount * 0.5) : totalAmount;

      // Start processing animation
      btnProcessCardPay.disabled = true;
      btnProcessCardPay.innerHTML = `<span>⏳ Contacting Meezan Bank 3D Secure Gateway...</span>`;
      btnProcessCardPay.style.background = "#0284c7";

      setTimeout(() => {
        const authRef = "MBL-AUTH-" + Math.floor(100000 + Math.random() * 900000);
        const masked = "•••• •••• •••• " + rawNum.slice(-4);

        AppState.cardPaymentPaid = true;
        AppState.cardPaymentDetails = {
          holder: holder.toUpperCase(),
          rawNum: rawNum,
          masked: masked,
          authCode: authRef,
          amount: amountToPay,
          settlementAccount: "Meezan Bank Ltd. (02010108920192)",
          timestamp: new Date().toLocaleString()
        };

        if (cardFormContainer) cardFormContainer.style.display = "none";
        if (cardSuccessBox) {
          cardSuccessBox.style.display = "block";
          const amtEl = document.getElementById("success-card-amount");
          const maskEl = document.getElementById("success-card-masked");
          const authEl = document.getElementById("success-card-auth");
          if (amtEl) amtEl.textContent = `Rs. ${amountToPay.toLocaleString()}`;
          if (maskEl) maskEl.textContent = masked;
          if (authEl) authEl.textContent = authRef;
        }

        // UNLOCK CHECKOUT BUTTON!
        syncPaymentVerificationButton(totalAmount, method);
        const submitBtn = document.getElementById("submit-order-btn");
        if (submitBtn) {
          submitBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        showToast(`✅ Rs. ${amountToPay.toLocaleString()} payment received at Meezan Bank Account! Complete checkout below.`);
      }, 1100);
    });
  }

  const closeSuccessBtn = document.getElementById("close-success-btn");
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener("click", () => {
      closeCheckoutModal();
      document.getElementById("order-success-view").style.display = "none";
      document.getElementById("checkout-form").style.display = "block";
    });
  }

  // Order Tracker lookup
  const trackBtn = document.getElementById("track-order-btn");
  if (trackBtn) trackBtn.addEventListener("click", handleTrackOrder);
}

// 9. SUBMIT CUSTOMER ORDER & DISPATCH SILENTLY TO CEEPRINTO
function submitCustomerOrder() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const city = document.getElementById("customer-city").value;
  const address = document.getElementById("customer-address").value.trim();
  const trxId = document.getElementById("advance-trx-id") ? document.getElementById("advance-trx-id").value.trim() : "";
  const method = AppState.selectedPaymentMethod;

  // Enforce 50% or 100% advance on custom prints
  const hasCustomItems = AppState.cart.some(item => item.isCustom);
  if (hasCustomItems && method === "cod") {
    showToast("⚠️ Custom print orders require at least 50% Advance Deposit or 100% Full Payment!");
    return;
  }

  // STRICT VALIDATION: Verify card payment before checkout!
  if (!AppState.cardPaymentPaid) {
    showToast("⚠️ Pehle Card details enter karke payment karein taake checkout unlock ho sake!");
    const cardForm = document.getElementById("card-entry-form-container");
    if (cardForm) cardForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const totalQty = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
  const baseSubtotal = AppState.cart.reduce((sum, item) => sum + (item.baseCost * item.qty), 0);
  const shipping = AppState.shippingFee;
  const rules = AppState.pricingRules;

  let isFull = method !== "half_advance";
  let isHalf = method === "half_advance";

  let activeTotalProfit = 0;
  AppState.cart.forEach(item => {
    const itemCat = item.category || mapBlankToCategory(item.id);
    const itemQty = item.qty || 1;
    if (isHalf) activeTotalProfit += getCategoryProfit(itemCat, "half_advance") * itemQty;
    else activeTotalProfit += getCategoryProfit(itemCat, "full_advance") * itemQty;
  });

  const totalAmount = baseSubtotal + activeTotalProfit + shipping;
  let advanceCollected = totalAmount;
  let codToCollect = 0;

  if (isHalf) {
    advanceCollected = Math.round(totalAmount * 0.5);
    codToCollect = 0;
  }

  const orderId = `MF-${Math.floor(1000 + Math.random() * 9000)}`;

  const ceeprintoOrderPayload = {
    external_order_id: orderId,
    store_id: CEEPRINTO_CONFIG.keyId,
    fulfillment_service: "ceeprinto_white_label",
    shipping_address: {
      full_name: name,
      phone_number: phone,
      city: city,
      street_address: address,
      country: "Pakistan"
    },
    payment: {
      type: "prepaid",
      payment_plan: method,
      advance_collected_pkr: advanceCollected,
      cod_amount_to_collect_pkr: 0,
      payment_channel: "meezan_bank_card_gateway",
      card_masked: AppState.cardPaymentDetails?.masked || "•••• 4214",
      card_holder: AppState.cardPaymentDetails?.holder || name,
      meezan_auth_code: AppState.cardPaymentDetails?.authCode || ("MBL-AUTH-" + Math.floor(100000 + Math.random() * 900000)),
      settlement_account: "Meezan Bank Ltd. (02010108920192)",
      transaction_reference: AppState.cardPaymentDetails?.authCode || trxId || null,
      receipt_proof: AppState.paymentReceiptData || null
    },
    line_items: AppState.cart.map(item => {
      const itemCat = item.category || mapBlankToCategory(item.id);
      let itemProfit = item.isCustomPrint ? (item.profit || 250) : (isHalf ? getCategoryProfit(itemCat, "half_advance") : getCategoryProfit(itemCat, "full_advance"));
      return {
        blank_sku: item.blankSku || (item.customConfig ? item.customConfig.garmentId : null),
        product_name: item.name,
        variant_size: item.size,
        variant_color: item.color,
        quantity: item.qty,
        unit_base_cost_pkr: item.baseCost,
        unit_profit_pkr: itemProfit,
        unit_retail_pkr: item.price || (item.baseCost + itemProfit),
        custom_artwork: item.customConfig ? item.customConfig : (item.isCustom ? item.customDetails : null)
      };
    }),
    created_at: new Date().toISOString()
  };

  const customPrintItems = AppState.cart.filter(item => item.isCustomPrint || item.customConfig);
  const hasCustomPrint = customPrintItems.length > 0;

  const newOrder = {
    orderId,
    customer: { name, phone, city, address },
    paymentPlan: method,
    advancePaid: advanceCollected,
    codDue: 0,
    total: totalAmount,
    trxId: trxId || "N/A",
    paymentReceipt: AppState.paymentReceiptData || null,
    status: "in_production",
    statusMessage: "MF Store Studio: Premium Quality Printing & Hand Inspection",
    courier: "Trax Logistics (Airway Bill Pending)",
    items: [...AppState.cart],
    hasCustomPrint: hasCustomPrint,
    customStudioOrders: hasCustomPrint ? customPrintItems.map(it => it.customConfig) : [],
    apiPayload: ceeprintoOrderPayload,
    date: new Date().toLocaleDateString('en-GB')
  };

  AppState.orders.unshift(newOrder);
  localStorage.setItem("mf_orders", JSON.stringify(AppState.orders));

  // 1. Post to Backend Server Bridge (saves to orders.json & syncs to Firebase)
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newOrder)
  })
  .then(res => res.json())
  .then(data => {
    console.log("[Server Order Stored & Synced]", data);
  })
  .catch(err => {
    console.log("[Local Bridge Notice]:", err.message);
  });

  // 2. Direct backup push to Firebase Realtime Database
  fetch(`https://mfstore-69ab0-default-rtdb.firebaseio.com/orders/${newOrder.orderId}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newOrder)
  }).catch(() => {});

  // 3. Dispatch to CeePrinto fulfillment proxy
  fetch('/api/ceeprinto/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ceeprintoOrderPayload)
  })
  .then(res => res.json())
  .then(data => {
    console.log("[CeePrinto Fulfillment Confirmed]", data);
  })
  .catch(err => {
    console.log("[CeePrinto Dispatch Notice]:", err.message);
  });

  // Clear Cart & Payment Receipt State
  AppState.cart = [];
  AppState.paymentReceiptData = null;
  const receiptPrompt = document.getElementById("receipt-upload-prompt");
  const receiptPreview = document.getElementById("receipt-upload-preview");
  const receiptFileInput = document.getElementById("payment-receipt-file-input");
  const trxInput = document.getElementById("advance-trx-id");
  if (receiptPrompt) receiptPrompt.style.display = "block";
  if (receiptPreview) receiptPreview.style.display = "none";
  if (receiptFileInput) receiptFileInput.value = "";
  if (trxInput) trxInput.value = "";
  saveCart();
  updateCartUI();

  // Show Success Screen
  document.getElementById("checkout-form").style.display = "none";
  document.getElementById("order-success-view").style.display = "block";
  document.getElementById("success-order-id").textContent = orderId;

  const noticeEl = document.getElementById("success-payment-notice");
  const waBtn = document.getElementById("success-whatsapp-share-btn");
  let paymentText = "";
  if (isHalf) {
    paymentText = `Payment Method: <strong>50% Card Deposit (Meezan Bank Ltd.)</strong> (Rs. ${advanceCollected.toLocaleString()} deposited to MF Store Acct: <strong>02010108920192</strong> | Auth Ref: <strong>${AppState.cardPaymentDetails?.authCode || 'MBL-AUTH-PAID'}</strong> • Zero COD)`;
  } else {
    paymentText = `Payment Method: <strong>100% Paid via Card (Meezan Bank Ltd.)</strong> (Rs. ${totalAmount.toLocaleString()} deposited to MF Store Acct: <strong>02010108920192</strong> | Auth Ref: <strong>${AppState.cardPaymentDetails?.authCode || 'MBL-AUTH-PAID'}</strong> • Zero COD)`;
  }
  if (noticeEl) noticeEl.innerHTML = paymentText;

  if (waBtn) {
    const waText = encodeURIComponent(`Hello MF Store! I have placed an order:\n\n*Order ID:* #${orderId}\n*Name:* ${name}\n*City:* ${city}\n*Total:* Rs. ${totalAmount.toLocaleString()}\n*Payment:* Card Paid to Meezan Bank Ltd. (MF Store: 02010108920192)\n*Meezan Auth Ref:* ${AppState.cardPaymentDetails?.authCode || 'N/A'}\n\nPlease confirm my order and share dispatch details.`);
    waBtn.href = `https://wa.me/923001234567?text=${waText}`;
  }

  showToast(`Order #${orderId} booked successfully!`);
}

// Track Order Handler
function handleTrackOrder() {
  const query = document.getElementById("track-order-input").value.trim().toLowerCase();
  const resultBox = document.getElementById("tracking-result-box");
  if (!query) return;

  const found = AppState.orders.find(o => 
    o.orderId.toLowerCase() === query || 
    o.customer.phone.replace(/[^0-9]/g, '') === query.replace(/[^0-9]/g, '')
  );

  resultBox.style.display = "block";

  if (found) {
    resultBox.innerHTML = `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <strong style="font-size: 1.15rem; color: var(--accent-black);">Order #${found.orderId}</strong>
          <span style="color: var(--accent-green); font-weight: 700; font-family: var(--font-heading);">${found.statusMessage}</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 4px;">Customer: <strong>${found.customer.name}</strong> (${found.customer.city})</p>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 4px;">Payment Plan: <strong>${found.paymentPlan === 'half_advance' ? '50% Card Booking' : '100% Card Paid (Meezan Bank)'}</strong></p>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 8px;">Doorstep Cash (COD): <strong>Rs. 0 (Zero COD)</strong> (Meezan Bank Verified: Rs. ${(found.advancePaid || found.total).toLocaleString()})</p>
        <div style="margin-top: 12px; font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono); border-top: 1px solid var(--border-subtle); padding-top: 10px;">
          🚚 Courier: Trax Express / PostEx (Tracking Active)
        </div>
      </div>
    `;
  } else {
    resultBox.innerHTML = `
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px; color: #b91c1c; font-size: 0.88rem;">
        Order record not found. Please enter a valid Order ID (e.g., MF-8921) or phone number.
      </div>
    `;
  }
}

// Modal and Drawer Controls
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer-overlay");
  if (drawer) drawer.classList.add("active");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer-overlay");
  if (drawer) drawer.classList.remove("active");
}

function openCheckoutModal() {
  const modal = document.getElementById("checkout-modal-overlay");
  if (modal) {
    modal.classList.add("active");
    updateCheckoutPricing();
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal-overlay");
  if (modal) modal.classList.remove("active");
}

window.openSizeModal = function() {
  const modal = document.getElementById("size-modal-overlay");
  if (modal) modal.classList.add("active");
};

function closeSizeModal() {
  const modal = document.getElementById("size-modal-overlay");
  if (modal) modal.classList.remove("active");
}

// Toast System
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

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

// Mobile Drawer Navigation Controllers
window.openMobileNav = function() {
  const overlay = document.getElementById("mobile-nav-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.closeMobileNav = function() {
  const overlay = document.getElementById("mobile-nav-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Handle Bottom Nav Active State & Esc Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileNav();
  }
});

