<template>
  <TresGroup :position="[0, -1, 0]">
    <!-- Cake Base -->
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="-0.2">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

    <!-- Cake Pieces -->
    <TresGroup>
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
import { onMounted } from 'vue'
import { useCakePieces } from '@/composables/useCakePieces'
import { usePieceManagement } from '@/composables/usePieceManagement'

// Import cake piece components
import CakePieceLove from '../components/canvas/CakePieceLove.vue'
import CakePieceJoy from '../components/canvas/CakePieceJoy.vue'
import CakePieceHope from '../components/canvas/CakePieceHope.vue'
import CakePieceKindness from '../components/canvas/CakePieceKindness.vue'
import CakePieceLuck from '../components/canvas/CakePieceLuck.vue'
import CakePiecePassion from '../components/canvas/CakePiecePassion.vue'
import CakePiecePeace from '../components/canvas/CakePiecePeace.vue'
import CakePieceCourage from '../components/canvas/CakePieceCourage.vue'

// Emit events
const emit = defineEmits(['piece-selected'])

// Composables
const { recordClick } = useCakePieces()
const { 
  setPieceRef, 
  animatePieceToCenter, 
  resetCake 
} = usePieceManagement(emit)

// Helper function
const angle = (i) => (i / 8) * Math.PI * 2

// Event handler for piece selection
const handlePieceSelected = async ({ pieceId, pieceObject }) => {
  const pieceData = await recordClick(pieceId)
  await animatePieceToCenter(pieceObject, pieceId)
  emit('piece-selected', pieceData)
}

// Register event listener
onMounted(() => {
  // Listen for piece-selected events from the composable
  // This could be improved with a proper event bus if needed
})

// Expose public methods
defineExpose({ resetCake })
</script>