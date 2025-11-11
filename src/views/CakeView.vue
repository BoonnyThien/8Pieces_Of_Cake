<!-- src/views/CakeView.vue -->
<template>
  <TresGroup :position="[0, -1, 0]">
    <!-- Cake Base -->
    <TresMesh :rotation-x="Math.PI" :position-y="-0.2">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

    <!-- Cake Pieces -->
    <TresGroup>
      <CakePieceLove    name="piece-love"    :rotation-y="angle(0)" :draco="true" :ref="el => setPieceRef(el, 'love')" />
      <CakePieceJoy     name="piece-joy"     :rotation-y="angle(1)" :draco="true" :ref="el => setPieceRef(el, 'joy')" />
      <CakePieceHope    name="piece-hope"    :rotation-y="angle(2)" :draco="true" :ref="el => setPieceRef(el, 'hope')" />
      <CakePieceFaith   name="piece-faith"   :rotation-y="angle(3)" :draco="true" :ref="el => setPieceRef(el, 'faith')" />
      <CakePieceLuck    name="piece-luck"    :rotation-y="angle(4)" :draco="true" :ref="el => setPieceRef(el, 'luck')" />
      <CakePiecePassion name="piece-passion" :rotation-y="angle(5)" :draco="true" :ref="el => setPieceRef(el, 'passion')" />
      <CakePieceCourage name="piece-courage" :rotation-y="angle(6)" :draco="true" :ref="el => setPieceRef(el, 'courage')" />
      <CakePiecePeace   name="piece-peace"   :rotation-y="angle(7)" :draco="true" :ref="el => setPieceRef(el, 'peace')" />
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
// ... import other pieces
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

// Xử lý sự kiện piece selected
const handlePieceSelected = async ({ pieceId, pieceObject }) => {
  console.log('🎯 CakeView: Handling piece selection for:', pieceId)
  
  try {
    await recordClick(pieceId)
    await animatePieceToCenter(pieceObject, pieceId)
    
    const pieceData = pieces.value.find(p => p.id === pieceId)
    if (pieceData) {
      console.log('📤 Emitting piece-selected to App.vue:', pieceData.name)
      emit('piece-selected', pieceData)
    }
  } catch (error) {
    console.error('❌ Error handling piece selection:', error)
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