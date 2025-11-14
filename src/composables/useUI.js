// src/composables/useUI.js
import { ref } from 'vue'
import gsap from 'gsap'
import { useParticles } from './useParticles'

export function useUI() {

  
  const greetings = ref([
    // Dạng object với camera settings
    {
      text: "🎉 Chào mừng đến với 8 Pieces of Cake!",
      cameraPosition: [0, 5, 15],
      cameraLookAt: [0, 0, 0]
    },
    // Dạng string đơn giản (không có camera settings)
    "🍰 Mỗi miếng bánh mang một thông điệp ý nghĩa.",
    // Dạng object với camera settings
    {
      text: "💫 Hãy chọn một miếng để khám phá điều bạn cần!",
      cameraPosition: [5, 8, 12],
      cameraLookAt: [0, 0, 0]
    },
    {
      text: "✨ Chúc bạn một ngày tuyệt vời!",
      cameraLookAt: [0, 3, 0]
    },
    {
      text: "🌟 Đôi khi, những điều nhỏ bé tạo nên sự khác biệt lớn lao!",
      cameraPosition: [12, 4, 5],
      cameraLookAt: [0, 1, 0]
    },
    "🌙 Đêm nay trăng sáng thật đẹp phải không?",
    {
      text: "🎯 Hãy theo đuổi đam mê của bạn!",
      cameraPosition: [0, 12, 20]
    },
    "💖 Tình yêu là ngôn ngữ không cần lời nói",
    {
      text: "🌈 Sau cơn mưa trời lại sáng",
      cameraPosition: [-12, 8, -5],
      cameraLookAt: [0, 4, 0]
    },
    "🚀 Hãy mơ những giấc mơ lớn!"
  ])

  const currentGreeting = ref(0)

  const { triggerParticles } = useParticles()

  // --- Hàm helper để lấy text từ greeting ---
  const getGreetingText = (greeting) => {
    if (typeof greeting === 'string') {
      return greeting
    } else if (greeting && typeof greeting === 'object' && greeting.text) {
      return greeting.text
    }
    return "Chào mừng!"
  }

  // --- Hàm helper để lấy camera settings từ greeting ---
  const getCameraSettings = (greeting) => {
    if (greeting && typeof greeting === 'object') {
      return {
        cameraPosition: greeting.cameraPosition,
        cameraLookAt: greeting.cameraLookAt
      }
    }
    return { cameraPosition: null, cameraLookAt: null }
  }

  // --- Hàm di chuyển camera - nhận camera từ bên ngoài ---
  const moveCameraToPosition = (camera, position, lookAt, duration = 2) => {
    if (!camera) {
      console.warn('Camera không tồn tại')
      return
    }
    
    console.log('🔄 Di chuyển camera đến:', { position, lookAt })

    // Animate camera position
    if (position && Array.isArray(position)) {
      gsap.to(camera.position, {
        duration: duration,
        x: position[0],
        y: position[1], 
        z: position[2],
        ease: "power2.inOut"
      })
    }

    // Animate camera lookAt
    if (lookAt && Array.isArray(lookAt)) {
      // Tạo một object đích để animate
      const target = { x: lookAt[0], y: lookAt[1], z: lookAt[2] }
      
      gsap.to(camera, {
        duration: duration,
        onUpdate: () => {
          camera.lookAt(target.x, target.y, target.z)
        }
      })
    }
  }

  // --- Hàm chuyển greeting - xử lý cả string và object ---
  const changeGreeting = (camera = null) => {
    const oldIndex = currentGreeting.value
    currentGreeting.value = (currentGreeting.value + 1) % greetings.value.length
    const greeting = greetings.value[currentGreeting.value]
    
    console.log(`🔄 Chuyển greeting: ${oldIndex} -> ${currentGreeting.value}`, greeting)

    // Lấy text và camera settings
    const greetingText = getGreetingText(greeting)
    const { cameraPosition, cameraLookAt } = getCameraSettings(greeting)

    console.log('📝 Greeting text:', greetingText)
    console.log('🎥 Camera settings:', { cameraPosition, cameraLookAt })

    // Chỉ di chuyển camera nếu có cài đặt camera VÀ camera được cung cấp
    if (camera && (cameraPosition || cameraLookAt)) {
      moveCameraToPosition(camera, cameraPosition, cameraLookAt)
    } else if (cameraPosition || cameraLookAt) {
      console.log('📝 Có camera settings nhưng không có camera instance')
    } else {
      console.log('📝 Chỉ thay đổi text, giữ nguyên camera')
    }
  }

  // --- Hàm lấy greeting text hiện tại ---
  const getCurrentGreetingText = () => {
    const greeting = greetings.value[currentGreeting.value]
    return getGreetingText(greeting)
  }


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
    initAnimations,
    moveCameraToPosition,
    getCurrentGreetingText
  }
}