// src/composables/useThrottledLoop.js
import { onUnmounted } from 'vue';
import { useRenderLoop } from '@tresjs/core';

// --- Logic bạn đã cung cấp, được tách ra ---
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const targetFPS = isMobile ? 30 : 60;
const interval = 1000 / targetFPS; // Thời gian (ms) giữa các frame
let then = Date.now();
// ----------------------------------------

// Lấy vòng lặp render gốc của TresJS
const { onLoop: onTresLoop } = useRenderLoop();

// Tạo một Set (tập hợp) để lưu trữ các hàm (callbacks)
// mà App.vue (hoặc các component khác) muốn chạy
const throttledCallbacks = new Set();

// Đây là vòng lặp gốc, chạy mỗi frame
const internalLoop = ({ delta, elapsed, clock }) => {
  const now = Date.now();
  const timeElapsed = now - then;

  // Chỉ chạy nếu đã đủ thời gian (interval)
  if (timeElapsed > interval) {
    then = now - (timeElapsed % interval);
    
    // Gọi tất cả các hàm (animations) đã được đăng ký
    for (const callback of throttledCallbacks) {
      callback({ delta, elapsed, clock });
    }
  }
};

// Bắt đầu chạy vòng lặp nội bộ
onTresLoop(internalLoop);


// --- Hàm public mà App.vue sẽ gọi ---
export function useThrottledLoop() {

  // Cung cấp một hàm 'onLoop' mới
  // Component (như App.vue) sẽ gọi hàm này để đăng ký logic animation
  const onLoop = (callback) => {
    throttledCallbacks.add(callback);
    
    // Tự động dọn dẹp khi component bị unmount
    onUnmounted(() => {
      throttledCallbacks.delete(callback);
    });
  };

  return {
    onLoop, // Hàm onLoop đã được điều tiết
    isMobile,
    targetFPS
  };
}