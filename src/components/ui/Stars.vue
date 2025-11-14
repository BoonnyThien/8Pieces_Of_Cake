// src/components/ui/Stars.vue
<template>
  <Stars 
    :radius="10"  
    :depth="30" 
    :count="5000" 
    :size="0.3" 
    :size-attenuation="true" 
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { Stars } from '@tresjs/cientos';
</script>
