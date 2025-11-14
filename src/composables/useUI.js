// src/composables/useUI.js
import { ref } from 'vue'
import gsap from 'gsap'
import { useParticles } from './useParticles'

export function useUI() {


    const greetings = ref([
  "81 . Ấn nút /Hiệu ứng/ để đọc Text",
  "80 . Chào mừng đến với OctaTastenis /Bánh 8 Hương liệu/ ",
  "79 . Mô hình Cake chính giữa có thể tương tác dc",
  "78 . Ấn vào từng miếng bánh để xem hiệu ứng ",
  "77 . Có thể spam núi hiệu ứng trong khi bánh xoay",
  "76 . Camera tự do tùy biến và sẽ chuyển đổi vài lần ",
  {
    text: "75 . Các tính năng không phải lỗi ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 0, 0]
  },
  "74 . Các bánh trả về vị trí vẫn đúng chỉ do ",
  "73 . -> hàm cha thiết lập vòng tròn dẫn tới sai lệch",
  "72 . Mô hình tải chậm do file đầu vào nặng quá ",
  "71 . -> đã draco rồi mà vẫn khá nặng",

  // 70 có camera
  {
    text: "70 .Nếu có sự delay animation vui lòng ",
    cameraPosition: [0, 5, -15],      // tự sửa
    cameraLookAt: [0, 0, 0]
  },

  "69 . -> đợi",
  "68 . -> làm mới lại trang",
  "67 . -> đổi trình duyệt",
  "66 . -> do có nhiều requests cùng lúc dẫn tới nghẽn",
  {
    text: "65 . Đã hết phần giới thiệu ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 10, 20]
  },
  "64 . Các vế sau sẽ là phần ...",
  "63 . ->mang tính ngẫu nhiên hơn",
  "62 . ->có thể bỏ qua",
  "61 . ->chỉ để chia sẻ thui",

  // 60 có camera
  {
    text: "60 . Lâu đài dc xây lên trên nền cát đó liệu có thể chịu nổi sóng lớn hay sụp đổ từ từ ",
    cameraPosition: [0, 5, 15],
    cameraLookAt: [-15, 1,0]
  },

  "59 . Thất bại trong chuẩn bị cũng có nghĩa là chuẩn bị cho sự thất bại .. Benjamin franklin ",
  "58 . Đôi khi sự thật nằm ở phía khuất của mặt trăng ",
  "57 . ... Nhưng không có nghĩa những gì trước mắt là giả dối",
  "56 . Good New(2025)",
  {
    text: "55 . Quyển sách ấy cũng được mở sang trang mới r nhưng đó có phải là lựa chọn đúng  ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 10, -20]
  },
  "54 . Có người giống như con diều",
  "53 . Họ cứ bay lên mãi nếu có người cầm sợi dây",
  "52 . Họ chưa từng nghĩ người cầm dây cũng có lúc mệt mỏi",
  "51 . Put Your Head On My Shoulder (2019)",

  // 50 có camera
  {
    text: "50 . Cái bóng của ngọn đuốc càng bám chặt vào người cầm nó, thì ánh sáng của nó càng rực rỡ và rõ ràng hơn ",
    cameraPosition: [0, 5, 15],
   cameraLookAt: [-15, 1,0]
  },

  "49 . Tôi sẽ mang bông tuyết xuân từng rơi xuống cánh đồng lúa mạch",
  "48 . -> đến nơi nỗi buồn của những ai đã run rẩy vì giá rét",
  "47 . Ta sẽ tán ngẫu về sức mạnh của nỗi buồn , và bước đến nơi nỗi buồn của sự chờ đợi",
  "46 . Genie, Make a Wish",
  {
    text: "45 . Giọng nói chân thật vẫn ở đó, nhưng ta lại thích nghe tiếng vọng được chính mình bóp méo. ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 0, 0]
  },
  "44 . Chỉ khi luôn đứng trên vạch xuất phát mới  có tư cách xuất phát",
  "43 . Điều sau có đúng",
  "42 . Chẳng qua chỉ là",
  "41 . -> đổi thứ ta có , lấy thứ ta muốn",

  // 40 có camera
  {
    text: "40 . Giọng nói chân thật vẫn ở đó, nhưng ta lại thích nghe tiếng vọng được chính mình bóp méo.",
    cameraPosition: [0, -15, -15],
    cameraLookAt: [15, 1,0]

  },

  "39 . Như chú bé chăn cừu, ... nói thật không ai tin",
  "38 . Anataa",
  "37 . Gợi ý .. khao khát .. phản ứng .. phần thưởng",
  "36 . 22",
  {
    text: "35 . Tiếng vọng cứ k ngừng trong thinh lặng, ta thì cứ bật những bản nhạc vô nghĩa thật to để át đi tiếng vọng ấy. ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 0, 0]
  },
  "34 . Dòng chảy của thời đại cuối cũng không thể cản nổi bước chân",
  "33 . -> mà để lại dấu ấn trên mỗi người ",
  "32 . Khu phố nhỏ ",
  "31 .  Bắc Phượng ",

  // 30 có camera
  {
    text: "30 . Chiếc chuông bị đánh khẽ, chỉ tạo ra những âm thanh vô hồn, và ta cứ mãi tạo ra tiếng động để che lấp đi khoảng lặng đáng sợ ấy.",
    cameraPosition: [15, 5, 0],
    cameraLookAt: [15, 1,0]
  },

  "29 . xu hướng internalize (nội hóa)",
  "28 . Nàng công chúa ngủ trong quan tài pha lê",
  "27 . ",
  "26 . ",
  {
    text: "25 . Nhật hành nhất thiện ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 0, 0]
  },
  "24 . Gia thiện nhi căng bất năng ",
  "23 . Thiện thư",

  // 22 có camera
  {
    text: "22 . Happy Birthday to Me ",
    cameraPosition: [0, 15, 5],
    cameraLookAt: [0, 0, 0]
  },

  // -1 có camera
  {
    text: "-1 . AVPD",
    cameraPosition: [0, 100, 0],
    cameraLookAt: [0, 100, 0]
  },

  // -2 chỉ là text
   {
    text: "-2 .và DPD ",
    cameraPosition: [0, 100, 0],
    cameraLookAt: [0, 100, 0]
  }
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