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
  Path: { type: String, default: '/models/cake_v22.glb' },
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

      mat.color = new THREE.Color('#d4a574') // màu vàng nâu bánh
      mat.metalness = 0.2
      mat.roughness = 0.5
      mat.transparent = true
      mat.opacity = 1.0
      mat.envMapIntensity = 0.9

      mat.emissive = new THREE.Color('#8b6914')
      mat.emissiveIntensity = 0.08

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
          reflectivity: 0.7,
          clearcoat: 0.5,
          clearcoatRoughness: 0.3
        })
        child.material = newMat
      }
    }
  })
}
</script>
