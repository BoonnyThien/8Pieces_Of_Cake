<script setup>
import { ref } from 'vue';
import CakeBase from './CakeBase.vue'; // Import cốt bánh

const props = defineProps({
  pieceName: { type: String, required: true }, // Tên định danh (ví dụ: 'piece-love')
  position: Array,
  rotation: Array,
  scale: Array,
});

// Expose group gốc để App.vue (GSAP) và Raycaster có thể truy cập
const rootRef = ref(null);
defineExpose({
  getObject3D: () => rootRef.value
});
</script>
<template>
  <TresGroup 
    ref="rootRef" 
    :position="position" 
    :rotation="rotation" 
    :scale="scale" 
    :name="pieceName"
  >
    <CakeBase :scale="[0.2, 0.2, 0.2]" /> 
  </TresGroup>
</template>