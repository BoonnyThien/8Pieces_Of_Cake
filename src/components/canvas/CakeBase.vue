<template>
  <TresGroup :position="position" :scale="scale" :rotation="rotation">
    
    <TresGroup > 
      
      <TresMesh :position-y="0" :rotation-x="Math.PI/2">
        <TresExtrudeGeometry :args="[shape, extrudeSettings1]" />
        <TresMeshStandardMaterial v-if="isTexture(color1)" :map="color1" :roughness="0.9" />
        <TresMeshStandardMaterial v-else :color="color1" :roughness="0.9" />
      </TresMesh>
      
      <TresMesh :position-y="heightLayer1+ heightLayer2" :rotation-x="Math.PI/2" >
        <TresExtrudeGeometry :args="[shape, extrudeSettings2]" />
       <TresMeshStandardMaterial v-if="isTexture(color2)" :map="color2" :roughness="0.7" />
        <TresMeshStandardMaterial v-else :color="color2" :roughness="0.7" />
      </TresMesh>

      <TresMesh :position-y="heightLayer1" :rotation-x="Math.PI/2" >
        <TresExtrudeGeometry :args="[shape, extrudeSettings3]" />
       <TresMeshStandardMaterial v-if="isTexture(color3)" :map="color3" :roughness="0.7" />
        <TresMeshStandardMaterial v-else :color="color3" :roughness="0.7" />
      </TresMesh>
    </TresGroup>
  </TresGroup>
</template>

<script setup>
import * as THREE from 'three';
import { computed } from 'vue';

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  rotation: { type: Array, default: () => [0, 0, 0] },
  
  // Props để nhận màu sắc hoặc textures (sẽ được CakePiece truyền xuống)
  color1: { type: [String, Object], default: '#A0522D' }, // Vỏ bánh
  color2: { type: [String, Object], default: '#FFEFD5' }, // Lớp 1
  color3: { type: [String, Object], default: '#FFFACD' }, // Lớp 2
});

// Định nghĩa kích thước
const radius = 2.0; // Bán kính của cả cái bánh
const heightLayer1 = 0.2  ;
const heightLayer2 = 0.3;
const heightLayer3 = 0.2;

// 1. Định nghĩa Shape (hình nêm 2D)
const shape = computed(() => {
  const s = new THREE.Shape();
  s.moveTo(0, 0); // Bắt đầu ở tâm
  s.arc(0, 0, radius, 0, Math.PI / 4, false); 
  s.lineTo(0, 0); // Quay về tâm
  return s;
});
// Đây là cách chúng ta tạo "tấm ngáng" - khối sẽ đặc
const extrudeSettings1 = { depth: heightLayer1, bevelEnabled: false };
const extrudeSettings2 = { depth: heightLayer2, bevelEnabled: false };
const extrudeSettings3 = { depth: heightLayer3, bevelEnabled: false };

const isTexture = (prop) => prop && typeof prop === 'object' && prop.isTexture;
</script>