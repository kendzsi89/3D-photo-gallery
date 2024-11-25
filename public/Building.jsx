import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Building(props, lightsOut) {
  
  const { nodes, materials } = useGLTF('/building.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.VR_Gallery_VR_Gallery_0.geometry}
          material={materials.VR_Gallery}
          position={[0,0.3,0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={250}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/building.gltf')
