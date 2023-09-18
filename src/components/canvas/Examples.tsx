'use client'

import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useLoader, dispose, useThree } from '@react-three/fiber'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { useGLTF, Line, useCursor, MeshDistortMaterial, useFBX, useTexture } from '@react-three/drei'
import { HouseModel } from '../models/House'

export const Blobs = ({ route = '/', ...props }) => {
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
  const { scene, materials, nodes } = useGLTF('/models/apartments/04/patriani_refatorado.glb')

  console.log('materials', materials)
  console.log('nodes', nodes)

  return <primitive object={scene} {...props} />
}

export function Bathroom(props) {
  const [selectedObject, setSelectedObject] = useState()

  const { camera } = useThree()

  const { scene, materials, nodes } = useGLTF('/models/bathroom/bathroom-refatorado.glb')

  const faucetObj = useGLTF('/models/objects/torneiras/01/model.gltf')

  console.log('materials', materials)
  console.log('nodes', nodes)
  console.log('camera', camera)

  // nodes['mesh_57'].material = new THREE.MeshStandardMaterial({
  //   color: new THREE.Color(0xff0000),
  // })

  function removeObjectByName(name: string) {
    let object = scene.getObjectByName(name)
    console.log('object', object)

    object.dispose()
  }

  function handleClickOnModel(e: any) {
    e.stopPropagation()

    console.log('event', e)
    console.log('object', e.object)

    e.object.parent.remove(e.object)

    // setSelectedObject(e.object)
  }

  // useLayoutEffect(() => {
  //   console.log('layout effect trigged #1')
  //   if (selectedObject) {
  //     console.log('layout effect trigged #2')
  //     const geometry = new THREE.BoxGeometry(1, 1, 1)
  //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  //     const newObject = new THREE.Mesh(geometry, material)

  //     console.log('selectedObject name', selectedObject.name)
  //     console.log('selectedObject', selectedObject)

  //     // nodes[selectedObject.name] = newObject
  //     const obj = nodes[selectedObject.name]
  //     console.log('obj', obj)
  //   }
  // }, [scene, nodes, selectedObject])

  return <primitive object={scene} {...props} onClick={handleClickOnModel} />
}

export function Hilda(props) {
  const hilda = useGLTF('/models/hilda/Hilda_Regular_00.glb')

  console.log('hilda', hilda)

  return <primitive object={hilda.scene} {...props} />
}

export function Submarine(props) {
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

type ApartmentModelProps = {
  texture: TextureProps
  color: any
}

export const Apartment = forwardRef(function Apartment({ texture, color }: ApartmentModelProps, ref) {
  const modelRef = useRef()

  const { camera, gl } = useThree()

  const link = document.createElement('a')
  link.style.display = 'none'
  document.body.appendChild(link)

  function save(blob, filename) {
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename)
  }

  useImperativeHandle(ref, () => {
    return {
      export() {
        const exporter = new GLTFExporter()

        exporter.parse(
          modelRef.current,
          (result) => {
            saveArrayBuffer(result, 'scene.glb')
          },
          (error) => {
            console.error('Erro ao gerar arquivo', error)
          },
          { binary: true },
        )
      },
      getCurrentCameraPositon() {
        // spread to avoid get ref
        const camPosition = { ...camera.position }
        return camPosition
      },
      setCurrentCameraPositon(position: any) {
        camera.position.set(position.x, position.y, position.z)
      },
      takeScreenshot() {
        // const link = document.createElement('a')
        // link.setAttribute('download', 'canvas.png')
        // link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
        // link.click()

        const imageData = gl.domElement.toDataURL('image/png')
        console.log('imageData', imageData)
        return imageData
      },
    }
  })

  const [selectedObject, setSelectedObject] = useState('')

  const { scene, nodes, materials } = useGLTF('/models/apartments/03/House.glb')

  const faucetObj = useGLTF('/models/objects/torneiras/01/model.gltf')

  console.log('faucetObj', faucetObj)

  const sceneAddRes = scene.add(faucetObj.scene)
  console.log('sceneAddRes', sceneAddRes)

  const textures = useTexture({ ...texture })

  console.log('scene', scene)
  console.log('nodes', nodes)
  console.log('materials', materials)
  console.log('textures', textures)

  function handleSceneClick(e: any) {
    e.stopPropagation()

    console.log('event', e)
    console.log('x', e.point.x)
    console.log('y', e.point.y)
    console.log('z', e.point.z)
    // setSelectedObject(e.object.name)

    faucetObj.scene.position.set(e.point.x, e.point.y, e.point.z)

    // const object = scene.add(faucetObj.scene)
    // console.log('object add', object)
    // object.position.set(e.point)
  }

  useLayoutEffect(() => {
    if (selectedObject) {
      const newMaterial = new THREE.MeshStandardMaterial({
        ...nodes[selectedObject].material,
        ...textures,
        color,
      })

      nodes[selectedObject].material = newMaterial
    }
  }, [scene, nodes, texture, color, textures, selectedObject])

  return <primitive object={scene} ref={modelRef} onClick={handleSceneClick} />
})
