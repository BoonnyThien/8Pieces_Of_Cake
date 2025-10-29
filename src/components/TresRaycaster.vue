<template>
    <TresGroup ref="cubesGroup">
      <TresMesh
        v-for="(cube, index) in cubes"
        :key="index"
        :position="cube.position"
        :geometry="geometry"
        :material="cube.material"
        @click="handleCubeClick"
      />
    </TresGroup>

    <TresGridHelper :args="[10, 10]" />
    <TresAxesHelper :args="[5]" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTres, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'

const { raycaster, camera } = useTres()
const cubesGroup = ref()

// Geometry chung cho tất cả khối
const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)

// Mảng chứa 27 khối
const cubes = ref([])
const pointer = new THREE.Vector2()
let currentIntersect = null

// Khởi tạo các khối
const initializeCubes = () => {
  const cubeArray = []
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        cubeArray.push({
          position: [x - 1, y - 1, z - 1],
          material: new THREE.MeshStandardMaterial({ 
            color: 0x00ff00,
            transparent: true,
            opacity: 0.8
          })
        })
      }
    }
  }
  cubes.value = cubeArray
}

// Xử lý di chuyển chuột
const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
}

// Xử lý click chuột
const handleCubeClick = (event) => {
  console.log('Cube clicked:', event)
  // Đảo ngược màu sắc khi click
  if (event.object.material.color.getHex() === 0x00ff00) {
    event.object.material.color.set(0x0000ff) // Xanh dương khi click
  } else {
    event.object.material.color.set(0x00ff00) // Xanh lá khi click lại
  }
}

// Kiểm tra giao cắt cho hover
const checkIntersection = () => {
  // Sửa lỗi: truy cập đúng cách raycaster và camera
  if (!camera?.value || !raycaster?.value || !cubesGroup.value) return
  
  // Sửa lỗi: sử dụng raycaster.value thay vì raycaster
  raycaster.value.setFromCamera(pointer, camera.value)

  const cubeMeshes = cubesGroup.value.children.filter(child => child.isMesh)
  if (cubeMeshes.length === 0) return

  const intersects = raycaster.value.intersectObjects(cubeMeshes)

  // Reset màu khối cũ (chỉ cho hover, không ảnh hưởng click)
  if (currentIntersect && currentIntersect.object.material.color.getHex() === 0xff0000) {
    currentIntersect.object.material.color.set(0x00ff00)
  }

  // Đổi màu khối mới khi hover
  if (intersects.length > 0) {
    const hoveredObject = intersects[0].object
    // Chỉ đổi màu hover nếu khối chưa được click (vẫn màu xanh lá)
    if (hoveredObject.material.color.getHex() === 0x00ff00) {
      hoveredObject.material.color.set(0xff0000)
    }
    currentIntersect = intersects[0]
  } else {
    currentIntersect = null
  }
}

// Khởi tạo
onMounted(() => {
  initializeCubes()
  window.addEventListener('pointermove', onPointerMove)
})

// Animation loop
const { onLoop } = useRenderLoop()
onLoop(() => {
  checkIntersection()
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
})
</script>