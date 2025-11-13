// src/data/cakePieces.js
const radius = 1.5
const pieceCount = 8
const angleStep = (2 * Math.PI) / pieceCount

export const cakePiecesData = [
  // 1️⃣ Love – Tình yêu
  {
    id: 'piece-love',
    name: 'Love (Tình yêu)',
    description: 'Tượng trưng cho tình yêu và sự gắn bó.',
    componentName: 'CakePieceLove',
    position: [radius * Math.cos(0 * angleStep), 0, radius * Math.sin(0 * angleStep)],
    rotation: [0, -Math.PI / 2 - 0 * angleStep, 0],
    color1: '#A0522D', // Vỏ bánh
    color2: '#FADADD', // Lớp giữa hồng nhạt
    color3: '/textures/strawberry.jpg', // Lớp trên (texture dâu)
    decorPath: null
  },

  // 2️⃣ Luck – May mắn
  {
    id: 'piece-luck',
    name: 'Luck (May mắn)',
    description: 'Mang lại vận may và cơ hội tốt đẹp.',
    componentName: 'CakePieceLuck',
    position: [radius * Math.cos(1 * angleStep), 0, radius * Math.sin(1 * angleStep)],
    rotation: [0, -Math.PI / 2 - 1 * angleStep, 0],
    color1: '#8B4513',
    color2: '#DFFFDF',
    color3: '/textures/strawberry.jpg', // Màu xanh lá biểu trưng cho may mắn
    decorPath: null
  },

  // 3️⃣ Joy – Niềm vui
  {
    id: 'piece-joy',
    name: 'Joy (Niềm vui)',
    description: 'Thể hiện sự hạnh phúc và năng lượng tích cực.',
    componentName: 'CakePieceJoy',
    position: [radius * Math.cos(2 * angleStep), 0, radius * Math.sin(2 * angleStep)],
    rotation: [0, -Math.PI / 2 - 2 * angleStep, 0],
    color1: '#A0522D',
    color2: '#FFF8DC',
    color3: '/textures/strawberry.jpg', // Vàng tươi vui
    decorPath: null
  },

  // 4️⃣ Peace – Bình an
  {
    id: 'piece-peace',
    name: 'Peace (Bình an)',
    description: 'Tượng trưng cho sự yên bình và cân bằng nội tâm.',
    componentName: 'CakePiecePeace',
    position: [radius * Math.cos(3 * angleStep), 0, radius * Math.sin(3 * angleStep)],
    rotation: [0, -Math.PI / 2 - 3 * angleStep, 0],
    color1: '#A0522D',
    color2: '#E0FFFF',
    color3: '/textures/strawberry.jpg', // Xanh da trời nhạt
    decorPath: null
  },

  // 5️⃣ Hope – Hy vọng
  {
    id: 'piece-hope',
    name: 'Hope (Hy vọng)',
    description: 'Biểu tượng của niềm tin và khát vọng vươn tới.',
    componentName: 'CakePieceHope',
    position: [radius * Math.cos(4 * angleStep), 0, radius * Math.sin(4 * angleStep)],
    rotation: [0, -Math.PI / 2 - 4 * angleStep, 0],
    color1: '#A0522D',
    color2: '#FFF5EE',
    color3: '/textures/strawberry.jpg', // Hồng đậm ấm áp
    decorPath: null
  },

  // 6️⃣ Passion – Đam mê
  {
    id: 'piece-passion',
    name: 'Passion (Đam mê)',
    description: 'Nguồn năng lượng sáng tạo và nhiệt huyết sống.',
    componentName: 'CakePiecePassion',
    position: [radius * Math.cos(5 * angleStep), 0, radius * Math.sin(5 * angleStep)],
    rotation: [0, -Math.PI / 2 - 5 * angleStep, 0],
    color1: '#8B0000',
    color2: '#FFC0CB',
    color3: '/textures/strawberry.jpg', // Đỏ rực lửa
    decorPath: null
  },

  // 7️⃣ Faith – Lòng tốt
  {
    id: 'piece-faith',
    name: 'Faith (Lòng tốt)',
    description: 'Sự ấm áp và lòng nhân hậu trong mỗi con người.',
    componentName: 'CakePieceFaith',
    position: [radius * Math.cos(6 * angleStep), 0, radius * Math.sin(6 * angleStep)],
    rotation: [0, -Math.PI / 2 - 6 * angleStep, 0],
    color1: '#A0522D',
    color2: '#FFF0F5',
    color3: '/textures/strawberry.jpg', // Màu hồng nhạt dịu dàng
    decorPath: null
  },

  // 8️⃣ Courage – Dũng cảm
  {
    id: 'piece-courage',
    name: 'Courage (Dũng cảm)',
    description: 'Sức mạnh vượt qua thử thách và nỗi sợ hãi.',
    componentName: 'CakePieceCourage',
    position: [radius * Math.cos(7 * angleStep), 0, radius * Math.sin(7 * angleStep)],
    rotation: [0, -Math.PI / 2 - 7 * angleStep, 0],
    color1: '#5C4033',
    color2: '#FAF0E6',
    color3: '/textures/strawberry.jpg', // Xanh lam mạnh mẽ
    // decorPath: '/models/decorations/lion.glb'
    decorPath : null
  }
]
