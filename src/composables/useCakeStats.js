// src/composables/useCakePieces.js
// (Thay thế cho cả useCakePieces.js và useCakeStats.js cũ)
import { ref } from 'vue'
import { cakePiecesData } from '@/data/cakePieces'

export function useCakePieces() {
  const pieces = ref(cakePiecesData)

  // Hàm này giờ CHỈ gọi API Log
  const recordClick = async (pieceId) => { 
    
    // 1. Tìm thông tin miếng bánh
    const pieceData = pieces.value.find(p => p.id === pieceId);
    const modelName = pieceData ? pieceData.name : pieceId; // Lấy Tên (Name) để log

    console.log(`📝 Logging click for: ${modelName}`);

    // 2. Gọi API Log (đúng đường dẫn)
    try {
      const response = await fetch('/api/log', { // <-- SỬA Ở ĐÂY
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelName }) // Gửi Tên
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Log success:', result);
      return pieceData; // Trả về data

    } catch (err) {
      console.warn("❌ Log error:", err.message);
      // Vẫn trả về data để UI không bị gián đoạn
      return pieceData;
    }
  }
  
  return {
    pieces, 
    recordClick 
  }
}