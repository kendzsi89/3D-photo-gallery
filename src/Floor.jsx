import React from 'react';

import {Float, Text3D} from '@react-three/drei';

export default function Floor() {
    return (
        <group position={[0, 0, 0]}>
        <Float speed={0}>
        <Text3D 
        font="./src/assets/Tilt Neon_Regular.json" 
        position={[-2.1, 0.1, 1.7]} 
        scale={[1, 1, 0.05]} 
        rotation={[Math.PI/2,-Math.PI,-Math.PI/2]}
        size={0.6}
        curveSegments={24}
                  bevelSegments={1}
                  bevelEnabled
                  bevelSize={0.0001}
                  bevelThickness={0.001}
                  height={1}
                  lineHeight={0}
                  letterSpacing={0.01}
        >Welcome<meshDepthMaterial color="white" />
        </Text3D>
        <Text3D 
        font="./src/assets/Tilt Neon_Regular.json" 
        position={[-1.6, 0.1, -2.2]} 
        scale={[1, 1, 0.05]} 
        rotation={[Math.PI/2,-Math.PI,-Math.PI]}
        size={0.4}
        curveSegments={24}
                  bevelSegments={1}
                  bevelEnabled
                  bevelSize={0.0001}
                  bevelThickness={0.03}
                  height={1}
                  lineHeight={0}
                  letterSpacing={0.001}
        >to my gallery<meshDepthMaterial color="white" />
        </Text3D>
        </Float>
        </group>
    );
  };