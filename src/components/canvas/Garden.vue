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
  Path: { type: String, default: '/models/pdft_cantarella_garden.glb' },
  position: { type: Array, default: () => [0, 0, 0] },
  rotation: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  draco: { type: Boolean, default: false }
})

const rootRef = ref(null)

/**
 * Hàm xử lý khi model GLB đã load xong
 * Ta duyệt qua từng đối tượng con trong scene (traverse)
 * Nếu đối tượng là mesh (có geometry + material) thì ta chỉnh các thông số vật liệu
 */
function onModelLoaded(gltf) {
  gltf.scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const mat = child.material

      // --- ✦ Màu cơ bản của vật liệu ---
      mat.color = new THREE.Color('#ffffff') // màu trắng tinh (white)

      // --- ✦ Độ kim loại (0 = phi kim, 1 = kim loại) ---
      // Mục tiêu: trắng sáng kiểu bóng kim loại nhẹ
      mat.metalness = 0.5

      // --- ✦ Độ nhám (0 = cực bóng, 1 = nhám mờ) ---
      // Mục tiêu: phản chiếu nhẹ, không quá gắt
      mat.roughness = 0.2

      // --- ✦ Độ trong suốt & độ mờ ---
      // Nếu bạn muốn hiệu ứng gương mờ hoặc kính trắng
      mat.transparent = true
      mat.opacity = 0.95 // vẫn nhìn rõ, nhưng sáng mịn hơn

      // --- ✦ Ánh sáng phản chiếu từ môi trường (nếu có HDRI/EnvMap) ---
      mat.envMapIntensity = 1.2 // tăng độ sáng trắng phản chiếu

      // --- ✦ Ánh sáng tự phát (emissive) ---
      // Dùng để model hơi phát sáng nhẹ như có ánh đèn hắt vào
      mat.emissive = new THREE.Color('#ffffff')
      mat.emissiveIntensity = 0.1

      // --- ✦ Kiểu vật liệu chuẩn vật lý ---
      // Nếu chưa là MeshPhysicalMaterial, bạn có thể chuyển qua loại này
      // để dùng thêm độ phản xạ, độ xuyên thấu, clear coat...
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
          reflectivity: 0.9,    // tăng độ phản chiếu
          clearcoat: 0.8,       // lớp bóng phủ ngoài
          clearcoatRoughness: 0.1
        })
        child.material = newMat
      }
    }
  })
}
</script>
