export async function onRequestPost(context) {
  const { request, env } = context
  
  try {
    // Parse JSON đơn giản
    const { pieceId } = await request.json()
    
    console.log('📝 Received click for:', pieceId)
    
    if (!pieceId) {
      return new Response(
        JSON.stringify({ error: 'Missing pieceId' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      )
    }

    // Validate pieceId
    const validPieces = [
      'piece-love', 'piece-joy', 'piece-hope', 'piece-faith',
      'piece-luck', 'piece-passion', 'piece-courage', 'piece-peace'
    ]
    
    if (!validPieces.includes(pieceId)) {
      return new Response(
        JSON.stringify({ error: 'Invalid pieceId' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      )
    }

    // ĐƠN GIẢN: Chỉ update click count, không log phức tạp
    const db = env.DB
    const result = await db.prepare(
      `INSERT INTO clicks (piece_id, click_count) 
       VALUES (?, 1)
       ON CONFLICT(piece_id) 
       DO UPDATE SET click_count = click_count + 1`
    ).bind(pieceId).run()

    console.log('💾 Database updated for:', pieceId)

    return new Response(
      JSON.stringify({ 
        success: true, 
        pieceId,
        message: 'Click recorded successfully'
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )
    
  } catch (error) {
    console.error('❌ Error in click function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}