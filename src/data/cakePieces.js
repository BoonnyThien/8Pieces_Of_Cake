// src/data/cakePieces.js
// Định nghĩa 8 miếng bánh xếp thành vòng tròn 360°
// tượng trưng cho hành trình tu dưỡng của con người.

// Bán kính vòng tròn bánh
const radius = 1.5;
const pieceCount = 8;

// Tính góc chia đều cho 8 phần (360° / 8 = 45°)
const angleStep = (2 * Math.PI) / pieceCount;

// Danh sách 8 phần bánh
export const cakePieces = [
  {
    id: 'love',
    name: 'Tâm (Love)',
    description: 'Một chút ngọt ngào cho tình yêu, cho sự sẻ chia trong tim.',
    componentName: 'CakePieceLove',
    position: [radius * Math.cos(0 * angleStep), 0, radius * Math.sin(0 * angleStep)],
    rotation: [0, -Math.PI / 2 - 0 * angleStep, 0],
  },
  {
    id: 'kindness',
    name: 'Đức (Kindness)',
    description: 'Vị ngọt của lòng nhân ái và sự bao dung.',
    componentName: 'CakePieceKindness',
    position: [radius * Math.cos(1 * angleStep), 0, radius * Math.sin(1 * angleStep)],
    rotation: [0, -Math.PI / 2 - 1 * angleStep, 0],
  },
  {
    id: 'courage',
    name: 'Dũng (Courage)',
    description: 'Hương vị mạnh mẽ của lòng can đảm và niềm tin.',
    componentName: 'CakePieceCourage',
    position: [radius * Math.cos(2 * angleStep), 0, radius * Math.sin(2 * angleStep)],
    rotation: [0, -Math.PI / 2 - 2 * angleStep, 0],
  },
  {
    id: 'hope',
    name: 'Trí (Hope)',
    description: 'Ánh sáng của hy vọng và trí tuệ soi đường.',
    componentName: 'CakePieceHope',
    position: [radius * Math.cos(3 * angleStep), 0, radius * Math.sin(3 * angleStep)],
    rotation: [0, -Math.PI / 2 - 3 * angleStep, 0],
  },
  {
    id: 'joy',
    name: 'Lạc (Joy)',
    description: 'Hương vị tươi vui, rộn ràng như tiếng cười.',
    componentName: 'CakePieceJoy',
    position: [radius * Math.cos(4 * angleStep), 0, radius * Math.sin(4 * angleStep)],
    rotation: [0, -Math.PI / 2 - 4 * angleStep, 0],
  },
  {
    id: 'peace',
    name: 'An (Peace)',
    description: 'Sự thanh thản, an nhiên giữa cuộc sống bộn bề.',
    componentName: 'CakePiecePeace',
    position: [radius * Math.cos(5 * angleStep), 0, radius * Math.sin(5 * angleStep)],
    rotation: [0, -Math.PI / 2 - 5 * angleStep, 0],
  },
  {
    id: 'luck',
    name: 'Lộc (Luck)',
    description: 'Vị ngọt của may mắn và những điều bất ngờ tốt đẹp.',
    componentName: 'CakePieceLuck',
    position: [radius * Math.cos(6 * angleStep), 0, radius * Math.sin(6 * angleStep)],
    rotation: [0, -Math.PI / 2 - 6 * angleStep, 0],
  },
  {
    id: 'passion',
    name: 'Nhiệt (Passion)',
    description: 'Sức sống và đam mê cháy bỏng lan tỏa năng lượng tích cực.',
    componentName: 'CakePiecePassion',
    position: [radius * Math.cos(7 * angleStep), 0, radius * Math.sin(7 * angleStep)],
    rotation: [0, -Math.PI / 2 - 7 * angleStep, 0],
  },
];
