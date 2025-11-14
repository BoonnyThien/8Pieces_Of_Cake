<template>
  <TresCanvas shadows window-size :clear-color="backgroundColor" alpha 
    :dpr="[1, 2]"
    :power-preference="'high-performance'">
     <TresPerspectiveCamera 
      ref="cameraRef"
      :position="[0, 5, 15]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />

    <TresGroup>
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
      :position="[5, 10, 5]"
      :intensity="1"
      cast-shadow
    />
        <OrbitControls v-if="ready" ref="controlsRef" :enable-damping="true" :damping-factor="0.05" />
      
      <slot></slot>
    </TresGroup>
  </TresCanvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#000000'
  }
})

const cameraRef = ref(null)
const controlsRef = ref(null)

// props
defineExpose({
  camera: cameraRef,
  controls: controlsRef
})

// Đảm bảo chỉ mount OrbitControls sau khi canvas sẵn sàng
const ready = ref(false)
onMounted(() => {
  ready.value = true
})
</script>