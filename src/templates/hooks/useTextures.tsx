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

  const pavingStones = [
    '/textures/PavingStones092_1K-JPG_Color.jpg',
    '/textures/PavingStones092_1K-JPG_NormalGL.jpg',
    '/textures/PavingStones092_1K-JPG_Roughness.jpg',
    '/textures/PavingStones092_1K-JPG_Displacement.jpg',
  ]

  const pavingStones2 = [
    '/textures/PavingStones092_2K-PNG_Color.png',
    '/textures/PavingStones092_2K-PNG_NormalGL.png',
    '/textures/PavingStones092_2K-PNG_Roughness.png',
    '/textures/PavingStones092_2K-PNG_Displacement.png',
  ]

  const [currentTexture, setCurrentTexture] = useState(smooth)

  const changeTexture = (texture: 'smooth' | 'rough' | 'beatup' | 'pavingStones' | 'pavingStones2') => {
    if (texture === 'smooth') {
      setCurrentTexture(smooth)
    } else if (texture === 'rough') {
      setCurrentTexture(rough)
    } else if (texture === 'beatup') {
      setCurrentTexture(beatup)
    } else if (texture === 'pavingStones') {
      setCurrentTexture(pavingStones)
    } else if (texture === 'pavingStones2') {
      setCurrentTexture(pavingStones2)
    }
  }

  return {
    changeTexture,
    texture: currentTexture,
  }
}
