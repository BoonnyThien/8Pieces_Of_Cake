<template>
  <Transition name="fade">
    <div v-if="selectedPiece" class="overlay-info" @click.self="close">
      <div class="info-card" :style="cardStyle">
        <div class="content">
          <h2 class="title" :style="titleStyle">{{ selectedPiece.title }}</h2>
          <p class="description" :style="descriptionStyle">{{ selectedPiece.description }}</p>
        </div>
        <button class="close-button" @click="close" :style="buttonStyle">
          <span class="close-icon">×</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRaycast } from '@/composables/useRaycast'
import gsap from 'gsap'

const { raycast: selectedPiece } = useRaycast()

const opacity = ref(0)
const scale = ref(0.9)

const cardStyle = computed(() => ({
  opacity: opacity.value,
  transform: `scale(${scale.value})`
}))

const titleStyle = computed(() => ({
  transform: `translateY(${20 * (1 - opacity.value)}px)`
}))

const descriptionStyle = computed(() => ({
  transform: `translateY(${30 * (1 - opacity.value)}px)`
}))

const buttonStyle = computed(() => ({
  opacity: opacity.value
}))

watch(selectedPiece, (newValue) => {
  if (newValue) {
    // Animate in
    gsap.to(opacity, {
      value: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
    gsap.to(scale, {
      value: 1,
      duration: 0.5,
      ease: 'back.out(1.7)'
    })
  } else {
    // Animate out
    gsap.to(opacity, {
      value: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    gsap.to(scale, {
      value: 0.9,
      duration: 0.3,
      ease: 'power2.in'
    })
  }
})

const close = () => {
  selectedPiece.value = null
}
</script>

<style scoped>
.overlay-info {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem 3rem;
  border-radius: 16px;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transform-origin: center center;
}

.content {
  overflow: hidden;
}

.title {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  color: #ff69b4;
  font-weight: bold;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0;
  color: #555;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}

.close-icon {
  font-size: 24px;
  line-height: 1;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>