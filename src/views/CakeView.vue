<template>
  <TresGroup>
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="-0.05">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

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
      <CakePiecePeace :rotation-y="angle(7)" :draco="true" />
      <template #fallback>
        </template>
    </Suspense>

  </TresGroup>
</template>

<script setup>
// Import 8 component miếng bánh (mỗi file đều đã gộp logic)
import CakePieceLove from '../components/canvas/CakePieceLove.vue';
import CakePieceJoy from '../components/canvas/CakePieceJoy.vue';
import CakePieceHope from '../components/canvas/CakePieceHope.vue';
import CakePieceKindness from '../components/canvas/CakePieceKindness.vue';
import CakePieceLuck from '../components/canvas/CakePieceLuck.vue';
import CakePiecePassion from '../components/canvas/CakePiecePassion.vue';
import CakePiecePeace from '../components/canvas/CakePiecePeace.vue';
import CakePieceCourage from '../components/canvas/CakePieceCourage.vue';

// Hàm trợ giúp tính góc (mỗi góc 45 độ)
const angle = (i) => (i / 8) * Math.PI * 2;
</script>