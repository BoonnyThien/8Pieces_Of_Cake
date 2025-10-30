// src/composables/usePieceManagement.js
import { ref, onMounted, onUnmounted } from 'vue'
import { useTres, useRenderLoop } from '@tresjs/core'
import { RaycastingService } from '@/infrastructure/services/RaycastingService'
import { GSAPAnimationService } from '@/infrastructure/services/GSAPAnimationService'
import { AnimatePiece } from '@/application/use-cases/AnimatePiece'

export function usePieceManagement() {
  const { raycaster: tresRaycaster, camera } = useTres()
  const { onLoop } = useRenderLoop()

  // Services
  const raycastingService = new RaycastingService()
  const animationService = new GSAPAnimationService()
  const animatePieceUseCase = new AnimatePiece(animationService)

  // State
  const pieceRefs = ref(new Map())
  const activePieceObject = ref(null)
  const isAnimating = ref(false)
  const originalPositions = ref({})
  const centerPosition = { x: 0, y: 1.0, z: 2.5 }

  // SỬA: Thêm event emitter internal
  const eventListeners = ref({
    pieceSelected: []
  })

  const on = (event, callback) => {
    if (eventListeners.value[event]) {
      eventListeners.value[event].push(callback)
    }
  }

  const emit = (event, data) => {
    if (eventListeners.value[event]) {
      eventListeners.value[event].forEach(callback => callback(data))
    }
  }

  // Piece Refs Management
  const setPieceRef = (el, pieceName) => {
    if (el && !pieceRefs.value.has(pieceName)) {
      pieceRefs.value.set(pieceName, el)
      console.log(`✅ Piece ref set for ${pieceName}`)
    }
  }

  // Object3D Management
  const getAllPieceObjects = () => {
    const objects = []
    
    pieceRefs.value.forEach((instance, pieceName) => {
      const obj = extractObject3D(instance)
      if (obj && obj.isObject3D) {
        objects.push(obj)
        setupObjectForRaycasting(obj, pieceName)
      }
    })
    
    return objects
  }

  const extractObject3D = (instance) => {
    const methods = [
      () => instance?.getObject3D?.(),
      () => instance?.$el?.isObject3D ? instance.$el : null,
      () => instance?.scene,
      () => instance?.model,
      () => instance?.value,
      () => instance?.mesh
    ]
    
    for (const method of methods) {
      const result = method()
      if (result && result.isObject3D) return result
    }
    
    return null
  }

  const setupObjectForRaycasting = (obj, pieceName) => {
    obj.traverse(child => {
      if (child.isMesh) {
        child.userData.isPiece = true
        child.userData.pieceName = pieceName
      }
    })
  }

  // SỬA: Lưu vị trí gốc
  const saveOriginalPositions = () => {
    const allPieceObjects = getAllPieceObjects()
    allPieceObjects.forEach(obj => {
      originalPositions.value[obj.name] = obj.position.clone()
    })
    console.log('💾 Original positions saved for', allPieceObjects.length, 'pieces')
  }

  // Event Handlers
  const onPointerClick = (event) => {
    if (isAnimating.value) {
      console.log('⏳ Animation in progress, ignoring click')
      return
    }
    
    if (!camera?.value || !tresRaycaster?.value) {
      console.log('❌ Camera or raycaster not ready')
      return
    }

    const pointer = raycastingService.updatePointerFromEvent(event)
    tresRaycaster.value.setFromCamera(pointer, camera.value)
    
    const allPieceObjects = getAllPieceObjects()
    const intersects = tresRaycaster.value.intersectObjects(allPieceObjects, true)

    if (intersects.length > 0) {
      handlePieceIntersection(intersects[0].object)
    } else {
      console.log('❌ No intersection with any piece objects')
    }
  }

  const handlePieceIntersection = (clickedObject) => {
    const pieceObject = raycastingService.findPieceRoot(clickedObject)
    if (!pieceObject) {
      console.log('❌ Could not find piece root object')
      return
    }

    const pieceId = pieceObject.name
    console.log('✅ Found valid piece:', pieceId)
    
    // SỬA: Emit event thay vì gọi trực tiếp
    emit('pieceSelected', { pieceId, pieceObject })
  }

  // Animation Management - SỬA: Public method
  const animatePieceToCenter = async (pieceObject, pieceId) => {
    if (isAnimating.value) {
      console.log('⏳ Already animating, skipping')
      return
    }

    isAnimating.value = true
    console.log('🎬 Starting animation for:', pieceId)

    try {
      // Reset previous active piece
      if (activePieceObject.value && activePieceObject.value.name !== pieceId) {
        const oldPos = originalPositions.value[activePieceObject.value.name]
        if (oldPos) {
          await animatePieceUseCase.reset(activePieceObject.value, oldPos)
          console.log('↩️ Reset previous active piece:', activePieceObject.value.name)
        }
      }

      activePieceObject.value = pieceObject
      
      // Animate to center
      await animatePieceUseCase.execute(
        pieceObject, 
        centerPosition,
        () => {
          console.log('✅ Animation completed for:', pieceId)
          isAnimating.value = false
        }
      )
    } catch (error) {
      console.error('❌ Animation error:', error)
      isAnimating.value = false
    }
  }

  // Hover Effect Management
  const applyHoverEffect = () => {
    if (!camera?.value || !tresRaycaster?.value) return

    const allPieceObjects = getAllPieceObjects()
    if (allPieceObjects.length === 0) return

    raycastingService.setFromCamera(raycastingService.pointer, camera.value)
    const intersects = raycastingService.intersectObjects(allPieceObjects, true)

    if (intersects.length > 0) {
      handleHoverEffect(intersects[0].object)
    } else {
      resetHoverEffects(allPieceObjects)
    }
  }

  const handleHoverEffect = (hoveredObject) => {
    const pieceRoot = raycastingService.findPieceRoot(hoveredObject)
    if (!pieceRoot) return

    if (!activePieceObject.value || activePieceObject.value.name !== pieceRoot.name) {
      animationService.animateScale(pieceRoot, { x: 1.05, y: 1.05, z: 1.05 })
    }
  }

  const resetHoverEffects = (allObjects) => {
    allObjects.forEach(obj => {
      if ((!activePieceObject.value || obj.name !== activePieceObject.value.name) && 
          obj.scale.x !== 1) {
        animationService.resetScale(obj)
      }
    })
  }

  // Rotation Management
  const updateActivePieceRotation = (delta) => {
    if (activePieceObject.value && !isAnimating.value) {
      activePieceObject.value.rotation.y += delta * 0.5
    }
  }

  // Lifecycle
  onMounted(() => {
    window.addEventListener('click', onPointerClick)
    
    // SỬA: Lưu vị trí sau khi mount
    setTimeout(() => {
      saveOriginalPositions()
    }, 1000)
  })

  onUnmounted(() => {
    window.removeEventListener('click', onPointerClick)
  })

  // Render Loop
  onLoop(({ delta }) => {
    applyHoverEffect()
    updateActivePieceRotation(delta)
  })

  // Public API
  return {
    setPieceRef,
    pieceRefs,
    activePieceObject,
    isAnimating,
    animatePieceToCenter,
    on, // SỬA: Expose event system
    resetCake: () => {
      console.log('🔄 resetCake called')
      if (activePieceObject.value) {
        const originalPos = originalPositions.value[activePieceObject.value.name]
        if (originalPos) {
          animatePieceUseCase.reset(activePieceObject.value, originalPos)
          animationService.resetScale(activePieceObject.value)
        }
        activePieceObject.value = null
      }
    }
  }
}