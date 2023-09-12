'use client'

import { View2 } from '@/components/canvas/View'
import { useColors } from '@/templates/hooks/useColors'
import { useTextures } from '@/templates/hooks/useTextures'
import dynamic from 'next/dynamic'

const Apartment = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Apartment), { ssr: false })

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
  const { texture, changeTexture } = useTextures()
  const { color, changeColor } = useColors()

  console.log('texture', texture)
  console.log('color', color)

  const textureObj = {
    map: texture[0],
    normalMap: texture[1],
    roughnessMap: texture[2],
    metalnessMap: texture[3],
  }

  return (
    <>
      <View2>
        <Apartment texture={textureObj} color={color} />
        <Common color={'white'} />
      </View2>
      <div className='absolute left-0 top-0'>
        <span>Textura</span>
        <div>
          <button className='p-1' onClick={() => changeTexture('beatup')}>
            beatup
          </button>
          <button className='p-1' onClick={() => changeTexture('rough')}>
            rough
          </button>
          <button className='p-1' onClick={() => changeTexture('smooth')}>
            smooth
          </button>
        </div>
        <span>Cor</span>
        <div>
          <button className='p-1' onClick={() => changeColor('crimson')}>
            crimson
          </button>
          <button className='p-1' onClick={() => changeColor('steelblue')}>
            steelblue
          </button>
          <button className='p-1' onClick={() => changeColor('teal')}>
            teal
          </button>
        </div>
      </div>
    </>
  )
}
