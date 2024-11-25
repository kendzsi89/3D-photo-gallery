// src/MainHall.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Text, Plane, OrbitControls, SpotLight } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// Component for creating walls
const Wall = ({ position, rotation, color }) => (
  <Box args={[10, 5, 0.1]} position={position} rotation={rotation}>
    <meshStandardMaterial attach="material" color={color} />
  </Box>
);

// Component for the gallery map
const GalleryMap = ({ onClick }) => (
  <group position={[0, 0, 0]}>
    {/* Map Background */}
    <Plane args={[5, 5]} position={[0, 0, 1]} rotation={[0, 0, 0]} onClick={onClick}>
      <meshStandardMaterial attach="material" color="white" />
    </Plane>

    {/* Map Text */}
    <Text position={[0, 1.5, 1.01]} fontSize={0.5} color="black" anchorX="center" anchorY="middle">
      Gallery Map
    </Text>

    {/* Hall A Button */}
    <Text position={[-1.5, 0, 1.01]} fontSize={0.3} color="black" anchorX="center" anchorY="middle" onClick={() => onClick('Hall A')}>
      Hall A
    </Text>

    {/* Hall B Button */}
    <Text position={[1.5, 0, 1.01]} fontSize={0.3} color="black" anchorX="center" anchorY="middle" onClick={() => onClick('Hall B')}>
      Hall B
    </Text>
  </group>
);

// Back Button Component
const BackButton = ({ onClick }) => (
  <group position={[0, 5, 1]}>
    <Text
      position={[-1.5, -3, 1]}
      fontSize={0.2}
      color="white"
      anchorX="center"
      anchorY="middle"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      Back to Ticket Office
    </Text>
  </group>
);

const MainHall = ({onBack}) => {
  const navigate = useNavigate();

  const handleClick = (hallName) => {
    alert(`You clicked ${hallName}`);
  };

  // Navigate back to the TicketOffice
  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 2, 8], fov: 80 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 100, 10]} />
    
      {/* Floor */}
      <Box args={[20, 50, 0.1]} position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial attach="material" color="darkred" />
      </Box>

      {/* Ceiling */}
      <Box args={[20, 50, 0.1]} position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial attach="material" color="darkred" />
      </Box>

      {/* Back Wall */}
      <Wall position={[0, 0, -25]} rotation={[0, 0, 0]} color="darkred" />

      {/* Left Wall */}
      <Wall position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="darkred" />

      {/* Right Wall */}
      <Wall position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color="darkred" />

      {/* Gallery Map in the center of the hall */}
      <GalleryMap onClick={handleClick} />

      {/* Back Button */}
      <BackButton onClick={onBack} />

      {/* Orbit Controls for zoom and pan functionality */}
      <OrbitControls 
        enableZoom={true}     // Allows scroll to zoom
        enablePan={true}      // Allows click-and-drag to pan
        maxPolarAngle={Math.PI / 2}  // Restrict vertical movement (camera can't go upside down)
        minDistance={5}       // Minimum zoom distance
        maxDistance={15}      // Maximum zoom distance
      />
    </Canvas>
  );
};

export default MainHall;
