import { useThree } from '@tresjs/core'

export const useCameraFocus = () => {
  const { camera } = useThree()

  const focusOnPiece = (piece) => {
    const targetPosition = [...piece.position]
    targetPosition[2] += 2 // Move camera back slightly
    
    // Animate camera position
    gsap.to(camera.position, {
      duration: 1,
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      ease: 'power2.inOut'
    })
  }

  return {
    focusOnPiece
  }
}