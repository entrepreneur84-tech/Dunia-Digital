import { CONFIG } from "./config.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API ORDER
    if (url.pathname === "/api/order" && request.method === "POST") {
      return createOrder(request, env);
    }

    // API VALIDASI LICENSE
    if (url.pathname === "/api/license" && request.method === "POST") {
      return verifyLicense(request, env);
    }

    return new Response("Dunia Digital Worker Active", { status: 200 });
  }
};

// ===============================
// CREATE ORDER + GENERATE WA LINK
// ===============================
async function createOrder(req, env) {
  const data = await req.json();
  const id = crypto.randomUUID();

  const order = {
    id,
    name: data.name || "-",
    email: data.email || "-",
    product: data.product || "-",
    method: data.method || "-",
    status: "PENDING_PAYMENT",
    created: Date.now()
  };

  // Simpan order ke KV
  await env.orders.put(id, JSON.stringify(order));

  // Pesan WhatsApp otomatis
  const message = `
Assalamu’alaikum Admin Dunia Digital

Saya sudah melakukan order:

Nama: ${order.name}
Email: ${order.email}
Produk: ${order.product}
Metode: ${order.method}

Detail Pembayaran:
SeaBank a.n AHMAD BARIZI
901981495649
Bank Jago a.n AHMAD BARIZI
109896731184

Mohon verifikasi pembayaran 🙏
Order ID: ${order.id}
  `.trim();

  const waLink =
    `https://wa.me/${CONFIG.WHATSAPP.ADMIN_NUMBER}?text=` +
    encodeURIComponent(message);

  return Response.json({
    success: true,
    order_id: id,
    whatsapp_link: waLink,
    payment: CONFIG.PAYMENT
  });
}

// ===============================
// VALIDASI LICENSE (UNTUK VIEWER)
// ===============================
async function verifyLicense(req, env) {
  const { license } = await req.json();

  if (!license) {
    return Response.json({ valid: false });
  }

  const data = await env.licenses.get(license);

  if (!data) {
    return Response.json({ valid: false });
  }

  return Response.json({ valid: true });
}
