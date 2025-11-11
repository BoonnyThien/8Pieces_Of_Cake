<template>
  <!-- Giao diện overlay UI chính (logo, greeting card, controls) -->
  <div class="ui-overlay">
    <!-- Header / logo -->
    <header class="header">
      <div class="logo">BoonnyBoon Cake</div>
    </header>

    <!-- Thẻ greeting: hiển thị emoji lớn và văn bản greeting -->
    <div class="greeting-card">
      <h2 class="greeting-title">{{ getGreetingEmoji() }}</h2>
      <p class="greeting-text">{{ greetingText || '❌ Không có greetingText!' }}</p>
    </div>

    <!-- Nút điều khiển: đổi hiệu ứng greeting / đổi nền -->
    <div class="controls">
      <!-- Emit events để component cha xử lý (composable useUI sẽ lắng nghe) -->
      <button class="btn" @click="$emit('changeGreeting')">✨ Hiệu ứng</button>
      <button class="btn" @click="$emit('changeBackground')">🎨 Đổi Nền</button>
    </div>
  </div>
</template>

<style scoped>
/* Style để bạn có thể mở rộng dễ dàng: giữ trống nếu muốn dùng styles từ global */
</style>

<script setup>
// Props: component nhận 1 prop text để hiển thị greeting
const props = defineProps({
  greetingText: String
});

// Emit events: 'changeGreeting' và 'changeBackground' sẽ được gọi khi nhấn nút
defineEmits(['changeGreeting','changeBackground']);

// Hàm chọn emoji dựa trên nội dung greeting (giúp giao diện trực quan hơn)
// Nếu không nhận diện được emoji trong text, trả về emoji mặc định
const getGreetingEmoji = () => {
  const text = props.greetingText || '';
  if (text.includes('💖')) return '💖';
  if (text.includes('😄')) return '😄';
  if (text.includes('🌠')) return '🌠';
  if (text.includes('✝️')) return '✝️';
  if (text.includes('🍀')) return '🍀';
  if (text.includes('🔥')) return '🔥';
  if (text.includes('🦁')) return '🦁';
  if (text.includes('🕊️')) return '🕊️';
  return '💖'; // Mặc định
};
</script>