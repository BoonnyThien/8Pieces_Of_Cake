<template>
  <TresGroup :position="[0, -1, 0]">
    <!-- Lighting -->
    <!-- Heart Cake -->
    <TableModern
      :position="[models.heartCake.position[0], -1, models.heartCake.position[2]]" 
      :scale="[4,3,4]"/>
    <HeartCake 
      :position="models.heartCake.position" 
      :scale="models.heartCake.scale"
      :draco="true"
    />
    <!-- Chocolate Pudding -->
     <TableModern
      :position="[models.chocolatePudding.position[0], -1, models.chocolatePudding.position[2]]" 
      :scale="[4,3,4]"/>
    <ChocolatePudding 
      :position="models.chocolatePudding.position" 
      :scale="models.chocolatePudding.scale"
      :draco="true"
    />
  </TresGroup>
</template>

<script setup>
import { reactive } from 'vue'
import HeartCake from '@/components/canvas/HeartCake.vue'
import ChocolatePudding from '@/components/canvas/ChocolatePudding.vue'
import TableModern from '@/components/canvas/TableModern.vue'

// Models configuration with position and scale
const models = reactive({
  heartCake: {
    position: [-15, 1, 0],
    scale: [1.5, 1.5, 1.5]
  },
  chocolatePudding: {
    position: [15, 1,0],
    scale: [1, 1, 1]
  }
})

// ==================== Utility Functions ====================

/**
 * Update position of a specific model
 * @param {string} modelName - Model name (e.g., 'heartCake', 'cakeV22')
 * @param {array} newPosition - New position [x, y, z]
 */
const updateModelPosition = (modelName, newPosition) => {
  if (models[modelName]) {
    models[modelName].position = newPosition
  }
}

/**
 * Update scale of a specific model
 * @param {string} modelName - Model name
 * @param {array} newScale - New scale [x, y, z]
 */
const updateModelScale = (modelName, newScale) => {
  if (models[modelName]) {
    models[modelName].scale = newScale
  }
}

/**
 * Update both position and scale
 * @param {string} modelName - Model name
 * @param {object} config - Configuration object { position: [x,y,z], scale: [x,y,z] }
 */
const updateModel = (modelName, config) => {
  if (models[modelName]) {
    if (config.position) models[modelName].position = config.position
    if (config.scale) models[modelName].scale = config.scale
  }
}

/**
 * Reset all models to default positions
 */
const resetAllModels = () => {
  models.heartCake = { position: [-2, 0, -2], scale: [1, 1, 1] }
  models.cakeV22 = { position: [2, 0, -2], scale: [1, 1, 1] }
  models.chocolatePudding = { position: [0, 0, 0], scale: [1, 1, 1] }
  models.pawtisserie = { position: [-2, 0, 2], scale: [1, 1, 1] }
  models.toyCake = { position: [2, 0, 2], scale: [1, 1, 1] }
}

/**
 * Update all models at once
 * @param {object} allModelsConfig - Configuration for all models
 */
const updateAllModels = (allModelsConfig) => {
  Object.keys(allModelsConfig).forEach(modelName => {
    updateModel(modelName, allModelsConfig[modelName])
  })
}

// Export functions for external use
defineExpose({
  models,
  updateModelPosition,
  updateModelScale,
  updateModel,
  resetAllModels,
  updateAllModels
})
</script>

<style scoped>
</style>

// In parent component
const modelsViewRef = ref()

// Update a single model
modelsViewRef.value.updateModel('heartCake', {
  position: [-3, 0, -3],
  scale: [1.5, 1.5, 1.5]
})

// Reset all
modelsViewRef.value.resetAllModels()
