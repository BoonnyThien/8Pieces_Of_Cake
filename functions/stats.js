// functions/stats.js
export async function onRequestGet(context) {
  const { env } = context
  
  try {
    const { results } = await env.DB.prepare(
      'SELECT piece_id, click_count FROM clicks'
    ).all()

    return new Response(
      JSON.stringify(results || []),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )
  } catch (error) {
    console.error('Error in stats function:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}