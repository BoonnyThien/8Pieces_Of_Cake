// src/composables/useCakePieces.js
import { ref } from 'vue'
import { cakePiecesData } from '@/data/cakePieces' 

export function useCakePieces() {
  const pieces = ref(cakePiecesData) 
  const selectedPieceData = ref(null) 

  const recordClick = async (pieceId) => { 
    const pieceData = pieces.value.find(p => p.id === pieceId);
    if (!pieceData) return;

    selectedPieceData.value = pieceData;
    
    // GỌI ENDPOINT CỦA CLOUDFLARE WORKER
    try {
      await fetch('/api/click', { // Đường dẫn phải khớp wrangler.toml
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pieceId: pieceId }) 
      });
      console.log(`Đã ghi nhận click (Cloudflare) cho: ${pieceId}`);
    } catch (err) {
      console.warn('Không thể ghi nhận click (bỏ qua trong dev):', err)
    }
  }
  
  return {
    pieces, 
    selectedPieceData,
    recordClick 
  }
}