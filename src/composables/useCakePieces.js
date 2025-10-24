import { ref } from 'vue'
import { cakePieces as defaultPieces } from '@/data/cakePieces'

// Provides list of pieces and a click handler that can call API or emit events
export const useCakePieces = () => {
  const pieces = ref(defaultPieces)
  const selected = ref(null)

  const onPieceClick = async (piece) => {
    selected.value = piece
    // Send click to backend endpoint (functions/click)
    try {
      await fetch('/.netlify/functions/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pieceId: piece.id })
      })
    } catch (err) {
      // ignore errors in dev
      console.warn('Failed to record click', err)
    }
  }

  return { pieces, selected, onPieceClick }
}
