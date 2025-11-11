// src/composables/useCakeStats.js
import { ref } from 'vue'

export function useCakeStats() {
  const loading = ref(false)

  const recordClick = async (pieceId) => {
    try {
      console.log(`📝 Tracking click for: ${pieceId}`)
      
      const response = await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pieceId }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Click tracked:', result)
        return result
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (err) {
      console.warn('⚠️ Failed to track click:', err)
      // Vẫn trả về success để không ảnh hưởng trải nghiệm người dùng
      return { success: false, error: err.message }
    }
  }

  return {
    loading,
    recordClick
  }
}