// functions/click.js
export async function onRequestPost(context) {
  const { request, env } = context
  
  try {
    const { pieceId } = await request.json()
    
    if (!pieceId) {
      return new Response(
        JSON.stringify({ error: 'Missing pieceId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Lấy IP của user
    const clientIP = request.headers.get('CF-Connecting-IP') || 
                    request.headers.get('X-Forwarded-For') || 
                    'unknown';

    // Validate pieceId
    const validPieces = [
      'piece-love', 'piece-joy', 'piece-hope', 'piece-faith',
      'piece-luck', 'piece-passion', 'piece-courage', 'piece-peace'
    ]
    
    if (!validPieces.includes(pieceId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid pieceId' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Update click count và lưu IP trong D1
    const result = await env.DB.prepare(
      `INSERT INTO clicks (piece_id, click_count, user_ip, last_clicked) 
       VALUES (?, 1, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(piece_id) 
       DO UPDATE SET 
         click_count = click_count + 1,
         user_ip = ?,
         last_clicked = CURRENT_TIMESTAMP`
    ).bind(pieceId, clientIP, clientIP).run()

    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Click tracked successfully',
          pieceId,
          userIP: clientIP // Chỉ để debug, có thể bỏ trong production
        }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      )
    } else {
      throw new Error('Database operation failed')
    }
  } catch (error) {
    console.error('Error in click function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}