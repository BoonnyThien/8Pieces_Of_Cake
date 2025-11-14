<template>
  <LoadingScreen v-if="isLoading" />

  <div v-else>
    <!-- UI chính -->
    <UiOverlay
      v-if="showUi"
      :greetingText="currentGreetingText"
      @changeGreeting="handleEffect"
      @changeBackground="changeBackground"
    />

    <!-- Nút ẩn/hiện UI -->
    <ToggleUiButton @toggleUi="toggleUiVisibility" />

    <!-- Scene 3D -->
    <ThreeScene ref="threeSceneRef" :background-color="currentBackgroundColor">
      <Stars />
      <Moon ref="moonRef" />
      <Suspense>
        <CakeView ref="cakeViewRef" @piece-selected="handlePieceSelected" />
      </Suspense>
      <ModelsView/>
    </ThreeScene>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUI } from './composables/useUI.js'
import { useThrottledLoop } from './composables/useThrottledLoop.js'

// --- Components ---
import LoadingScreen from './components/ui/LoadingScreen.vue'
import Stars from './components/ui/Stars.vue'
import Moon from './components/canvas/Moon.vue'
import ThreeScene from './components/ThreeScene.vue'
import ToggleUiButton from './components/ui/ToggleUiButton.vue'
import CakeView from './views/CakeView.vue'
import UiOverlay from './components/ui/UiOverlay.vue'
import ModelsView from './views/ModelsView.vue'

// --- Logic ---
const { 
  greetings,
  currentGreeting,
  triggerParticleEffect, 
  changeGreeting,
  changeBackground,
  currentBackgroundColor,
  initAnimations,
  getCurrentGreetingText
} = useUI()

const { onLoop } = useThrottledLoop()

// --- State ---
const isLoading = ref(true)
const showUi = ref(true)
const activePiece = ref(null)
const cakeViewRef = ref(null)
const threeSceneRef = ref(null) // Thêm ref này

// --- Lấy camera từ ThreeScene ---
const getCamera = () => {
  return threeSceneRef.value?.camera
}

// --- Hiện / ẩn UI ---
const toggleUiVisibility = () => (showUi.value = !showUi.value)

// --- Lời chào hiện tại ---
const pieceGreetings = {
  'piece-love': '💖 Tình yêu làm thế giới đẹp hơn!',
  'piece-joy': '😄 Hạnh phúc là điều giản đơn nhất!',
  'piece-hope': '🌠 Hy vọng là ngọn đèn trong đêm tối!',
  'piece-faith': '🙏 Niềm tin giúp ta vượt qua mọi thử thách!',
  'piece-luck': '🍀 May mắn sẽ mỉm cười với bạn!',
  'piece-passion': '🔥 Đam mê thổi bùng ngọn lửa sáng tạo!',
  'piece-courage': '🦁 Dũng cảm là sức mạnh vô hình!',
  'piece-peace': '🕊️ Bình yên bắt đầu từ tâm hồn bạn!'
}

const currentGreetingText = computed(() => {
  if (activePiece.value?.id) {
    return pieceGreetings[activePiece.value.id]
  }
  return getCurrentGreetingText()
})

// --- Khi chọn miếng bánh ---
const handlePieceSelected = async (pieceData) => {
  activePiece.value = pieceData
  triggerParticleEffect(pieceData.id)
  setTimeout(resetPiece, 10000)
}

// --- Reset ---
const resetPiece = () => {
  activePiece.value = null
  cakeViewRef.value?.resetCake?.()
}

// --- Hiệu ứng thủ công khi click nút đổi ---
const handleEffect = () => {
  if (activePiece.value?.id) {
    triggerParticleEffect(activePiece.value.id)
  } else {
    // TRUYỀN CAMERA VÀO ĐÂY
    changeGreeting(getCamera())
  }
}

// --- Mount ---
onMounted(() => {
  initAnimations()
  setTimeout(() => {
    isLoading.value = false
    // Kiểm tra camera sau khi mount
    setTimeout(() => {
      const camera = getCamera()
      console.log('📷 Camera sau khi mount:', camera)
    }, 500)
  }, 1200)
})

// --- Loop animation ---
onLoop(() => {})
</script>

<style>
@import './assets/css/main.css';
</style>