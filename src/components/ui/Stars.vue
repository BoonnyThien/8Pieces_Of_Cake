// src/components/ui/Stars.vue
<template>
  <Stars 
    :radius="100"  
    :depth="50" 
    :count="5000" 
    :size="0.3" 
    :size-attenuation="true" 
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { Stars } from '@tresjs/cientos';
</script>
