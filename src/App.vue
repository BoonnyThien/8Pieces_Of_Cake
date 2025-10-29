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
      <Moon ref="moonRef" />
        <Suspense>
          <CakeView ref="cakeViewRef" @piece-selected="handlePieceSelected" />
          
          <!-- <TresRaycaster/> -->
        </Suspense>
    </ThreeScene>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUI } from './composables/useUI.js';
import { useThrottledLoop } from './composables/useThrottledLoop.js';
// Import components
import LoadingScreen from './components/ui/LoadingScreen.vue';
import UiOverlay from './components/ui/UiOverlay.vue';
import Stars from './components/ui/Stars.vue';
import Moon from './components/canvas/Moon.vue';
import ThreeScene from './components/ThreeScene.vue';
import ToggleUiButton from './components/ui/ToggleUiButton.vue';

// IMPORT VIEW MỚI
import CakeView from './views/CakeView.vue';
import TresRaycaster from './components/TresRaycaster.vue';
// --- Background Color Logic (Tái sử dụng) ---
const backgroundColors = ref(['#000000', '#121212','#FAFAFA']);
const currentBgIndex = ref(0);
const currentBackgroundColor = computed(() => backgroundColors.value[currentBgIndex.value]);
const handleChangeBackground = () => {
  currentBgIndex.value = (currentBgIndex.value + 1) % backgroundColors.value.length;
};

// --- UI Logic (Tái sử dụng) ---
const moonRef = ref(null);
const isLoading = ref(true);
const isAnimating = ref(false)
const showUi = ref(true);
const toggleUiVisibility = () => showUi.value = !showUi.value;

const { currentGreeting, greetings, changeGreeting, initAnimations } = useUI();

// --- Logic Swap MỚI (sẽ được thay bằng Raycasting sau) ---
const cakeViewRef = ref(null); // Ref để gọi hàm trong CakeView

// --- Xử lý sự kiện ---
const handlePieceSelected = (pieceData) => {
  // Khi CakeView báo 1 miếng bánh được chọn, App.vue cập nhật UI 2D
  console.log('App.vue nhận được data:', pieceData.name);
  showPieceInfo(pieceData); // Cập nhật UI 2D (ví dụ: hiển thị description)
};
const triggerCakeSwap = () => {
  // Khi nhấn nút "Ngẫu Nhiên"
  if (cakeViewRef.value) {
    // Tạm thời reset bánh về vị trí cũ
    cakeViewRef.value.resetCake(); 
  }
};

// Hàm này có thể không cần thiết nữa nếu click trực tiếp, 
// nhưng giữ lại nếu nút "Ngẫu Nhiên" vẫn tồn tại
const handleSwapItems = () => {
  console.log("App.vue: Nút Ngẫu Nhiên được nhấn. Sẽ báo cho CakeView...");
  // Logic này sẽ được chuyển vào CakeView
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    console.log("3D Scene loaded");
  }, 2000);
});

const spinnerRotation = ref(0);
const currentRotation = ref([0, 0, 0]);

const { onLoop } = useThrottledLoop();
onLoop(({ delta }) => {
  if (!isLoading.value) { 
    spinnerRotation.value += delta * 2; 

    if (!isAnimating.value) {
      currentRotation.value[1] += delta * 0.5; 
    }
  }
});
</script>

<style>
@import './assets/css/main.css';
/* @import './assets/css/styles.css'; */ /* Bạn có thể gộp 2 file css này lại */
</style>