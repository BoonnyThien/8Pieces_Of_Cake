// src/infrastructure/services/GSAPAnimationService.js
import gsap from 'gsap'

export class GSAPAnimationService {
  animateToPosition(object, targetPosition, onComplete = () => {}) {
    return new Promise((resolve) => {
      gsap.to(object.position, {
        ...targetPosition,
        duration: 1.0,
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => {
          onComplete()
          resolve()
        }
      })
    })
  }

  animateScale(object, targetScale, duration = 0.2) {
    return gsap.to(object.scale, {
      ...targetScale,
      duration,
      overwrite: true
    })
  }

  resetScale(object) {
    return this.animateScale(object, { x: 1, y: 1, z: 1 })
  }
}