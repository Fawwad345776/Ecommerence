const fs = require('fs');
let admin = fs.readFileSync('admin.html', 'utf8');

admin = admin.replace(
  'Yahan se teeno payment plans ke profit rates update karein — Firebase aur storefront par foran sync honge.',
  'Update profit margins for all three payment tiers — syncs instantly with Firebase and the live storefront.'
);

admin = admin.replace(
  'ℹ️ <strong>Category-Wise Profit Margin Controller:</strong> Har product category par aap apna customized profit addition set kar sakte hain (<strong>100% Cash on Delivery</strong>, <strong>50% Advance Online + 50% Cash</strong>, aur <strong>100% Full Advance Online Payment</strong>). Save karne par yeh rates foran Firebase Realtime Database aur live storefront par update ho jayenge.',
  'ℹ️ <strong>Category-Wise Profit Margin Controller:</strong> Configure custom profit margins per product category (<strong>100% Cash on Delivery</strong>, <strong>50% Advance Online + 50% Cash</strong>, and <strong>100% Full Advance Online Payment</strong>). Saving updates rates instantly to Firebase Realtime Database and the live storefront.'
);

admin = admin.replace(
  'Storefront se test order place karein — wo foran yahan real-time live appear hoga!',
  'Place a test order from the storefront — it will appear here in real-time!'
);

admin = admin.replace(
  'Storefront Par Test Order Karein ↗',
  'Place Test Order on Storefront ↗'
);

admin = admin.replace(
  'Salam ${order.customer?.name}! MF Store se aapka order #${order.orderId} confirm karne ke liye message kar rahe hain.',
  'Hello ${order.customer?.name}! Contacting you from MF Store to confirm your order #${order.orderId}.'
);

fs.writeFileSync('admin.html', admin, 'utf8');
console.log('Successfully updated admin.html to English!');
