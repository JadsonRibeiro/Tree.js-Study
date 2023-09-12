'use client'

import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useGLTF, Line, useCursor, MeshDistortMaterial, useFBX, useTexture } from '@react-three/drei'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Duck(props) {
  const duck = useGLTF('/models/duck.glb')

  console.log('duck', duck)

  useFrame((state, delta) => (duck.scene.rotation.y += delta))

  return <primitive object={duck.scene} {...props} />
}

export function Dog(props) {
  const dog = useGLTF('/models/dog.glb')

  console.log('dog', dog)

  return <primitive object={dog.scene} {...props} />
}

export function Planet(props) {
  const planet = useGLTF('/models/planet/scene.gltf')

  console.log('planet', planet)

  return <primitive object={planet.scene} {...props} />
}

export function MeetingRoom(props) {
  // const dae = useLoader(ColladaLoader, '/models/meeting-room/model.dae')

  // console.log('dae', dae)

  // return <primitive object={dae} {...props} dispose={null} />
  const textures = useTexture({
    map: '/textures/PavingStones092_1K-JPG_Color.jpg',
    roughnessMap: '/textures/PavingStones092_1K-JPG_Roughness.jpg',
    normalMap: '/textures/PavingStones092_1K-JPG_NormalGL.jpg',
    displacementMap: '/textures/PavingStones092_1K-JPG_Displacement.jpg',
  })

  const { scene, materials } = useGLTF('/models/apartments/01/apartment_2.gltf')

  Object.assign(materials[''], { ...textures })

  return <primitive object={scene} {...props} />
}

export function Hilda(props) {
  // const hilda = useFBX('/models/hilda/Hilda_Regular_00.fbx')
  // console.log('hilda', hilda)
  // return <primitive object={hilda} />

  const hilda = useGLTF('/models/hilda/Hilda_Regular_00.glb')

  console.log('hilda', hilda)

  return <primitive object={hilda.scene} {...props} />
}

export function Submarine(props) {
  // const hilda = useFBX('/models/hilda/Hilda_Regular_00.fbx')
  // console.log('hilda', hilda)
  // return <primitive object={hilda} />

  const submarine = useGLTF('/models/submarine/submarine.gltf')

  console.log('submarine', submarine)

  return <primitive object={submarine.scene} {...props} />
}

type TextureProps = {
  metalnessMap: string
  normalMap: string
  roughnessMap: string
  map: string
}

export function Apartment({ texture, color }: { texture: TextureProps; color: any }) {
  // const apartment = useFBX('/models/apartment/apartment_2.fbx')
  // console.log('apartment', apartment)
  // return <primitive object={apartment} />
  // const obj = useLoader(OBJLoader, '/models/apartment/apartment_2.obj')
  // console.log('apartment', obj)
  // return <primitive object={obj} />
  // const ap = useGLTF('/models/ap-2/ap.gltf')
  // console.log('ap', ap)
  // return <primitive object={ap.scene} {...props} />
  // const dae = useLoader(ColladaLoader, '/models/ap-2/ap.dae')
  // console.log('dae', dae)
  // return <primitive object={dae} {...props} dispose={null} />
  // const obj = useLoader(OBJLoader, '/models/ap-2/ap.obj')
  // console.log('apartment', obj)
  // return <primitive object={obj} />
  const { scene, nodes, materials } = useGLTF('/models/apartments/03/House.glb')

  console.log('materials', materials)
  console.log('texture', texture)

  const textures = useTexture({ ...texture })

  console.log('textures', textures)

  useLayoutEffect(() => {
    Object.assign(materials['stucco yellow outdoor.001'], {
      color: color,
      ...textures,
      // normalMap: texture.normalMap,
      // roughnessMap: texture.roughnessMap,
      // map: texture.map,
    })
  }, [scene, nodes, materials, texture, color, textures])

  return <primitive object={scene} />
}
