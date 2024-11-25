import React from 'react';

import { Text3D, Float} from '@react-three/drei';

export default function Bio({title, text, text2}) {
    
    return (
    <group position={[3.6, 4.6, 12.5]}>
    <Float speed={0}>
    <Text3D 
    font="./src/assets/Open Sans_Regular.json" 
    position={[-12.5, 2.3, 0.005]} 
    scale={[1, 1, 0.05]} 
    rotation={[0,Math.PI,0]}
    size={0.3}
    curveSegments={24}
              bevelSegments={1}
              bevelEnabled
              bevelSize={0.02}
              bevelThickness={0.03}
              height={1}
              lineHeight={0.9}
              letterSpacing={0.01}
    >
      {title}
      <meshDepthMaterial color="white" />
           
    </Text3D>
    <Text3D 
    font="./src/assets/Open Sans_Regular.json" 
    position={[-16, 2.3, 0.001]} 
    scale={[1, 1, 0.05]}
    rotation={[0,Math.PI/2,0]}
    size={0.27}
    curveSegments={24}
              bevelSegments={1}
              bevelEnabled
              bevelSize={0.01}
              bevelThickness={0.01}
              height={1}
              lineHeight={1.4}
              letterSpacing={0.006}
    >
      {text}
      <meshDepthMaterial color="black" />

    </Text3D>
    <Text3D 
    font="./src/assets/Open Sans_Regular.json" 
    position={[-16, 2.6, -25]} 
    scale={[1, 1, 0.05]}
    rotation={[0,0,-(Math.PI/2)]}
    size={0.18}
    curveSegments={24}
              bevelSegments={1}
              bevelEnabled
              bevelSize={0.01}
              bevelThickness={0.01}
              height={1}
              lineHeight={1.4}
              letterSpacing={0.005}
    >
      {text2}
      <meshDepthMaterial color="black" />

    </Text3D>
    </Float>
    </group>
)}