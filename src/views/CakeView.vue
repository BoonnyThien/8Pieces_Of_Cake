<template>
  <TresGroup :position="[0, -1, 0]" ref="piecesGroupRef"> 
    
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="-0.2">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

    <TresGroup>
      <CakePieceLove    name="piece-love"    :rotation-y="angle(0)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePieceJoy     name="piece-joy"     :rotation-y="angle(1)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePieceHope    name="piece-hope"    :rotation-y="angle(2)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePieceKindness name="piece-kindness" :rotation-y="angle(3)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePieceLuck    name="piece-luck"    :rotation-y="angle(4)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePiecePassion name="piece-passion" :rotation-y="angle(5)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePieceCourage name="piece-courage" :rotation-y="angle(6)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
      <CakePiecePeace   name="piece-peace"   :rotation-y="angle(7)" :draco="true" ref="setPieceRef" @click="handlePieceClick" />
    </TresGroup>
    
  </TresGroup>
</template>

<script setup>
import { ref, shallowRef, onMounted, onUnmounted, onBeforeUpdate } from 'vue';
import { useTres, useRenderLoop } from '@tresjs/core'; 
import * as THREE from 'three';
import { useCakePieces } from '../composables/useCakePieces.js';
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

// --- Bắt đầu code giống file mẫu Rubik ---

// SỬA Ở ĐÂY: Lấy raycaster và camera từ useTres()
const { raycaster, camera } = useTres(); 
const piecesGroupRef = ref(); // Ref cho <TresGroup> chứa bánh
const pointer = new THREE.Vector2(); 
let currentIntersect = null; 

// THIẾU: Hàm xử lý di chuyển chuột (để cập nhật 'pointer')
const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
};

// --- Kết thúc code giống file mẫu ---

// --- Logic riêng của dự án bánh kem (Giữ nguyên) ---
const emit = defineEmits(['piece-selected']);
const { pieces, recordClick } = useCakePieces(); 

const pieceRefs = ref([]);
// THÊM: Hàm để gán ref
const setPieceRef = (el) => {
  if (el) {
    pieceRefs.value.push(el);
  }
};

// THÊM: Dọn dẹp mảng ref trước mỗi lần update
onBeforeUpdate(() => {
  pieceRefs.value = [];
});

const activePieceObject = ref(null); 
const isAnimating = ref(false);
const centerPosition = { x: 0, y: 1.0, z: 2.5 }; 
const originalPositions = {}; 
const angle = (i) => (i / 8) * Math.PI * 2; 

onMounted(() => {
  // Lưu vị trí gốc (Giống code cũ)
  setTimeout(() => { 
    pieceRefs.value.forEach((instance) => {
      const object = instance?.getObject3D ? instance.getObject3D() : null;
      if (object) {
        originalPositions[object.name] = object.position.clone();
      }
    });
  }, 200);

  // THÊM: Listener cho di chuyển chuột (Giống code mẫu)
  window.addEventListener('pointermove', onPointerMove);
});

onUnmounted(() => {
  // THÊM: Xóa listener (Giống code mẫu)
  window.removeEventListener('pointermove', onPointerMove);
});

// Xử lý click (được gọi từ @click trên component - Giống code mẫu)
const handlePieceClick = (event) => {
  if (isAnimating.value) return; 

  console.log('CakeView: Clicked!', event.object.name); // Log để kiểm tra

  // Tìm group gốc của miếng bánh
  let clickedObject = event.object; 
  while (clickedObject.parent && !clickedObject.name.startsWith('piece-')) {
    clickedObject = clickedObject.parent;
  }
  
  const pieceId = clickedObject.name;
  if (!pieceId || !pieceId.startsWith('piece-')) return;
  
  // Gọi logic animation
  animateAndEmit(clickedObject, pieceId);
};

// Hàm animation (Giống code cũ)
const animateAndEmit = (clickedObject, pieceId) => {
  const pieceData = pieces.value.find(p => p.id === pieceId);
  if (!pieceData) return;

  isAnimating.value = true;
  
  recordClick(pieceId); // Gọi API
  emit('piece-selected', pieceData); // Báo cho App.vue

  // Reset miếng bánh cũ
  if (activePieceObject.value && activePieceObject.value.name !== pieceId) {
    const oldPos = originalPositions[activePieceObject.value.name];
    gsap.to(activePieceObject.value.position, { ...oldPos, duration: 0.5, ease: 'power2.inOut' });
  }
  activePieceObject.value = clickedObject; // Lưu miếng mới

  // Animate miếng bánh mới
  gsap.to(clickedObject.position, {
    ...centerPosition,
    duration: 1.0,
    ease: 'elastic.out(1, 0.5)',
    onComplete: () => {
      isAnimating.value = false;
    }
  });
};

// --- Logic Vòng lặp Render (Giống file mẫu + Tự xoay) ---
const { onLoop } = useRenderLoop();

// Hàm kiểm tra hover (Giống file mẫu)
const checkIntersection = () => {
  // Sửa lỗi: dùng camera.value, raycaster.value, piecesGroupRef.value
  if (!camera?.value || !raycaster?.value || !piecesGroupRef.value) return;
  
  raycaster.value.setFromCamera(pointer, camera.value);

  // Lấy các object 3D từ group
  const allPieceObjects = pieceRefs.value.map(inst => inst.getObject3D ? inst.getObject3D() : null).filter(Boolean);
  if (allPieceObjects.length === 0) return;

  const intersects = raycaster.value.intersectObjects(allPieceObjects, true);

  // Reset màu hover cũ (Bạn có thể tùy chỉnh)
  if (currentIntersect) {
    // (Tạm thời không làm gì để tránh xung đột màu)
  }

  // Đổi màu hover mới (Bạn có thể tùy chỉnh)
  if (intersects.length > 0) {
    // (Tạm thời không làm gì để tránh xung đột màu)
    currentIntersect = intersects[0];
  } else {
    currentIntersect = null;
  }
};

onLoop(({ delta }) => {
  // Chạy check hover mỗi frame (Giống file mẫu)
  checkIntersection(); 
  
  // Tự xoay miếng bánh active (Logic cũ của bạn)
  if (activePieceObject.value && !isAnimating.value) {
    activePieceObject.value.rotation.y += delta * 0.5;
  }
});

// --- Expose Hàm (Giữ nguyên) ---
defineExpose({
  resetCake: () => {
     if (activePieceObject.value) {
        const originalPos = originalPositions[activePieceObject.value.name];
        gsap.to(activePieceObject.value.position, { ...originalPos, duration: 0.5 });
     }
     activePieceObject.value = null;
  }
});
</script>