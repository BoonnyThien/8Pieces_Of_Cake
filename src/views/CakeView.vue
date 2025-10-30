<template>
  <TresGroup :position="[0, -1, 0]" ref="piecesGroupRef"> 
    
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="-0.2">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

    <TresGroup ref="cakePiecesGroup">
      <!-- Sửa: Gán ref bằng function thay vì string -->
      <CakePieceLove    name="piece-love"    :rotation-y="angle(0)" :draco="true" :ref="el => setPieceRef(el, 'love')" />
      <CakePieceJoy     name="piece-joy"     :rotation-y="angle(1)" :draco="true" :ref="el => setPieceRef(el, 'joy')" />
      <CakePieceHope    name="piece-hope"    :rotation-y="angle(2)" :draco="true" :ref="el => setPieceRef(el, 'hope')" />
      <CakePieceKindness name="piece-kindness" :rotation-y="angle(3)" :draco="true" :ref="el => setPieceRef(el, 'kindness')" />
      <CakePieceLuck    name="piece-luck"    :rotation-y="angle(4)" :draco="true" :ref="el => setPieceRef(el, 'luck')" />
      <CakePiecePassion name="piece-passion" :rotation-y="angle(5)" :draco="true" :ref="el => setPieceRef(el, 'passion')" />
      <CakePieceCourage name="piece-courage" :rotation-y="angle(6)" :draco="true" :ref="el => setPieceRef(el, 'courage')" />
      <CakePiecePeace   name="piece-peace"   :rotation-y="angle(7)" :draco="true" :ref="el => setPieceRef(el, 'peace')" />
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

console.log('🚀 CakeView: Script setup started');

// --- Sử dụng Raycaster như TresRaycaster ---
const { raycaster, camera } = useTres(); 
console.log('🎯 useTres() result:', { raycaster: !!raycaster, camera: !!camera });

const piecesGroupRef = ref();
const cakePiecesGroup = ref();
const pointer = new THREE.Vector2(); 
let currentIntersect = null; 

const emit = defineEmits(['piece-selected']);
const { pieces, recordClick } = useCakePieces(); 

const pieceRefs = ref(new Map());
const hasWarnedAboutGetObject3D = ref(false); // THÊM: Biến để chỉ warn 1 lần

// THÊM: Hàm để gán ref với identifier
const setPieceRef = (el, pieceName) => {
  if (el) {
    pieceRefs.value.set(pieceName, el);
    console.log(`✅ Piece ref set for ${pieceName}, total refs:`, pieceRefs.value.size);
  }
};

const activePieceObject = ref(null); 
const isAnimating = ref(false);
const centerPosition = { x: 0, y: 1.0, z: 2.5 }; 
const originalPositions = {}; 
const angle = (i) => (i / 8) * Math.PI * 2; 

// Hàm để lấy tất cả object 3D từ các component - SỬA: Chỉ log 1 lần
const getAllPieceObjects = () => {
  const objects = [];
  let foundAnyObject = false;
  
  pieceRefs.value.forEach((instance, pieceName) => {
    let obj = null;
    
    // THỬ NHIỀU CÁCH ĐỂ LẤY OBJECT3D
    if (instance?.getObject3D) {
      obj = instance.getObject3D();
    } else if (instance?.$el?.isObject3D) {
      obj = instance.$el;
    } else if (instance?.scene) {
      obj = instance.scene;
    } else if (instance?.model) {
      obj = instance.model;
    } else if (instance?.value) {
      obj = instance.value;
    } else if (instance?.mesh) {
      obj = instance.mesh;
    }
    
    if (obj && obj.isObject3D) {
      objects.push(obj);
      foundAnyObject = true;
      
      // Đảm bảo object có thể được raycast
      obj.traverse(child => {
        if (child.isMesh) {
          child.userData.isPiece = true;
          child.userData.pieceName = pieceName;
        }
      });
    } else {
      // CHỈ WARN 1 LẦN
      if (!hasWarnedAboutGetObject3D.value) {
        console.warn(`❌ No Object3D found for piece: ${pieceName}. Available properties:`, Object.keys(instance || {}));
        console.warn('💡 Try adding getObject3D() method to your CakePiece components');
        hasWarnedAboutGetObject3D.value = true;
      }
    }
  });
  
  // CHỈ LOG 1 LẦN KHI CÓ THAY ĐỔI
  if (objects.length > 0 && !getAllPieceObjects.hasLoggedSuccess) {
    console.log(`✅ getAllPieceObjects found ${objects.length} objects`);
    getAllPieceObjects.hasLoggedSuccess = true;
  }
  
  return objects;
};

// THÊM: Property để theo dõi đã log thành công chưa
getAllPieceObjects.hasLoggedSuccess = false;

// Xử lý di chuyển chuột
const onPointerMove = (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
};

// Xử lý click chuột - THAY THẾ cho @click trực tiếp
const onPointerClick = (event) => {
  console.log('🎯 onPointerClick called');
  if (isAnimating.value) {
    console.log('⏳ Animation in progress, ignoring click');
    return;
  }
  
  if (!camera?.value || !raycaster?.value) {
    console.log('❌ Camera or raycaster not ready');
    return;
  }
  
  // Cập nhật pointer từ click event
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.value.setFromCamera(pointer, camera.value);

  const allPieceObjects = getAllPieceObjects();
  
  if (allPieceObjects.length === 0) {
    if (!onPointerClick.hasWarnedNoObjects) {
      console.log('❌ No piece objects found for raycasting');
      onPointerClick.hasWarnedNoObjects = true;
    }
    return;
  }

  // Kiểm tra giao cắt với tất cả mesh trong các piece
  const intersects = raycaster.value.intersectObjects(allPieceObjects, true);
  
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log('🎯 Raycast clicked object:', clickedObject.name);
    
    // Tìm object gốc của miếng bánh
    let pieceObject = clickedObject;
    let safetyCounter = 0;
    while (pieceObject.parent && !pieceObject.name.startsWith('piece-') && safetyCounter < 10) {
      pieceObject = pieceObject.parent;
      safetyCounter++;
    }
    
    const pieceId = pieceObject.name;
    if (!pieceId || !pieceId.startsWith('piece-')) {
      console.log('❌ Invalid pieceId:', pieceId);
      return;
    }
    
    console.log('✅ Found valid piece:', pieceId);
    animateAndEmit(pieceObject, pieceId);
  } else {
    if (!onPointerClick.hasWarnedNoIntersect) {
      console.log('❌ No intersection with any piece objects');
      onPointerClick.hasWarnedNoIntersect = true;
    }
  }
};

// THÊM: Properties để chỉ warn 1 lần
onPointerClick.hasWarnedNoObjects = false;
onPointerClick.hasWarnedNoIntersect = false;

onMounted(() => {
  console.log('🏗️ CakeView mounted');
  
  // Lưu vị trí gốc
  setTimeout(() => { 
    console.log('💾 Saving original positions...');
    let savedCount = 0;
    
    pieceRefs.value.forEach((instance, pieceName) => {
      const allPieceObjects = getAllPieceObjects();
      const pieceObj = allPieceObjects.find(obj => obj.name === `piece-${pieceName}`);
      
      if (pieceObj) {
        originalPositions[pieceObj.name] = pieceObj.position.clone();
        savedCount++;
        console.log(`💾 Saved position for ${pieceObj.name}`);
      } else {
        console.warn(`❌ Could not find Object3D for piece-${pieceName}`);
      }
    });
    
    console.log(`💾 Original positions saved: ${savedCount}/8 pieces`);
  }, 1000);

  // Đăng ký sự kiện
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('click', onPointerClick);
});

onUnmounted(() => {
  console.log('🧹 Cleaning up CakeView...');
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('click', onPointerClick);
});

// Hàm animation
const animateAndEmit = (clickedObject, pieceId) => {
  console.log('🎬 animateAndEmit called with:', pieceId);
  
  const pieceData = pieces.value.find(p => p.id === pieceId);
  if (!pieceData) {
    console.log('❌ Piece data not found for:', pieceId);
    return;
  }

  isAnimating.value = true;
  
  recordClick(pieceId);
  emit('piece-selected', pieceData);

  // Reset miếng bánh cũ
  if (activePieceObject.value && activePieceObject.value.name !== pieceId) {
    const oldPos = originalPositions[activePieceObject.value.name];
    gsap.to(activePieceObject.value.position, { 
      ...oldPos, 
      duration: 0.5, 
      ease: 'power2.inOut' 
    });
  }
  
  activePieceObject.value = clickedObject;

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

// --- Logic Vòng lặp Render cho HOVER ---
const { onLoop } = useRenderLoop();

// Hàm kiểm tra hover - SỬA: Giảm log spam
const checkIntersection = () => {
  if (!camera?.value || !raycaster?.value) return;
  
  raycaster.value.setFromCamera(pointer, camera.value);

  const allPieceObjects = getAllPieceObjects();
  if (allPieceObjects.length === 0) return;

  const intersects = raycaster.value.intersectObjects(allPieceObjects, true);

  if (intersects.length > 0) {
    const hoveredObject = intersects[0].object;
    
    // Tìm object gốc để áp dụng hiệu ứng
    let pieceRoot = hoveredObject;
    let safetyCounter = 0;
    while (pieceRoot.parent && !pieceRoot.name.startsWith('piece-') && safetyCounter < 10) {
      pieceRoot = pieceRoot.parent;
      safetyCounter++;
    }
    
    // Chỉ áp dụng hiệu ứng hover nếu không phải piece đang active
    if (!activePieceObject.value || activePieceObject.value.name !== pieceRoot.name) {
      gsap.to(pieceRoot.scale, { 
        x: 1.05, y: 1.05, z: 1.05, 
        duration: 0.2,
        overwrite: true 
      });
    }
    
    currentIntersect = intersects[0];
  } else {
    // Reset scale cho tất cả pieces khi không hover
    if (currentIntersect) {
      const allObjects = getAllPieceObjects();
      allObjects.forEach(obj => {
        if ((!activePieceObject.value || obj.name !== activePieceObject.value.name) && 
            obj.scale.x !== 1) {
          gsap.to(obj.scale, { 
            x: 1, y: 1, z: 1, 
            duration: 0.2,
            overwrite: true 
          });
        }
      });
    }
    currentIntersect = null;
  }
};

onLoop(({ delta }) => {
  checkIntersection(); 
  
  // Tự xoay miếng bánh active
  if (activePieceObject.value && !isAnimating.value) {
    activePieceObject.value.rotation.y += delta * 0.5;
  }
});

// Expose hàm
defineExpose({
  resetCake: () => {
    console.log('🔄 resetCake called');
    if (activePieceObject.value) {
      const originalPos = originalPositions[activePieceObject.value.name];
      gsap.to(activePieceObject.value.position, { ...originalPos, duration: 0.5 });
      gsap.to(activePieceObject.value.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
    }
    activePieceObject.value = null;
  }
});
</script>