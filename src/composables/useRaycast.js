import { ref } from 'vue'

export const useRaycast = () => {
  const raycast = ref(null)

  return {
    raycast
  }
}