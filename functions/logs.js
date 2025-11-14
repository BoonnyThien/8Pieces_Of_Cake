// functions/api/log.js
export async function onRequestPost(context) {
  try {
    // 1. Lấy thông tin từ Request
    const { request, env } = context; // Quan trọng: Lấy env từ context
    const body = await request.json();
    const { model } = body || {};

    // 2. Lấy thông tin người dùng (Cloudflare headers)
    const ip = request.headers.get("cf-connecting-ip") || "127.0.0.1"; // Mặc định local
    const ua = request.headers.get("user-agent") || "unknown";
    const cf = request.cf || {}; // Thông tin địa lý

    // 3. Ghi vào Database D1
    // Lưu ý: env.DB phải khớp với tên binding trong wrangler.toml
    if (!env.DB) {
      throw new Error("Database binding 'DB' not found");
    }

    await env.DB.prepare(
      "INSERT INTO access_logs (ip, model, ua, country, city, time) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(
      ip,
      model || "unknown",
      ua,
      cf.country || "Local",
      cf.city || "Local",
      new Date().toISOString()
    )
    .run();

    // 4. Trả về thành công
    return new Response(JSON.stringify({ status: "logged", model }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
    });

  } catch (e) {
    console.error("Log Error:", e.message);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// Xử lý CORS (để test từ localhost khác port)
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}