<template>
  <TresGroup 
    ref="rootRef" 
    :position="position" 
    :rotation="rotation" 
    :scale="scale" 
    :name="pieceName"
  >
    
    <CakeBase 
      :color1="loveColors.color1" 
      :color2="loveColors.color2" 
      :color3="loveColors.color3" 
    />
    
    <Suspense v-if="loveDecorPath">
      <GLTFModel 
        :path="loveDecorPath" 
        :position="[0.8, 0.8, 0.4]" 
        :scale="[0.2, 0.2, 0.2]" 
        :draco="draco" 
      />
    </Suspense>
  
  </TresGroup>
</template>

<script setup>
import { ref } from 'vue';
import { GLTFModel } from '@tresjs/cientos'; // GLTFModel là từ cientos
import CakeBase from './CakeBase.vue'; 

// SỬA LỖI Ở ĐÂY: Import useTexture từ CIENTOS
import { useTexture } from '@tresjs/cientos'; 

const props = defineProps({
  pieceName: { type: String, default: 'piece-love' }, 
  position: Array,
  scale: Array,
  rotation: Array,
  draco: { type: Boolean, default: false },
});

// --- Tùy chỉnh cho miếng "Love" ---

// Dùng đường dẫn tuyệt đối từ thư mục /public/
const { map: strawberryTexture } = await useTexture({ 
  map: '/textures/strawberry.jpg' // Đảm bảo file này tồn tại ở public/textures/strawberry.jpg
});

// Logic gán màu của bạn đã chính xác
const loveColors = {
  color1: '#A0522D', 
  color2: '#FADADD', 
  color3: strawberryTexture // Gán texture đã tải
};

const loveDecorPath = null; 

// Expose group gốc
const rootRef = ref(null);
defineExpose({
  getObject3D: () => rootRef.value
});
</script>