<template>
  <TresGroup 
    ref="rootRef" 
    :position="position" 
    :rotation="rotation" 
    :scale="scale" 
    :name="pieceName"
  >
    <TresGroup > 
      
      <TresMesh :position-y="0" :rotation-x="Math.PI/2" >
        <TresExtrudeGeometry :args="[shape, extrudeSettings1]" />
        <TresMeshStandardMaterial :color="color1" :roughness="0.9" />
      </TresMesh>
      
      <!-- <TresMesh :position-y="heightLayer1+0.1" :rotation-x="Math.PI/2" >
        <TresExtrudeGeometry :args="[shape, extrudeSettings2]" />
        <TresMeshStandardMaterial :color="color2" :roughness="0.7" />
      </TresMesh>

      <TresMesh :position-y="heightLayer1 + heightLayer2" :rotation-x="Math.PI/2">
        <TresExtrudeGeometry :args="[shape, extrudeSettings3]" />
        <TresMeshStandardMaterial :map="strawberryTexture" :roughness="0.7" />
      </TresMesh> -->
    </TresGroup>

    <Suspense v-if="loveDecorPath">
      <GLTFModel 
        :path="loveDecorPath" 
        :position="[0.8, 0, 0.3]" 
        :scale="[0.8, 0.6, 1.1]"
        :rotation-y="Math.PI/1.16"
        :draco="draco"  
      />
    </Suspense>
  
  </TresGroup>
</template>

<script setup>
import { ref, computed } from 'vue';
import { GLTFModel } from '@tresjs/cientos';
import { useTexture } from '@tresjs/core';
import * as THREE from 'three';

const props = defineProps({
  pieceName: { type: String, default: 'piece-love' }, 
  position: {type : Array , default: ()=>[0,0,0]},
  scale: {type : Array, default : ()=>[1,1,1]},
  rotation: {type : Array, default : ()=>[0,0,0]},
  draco: { type: Boolean, default: false },
  texturePath: { type: String, default: './textures/pink_glaze.jpg' }
});

// --- Tùy chỉnh cho miếng "Love" (Gộp logic vào đây) ---
const color1 = '#A0522D';
const color2 = '#FADADD';
const loveDecorPath = '/models/koi_fish_cake.glb'; 

// Tải texture TRỰC TIẾP bên trong component này
const { map: strawberryTexture } = await useTexture({map : props.texturePath });

// --- Logic Hình dạng (Lấy từ CakeBase.vue) ---
const radius = 2.0; 
const heightLayer1 = 0.2;
const heightLayer2 = 0.3;
const heightLayer3 = 0.2;

const shape = computed(() => {
  const s = new THREE.Shape();
  s.moveTo(0, 0); 
  s.arc(0, 0, radius, 0, Math.PI / 4, false); 
  s.lineTo(0, 0); 
  return s;
});

const extrudeSettings1 = { depth: heightLayer1, bevelEnabled: false };
const extrudeSettings2 = { depth: heightLayer2, bevelEnabled: false };
const extrudeSettings3 = { depth: heightLayer3, bevelEnabled: false };
// --- Hết Logic Hình dạng ---

// Expose group gốc
const rootRef = ref(null);
defineExpose({
  getObject3D: () => rootRef.value
});
</script>