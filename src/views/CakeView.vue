<!-- src/views/CakeView.vue -->
<template>
  <TresGroup :position="[0, -1, 0]">
    <TableModern :position-y="floor" :scale="[4.5,3,4.5]"/>
    <TresMesh :rotation-x="Math.PI" :position-y="floor" :scale="3">
       <TresCylinderGeometry :args="[2.2, 2.2, 0.01, 64]" />
       <TresMeshStandardMaterial color="#faf6f6ff" :metalness="0.1" :roughness="0.9" />
    </TresMesh>

    <TresGroup :key="componentKey">
      <CakePieceLove    name="piece-love"    :position="getPosition(0)" :rotation-y="angle(0)" :draco="true" :ref="el => setPieceRef(el, 'piece-love')" @click="(e) => onPieceClick(e, 'piece-love')" />
      <CakePieceJoy     name="piece-joy"     :position="getPosition(1)" :rotation-y="angle(1)" :draco="true" :ref="el => setPieceRef(el, 'piece-joy')"  @click="(e) => onPieceClick(e, 'piece-joy')" />
      <CakePieceHope    name="piece-hope"    :position="getPosition(2)" :rotation-y="angle(2)" :draco="true" :ref="el => setPieceRef(el, 'piece-hope')" @click="(e) => onPieceClick(e, 'piece-hope')" />
      <CakePieceFaith   name="piece-faith"   :position="getPosition(3)" :rotation-y="angle(3)" :draco="true" :ref="el => setPieceRef(el, 'piece-faith')" @click="(e) => onPieceClick(e, 'piece-faith')" />
      <CakePieceLuck    name="piece-luck"    :position="getPosition(4)" :rotation-y="angle(4)" :draco="true" :ref="el => setPieceRef(el, 'piece-luck')"  @click="(e) => onPieceClick(e, 'piece-luck')" />
      <CakePiecePassion name="piece-passion" :position="getPosition(5)" :rotation-y="angle(5)" :draco="true" :ref="el => setPieceRef(el, 'piece-passion')" @click="(e) => onPieceClick(e, 'piece-passion')" />
      <CakePieceCourage name="piece-courage" :position="getPosition(6)" :rotation-y="angle(6)" :draco="true" :ref="el => setPieceRef(el, 'piece-courage')" @click="(e) => onPieceClick(e, 'piece-courage')" />
      <CakePiecePeace   name="piece-peace"   :position="getPosition(7)" :rotation-y="angle(7)" :draco="true" :ref="el => setPieceRef(el, 'piece-peace')"   @click="(e) => onPieceClick(e, 'piece-peace')" />
    </TresGroup>
  </TresGroup>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCakePieces } from '@/composables/useCakePieces'
import { usePieceManagement } from '@/composables/usePieceManagement'

// Import cake piece components
import CakePieceJoy from '@/components/canvas/CakePieceJoy.vue'
import CakePieceHope from '@/components/canvas/CakePieceHope.vue'
import CakePieceFaith from '@/components/canvas/CakePieceFaith.vue'
import CakePieceLuck from '@/components/canvas/CakePieceLuck.vue'
import CakePiecePassion from '@/components/canvas/CakePiecePassion.vue'
import CakePieceCourage from '@/components/canvas/CakePieceCourage.vue'
import CakePiecePeace from '@/components/canvas/CakePiecePeace.vue'
import CakePieceLove from '@/components/canvas/CakePieceLove.vue'
import TableModern from '@/components/canvas/TableModern.vue'
// ... import other pieces

let floor = -1.4;
// Gửi sự kiện ra ngoài 
const emit = defineEmits(['piece-selected'])

// Composables
const { pieces, recordClick } = useCakePieces()
const { 
  setPieceRef, 
  animatePieceToCenter, 
  resetCake,
  on 
} = usePieceManagement()

// Helper function
const angle = (i) => (i / 8) * Math.PI * 2
const getPosition = (i) => {
  const theta = angle(i); 
  const radius = 0.1; // <--- CHỈNH KHOẢNG CÁCH TÁCH Ở ĐÂY (0.1, 0.2, 0.5...)
  
  // Tính toạ độ X và Z dựa trên góc xoay để đẩy miếng bánh ra ngoài
  return [
    Math.sin(theta) * radius, 
    0, 
    Math.cos(theta) * radius
  ]
}

const onPieceClick = (event, pieceId) => {
  // Ngăn sự kiện click xuyên qua (nếu cần)
  if (event) event.stopPropagation()
  
  // LOG 1: Kiểm tra Raycaster có bắt được click không
  console.log('🖱️ [LOG 1] Clicked on 3D Object:', pieceId)

  // Gọi hàm xử lý chính (đã có sẵn bên dưới)
  // Truyền đúng format mà handlePieceSelected yêu cầu
  handlePieceSelected({ 
    pieceId: pieceId, 
    pieceObject: null // usePieceManagement sẽ tự tìm object qua ref, hoặc bạn có thể truyền event.object
  })
}

// Xử lý sự kiện piece selected
const handlePieceSelected = async ({ pieceId, pieceObject }) => {
  console.log('🎯 CakeView: Handling piece selection for:', pieceId)
  
  try {
   await recordClick(pieceId)
    console.log('✅ [LOG 3] API Record Click Success') // Log API xong

    // Gọi Animation
    await animatePieceToCenter(pieceObject, pieceId)
    console.log('✨ [LOG 4] Animation Started/Done') // Log Animation

    const pieceData = pieces.value.find(p => p.id === pieceId)
    if (pieceData) {
      // LOG 5: Kiểm tra dữ liệu trước khi gửi ra App.vue (để hiện UI)
      console.log('📤 [LOG 5] Emitting to App.vue:', pieceData.name)
      emit('piece-selected', pieceData)
    }
  } catch (error) {
    console.error('❌ [LOG ERROR]:', error)
  }
}

// Đăng ký event listener
onMounted(() => {
  on('pieceSelected', handlePieceSelected)
})

// Expose public methods
defineExpose({ 
  resetCake,
  // Có thể thêm method để trigger selection từ bên ngoài
  triggerPieceSelection: (pieceId) => {
    // Logic để kích hoạt selection programmatically
  }
})
</script>