// src/application/use-cases/RecordPieceClick.js
export class RecordPieceClick {
  constructor(pieceRepository) {
    this.pieceRepository = pieceRepository
  }

  async execute(pieceId) {
    try {
      await this.pieceRepository.recordClick(pieceId)
      console.log(`✅ Click recorded for: ${pieceId}`)
      return { success: true, pieceId }
    } catch (error) {
      console.warn(`⚠️ Failed to record click: ${error.message}`)
      return { success: false, error: error.message }
    }
  }
}