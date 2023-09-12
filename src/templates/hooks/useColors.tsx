import * as THREE from 'three'
import { useState } from 'react'

export function useColors() {
  const crimson = new THREE.Color(0xdc143c)
  const teal = new THREE.Color(0x008080)
  const steelblue = new THREE.Color(0x4682b4)

  const [color, setColor] = useState(crimson)

  const changeColor = (newColor: 'crimson' | 'teal' | 'steelblue') => {
    if (newColor === 'crimson') {
      setColor(crimson)
    } else if (newColor === 'teal') {
      setColor(teal)
    } else if (newColor === 'steelblue') {
      setColor(steelblue)
    }
  }

  return {
    changeColor,
    color,
  }
}
