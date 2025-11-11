// Serverless function to record a click into D1 (Cloudflare Workers style)
// Replace D1 usage with your platform specifics; this is a placeholder.

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url)
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
      }

      const body = await request.json()
      const pieceId = body.pieceId || body.id
      if (!pieceId) return new Response('Missing pieceId', { status: 400 })

      // Example using D1 binding named DB
      if (!env.DB) {
        // In dev, just log
        console.log('Recorded click:', pieceId)
        return new Response(JSON.stringify({ ok: true }), { status: 200 })
      }

      const res = await env.DB.prepare('INSERT INTO clicks (piece_id) VALUES (?)').bind(pieceId).run()
      return new Response(JSON.stringify({ ok: true, result: res }), { status: 200 })
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
  }
}
