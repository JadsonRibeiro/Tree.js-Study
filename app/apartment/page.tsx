'use client'

import dynamic from 'next/dynamic'
import { View2 } from '@/components/canvas/View'
import { useColors } from '@/templates/hooks/useColors'
import { useTextures } from '@/templates/hooks/useTextures'
import { useRef, useState } from 'react'
import { Apartment } from '@/components/canvas/Examples'
import { ButtonPrimary } from '@/components/buttons/Primary'

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const { texture, changeTexture } = useTextures()
  const { color, changeColor } = useColors()
  const [cameraPosition, setCameraPosition] = useState()
  const [imageData, setImageData] = useState()

  const ref = useRef(null)

  const textureObj = {
    map: texture[0],
    normalMap: texture[1],
    roughnessMap: texture[2],
    metalnessMap: texture[3],
  }

  function handleExportModel() {
    ref.current.export()
  }

  function handleGetCameraPosition() {
    const cameraPosition = ref.current.getCurrentCameraPositon()
    console.log('cameraPosition', cameraPosition)
    setCameraPosition(cameraPosition)
  }

  function handleSetCameraPosition() {
    if (cameraPosition) {
      console.log('cameraPosition', cameraPosition)
      ref.current.setCurrentCameraPositon(cameraPosition)
    }
  }

  function handleTakeScreenshot() {
    const imgData = ref.current.takeScreenshot()
    setImageData(imgData)
  }

  return (
    <>
      <View2>
        <Apartment texture={textureObj} color={color} ref={ref} />
        <Common color={'white'} />
      </View2>
      <div className='absolute left-0 top-0'>
        <span className='text-lg'>Textura</span>
        <div>
          <ButtonPrimary onClick={() => changeTexture('beatup')}>beatup</ButtonPrimary>
          <ButtonPrimary onClick={() => changeTexture('rough')}>rough</ButtonPrimary>
          <ButtonPrimary onClick={() => changeTexture('smooth')}>smooth</ButtonPrimary>
          <ButtonPrimary onClick={() => changeTexture('pavingStones')}>pavingStones</ButtonPrimary>
          <ButtonPrimary onClick={() => changeTexture('pavingStones2')}>pavingStones2</ButtonPrimary>
        </div>
        <span className='text-lg'>Cor</span>
        <div>
          <ButtonPrimary onClick={() => changeColor('crimson')}>crimson</ButtonPrimary>
          <ButtonPrimary onClick={() => changeColor('steelblue')}>steelblue</ButtonPrimary>
          <ButtonPrimary onClick={() => changeColor('teal')}>teal</ButtonPrimary>
        </div>
        <span className='text-lg'>Ações</span>
        <div>
          <ButtonPrimary onClick={handleExportModel}>Exportar</ButtonPrimary>
          <ButtonPrimary onClick={handleGetCameraPosition}>Posição da camera (get)</ButtonPrimary>
          <ButtonPrimary onClick={handleSetCameraPosition}>Posição da camera (set)</ButtonPrimary>
          <ButtonPrimary onClick={handleTakeScreenshot}>Screnshot</ButtonPrimary>
        </div>
        {imageData && <img src={imageData} width={200} height={200} />}
      </div>
    </>
  )
}
