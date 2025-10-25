<script setup>
import { ref } from 'vue'
import { 
  TextureLoader,
  AdditiveBlending,
  ClampToEdgeWrapping, 
  LinearFilter
} from 'three'
// ĐÃ XÓA "import { TresCanvas } from '@tresjs/core'"

const moonTexture = new TextureLoader().load('/textures/moon.png', (texture) => {
  texture.wrapS = texture.wrapT =  ClampToEdgeWrapping
  texture.minFilter = texture.magFilter =  LinearFilter
  texture.repeat.set(0.6, 0.6)
  texture.offset.set(0.2, 0.2)
  texture.needsUpdate = true
})
</script>

<template>
  <TresGroup :position="[-7, 5, -10]">
    
    <TresMesh>
      <TresSphereGeometry :args="[2, 64, 64]" />
      <TresMeshStandardMaterial 
        color="#fff9d6" 
        :emissive="0xf5f5f5" 
        :emissiveIntensity="0.12"
        :transparent="true" 
        :alphaTest="0.05"
        :map="moonTexture"
      />
    </TresMesh>
    
    <TresMesh>
      <TresSphereGeometry :args="[2.24, 32, 32]" />
      <TresMeshBasicMaterial 
        color="#fff9d6" 
        :transparent="true" 
        :opacity="0.14" 
        :blending="AdditiveBlending" 
      />
    </TresMesh>

    <TresMesh>
      <TresSphereGeometry :args="[3.2, 32, 32]" />
      <TresMeshBasicMaterial 
        color="#fff9d6" 
        :transparent="true" 
        :opacity="0.07" 
        :blending="AdditiveBlending"
      />
    </TresMesh>
  </TresGroup>
</template>