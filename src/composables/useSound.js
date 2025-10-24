import { ref } from 'vue'

export const useSound = () => {
  const audio = ref(null)

  const playSound = (soundName) => {
    if (audio.value) {
      audio.value.pause()
    }
    audio.value = new Audio(`/sounds/${soundName}.mp3`)
    audio.value.play()
  }

  const stopSound = () => {
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
  }

  return {
    playSound,
    stopSound
  }
}