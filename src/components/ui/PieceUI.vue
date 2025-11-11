<template>
  <div class="piece-ui" :class="[pieceId, { 'home-mode': isHomeMode }]" :style="uiStyle">
    <div class="particles-container" ref="particlesRef"></div>
    
    <header class="header">
      <div class="logo">8 Pieces of Cake</div>
      <button v-if="!isHomeMode" class="close-btn" @click="$emit('close')">✕</button>
    </header>
    
    <div class="content">
      <!-- Home Mode -->
      <div v-if="isHomeMode" class="home-content">
        <div class="welcome-section">
          <h1 class="welcome-emoji">🎂</h1>
          <h2 class="welcome-title">Chào mừng!</h2>
          <p class="welcome-text">Chọn một miếng bánh để khám phá ý nghĩa đặc biệt</p>
        </div>
        
        <div class="pieces-grid">
          <div 
            v-for="piece in allPieces" 
            :key="piece.id"
            class="piece-card"
            :style="{ borderColor: pieceConfigs[piece.id]?.backgrounds[1] }"
            @click="$emit('piecePreview', piece.id)"
          >
            <span class="piece-card-emoji">{{ pieceConfigs[piece.id]?.emoji }}</span>
            <span class="piece-card-name">{{ piece.name }}</span>
            <span class="piece-card-count">{{ clickCounts[piece.id] || 0 }}</span>
          </div>
        </div>
      </div>
      
      <!-- Piece Detail Mode -->
      <div v-else class="piece-detail-content">
        <div class="piece-header">
          <h1 class="piece-emoji">{{ pieceConfig.emoji }}</h1>
          <h2 class="piece-name">{{ pieceData.name }}</h2>
        </div>
        
        <div class="piece-description">
          <p>{{ pieceData.description }}</p>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">Lượt chọn:</span>
            <span class="stat-value">{{ clickCount }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="controls">
      <button v-if="!isHomeMode" class="btn effect-btn" @click="triggerEffect">
        {{ pieceConfig.effectButton }}
      </button>
      
      <button class="btn bg-btn" @click="cycleBackground">
        🎨 Đổi Nền
      </button>
      
      <button v-if="isHomeMode" class="btn stats-btn" @click="$emit('showStats')">
        📊 Thống Kê
      </button>
      
      <button v-if="isHomeMode" class="btn random-btn" @click="$emit('randomPiece')">
        🎲 Ngẫu Nhiên
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  pieceId: String,
  pieceData: Object,
  clickCount: Number,
  isHomeMode: { type: Boolean, default: false },
  clickCounts: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close', 'changeBackground', 'showStats', 'randomPiece', 'piecePreview'])

// Config cho tất cả pieces
const pieceConfigs = {
  'home': {
    emoji: '🎂',
    effectButton: '✨ Hiệu ứng',
    backgrounds: ['#121212', '#2d1b69', '#1a365d'],
    effect: 'sparkle'
  },
  'piece-love': {
    emoji: '💖',
    effectButton: '✨ Mưa Trái Tim',
    backgrounds: ['#121212', '#ffb6c1', '#e75480'],
    effect: 'heart'
  },
  'piece-luck': {
    emoji: '🍀',
    effectButton: '🍀 Lá May Mắn',
    backgrounds: ['#000000', '#0f5132', '#28a745'],
    effect: 'clover'
  },
  'piece-joy': {
    emoji: '😄',
    effectButton: '🌈 Ngôi Sao Vui',
    backgrounds: ['#121212', '#fff200', '#f9a825'],
    effect: 'star'
  },
  'piece-peace': {
    emoji: '🕊️',
    effectButton: '🫧 Bong Bóng',
    backgrounds: ['#FAFAFA', '#b3e5fc', '#81d4fa'],
    effect: 'bubble'
  },
  'piece-hope': {
    emoji: '🌠',
    effectButton: '✨ Hạt Sáng',
    backgrounds: ['#000000', '#1e3a8a', '#60a5fa'],
    effect: 'sparkle'
  },
  'piece-passion': {
    emoji: '🔥',
    effectButton: '🔥 Tia Lửa',
    backgrounds: ['#121212', '#ff4500', '#b91c1c'],
    effect: 'fire'
  },
  'piece-courage': {
    emoji: '🦁',
    effectButton: '⚡ Tia Sét',
    backgrounds: ['#000000', '#f59e0b', '#92400e'],
    effect: 'lightning'
  },
  'piece-faith': {
    emoji: '✝️',
    effectButton: '✨ Ánh Sáng',
    backgrounds: ['#FAFAFA', '#f5f5f5', '#a7c7e7'],
    effect: 'light'
  }
}

const allPieces = [
  { id: 'piece-love', name: 'Love', description: 'Tình yêu' },
  { id: 'piece-joy', name: 'Joy', description: 'Niềm vui' },
  { id: 'piece-hope', name: 'Hope', description: 'Hy vọng' },
  { id: 'piece-faith', name: 'faith', description: 'Tử tế' },
  { id: 'piece-luck', name: 'Luck', description: 'May mắn' },
  { id: 'piece-passion', name: 'Passion', description: 'Đam mê' },
  { id: 'piece-courage', name: 'Courage', description: 'Dũng cảm' },
  { id: 'piece-peace', name: 'Peace', description: 'Bình yên' }
]

const particlesRef = ref()
const currentBgIndex = ref(0)

const pieceConfig = computed(() => pieceConfigs[props.pieceId] || pieceConfigs['home'])
const currentBackground = computed(() => pieceConfig.value.backgrounds[currentBgIndex.value])

const uiStyle = computed(() => ({
  background: `linear-gradient(135deg, ${currentBackground.value} 0%, #000000 100%)`,
  border: props.isHomeMode ? 'none' : `2px solid ${pieceConfig.value.backgrounds[1]}`
}))

const cycleBackground = () => {
  currentBgIndex.value = (currentBgIndex.value + 1) % pieceConfig.value.backgrounds.length
  emit('changeBackground', currentBackground.value)
}

const triggerEffect = () => {
  createParticles(pieceConfig.value.effect)
}

// Particle system (giữ nguyên)
const createParticles = (effectType) => {
  const container = particlesRef.value
  if (!container) return

  container.innerHTML = ''
  const particleCount = effectType === 'heart' ? 20 : 15
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container, effectType, i)
  }
}

const createParticle = (container, type, index) => {
  const particle = document.createElement('div')
  particle.className = `particle particle-${type}`
  
  const configs = {
    heart: { content: '💖', duration: 2000, delay: index * 100 },
    clover: { content: '🍀', duration: 2500, delay: index * 120 },
    star: { content: '⭐', duration: 1800, delay: index * 80 },
    bubble: { content: '🫧', duration: 3000, delay: index * 150 },
    sparkle: { content: '✨', duration: 1600, delay: index * 90 },
    fire: { content: '🔥', duration: 1200, delay: index * 60 },
    lightning: { content: '⚡', duration: 1400, delay: index * 70 },
    light: { content: '🌟', duration: 2200, delay: index * 110 }
  }
  
  const config = configs[type] || configs.sparkle
  particle.textContent = config.content
  particle.style.animationDuration = `${config.duration}ms`
  particle.style.animationDelay = `${config.delay}ms`
  
  container.appendChild(particle)
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle)
    }
  }, config.duration + config.delay)
}

onMounted(() => {
  // Tự động kích hoạt hiệu ứng khi mở UI
  setTimeout(() => {
    if (props.isHomeMode) {
      createParticles('sparkle') // Hiệu ứng mặc định cho home
    } else {
      triggerEffect()
    }
  }, 500)
})

defineExpose({
  triggerEffect,
  cycleBackground
})
</script>

<style scoped>
.piece-ui {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background: linear-gradient(135deg, #121212 0%, #000000 100%);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  color: white;
  font-family: 'Arial', sans-serif;
}

.piece-ui.home-mode {
  max-width: 600px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  font-size: 1.2em;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px;
}

/* Home Mode Styles */
.home-content {
  text-align: center;
}

.welcome-section {
  margin-bottom: 30px;
}

.welcome-emoji {
  font-size: 4em;
  margin: 0;
}

.welcome-title {
  font-size: 2em;
  margin: 10px 0;
  color: #fff;
}

.welcome-text {
  font-size: 1.1em;
  opacity: 0.8;
  margin: 0;
}

.pieces-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.piece-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid;
  border-radius: 15px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.piece-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.piece-card-emoji {
  font-size: 2em;
  margin-bottom: 8px;
}

.piece-card-name {
  font-size: 0.9em;
  font-weight: bold;
  margin-bottom: 5px;
}

.piece-card-count {
  font-size: 0.8em;
  color: #ffd700;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 8px;
  border-radius: 10px;
}

/* Piece Detail Styles */
.piece-detail-content {
  text-align: center;
}

.piece-header {
  margin-bottom: 15px;
}

.piece-emoji {
  font-size: 3em;
  margin: 0;
}

.piece-name {
  font-size: 1.8em;
  margin: 10px 0;
  color: #fff;
}

.piece-description {
  margin-bottom: 15px;
}

.piece-description p {
  margin: 0;
  font-size: 1.1em;
  opacity: 0.9;
}

.stats {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  opacity: 0.8;
}

.stat-value {
  font-weight: bold;
  color: #ffd700;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  flex: 1;
  min-width: 120px;
  padding: 12px 15px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Particles container (giữ nguyên) */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  border-radius: 20px;
}

/* Particle animations (giữ nguyên) */
.particle {
  position: absolute;
  font-size: 1.5em;
  pointer-events: none;
  z-index: -1;
}

/* Các animation keyframes giữ nguyên */
</style>