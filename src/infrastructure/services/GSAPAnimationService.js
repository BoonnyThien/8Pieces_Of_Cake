// src/infrastructure/services/GSAPAnimationService.js
import gsap from 'gsap'

export class GSAPAnimationService {
  /**
   * @param {Object} offset{ x: 0, y: 0.5, z: 0 }
   */
  animateToPosition(object, targetPosition, onComplete = () => {}, offset = { x: 0, y: 0, z: 0 }) {
    
    // Tính toán đích đến cuối cùng = Đích mong muốn + Độ lệch bạn tự căn
    const finalX = targetPosition.x + (offset.x || 0);
    const finalY = targetPosition.y + (offset.y || 0);
    const finalZ = targetPosition.z + (offset.z || 0);

    console.log(`🔧 Đang căn chỉnh thủ công: x+${offset.x}, y+${offset.y}, z+${offset.z}`);

    return new Promise((resolve) => {
      gsap.to(object.position, {
        x: finalX,
        y: finalY,
        z: finalZ,
        duration: 1.0,
        ease: 'elastic.out(1.2, 0.5)',
        overwrite: 'auto',
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