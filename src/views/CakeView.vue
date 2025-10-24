<script setup>
import { ref } from 'vue';
import CakeBase from '../components/canvas/CakeBase.vue';
import CakePiece from '../components/canvas/CakePiece.vue';

// Định nghĩa vị trí cho 8 miếng bánh trên tầng 2 (bán kính ~1.8, chiều cao ~0.75)
const radius = 1.8;
const height = 0.85; // Nhô lên một chút so với tầng 2
const cakePieces = ref([
  // Tính toán vị trí 8 miếng bằng vòng lặp
  ...Array(8).fill(0).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2; // Góc (radian)
    return {
      name: `piece-${i}`, // Tên định danh
      position: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
      rotation: [0, -angle, 0], // Xoay miếng bánh hướng ra ngoài
    };
  })
]);
</script>
<template>
  <TresGroup>
    <CakeBase />

    <Suspense>
      <CakePiece
        v-for="(piece, index) in cakePieces"
        :key="piece.name"
        :pieceName="piece.name"
        :position="piece.position"
        :rotation="piece.rotation"
        :scale="[0.5, 0.5, 0.5]" 
      />
    </Suspense>
    
  </TresGroup>
</template>