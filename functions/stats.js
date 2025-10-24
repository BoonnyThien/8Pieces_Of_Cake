// Serverless function to return click statistics (counts per piece)

export default {
  async fetch(request, env) {
    try {
      // Example using D1 binding named DB
      if (!env.DB) {
        // Return dummy data in dev
        return new Response(JSON.stringify({ counts: {} }), { status: 200 })
      }

      const rows = await env.DB.prepare('SELECT piece_id, COUNT(*) as cnt FROM clicks GROUP BY piece_id').all()
      const counts = {}
      for (const r of rows.results) counts[r.piece_id] = r.cnt
      return new Response(JSON.stringify({ counts }), { status: 200 })
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
  }
}
