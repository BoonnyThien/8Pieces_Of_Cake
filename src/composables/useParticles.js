// src/composables/useParticles.js
import { tsParticles } from "@tsparticles/engine"
import { loadFireworksPreset } from "@tsparticles/preset-fireworks"
import { loadConfettiPreset } from "@tsparticles/preset-confetti"
import { loadStarsPreset } from "@tsparticles/preset-stars"
import { loadLinksPreset } from "@tsparticles/preset-links"
import { loadSnowPreset } from "@tsparticles/preset-snow"
import { loadBubblesPreset } from "@tsparticles/preset-bubbles"
import { loadEasingBackPlugin } from "@tsparticles/plugin-easing-back"
import { loadMotionPlugin } from "@tsparticles/plugin-motion"

let loaded = false

export async function useParticles() {
  if (!loaded) {
    await Promise.all([
      loadFireworksPreset(tsParticles),
      loadConfettiPreset(tsParticles),
      loadStarsPreset(tsParticles),
      loadLinksPreset(tsParticles),
      loadSnowPreset(tsParticles),
      loadBubblesPreset(tsParticles),
      loadEasingBackPlugin(tsParticles),
      loadMotionPlugin(tsParticles)
    ])
    loaded = true
  }

  // CẢI TIẾN: Config chi tiết cho từng piece
  const particleConfigs = {
    'piece-love': {
      preset: 'fireworks',
      colors: ['#ff69b4', '#ff1493', '#dc143c'],
      custom: {
        emitters: [{ life: { duration: 2.0 } }],
        particles: { size: { value: 4 } }
      }
    },
    'piece-luck': {
      preset: 'confetti', 
      colors: ['#00ff00', '#32cd32', '#228b22'],
      custom: {
        emitters: [{ life: { duration: 1.5 } }],
        particles: { size: { value: 6 } }
      }
    },
    'piece-joy': {
      preset: 'stars',
      colors: ['#ffff00', '#ffd700', '#ffa500'],
      custom: {
        emitters: [{ life: { duration: 2.5 } }],
        particles: { size: { value: 3 } }
      }
    },
    'piece-hope': {
      preset: 'links',
      colors: ['#1e90ff', '#00bfff', '#87ceeb'],
      custom: {
        emitters: [{ life: { duration: 3.0 } }],
        particles: { size: { value: 2 } }
      }
    },
    'piece-faith': {
      preset: 'snow',
      colors: ['#ffffff', '#f0f8ff', '#e6e6fa'],
      custom: {
        emitters: [{ life: { duration: 2.8 } }],
        particles: { size: { value: 5 } }
      }
    },
    'piece-passion': {
      preset: 'fireworks',
      colors: ['#ff0000', '#ff4500', '#b22222'],
      custom: {
        emitters: [{ life: { duration: 1.2 } }],
        particles: { size: { value: 4 } }
      }
    },
    'piece-courage': {
      preset: 'confetti',
      colors: ['#ff8c00', '#ffa500', '#ff7f50'],
      custom: {
        emitters: [{ life: { duration: 1.8 } }],
        particles: { size: { value: 7 } }
      }
    },
    'piece-peace': {
      preset: 'bubbles',
      colors: ['#87ceeb', '#b0e0e6', '#afeeee'],
      custom: {
        emitters: [{ life: { duration: 3.5 } }],
        particles: { size: { value: 8 } }
      }
    }
  }

  const triggerParticles = async (pieceId, { x, y }) => {
    const config = particleConfigs[pieceId] || particleConfigs['piece-love']
    
    const div = document.createElement('div')
    const id = `particles-${pieceId}-${Date.now()}`
    div.id = id
    div.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `
    document.body.appendChild(div)

    // Config particles chi tiết
    const options = {
      preset: config.preset,
      fullScreen: { enable: false },
      detectRetina: true,
      background: { color: "transparent" },
      particles: {
        color: { value: config.colors },
        size: config.custom.particles.size,
        move: { 
          enable: true,
          speed: pieceId === 'piece-passion' ? 6 : 2 // Passion nhanh hơn
        }
      },
      emitters: [{
        position: { 
          x: (x * 100) / window.innerWidth, 
          y: (y * 100) / window.innerHeight 
        },
        life: config.custom.emitters[0].life,
        rate: { 
          delay: 0.1, 
          quantity: pieceId === 'piece-love' ? 10 : 5 // Love nhiều particles hơn
        }
      }]
    }

    const container = await tsParticles.load({ id, options })

    setTimeout(() => {
      container.destroy()
      div.remove()
    }, 3000) // Tăng thời gian tồn tại
  }

  return { triggerParticles }
}