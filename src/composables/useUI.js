// src/composables/useUI.js
import { ref } from 'vue'
import gsap from 'gsap'
import { useParticles } from './useParticles'

export function useUI() {
  const greetings = ref([
    "🎉 Chào mừng đến với 8 Pieces of Cake!",
    "🍰 Mỗi miếng bánh mang một thông điệp ý nghĩa.",
    "💫 Hãy chọn một miếng để khám phá điều bạn cần!",
    "✨ Chúc bạn một ngày tuyệt vời!"
  ])
  const currentGreeting = ref(0)

  const { triggerParticles } = useParticles()

  // --- Nền theo piece - CẬP NHẬT CHI TIẾT ---
  const pieceBackgrounds = {
    'piece-love': {
      colors: ['#121212', '#ffb6c1', '#e75480'],
      gradient: 'linear-gradient(135deg, #121212 0%, #ffb6c1 50%, #e75480 100%)'
    },
    'piece-joy': {
      colors: ['#121212', '#fff200', '#f9a825'],
      gradient: 'linear-gradient(135deg, #121212 0%, #fff200 50%, #f9a825 100%)'
    },
    'piece-hope': {
      colors: ['#000000', '#1e3a8a', '#60a5fa'],
      gradient: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #60a5fa 100%)'
    },
    'piece-faith': {
      colors: ['#FAFAFA', '#f5f5f5', '#a7c7e7'],
      gradient: 'linear-gradient(135deg, #FAFAFA 0%, #f5f5f5 50%, #a7c7e7 100%)'
    },
    'piece-luck': {
      colors: ['#000000', '#0f5132', '#28a745'],
      gradient: 'linear-gradient(135deg, #000000 0%, #0f5132 50%, #28a745 100%)'
    },
    'piece-passion': {
      colors: ['#121212', '#ff4500', '#b91c1c'],
      gradient: 'linear-gradient(135deg, #121212 0%, #ff4500 50%, #b91c1c 100%)'
    },
    'piece-courage': {
      colors: ['#000000', '#f59e0b', '#92400e'],
      gradient: 'linear-gradient(135deg, #000000 0%, #f59e0b 50%, #92400e 100%)'
    },
    'piece-peace': {
      colors: ['#FAFAFA', '#b3e5fc', '#81d4fa'],
      gradient: 'linear-gradient(135deg, #FAFAFA 0%, #b3e5fc 50%, #81d4fa 100%)'
    }
  }

  // Background mặc định - SỬA: có giá trị mặc định
  const currentBgIndex = ref(0)
  const bgColors = ['#000000', '#121212', '#1a1a1a'] // THÊM màu mặc định
  const currentBackgroundColor = ref(bgColors[currentBgIndex.value])

  // Chuyển màu nền mặc định
  const changeBackground = () => {
    currentBgIndex.value = (currentBgIndex.value + 1) % bgColors.length
    currentBackgroundColor.value = bgColors[currentBgIndex.value]
    
    // Áp dụng ngay lập tức
    document.body.style.background = currentBackgroundColor.value
  }

  // THÊM: Hàm đổi nền theo piece
  const changeBackgroundByPiece = (pieceId) => {
    const pieceBg = pieceBackgrounds[pieceId]
    if (pieceBg) {
      document.body.style.background = pieceBg.gradient
      document.body.style.transition = 'background 1s ease'
    }
  }

  // THÊM: Reset nền về mặc định
  const resetBackground = () => {
    document.body.style.background = currentBackgroundColor.value
  }

  const changeGreeting = () => {
    currentGreeting.value = (currentGreeting.value + 1) % greetings.value.length
  }

  // --- Particle + Emoji effect - CẢI TIẾN ---
  const triggerParticleEffect = async (pieceId, event = null) => {
    const mouseX = event?.clientX || window.innerWidth / 2
    const mouseY = event?.clientY || window.innerHeight / 2

    // Bản đồ emoji và số lượng chi tiết
    const emojiConfig = {
      'piece-love': { emoji: '💖', count: 20, size: [20, 30] },
      'piece-joy': { emoji: '😄', count: 15, size: [24, 32] },
      'piece-hope': { emoji: '🌠', count: 25, size: [18, 26] },
      'piece-faith': { emoji: '🙏', count: 12, size: [22, 28] },
      'piece-luck': { emoji: '🍀', count: 18, size: [20, 28] },
      'piece-passion': { emoji: '🔥', count: 30, size: [16, 24] },
      'piece-courage': { emoji: '🦁', count: 16, size: [26, 34] },
      'piece-peace': { emoji: '🕊️', count: 22, size: [20, 30] }
    }

    const config = emojiConfig[pieceId] || { emoji: '🎉', count: 15, size: [20, 28] }

    // --- GSAP emoji với hiệu ứng đa dạng ---
    for (let i = 0; i < config.count; i++) {
      const el = document.createElement('div')
      el.textContent = config.emoji
      el.style.cssText = `
        position: fixed;
        left: ${mouseX}px;
        top: ${mouseY}px;
        font-size: ${config.size[0] + Math.random() * (config.size[1] - config.size[0])}px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        filter: drop-shadow(0 0 8px rgba(255,255,255,0.5));
      `
      document.body.appendChild(el)

      // Hiệu ứng bay khác nhau cho từng piece
      const animations = {
        'piece-love': { x: (Math.random() - 0.5) * 300, y: -150 - Math.random() * 200 },
        'piece-joy': { x: (Math.random() - 0.7) * 400, y: -100 - Math.random() * 150 },
        'piece-hope': { x: (Math.random() - 0.3) * 250, y: -200 - Math.random() * 250 },
        'piece-faith': { x: (Math.random() - 0.5) * 200, y: -180 - Math.random() * 180 },
        'piece-luck': { x: (Math.random() - 0.6) * 350, y: -120 - Math.random() * 170 },
        'piece-passion': { x: (Math.random() - 0.8) * 500, y: -80 - Math.random() * 120 },
        'piece-courage': { x: (Math.random() - 0.4) * 280, y: -160 - Math.random() * 190 },
        'piece-peace': { x: (Math.random() - 0.2) * 180, y: -220 - Math.random() * 200 }
      }

      const animConfig = animations[pieceId] || animations['piece-love']

      gsap.to(el, {
        duration: 1.5 + Math.random() * 1.0,
        x: animConfig.x + (Math.random() - 0.5) * 100,
        y: animConfig.y + (Math.random() - 0.5) * 50,
        rotation: Math.random() * 360,
        opacity: 1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(el, { 
            duration: 0.5, 
            opacity: 0, 
            onComplete: () => el.remove() 
          })
        }
      })
    }

    // --- tsparticles với config chi tiết ---
    triggerParticles(pieceId, { x: mouseX, y: mouseY })

    // --- Đổi nền theo piece ---
    changeBackgroundByPiece(pieceId)
  }

  const initAnimations = () => {
    // Đặt nền mặc định ban đầu
    document.body.style.background = currentBackgroundColor.value
    document.body.style.transition = 'background 0.5s ease'
    
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
  }

  return {
    greetings,
    currentGreeting,
    currentBackgroundColor,
    changeGreeting,
    changeBackground,
    changeBackgroundByPiece, // THÊM
    resetBackground, // THÊM
    triggerParticleEffect,
    initAnimations
  }
}