export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // ===============================
    // 1. CHECKOUT ENGINE
    // ===============================
    if (url.pathname === "/api/checkout" && request.method === "POST") {

      const data = await request.json();
      const orderId = crypto.randomUUID();

      await env.ORDERS.put(orderId, JSON.stringify({
        id: orderId,
        name: data.name,
        email: data.email,
        product: data.product,
        status: "pending",
        created: Date.now()
      }));

      return new Response(JSON.stringify({
        success: true,
        orderId: orderId
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // ===============================
    // 2. PROTECTED VIEWER
    // ===============================
    if (url.pathname === "/pages/store/viewer.html") {

      const orderId = url.searchParams.get("order");

      if (!orderId) {
        return new Response("Akses ditolak", { status: 403 });
      }

      const order = await env.ORDERS.get(orderId);
      if (!order) {
        return new Response("Order tidak ditemukan", { status: 404 });
      }

      const parsed = JSON.parse(order);

      if (parsed.status !== "paid") {
        return new Response("Pembayaran belum diverifikasi", { status: 403 });
      }

      return fetch(request);
    }

    // ===============================
    // 3. LIST ORDERS (ADMIN)
    // ===============================
    if (url.pathname === "/api/orders") {
      const list = await env.ORDERS.list();
      return new Response(JSON.stringify(list), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return fetch(request);
  }
}
