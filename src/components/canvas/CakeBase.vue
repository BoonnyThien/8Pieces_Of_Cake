<template>
  <TresGroup :position="position" :scale="scale" :rotation="rotation">
    
    <TresMesh :position-y="0.25">
      <TresCylinderGeometry :args="[2.5, 2.5, 0.5, 64]" /> <TresMeshStandardMaterial color="#FFFACD" :roughness="0.8" />
    </TresMesh>
    
    <TresMesh :position-y="0.75">
      <TresCylinderGeometry :args="[1.8, 1.8, 0.5, 64]" />
      <TresMeshStandardMaterial color="#FFEFD5" :roughness="0.8" />
    </TresMesh>

    <TresMesh :rotation-x="-Math.PI / 2">
      <TresCylinderGeometry :args="[3, 3, 0.1, 64]" />
      <TresMeshStandardMaterial color="#FFFFFF" :metalness="0.2" :roughness="0.3" />
    </TresMesh>
    
  </TresGroup>
</template>

<script setup>
// Component này chỉ nhận props, không có logic phức tạp
defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  rotation: { type: Array, default: () => [0, 0, 0] },
});
</script>