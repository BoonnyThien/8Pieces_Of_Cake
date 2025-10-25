<template>
  <LoadingScreen v-if="isLoading" />

  <div v-else>

    <UiOverlay
      v-if="showUi"
      :greetingText="greetings[currentGreeting]"
      @changeGreeting="changeGreeting"
      @swapItems="handleSwapItems" 
      @changeBackground="handleChangeBackground"
    />
    <ToggleUiButton @toggleUi="toggleUiVisibility" />
    
    <ThreeScene :background-color="currentBackgroundColor">
      <Stars />
      <Moon ref="moon" />
        <Suspense>
          <CakeBase/>
        </Suspense>
    </ThreeScene>
  </div>
</template>

<script setup>
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { ref, computed, onMounted } from 'vue';
import { useUI } from './composables/useUI.js';
// Import components
import LoadingScreen from './components/ui/LoadingScreen.vue';
import UiOverlay from './components/ui/UiOverlay.vue';
import Stars from './components/ui/Stars.vue';
import Moon from './components/canvas/Moon.vue';
import ThreeScene from './components/ThreeScene.vue';
import ToggleUiButton from './components/ui/ToggleUiButton.vue';

// IMPORT VIEW MỚI
import CakeView from './views/CakeView.vue';
import CakePiece from './components/canvas/CakePiece.vue';
import CakeBase from './components/canvas/CakeBase.vue';

// --- Logic Spinner (Tái sử dụng) ---
const spinnerRotation = ref(0);
const { onLoop } = useRenderLoop();
onLoop(({ delta }) => {
  if (!isLoading.value) {
     spinnerRotation.value += delta * 2;
  }
});

// --- Background Color Logic (Tái sử dụng) ---
const backgroundColors = ref(['#000000', '#121212','#FAFAFA']);
const currentBgIndex = ref(0);
const currentBackgroundColor = computed(() => backgroundColors.value[currentBgIndex.value]);
const handleChangeBackground = () => {
  currentBgIndex.value = (currentBgIndex.value + 1) % backgroundColors.value.length;
};

// --- UI Logic (Tái sử dụng) ---
const moon = ref(null);
const isLoading = ref(true);
const showUi = ref(true);
const toggleUiVisibility = () => showUi.value = !showUi.value;

const { currentGreeting, greetings, changeGreeting, initAnimations } = useUI();

// --- Logic Swap MỚI (sẽ được thay bằng Raycasting sau) ---
const handleSwapItems = () => {
  console.log("Nút 'Ngẫu Nhiên' đã được nhấn, sẽ thay bằng logic raycast sau.");
  // Tạm thời chưa làm gì
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    console.log("3D Scene loaded");
  }, 2000);
});
</script>

<style>
@import './assets/css/main.css';
/* @import './assets/css/styles.css'; */ /* Bạn có thể gộp 2 file css này lại */
</style>