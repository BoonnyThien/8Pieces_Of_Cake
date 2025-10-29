<template>
  <TresCanvas shadows window-size :clear-color="backgroundColor" alpha>
    <TresPerspectiveCamera :position="[0, 5, 15]" :look-at="[0, 0, 0]" />

    <TresGroup>
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight :position="[5, 5, 5]" :intensity="1.5" cast-shadow />
      <OrbitControls v-if="ready" :enable-damping="true" :damping-factor="0.05" />
      
      <slot></slot>
    </TresGroup>
  </TresCanvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { OrbitControls } from '@tresjs/cientos'

// props
defineProps({
  backgroundColor: { type: String, default: '#000000' },
})

// Đảm bảo chỉ mount OrbitControls sau khi canvas sẵn sàng
const ready = ref(false)
onMounted(() => {
  ready.value = true
})
</script>