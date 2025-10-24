<template>
  <primitive 
    v-if="model"
    ref="rootRef"
    :object="model"
    :position="position"
    :scale="scale"
    :rotation="rotation"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useGLTF } from '@tresjs/cientos';

const props = defineProps({
  position: Array,
  scale: Array,
  rotation: Array,
  draco: { type: Boolean, default: false }
});

// Tải model GLB cho miếng bánh "Love"
// const { scene: model } = await useGLTF(
//   '/models/Piece_Love.glb', 
//   { draco: props.draco }
// );


// if (model) {
//   model.name = 'piece-love'; 
//   model.traverse((child) => {
//     if (child.isMesh) {
//       child.name = 'piece-love'; 
//     }
//   });
// }

// Expose Object3D
const rootRef = ref(null); // Ref này sẽ trỏ vào <primitive>
defineExpose({
  getObject3D: () => rootRef.value // <primitive> chính là Object3D
});
</script>