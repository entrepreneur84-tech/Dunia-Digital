export async function onRequestPost({ request }) {
  const data = await request.json();
  const invoice = "INV-" + Date.now();

  const message =
    "ORDER BARU%0A" +
    "Invoice: " + invoice + "%0A" +
    "Produk: " + data.product + "%0A" +
    "Harga: Rp" + data.price + "%0A%0A" +
    "Transfer:%0A" +
    "Bank Jago 109896731184%0A" +
    "SeaBank AHMAD BARIZI 901981495649%0A%0A" +
    "Crypto: BTC / ETH";

  const redirect = "https://wa.me/6285175313909?text=" + message;

  return new Response(JSON.stringify({
    success: true,
    invoice,
    redirect
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
