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

  // --- Nền theo piece ---
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
    },
    // THÊM: Hiệu ứng cho moon
    'moon': {
      colors: ['#000000', '#1a1a2e', '#16213e'],
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)'
    }
  }

  // Background mặc định
  const currentBgIndex = ref(0)
  const bgColors = ['#000000', '#121212', '#faf6f6ff',]
  const currentBackgroundColor = ref(bgColors[currentBgIndex.value])

  
  // Chuyển màu nền mặc định
  const changeBackground = () => {
    currentBgIndex.value = (currentBgIndex.value + 1) % bgColors.length
    currentBackgroundColor.value = bgColors[currentBgIndex.value]
    document.body.style.background = currentBackgroundColor.value
  }

  // Reset nền về mặc định
  const resetBackground = () => {
    document.body.style.background = currentBackgroundColor.value
  }

  const changeGreeting = () => {
    currentGreeting.value = (currentGreeting.value + 1) % greetings.value.length
  }

  // --- Particle + Emoji effect - CẢI TIẾN ---
 const triggerParticleEffect = async (pieceId, event = null) => {
  console.log('✨ Triggering particles for:', pieceId)

  // 1. Cấu hình Emoji (Dùng mảng để chứa 2 icon trở lên)
  const emojiConfig = {
    'piece-love':    { emojis: ['💖', '✨'], count: 40, size: [20, 30] }, // Tim + Lấp lánh
    'piece-joy':     { emojis: ['😄', '🎉'], count: 30, size: [24, 32] }, // Cười + Pháo
    'piece-hope':    { emojis: ['🌠', '🌟'], count: 40, size: [18, 26] }, // Sao băng + Sao
    'piece-faith':   { emojis: ['🙏', '📿'], count: 25, size: [22, 28] },
    'piece-luck':    { emojis: ['🍀', '💰'], count: 35, size: [20, 28] }, // Cỏ 4 lá + Tiền
    'piece-passion': { emojis: ['🔥', '⚡'], count: 50, size: [16, 24] }, // Lửa + Sét
    'piece-courage': { emojis: ['🦁', '🛡️'], count: 30, size: [26, 34] },
    'piece-peace':   { emojis: ['🕊️', '🍃'], count: 35, size: [20, 30] },
    'moon':          { emojis: ['🌙', '☁️'], count: 30, size: [22, 30] }  // Trăng + Mây
  }

  const config = emojiConfig[pieceId] || { emojis: ['🎉', '✨'], count: 30, size: [20, 28] }

  // CHỌN KIỂU HIỆU ỨNG: 'rain' (mưa) hoặc 'corners' (4 góc)
  // Bạn có thể random hoặc fix cứng tùy ý
  const effectType = Math.random() > 0.5 ? 'rain' : 'corners'; 

  for (let i = 0; i < config.count; i++) {
    const el = document.createElement('div')
    
    // 2. Random chọn 1 trong các icon của mảng
    const randomEmoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
    el.textContent = randomEmoji
    
    // Setup style chung
    el.style.cssText = `
      position: fixed;
      font-size: ${config.size[0] + Math.random() * (config.size[1] - config.size[0])}px;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));
    `
    document.body.appendChild(el)

    // --- XỬ LÝ VỊ TRÍ (QUAN TRỌNG) ---
    let startX, startY, targetX, targetY, duration;

    if (effectType === 'rain') {
      // === HIỆU ỨNG MƯA RƠI ===
      // Bắt đầu: Random chiều ngang (X), Ở trên đỉnh màn hình (Y = -50)
      startX = Math.random() * window.innerWidth;
      startY = -50;
      
      // Kết thúc: Rơi xuống đáy màn hình + lệch X một chút (gió thổi)
      targetX = startX + (Math.random() - 0.5) * 200;
      targetY = window.innerHeight + 100;
      
      duration = 2 + Math.random() * 2; // Rơi từ 2s đến 4s

    } else {
      // === HIỆU ỨNG 4 GÓC BAY VÀO ===
      // Chọn ngẫu nhiên 1 trong 4 góc
      const corners = [
        { x: 0, y: 0 }, // Góc trên trái
        { x: window.innerWidth, y: 0 }, // Góc trên phải
        { x: 0, y: window.innerHeight }, // Góc dưới trái
        { x: window.innerWidth, y: window.innerHeight } // Góc dưới phải
      ];
      const randomCorner = corners[Math.floor(Math.random() * corners.length)];
      
      startX = randomCorner.x;
      startY = randomCorner.y;

      // Kết thúc: Bay về phía tâm màn hình (nhưng phân tán rộng ra một chút)
      targetX = (window.innerWidth / 2) + (Math.random() - 0.5) * 400;
      targetY = (window.innerHeight / 2) + (Math.random() - 0.5) * 400;
      
      duration = 1.5 + Math.random() * 1;
    }

    // Gán vị trí bắt đầu
    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;

    // --- GSAP ANIMATION ---
    gsap.to(el, {
      duration: duration,
      x: targetX - startX, // GSAP tính theo delta (khoảng cách di chuyển)
      y: targetY - startY,
      rotation: Math.random() * 720, // Xoay nhiều vòng hơn
      opacity: 1,
      ease: effectType === 'rain' ? 'power1.in' : 'power2.out', // Mưa thì rơi nhanh dần, Góc thì bay chậm dần
      
      // Hiệu ứng phụ: Fade out khi gần xong
      onStart: () => { gsap.to(el, { opacity: 1, duration: 0.5 }) },
      onComplete: () => {
        gsap.to(el, { 
          duration: 0.5, 
          opacity: 0, 
          onComplete: () => el.remove() 
        })
      }
    })
  }

  // Giữ lại tsparticles nếu muốn kết hợp
  const mouseX = event?.clientX || window.innerWidth / 2
  const mouseY = event?.clientY || window.innerHeight / 2
  triggerParticles(pieceId, { x: mouseX, y: mouseY })
  
  // Đổi nền
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
    resetBackground,
    triggerParticleEffect,
    initAnimations
  }
}