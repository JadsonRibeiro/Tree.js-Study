'use client'

import dynamic from 'next/dynamic'
import { View2 } from '@/components/canvas/View'
import { useColors } from '@/templates/hooks/useColors'
import { useTextures } from '@/templates/hooks/useTextures'
import { useRef } from 'react'
import { Apartment, Bathroom } from '@/components/canvas/Examples'
import { ButtonPrimary } from '@/components/buttons/Primary'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  // const { texture, changeTexture } = useTextures()
  // const { color, changeColor } = useColors()

  const ref = useRef(null)

  // const textureObj = {
  //   map: texture[0],
  //   normalMap: texture[1],
  //   roughnessMap: texture[2],
  //   metalnessMap: texture[3],
  // }

  function handleExportModel() {
    ref.current.export()
  }

  return (
    <>
      <View2>
        <Bathroom />
        <Common color={'white'} />
      </View2>
    </>
  )
}
