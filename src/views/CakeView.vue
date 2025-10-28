<template>
  <TresGroup>
    <TresMesh :rotation-x="-Math.PI " :position-y="-0.2">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

    <TresRaycaster @click="handleRaycastClick" />
    
    <Suspense>
      <CakePieceLove    :rotation-y="angle(0)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePieceJoy     :rotation-y="angle(1)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePieceHope     :rotation-y="angle(2)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePieceKindness     :rotation-y="angle(3)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePieceLuck     :rotation-y="angle(4)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePiecePassion     :rotation-y="angle(5)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePieceCourage     :rotation-y="angle(6)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>
    <Suspense>
      <CakePiecePeace :rotation-y="angle(7)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>

  </TresGroup>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { TresRaycaster } from '@tresjs/core'; // Import Raycaster
import { useThrottledLoop } from '../composables/useThrottledLoop.js'; // Import loop giảm lag
import { useCakePieces } from '../composables/useCakePieces.js'; // Import logic data/API
import gsap from 'gsap';

// Import 8 component miếng bánh
import CakePieceLove from '../components/canvas/CakePieceLove.vue';
import CakePieceJoy from '../components/canvas/CakePieceJoy.vue';
import CakePieceHope from '../components/canvas/CakePieceHope.vue';
import CakePieceKindness from '../components/canvas/CakePieceKindness.vue';
import CakePieceLuck from '../components/canvas/CakePieceLuck.vue';
import CakePiecePassion from '../components/canvas/CakePiecePassion.vue';
import CakePiecePeace from '../components/canvas/CakePiecePeace.vue';
import CakePieceCourage from '../components/canvas/CakePieceCourage.vue';

// Định nghĩa sự kiện sẽ gửi lên App.vue
const emit = defineEmits(['piece-click', 'swap-request']);

// Lấy hàm gọi API từ composable
const { pieces, onPieceClick } = useCakePieces();

// Mảng chứa ref của 8 miếng bánh
const pieceRefs = ref([]); 
// Ref cho miếng bánh đang active (để tự xoay)
const activePieceObject = ref(null); 
const isAnimating = ref(false);

// Vị trí
const centerPosition = { x: 0, y: 1.0, z: 2.5 }; // Vị trí zoom
const originalPositions = ref({}); // Lưu vị trí gốc

// Hàm trợ giúp tính góc (mỗi góc 45 độ)
const angle = (i) => (i / 8) * Math.PI * 2;

// Lưu vị trí gốc khi component mount
onMounted(() => {
  pieceRefs.value.forEach(instance => {
    const object = instance.getObject3D ? instance.getObject3D() : null;
    if(object) {
      originalPositions.value[object.name] = object.position.clone();
    }
  });
});

// Hàm xử lý click 3D (Raycaster)
const handleRaycastClick = (intersection) => {
  if (!intersection.length || isAnimating.value) return; 

  const clickedObject = intersection[0].object;
  const pieceName = clickedObject.name; // Ví dụ: "piece-love"
  
  if (!pieceName || !pieceName.startsWith('piece-')) return;
  
  // Lấy data của miếng bánh
  const pieceData = pieces.value.find(p => p.name === pieceName);
  if (!pieceData) return;

  isAnimating.value = true;

  // 1. GỌI API (Cloudflare)
  onPieceClick(pieceName); 

  // 2. GỬI SỰ KIỆN LÊN APP.VUE (để cập nhật UI 2D)
  emit('piece-click', pieceData); 

  // 3. ANIMATION
  // 3a. Di chuyển miếng bánh được click
  gsap.to(clickedObject.position, {
    ...centerPosition,
    duration: 1.0,
    ease: 'elastic.out(1, 0.5)'
  });
  activePieceObject.value = clickedObject; // Lưu lại để tự xoay

  // 3b. (Tùy chọn) Ẩn hoặc di chuyển các miếng bánh khác
  pieceRefs.value.forEach(instance => {
    const object = instance.getObject3D ? instance.getObject3D() : null;
    if (object && object.name !== pieceName) {
      gsap.to(object.position, {
        y: -1, // Ví dụ: ẩn xuống
        duration: 0.5,
        ease: 'power2.in'
      });
    }
  });
  
  // (Cần thêm logic để reset các miếng bánh về vị trí cũ)
  
  setTimeout(() => isAnimating.value = false, 1000); 
};

// Logic tự xoay (đã chuyển từ App.vue)
const { onLoop } = useThrottledLoop();
onLoop(({ delta }) => {
  // Nếu có 1 miếng bánh đang active VÀ không có animation GSAP nào đang chạy
  if (activePieceObject.value && !isAnimating.value) {
    activePieceObject.value.rotation.y += delta * 0.5;
  }
});
</script>