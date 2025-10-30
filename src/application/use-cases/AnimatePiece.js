// src/application/use-cases/AnimatePiece.js
export class AnimatePiece {
  constructor(animationService) {
    this.animationService = animationService
  }

  execute(pieceObject, targetPosition, onComplete = () => {}) {
    return this.animationService.animateToPosition(
      pieceObject,
      targetPosition,
      onComplete
    )
  }

  reset(pieceObject, originalPosition) {
    return this.animationService.animateToPosition(
      pieceObject,
      originalPosition
    )
  }
}