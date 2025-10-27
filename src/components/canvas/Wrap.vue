<template>
  <TresGroup :position="position" :scale="scale" :rotation="rotation">
    
    <!-- Lớp lưới net bên trong (pink mesh net như trong ảnh) -->
    <TresMesh :position-y="-0.2" :rotation-x="Math.PI / 2">
      <TresCylinderGeometry 
        :args="[radius * 0.95, radius * 1.05, height * 1.1, 64, 1, true]" 
      />
      <TresMeshStandardMaterial 
        :map="netMap"
        :alpha-map="netMap"  
        :transparent="true"
        opacity="0.7"
        :side="THREE.DoubleSide"
        color="#FFB6C1"  
        roughness="0.6"
        metalness="0.1"
      />
    </TresMesh>

    <!-- Lớp giấy trong mờ (base layer) -->
    <TresMesh :rotation-y="0.05" :position-y="-0.15" :rotation-x="Math.PI / 2">
      <TresCylinderGeometry 
        :args="[radius * 0.9, radius * 1.1, height * 1.05, 64, 1, true]" 
      />
      <TresMeshStandardMaterial 
        :map="paperMap"
        color="#F5F5DC"  
        :side="THREE.DoubleSide" 
        roughness="0.9" 
        :transparent="true"
        opacity="0.85"
      />
    </TresMesh>

    <!-- Các lớp giấy ngoài với biến đổi để giống chữ U uốn cong (multi-layers với scale và rotation lệch) -->
    <TresMesh 
      v-for="i in layers" 
      :key="'outer-' + i"
      :rotation-y="i * rotationStep + Math.random() * 0.1" 
      :position-y="(i * yStep) - 0.1" 
      :scale="[1 + i*scaleStep, 1 + i*scaleStep*0.6, 1 + i*scaleStep*1.2]"
      :rotation-x="Math.PI / 2 + (i * xRotStep * 0.05)"
    >
      <TresCylinderGeometry 
        :args="[radius * (1 + i*0.01), radius * (1 - i*radiusShrinkStep), height * (1 + i*heightGrowStep), 64, 1, true]" 
      />
      <TresMeshStandardMaterial 
        :map="paperMap"
        :color="color" 
        :side="THREE.DoubleSide" 
        roughness="0.8" 
        metalness="0.05"
        :transparent="true"
        :opacity="1 - i*0.05"  
      />
    </TresMesh>

    <!-- Phần trên cone cho phần mở rộng giấy (giống cánh giấy mở ra chữ U) -->
    <TresMesh :position-y="height * 0.45" :rotation-x="Math.PI / 2 + 0.15">
      <TresConeGeometry 
        :args="[radius * 1.3, height * 0.6, 64, 1, true, 0, Math.PI * 2]" 
      />
      <TresMeshStandardMaterial 
        :map="paperMap"
        :color="color" 
        :side="THREE.DoubleSide" 
        roughness="0.8" 
        metalness="0.05"
        :transparent="true"
        opacity="0.9"
      />
    </TresMesh>

    <!-- Thêm các "cánh" giấy uốn chữ U (sử dụng planes uốn cong cho chi tiết) -->
    <TresMesh 
      v-for="j in 4"  
      :key="'flap-' + j"
      :rotation-y="(j * Math.PI / 2) + Math.random() * 0.2"
      :position-y="height * 0.5"
      :rotation-x="Math.PI / 2 + 0.2"
      :scale="[1.2, 1.0, 1.0]"
    >
      <TresPlaneGeometry :args="[radius * 1.5, height * 0.4, 32, 32]" />
      <TresMeshStandardMaterial 
        :map="paperMap"
        :color="color"
        :side="THREE.DoubleSide"
        roughness="0.85"
        metalness="0.05"
        :transparent="true"
        opacity="0.95"
      />
    </TresMesh>

    <!-- Chỗ buộc nơ (một vòng cylinder mỏng, không tạo nơ) -->
    <TresMesh :position-y="-height * 0.3" :rotation-x="Math.PI / 2">
      <TresCylinderGeometry 
        :args="[radius * 0.85, radius * 0.85, 0.1, 64, 1, true]"  
      />
      <TresMeshStandardMaterial 
        color="#DDA0DD"  
        :side="THREE.DoubleSide"
        roughness="0.7"
        metalness="0.2"
      />
    </TresMesh>

    <!-- Phần cuống giấy thừa (stem excess - cylinder dài mỏng ở dưới) -->
    <TresMesh :position-y="-height * 0.6" :rotation-x="Math.PI / 2">
      <TresCylinderGeometry 
        :args="[radius * 0.3, radius * 0.1, height * 0.4, 32, 1, true]"  
      />
      <TresMeshStandardMaterial 
        :map="paperMap"
        color="#F5F5DC"
        :side="THREE.DoubleSide"
        roughness="0.95"
        :transparent="true"
        opacity="0.8"
      />
    </TresMesh>

  </TresGroup>
</template>

<script setup>
import * as THREE from 'three';
import { useTexture } from '@tresjs/core';

const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  rotation: { type: Array, default: () => [0, 0, 0] },
  color: { type: String, default: '#F5F5DC' },  // Beige mặc định
  radius: { type: Number, default: 1.0 },
  height: { type: Number, default: 3.0 },
  layers: { type: Number, default: 8 }, 
  texturePath: { type: String, default: './textures/strawberry.jpg' },  // Texture giấy thực tế
  netTexturePath: { type: String, default: './textures/strawberry.jpg' }  // Texture lưới với alpha
});

// Load textures asynchronously
const { map: paperMap } = await useTexture({ map: props.texturePath });
const { map: netMap } = await useTexture({ map: props.netTexturePath });

// Các thông số điều chỉnh độ lệch với randomness cho organic look
const rotationStep = (Math.PI * 2) / (props.layers * 1.2);
const yStep = props.height / (props.layers * 8);
const scaleStep = 0.015 / props.layers;
const radiusShrinkStep = 0.03 / props.layers;
const heightGrowStep = 0.02 / props.layers;
const xRotStep = 0.05 / props.layers;

</script>