// src/composables/useCakePieces.js
import { ref } from 'vue'
import { CloudflarePieceRepository } from '@/infrastructure/repositories/CloudflarePieceRepository'
import { RecordPieceClick } from '@/application/use-cases/RecordPieceClick'
import { cakePiecesData } from '@/data/cakePieces'

export function useCakePieces() {
  const pieces = ref(cakePiecesData)
  const selectedPieceData = ref(null)
  
  // Dependency Injection
  const pieceRepository = new CloudflarePieceRepository()
  const recordClickUseCase = new RecordPieceClick(pieceRepository)

  const recordClick = async (pieceId) => {
    const pieceData = pieces.value.find(p => p.id === pieceId)
    if (!pieceData) {
      console.warn('❌ Piece data not found for:', pieceId)
      return null
    }

    selectedPieceData.value = pieceData
    
    // Use the use case instead of direct implementation
    await recordClickUseCase.execute(pieceId)
    
    // SỬA: Trả về pieceData để sử dụng trong CakeView
    return pieceData
  }
  
  return {
    pieces,
    selectedPieceData,
    recordClick
  }
}