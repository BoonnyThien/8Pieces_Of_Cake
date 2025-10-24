<template>
  <div class="ui-overlay">
    <header class="header">
      <div class="logo"> 8 Pices of Cake </div>
    </header>
    <div class="greeting-card">
      <h2 class="greeting-title">💖</h2>
      <p class="greeting-text">{{ greetingText }}</p>
    </div>
    <div class="controls">
      <button class="btn" @click="$emit('changeGreeting')">✨ Đổi Lời Chúc</button>
      <button class="btn" @click="$emit('swapItems')">🎁 Hoa x2 </button>
      <button class="btn" @click="$emit('changeBackground')">🎨 Đổi Nền</button>
    </div>
  </div>
</template>

<script setup>
// Định nghĩa các props mà component này sẽ nhận từ App.vue
defineProps({
  greetingText: String
});

// Định nghĩa các sự kiện mà component này sẽ gửi ra
defineEmits(['changeGreeting', 'swapItems','changeBackground']);
</script>