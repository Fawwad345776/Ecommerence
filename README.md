# 🛍️ MF STORE — Luxury Custom Apparel & Merchandise E-Commerce Platform

A production-ready e-commerce platform and on-demand merchandise customizer store built with modern web standards, featuring real-time interactive 3D/angle apparel visualization, Firebase Realtime Database integration, direct **Meezan Bank Ltd.** card payment gateway settlement, and an automated **Merchant Operations Dashboard**.

---

## ✨ Key Features

### 🛒 1. Customer Storefront (`index.html` & `app.js`)
- **Extensive Catalog**: 57+ premium apparel & merchandise items across 6 core categories:
  - 👕 **T-Shirts**: 100% Combed Cotton, Graphic Prints & Official Cricket Fan Jerseys
  - 👕 **Full Sleeve T-Shirts**: Heavyweight Autumn/Winter Streetwear & Typography Edition
  - 🧥 **Heavyweight Fleece Hoodies**: 320 GSM Winter Hoodies & Couple Sets
  - ☕ **Ceramic Cups & Mugs**: Microwave Safe 11oz Drinkware & Gold-Lustre Collections
  - 💼 **Executive Laptop Bags & Sleeves**: Shockproof Neoprene & YKK Zippers (15.6")
  - 🧢 **Structured Baseball Caps**: 3D Embroidered Badges & Breathable Cotton Twill
- **Interactive Customizer Studio**: Live front & back custom text/artwork customization with name and jersey number personalization.
- **Dual Size Selection for Couples**: Separate Men (S/M/L/XL) and Women (S/M/L/XL) size selection on matching couple apparel.
- **Multi-Color Variant Switching**: Instant preview of fabric swatches and dynamic photography changes.

### 💳 2. Direct Meezan Bank Online Card Gateway
- **Zero Cash on Delivery (100% Prepaid)**: Direct settlement to Meezan Bank Ltd. Account `#02010108920192` (Account Title: `MF Store`).
- **Secure Card Entry**: Debit / Credit card input (Card Number, Expiry, CVV) with automated authorization code generation (`MBL-AUTH-XXXXXX`).
- **Checkout Guard**: The order completion button remains securely locked until card payment details are verified.
- **Order Tracking**: Instant order lookup by Order ID or customer phone number.

### 📊 3. Merchant Operations Dashboard (`admin.html`)
- **Real-Time Financial Metrics**:
  - Total Orders Count
  - Gross Revenue (PKR)
  - Advance Collected
  - Meezan Bank Verified Revenue
- **Firebase Realtime Database Controller**:
  - Live margin pricing editor for all 6 product categories.
  - Changes sync instantly to Firebase Realtime Database and the live customer storefront without restarting the server.
- **Live Orders Stream**:
  - Full customer profiles, delivery addresses, and WhatsApp direct messaging shortcut.
  - Real-time order status management (`In Production`, `Dispatched`, `Delivered`, `Cancelled`).
  - Printable Airway / Logistics packing slips with barcode headers.
  - One-click CSV order data export.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Fawwad345776/Ecommerence.git
   cd Ecommerence
   ```

2. Start the local server:
   ```bash
   npm start
   ```

3. Open your browser:
   - **Storefront**: [http://localhost:3030/index.html](http://localhost:3030/index.html)
   - **Merchant Dashboard**: [http://localhost:3030/admin.html](http://localhost:3030/admin.html)

---

## 📁 Project Structure

```text
├── index.html            # Customer storefront & checkout experience
├── admin.html            # Merchant operations & Firebase profit controller
├── app.js                # Core storefront logic, state engine & catalog data
├── server.js             # Node.js backend bridge & Firebase/CeePrinto proxy
├── style.css             # Design tokens, typography & responsive layouts
├── package.json          # Project configuration & npm scripts
├── assets/               # Product photography, logo & mockup textures
├── pricing_rules.json    # Local fallback pricing margins
├── orders.json           # Local storage fallback for customer orders
└── README.md             # Project documentation
```

---

## 🔒 Payment & Banking Configuration
- **Bank**: Meezan Bank Ltd. (Islamic Banking)
- **Account Title**: MF Store
- **Account Number**: `02010108920192`
- **Supported Channels**: Visa, MasterCard, UnionPay, Meezan Debit/Credit Cards

---

## 📄 License
ISC © 2026 Fawwad Shamim (MF Store PK)
