const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// 1. New customizer initial state in AppState
const newCustomizerState = `  customizer: {
    blankType: "mug",
    blankName: "White Ceramic Mug with Color Inside",
    baseCost: 600,
    profit: 550,
    price: 1150,
    color: "Green & White",
    size: "11 oz Standard",
    activeSide: "left",
    mugColor: "green_white",
    qty: 1,
    isOutOfBounds: false,
    products: {
      "mug": {
        name: "White Ceramic Mug with Color Inside",
        category: "mugs",
        baseCost: 600,
        sizes: ["11 oz Standard"],
        sides: [
          { id: "front", label: "Front", sub: "Front side design", fee: 200, img: "assets/blank_mug_green_white_front.jpg" },
          { id: "left", label: "Left", sub: "Handle on left", fee: 200, img: "assets/ceeprinto_mug_green.jpg" },
          { id: "right", label: "Right", sub: "Handle on right", fee: 200, img: "assets/ceeprinto_mug_green.jpg", flip: true },
          { id: "packaging", label: "Custom Packaging", sub: "Branded box packaging", fee: 50, img: "assets/product_bottle.jpg" }
        ],
        mugVariants: {
          "green_white": { name: "Green & White", label: "Green & White (Two-Tone)", cost: 600, front: "assets/blank_mug_green_white_front.jpg", left: "assets/ceeprinto_mug_green.jpg", right: "assets/ceeprinto_mug_green.jpg", back: "assets/blank_mug_green_white_back.jpg" },
          "white": { name: "Pure White", label: "Pure White Cup", cost: 550, front: "assets/blank_mug_front.jpg", left: "assets/ceeprinto_mug_white.jpg", right: "assets/ceeprinto_mug_white.jpg", back: "assets/blank_mug_back.jpg" },
          "red_white": { name: "Red & White", label: "Two-Tone Red & White Cup", cost: 600, front: "assets/blank_mug_red_white_front.jpg", left: "assets/ceeprinto_mug_red.jpg", right: "assets/ceeprinto_mug_red.jpg", back: "assets/blank_mug_red_white_back.jpg" },
          "blue_white": { name: "Blue & White", label: "Two-Tone Blue & White Cup", cost: 600, front: "assets/blank_mug_blue_white_front.jpg", left: "assets/ceeprinto_mug_blue.jpg", right: "assets/ceeprinto_mug_blue.jpg", back: "assets/blank_mug_blue_white_back.jpg" },
          "yellow_white": { name: "Yellow & White", label: "Two-Tone Yellow & White Cup", cost: 600, front: "assets/blank_mug_yellow_white_front.jpg", left: "assets/blank_mug_yellow_white_front.jpg", right: "assets/blank_mug_yellow_white_front.jpg", back: "assets/blank_mug_yellow_white_back.jpg" },
          "orange_white": { name: "Orange & White", label: "Two-Tone Orange & White Cup", cost: 600, front: "assets/ceeprinto_mug_orange.jpg", left: "assets/ceeprinto_mug_orange.jpg", right: "assets/ceeprinto_mug_orange.jpg", back: "assets/blank_mug_yellow_white_back.jpg" },
          "pink_white": { name: "Pink & White", label: "Two-Tone Pink & White Cup", cost: 600, front: "assets/ceeprinto_mug_pink.jpg", left: "assets/ceeprinto_mug_pink.jpg", right: "assets/ceeprinto_mug_pink.jpg", back: "assets/blank_mug_red_white_back.jpg" },
          "black_white": { name: "Black & White", label: "Two-Tone Black & White Cup", cost: 600, front: "assets/blank_mug_black_white_front.jpg", left: "assets/ceeprinto_mug_black.jpg", right: "assets/ceeprinto_mug_black.jpg", back: "assets/blank_mug_black_white_back.jpg" },
          "black": { name: "Obsidian Black", label: "Obsidian Black Cup", cost: 650, front: "assets/blank_mug_black_front.jpg", left: "assets/blank_mug_black_front.jpg", right: "assets/blank_mug_black_front.jpg", back: "assets/blank_mug_black_back.jpg" }
        },
        printArea: {
          "front": { top: "30%", left: "28%", width: "44%", height: "50%" },
          "left": { top: "32%", left: "44%", width: "38%", height: "52%" },
          "right": { top: "32%", left: "18%", width: "38%", height: "52%" },
          "packaging": { top: "25%", left: "25%", width: "50%", height: "50%" }
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
        name: "Padded Laptop Bag / Sleeve (15.6\\\")",
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
  }`;

// Replace the old customizer: { ... } in AppState
const stateRegex = /  customizer:\s*\{[\s\S]*?\n  \}\n\};/;
if (stateRegex.test(content)) {
  content = content.replace(stateRegex, `${newCustomizerState}\n};`);
  console.log("AppState.customizer successfully replaced!");
} else {
  console.error("Failed to find customizer in AppState!");
}

fs.writeFileSync(appJsPath, content, 'utf8');
console.log("Done updating AppState!");
