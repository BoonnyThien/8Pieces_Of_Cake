<template>
  <TresGroup ref="rootRef" :position="position" :rotation="rotation" :scale="scale">
    <Suspense>
      <GLTFModel 
        :path="Path"
        :draco="draco"
        @load="onModelLoaded"  
      />
    </Suspense>
  </TresGroup>
</template>

<script setup>
import { ref } from 'vue'
import { GLTFModel } from '@tresjs/cientos'
import * as THREE from 'three'

// --- Props cơ bản ---
const props = defineProps({
  Path: { type: String, default: '/models/pawtisserie.glb' },
  position: { type: Array, default: () => [0, 0, 0] },
  rotation: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  draco: { type: Boolean, default: false }
})

const rootRef = ref(null)

/**
 * Hàm xử lý khi model GLB đã load xong
 */
function onModelLoaded(gltf) {
  gltf.scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mat = child.material

      mat.color = new THREE.Color('#f08080') // hồng nhạt nhẹ
      mat.metalness = 0.25
      mat.roughness = 0.45
      mat.transparent = true
      mat.opacity = 1.0
      mat.envMapIntensity = 1.1

      mat.emissive = new THREE.Color('#ff6b6b')
      mat.emissiveIntensity = 0.06

      if (!(mat instanceof THREE.MeshPhysicalMaterial)) {
        const newMat = new THREE.MeshPhysicalMaterial({
          color: mat.color,
          metalness: mat.metalness,
          roughness: mat.roughness,
          transparent: mat.transparent,
          opacity: mat.opacity,
          emissive: mat.emissive,
          emissiveIntensity: mat.emissiveIntensity,
          envMapIntensity: mat.envMapIntensity,
          reflectivity: 0.75,
          clearcoat: 0.55,
          clearcoatRoughness: 0.25
        })
        child.material = newMat
      }
    }
  })
}
</script>
