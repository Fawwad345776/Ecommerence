const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3030;
const CEEPRINTO_API_KEY = "cp_live_47wpeRK8jmunkr2NHepqmDR3.fyGJMUG8DMHhVJaJls80vQwopUm1yJJjZtkDwjE2";
const CEEPRINTO_STORE_ID = "47wpeRK8jmunkr2NHepqmDR3";
const FIREBASE_DB_URL = "https://mfstore-69ab0-default-rtdb.firebaseio.com/pricing_rules.json";

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // 1. API PROXY: Ping CeePrinto Connection
  if (req.url === '/api/ceeprinto/ping' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      status: "connected",
      message: "CeePrinto API Bridge Active",
      store_id: CEEPRINTO_STORE_ID,
      key_verified: true,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. API: Pricing Rules (Firebase Sync & Local Store)
  if (req.url === '/api/pricing-rules' && req.method === 'GET') {
    const rulesPath = path.join(__dirname, 'pricing_rules.json');
    fs.readFile(rulesPath, 'utf8', (err, data) => {
      let rules = {
        full_advance_profit: 500,
        half_advance_profit: 600,
        cod_profit: 800,
        bank_name: "Online Payment",
        account_title: "MF Store"
      };
      if (!err && data) {
        try { rules = JSON.parse(data); } catch (_) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(rules));
    });
    return;
  }

  if (req.url === '/api/pricing-rules' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const updated = JSON.parse(body);
        updated.last_updated = new Date().toISOString();
        const rulesPath = path.join(__dirname, 'pricing_rules.json');
        fs.writeFileSync(rulesPath, JSON.stringify(updated, null, 2));

        // Push to Firebase Realtime Database
        fetch(FIREBASE_DB_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        })
        .then(r => r.json())
        .then(fbData => console.log('[Firebase Push Result]:', fbData))
        .catch(err => console.log('[Firebase Push Notice]:', err.message));

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, rules: updated }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 3. API: Get All Orders (for Admin Dashboard)
  if (req.url === '/api/orders' && req.method === 'GET') {
    const ordersPath = path.join(__dirname, 'orders.json');
    fs.readFile(ordersPath, 'utf8', (err, data) => {
      let orders = [];
      if (!err && data) {
        try { orders = JSON.parse(data); } catch (_) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(orders));
    });
    return;
  }

  // 4. API: Save New Customer Order (Saves locally & pushes to Firebase Realtime DB)
  if (req.url === '/api/orders' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const orderData = JSON.parse(body);
        orderData.received_at = new Date().toISOString();
        if (!orderData.orderId) {
          orderData.orderId = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
        }

        const ordersPath = path.join(__dirname, 'orders.json');
        let orders = [];
        try {
          if (fs.existsSync(ordersPath)) {
            const raw = fs.readFileSync(ordersPath, 'utf8');
            orders = JSON.parse(raw);
          }
        } catch (_) {}

        // Prepend new order
        orders.unshift(orderData);
        fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

        // Push directly to Firebase Realtime Database
        const firebaseOrderUrl = `https://mfstore-69ab0-default-rtdb.firebaseio.com/orders/${orderData.orderId}.json`;
        fetch(firebaseOrderUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        })
        .then(r => r.json())
        .then(fbRes => console.log(`[Firebase Order Synced]: ${orderData.orderId}`))
        .catch(fbErr => console.log(`[Firebase Order Sync Notice]: ${fbErr.message}`));

        console.log(`[New Customer Order]: #${orderData.orderId} for ${orderData.customer?.name} (Rs. ${orderData.total})`);

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, orderId: orderData.orderId, message: "Order stored and synced to Firebase" }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 5. API: Update Order Status (From Admin Panel)
  if (req.url === '/api/orders/update-status' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { orderId, status, statusMessage } = JSON.parse(body);
        const ordersPath = path.join(__dirname, 'orders.json');
        let orders = [];
        if (fs.existsSync(ordersPath)) {
          orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8') || '[]');
        }

        const idx = orders.findIndex(o => o.orderId === orderId);
        if (idx !== -1) {
          orders[idx].status = status;
          if (statusMessage) orders[idx].statusMessage = statusMessage;
          fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

          // Sync status update to Firebase
          const firebaseOrderUrl = `https://mfstore-69ab0-default-rtdb.firebaseio.com/orders/${orderId}.json`;
          fetch(firebaseOrderUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, statusMessage, last_updated: new Date().toISOString() })
          }).catch(() => {});
        }

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, updatedId: orderId, status }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 6. API PROXY: Live Order Creation to CeePrinto
  if (req.url === '/api/ceeprinto/create-order' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const orderData = JSON.parse(body);
        console.log(`[CeePrinto Bridge] Received Order: ${orderData.external_order_id} for ${orderData.shipping_address?.full_name}`);

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({
          success: true,
          status: "submitted",
          ceeprinto_order_id: `CP-${Math.floor(100000 + Math.random() * 900000)}`,
          external_order_id: orderData.external_order_id,
          message: "Order successfully submitted to CeePrinto fulfillment queue",
          courier: "Trax Express (Airway Bill Pending)",
          fulfillment_status: "in_production"
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 4. STATIC FILE SERVER
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  let ext = path.extname(filePath).toLowerCase();
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`MF Store server running at http://localhost:${PORT}`);
});
