import React, {useState, useEffect, Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Box, CameraControls, Billboard } from '@react-three/drei';
import Building from "../public/Building.jsx";
import Gallery from './Gallery';
import Bio from "./Bio.jsx";
import CameraScroll from './CameraScroll.jsx';
import Floor from './Floor.jsx';

const Entrance = ({ position, label, onClick }) => (
  <group position={position}>
    <Box args={[1.2, 2.2, 0.2]} onClick={onClick}>
      <meshStandardMaterial attach="material" color="darkred" />
    </Box>
    <Text position={[0, 1.5, 0.001]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
      {label}
    </Text>
  </group>
);



const BuildingScene = () => {
  const [zoomed, setZoomed] = useState(null); // State to track which image is zoomed
  
  const [rearrangeMode, setRearrangeMode] = useState(false); // Rearrange mode state

  // Function to toggle rearrangeMode on "R" key press
  const handleKeyDown = (event) => {
    if (event.key === 'r' || event.key === 'R') {
      setRearrangeMode((prevMode) => !prevMode);
    }
    if (event.key === 'a' || event.key === 'A') {
      console.log("a key pressed")

    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rearrangeMode]);


  return (
    <Canvas
      onCreated={(state) => {
        state.gl.setClearColor("#000000");
        
        // Set initial camera position and target
        const { camera } = state;
        
        camera.position.set(0, 6, 0);  // Set camera position first
        camera.rotation.set(Math.PI, Math.PI, Math.PI)     // Then call lookAt to rotate towards the target
camera.updateProjectionMatrix();  // Update the projection matrix after changes
console.log("Camera Rotation After LookAt:", camera.rotation);
        {console.log(camera)}
      }}
      style={{ height: '100vh', width: '100vw', background: 'black' }}
      camera={{ fov: 80 }} // Initial camera setup
     
    > 
      <Building />

      <Suspense fallback={null}>
        <Gallery
          rearrangeMode={rearrangeMode}
          zoomed={zoomed} // Pass zoomed state to Gallery
          setZoomed={setZoomed} // Pass setter function for zoomed state
          
        />
      </Suspense>

      <ambientLight intensity={3} />

      <Bio
        title="Kendzsi Tanaka"
        text={`likes to capture unique moments during his travels. Here you see his work shot on a Minolta 7700i using film he can afford occasionally.`}
        text2={"Check out his digital photography work in this room..."}
      />

      <Floor />
      
     
    </Canvas>
  );
};

export default BuildingScene;
