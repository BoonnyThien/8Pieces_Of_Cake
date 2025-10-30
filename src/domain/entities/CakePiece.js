// src/domain/entities/CakePiece.js
export class CakePiece {
  constructor(id, name, description, position, rotation) {
    this.id = id
    this.name = name
    this.description = description
    this.position = position
    this.rotation = rotation
    this.isActive = false
    this.isAnimating = false
  }

  activate() {
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  startAnimation() {
    this.isAnimating = true
  }

  stopAnimation() {
    this.isAnimating = false
  }
}