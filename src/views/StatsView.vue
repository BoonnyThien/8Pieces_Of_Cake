<template>
  <div class="stats-view">
    <h1>Statistics</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="(count, id) in counts" :key="id">{{ id }}: {{ count }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const counts = ref({})
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/.netlify/functions/stats')
    const json = await res.json()
    counts.value = json.counts || json.count || {}
  } catch (err) {
    console.warn(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.stats-view { padding: 2rem; color: white }
</style>
