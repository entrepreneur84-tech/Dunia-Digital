export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ROUTER API
    if (url.pathname === "/api/validate") {
      return handleValidate(url, env);
    }

    return new Response("API Dunia Digital Aktif 🚀", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
};

// =============================
// VALIDATE LICENSE
// =============================
async function handleValidate(url, env) {
  const key = url.searchParams.get("key");

  if (!key) {
    return json({
      valid: false,
      message: "License key kosong"
    });
  }

  // MODE DEMO (sementara sebelum pakai KV)
  const VALID_KEY = "DD-ACCESS-2026";

  if (key === VALID_KEY) {
    return json({
      valid: true,
      pdfUrl: "/protected/ebook.pdf" // nanti diganti R2
    });
  }

  return json({
    valid: false,
    message: "License tidak valid"
  });
}

// =============================
// HELPER JSON RESPONSE
// =============================
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
