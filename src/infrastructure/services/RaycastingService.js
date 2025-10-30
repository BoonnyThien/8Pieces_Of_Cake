// src/infrastructure/services/RaycastingService.js
import * as THREE from 'three'

export class RaycastingService {
  constructor() {
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()
  }

  setFromCamera(pointer, camera) {
    this.raycaster.setFromCamera(pointer, camera)
  }

  intersectObjects(objects, recursive = true) {
    return this.raycaster.intersectObjects(objects, recursive)
  }

  updatePointerFromEvent(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
    return this.pointer
  }

  findPieceRoot(intersectedObject) {
    let pieceObject = intersectedObject
    let safetyCounter = 0
    
    while (pieceObject.parent && !pieceObject.name.startsWith('piece-') && safetyCounter < 10) {
      pieceObject = pieceObject.parent
      safetyCounter++
    }
    
    return pieceObject.name.startsWith('piece-') ? pieceObject : null
  }
}