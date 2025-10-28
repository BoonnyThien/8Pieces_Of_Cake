import { ref } from 'vue'
import { cakePiecesData } from '@/data/cakePieces' // Import data bánh của bạn

export function useCakePieces() {
  const pieces = ref(cakePiecesData) // Giữ danh sách data
  const selected = ref(null)

  // Hàm này giờ nhận tên (string) của miếng bánh
  const onPieceClick = async (pieceName) => { 
    
    // Tìm data của miếng bánh dựa trên tên
    const pieceData = pieces.value.find(p => p.name === pieceName);
    if (!pieceData) return;

    selected.value = pieceData;
    
    // GỌI ENDPOINT CỦA CLOUDFLARE WORKER
    try {
      // Lưu ý: '/api/click' là đường dẫn mặc định, 
      // bạn có thể cần chỉnh lại theo file wrangler.toml
      await fetch('/api/click', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pieceId: pieceName }) // Gửi 'piece-love', 'piece-joy', v.v.
      })
    } catch (err) {
      // Bỏ qua lỗi khi ở local dev (nếu worker chưa chạy)
      console.warn('Failed to record click to Cloudflare Worker:', err)
    }
  }
  
  return { pieces, selected, onPieceClick }
}