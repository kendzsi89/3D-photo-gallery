import React, { useState, useEffect } from 'react';
import { Text, Billboard } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export default function WelcomeText() {
  const [opacity, setOpacity] = useState(1); // Initial opacity of the plane
  const [clicked, setClicked] = useState(false); // Detect if clicked
  const { camera } = useThree(); // Access the camera

  // Handle the fade-out effect and camera movement
  useFrame(() => {
    if (clicked && opacity > 0) {
      setOpacity((prev) => Math.max(prev - 0.02, 0)); // Gradually reduce opacity
    }

    // Move camera after fading out
    if (opacity === 0) {
      camera.position.lerp({ x: 0, y: 0, z: 0 }, 0.01); // Adjust the target position as needed
    }
  });

  // Handle click event
  const handleClick = () => {
    setClicked(true);
  };

  return (
    <>
      {/* Full-screen black plane */}
      <mesh position={[0, 4, -1]} rotation={[-Math.PI/2,0,0]} onClick={handleClick}>
        <planeGeometry args={[25, 40]}  /> {/* Large plane covering the screen */}
        <meshBasicMaterial color="black" transparent opacity={opacity} />
      </mesh>

      {/* Billboard Text */}
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        {!clicked && <mesh onClick={handleClick}>
          <Text color={"red"} position={[0, 0.3, 5]} fontSize={0.3} rotation={[0, 0, 0]}>
            Click here</Text>
          <Text color={"red"} position={[0, -0.3, 5]} fontSize={0.3} rotation={[0, 0, 0]}>
            to enter
          </Text>
        </mesh>}
      </Billboard>
    </>
  );
}
