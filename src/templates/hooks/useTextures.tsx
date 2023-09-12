import { useState } from 'react'

export function useTextures() {
  const smooth = [
    '/textures/Metal030_1K_Color.jpg',
    '/textures/Metal030_1K_NormalGL.jpg',
    '/textures/Metal030_1K_Roughness.jpg',
    '/textures/Metal030_1K_Metalness.jpg',
  ]

  const rough = [
    '/textures/Metal040_1K_Color.jpg',
    '/textures/Metal040_1K_NormalGL.jpg',
    '/textures/Metal040_1K_Roughness.jpg',
    '/textures/Metal040_1K_Metalness.jpg',
  ]

  const beatup = [
    '/textures/Metal021_1K_Color.jpg',
    '/textures/Metal021_1K_NormalGL.jpg',
    '/textures/Metal021_1K_Roughness.jpg',
    '/textures/Metal021_1K_Metalness.jpg',
  ]

  const [currentTexture, setCurrentTexture] = useState(smooth)

  const changeTexture = (texture: 'smooth' | 'rough' | 'beatup') => {
    if (texture === 'smooth') {
      setCurrentTexture(smooth)
    } else if (texture === 'rough') {
      setCurrentTexture(rough)
    } else if (texture === 'beatup') {
      setCurrentTexture(beatup)
    }
  }

  return {
    changeTexture,
    texture: currentTexture,
  }
}
