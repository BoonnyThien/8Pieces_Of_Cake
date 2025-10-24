<template>
  <TresGroup
    :position="position"
    :rotation="rotation"
    :scale="scale"
    @click="handleClick"
    @pointerover="handlePointerOver"
    @pointerout="handlePointerOut"
  >
    <!-- Cake piece base -->
    <TresMesh :cast-shadow="true" :receive-shadow="true">
      <TresCylinderGeometry :args="[1, 1, 0.8, 32, 1, false, 0, Math.PI / 4]" />
      <TresMeshStandardMaterial
        :map="cakeTexture"
        :color="color"
        :metalness="0.3"
        :roughness="0.7"
      />
    </TresMesh>

    <!-- Frosting top -->
    <TresMesh :position="[0, 0.4, 0]" :cast-shadow="true">
      <TresCylinderGeometry :args="[1.05, 1, 0.1, 32, 1, false, 0, Math.PI / 4]" />
      <TresMeshStandardMaterial
        :color="frostingColor"
        :metalness="0.1"
        :roughness="0.3"
      />
    </TresMesh>

    <!-- Decorative elements -->
    <TresPoints v-if="isHovered" :position="[0, 0.5, 0]">
      <TresPointsMaterial
        :size="0.05"
        :color="sparkleColor"
        :transparent="true"
        :opacity="0.8"
      />
      <Float>
        <TresSparkles :count="20" :scale="1.5" :size="2" :speed="0.4" />
      </Float>
    </TresPoints>
  </TresGroup>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTexture } from '@tresjs/core'


const props = defineProps({
  position: {
    type: Array,
    required: true
  },
  rotation: {
    type: Array,
    default: () => [0, 0, 0]
  },
  scale: {
    type: Array,
    default: () => [1, 1, 1]
  }
})

const emit = defineEmits(['click', 'pointerover', 'pointerout'])

const isHovered = ref(false)
const cakeTexture = useTexture('/textures/cake-texture.jpg')

// Colors
const baseColor = '#f8e0c6'
const hoverColor = '#ffe7d3'
const frostingColor = '#ffb7ef'
const sparkleColor = '#ffff80'

const color = computed(() => isHovered.value ? hoverColor : baseColor)

const handleClick = (e) => {
  emit('click', e)
}

const handlePointerOver = (e) => {
  isHovered.value = true
  emit('pointerover', e)
}

const handlePointerOut = (e) => {
  isHovered.value = false
  emit('pointerout', e)
}
</script>