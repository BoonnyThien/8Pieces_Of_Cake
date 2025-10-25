<template>
  <TresGroup>
    <TresMesh :rotation-x="-Math.PI / 2" :position-y="-0.05">
      <TresCylinderGeometry :args="[2.2, 2.2, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.1" :roughness="0.2" />
    </TresMesh>

    <Suspense>
      <CakePieceLove    :rotation-y="angle(0)" :draco="true" />
      <!-- <CakePieceJoy     :rotation-y="angle(1)" :draco="true" />
      <CakePieceHope    :rotation-y="angle(2)" :draco="true" />
      <CakePieceKindness :rotation-y="angle(3)" :draco="true" />
      <CakePieceLuck    :rotation-y="angle(4)" :draco="true" />
      <CakePiecePassion :rotation-y="angle(5)" :draco="true" />
      <CakePiecePeace   :rotation-y="angle(6)" :draco="true" />
      <CakePieceCourage :rotation-y="angle(7)" :draco="true" /> -->
    </Suspense>
    
  </TresGroup>
</template>

<script setup>
// Import 8 component miếng bánh
import CakePieceLove from '../components/canvas/CakePieceLove.vue';
// import CakePieceJoy from '../components/canvas/CakePieceJoy.vue';
// import CakePieceHope from '../components/canvas/CakePieceHope.vue';
// import CakePieceKindness from '../components/canvas/CakePieceKindness.vue';
// import CakePieceLuck from '../components/canvas/CakePieceLuck.vue';
// import CakePiecePassion from '../components/canvas/CakePiecePassion.vue';
// import CakePiecePeace from '../components/canvas/CakePiecePeace.vue';
// import CakePieceCourage from '../components/canvas/CakePieceCourage.vue';

// Hàm trợ giúp tính góc (mỗi góc 45 độ)
const angle = (i) => (i / 8) * Math.PI * 2;
</script>