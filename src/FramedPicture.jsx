import React, { useState, useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useFrame} from '@react-three/fiber'
import { PerspectiveCamera, useTexture, Text} from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useSpring, animated } from '@react-spring/three';

export default function SelectedImage({position, rotation, selectedImage, scaleMultiplier, frameMargin, frameThickness, zoomed, onZoomChange}) {
// Access the camera and renderer
  const [hovered, setHovered] = useState(false);
  const [movedIn, setMovedIn] = useState(false)
  const [fullscreen, setFullscreen] = useState(false);  // State to track full screen view
  
  
    const imageAspect = selectedImage.image.width / selectedImage.image.height;
    const imageWidth= selectedImage.image.width/400 * scaleMultiplier;
    const imageHeight = selectedImage.image.height/400 * scaleMultiplier;
  
  
    const anchorRef = useRef(); // Reference for the anchor point
    const { camera } = useThree(); // Get the camera
    let previousPositionRef = useRef(null);
    let previousRotationRef = useRef(null);

    let oldCameraPosition = camera.position.toArray()
    let oldCameraRotation = camera.rotation.toArray()
    
    const [{ springPosition, springRotation }, api] = useSpring(() => ({
      springPosition:  previousPositionRef.current? previousPositionRef.current : oldCameraPosition, // Start with the camera's current position
      springRotation:   previousRotationRef.current? previousRotationRef.current : oldCameraRotation, // Start with the camera's current rotation
      config: { tension: 170, friction: 40 }
    }));

    
  
    // Function to handle camera movement to the anchor
    const moveToAnchor = () => {
      const anchorPosition = anchorRef.current.position;
  
      // Store the current camera position and rotation before moving
      previousPositionRef.current = [camera.position.x, camera.position.y, camera.position.z];
      previousRotationRef.current = [camera.rotation.x, camera.rotation.y, camera.rotation.z];
      console.log("saved this data for old position:" + previousPositionRef, previousRotationRef)
      let targetPosition = [camera.position.x, camera.position.y, camera.position.z];
  
      // Calculate target position based on anchor's position
      if (anchorPosition.z === -12.4) {
        targetPosition = [anchorPosition.x, anchorPosition.y, anchorPosition.z + (2.7 * scaleMultiplier)];
      } else if (anchorPosition.z === 12.4) {
        targetPosition = [anchorPosition.x, anchorPosition.y, anchorPosition.z - (2.7 * scaleMultiplier)];
      } else if (anchorPosition.x === -12.4) {
        targetPosition = [anchorPosition.x + (2.7 * scaleMultiplier), anchorPosition.y, anchorPosition.z];
      } else if (anchorPosition.x === 12.4) {
        targetPosition = [anchorPosition.x - (2.7 * scaleMultiplier), anchorPosition.y, anchorPosition.z];
      }
  
      console.log(`Moving camera to anchor at ${JSON.stringify(targetPosition)}`);
  
      api.start({
        springPosition: targetPosition,
        springRotation: rotation,
        onChange: () => {
          camera.position.set(...springPosition.get());
          camera.rotation.set(...springRotation.get());
          camera.lookAt(anchorPosition);
          camera.updateProjectionMatrix();
        },
      });
  
      console.log('Zoomed in');
      setMovedIn(true);
      onZoomChange(true); // Notify parent that zoom happened
    };
  
    const moveFromAnchor = () => {
      const previousPosition = previousPositionRef.current
      const previousRotation = previousPositionRef.current
      console.log(previousPosition, previousRotation)
      if (!previousPosition || !previousRotation) {
        console.warn("No previous camera position or rotation to return to.");
        return; // Ensure there is a previous position and rotation to return to
      }
  
      console.log(`Returning camera to previous position: ${JSON.stringify(previousPosition)}`);
  
      api.start({
        springPosition: previousPosition,
        springRotation: previousRotation,
        onChange: () => {
          camera.position.set(...springPosition.get());
          camera.rotation.set(...springRotation.get());
          camera.updateProjectionMatrix();
        },
        onRest: () => {
          camera.position.set(...previousPosition);
          camera.rotation.set(...previousRotation);
          camera.updateProjectionMatrix();
        },
      });
  
      console.log('Zooming out');
      setMovedIn(false); // Set movedIn state to false
      onZoomChange(false); // Notify parent that zoom out happened
    };

    const handleClick = () => {
      if (movedIn) {
        console.log('Zooming out');
        moveFromAnchor();
      } else {
        console.log('Zooming in');
        moveToAnchor(); // Perform the zoom action
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'a' || event.key === 'A') {
        console.log("a key pressed")
      }
    };


  const BackText = () => (
    (
      <mesh position={[0, 0, 0.01]} >
      <Text position={[-1,0, 0.001]} fontSize={0.3} color="black" anchorX="center" anchorY="right" >
      {"back"}
      </Text>
      </mesh>
    )
  )
      return (
      
        <group ref={anchorRef} position={position} rotation={rotation} onPointerOver={zoomed? false : () => setHovered(true)} onPointerOut={() => setHovered(false)} 
        >
          
        {/* The backing of the frame */}
        <mesh position={[0, 0, -0.05]}> 
        <rectAreaLight color="#FFFFC5" intensity={hovered?3:0} position={[0,0,0.5]} width={imageWidth} height={imageHeight}/>
        <planeGeometry args={[imageWidth + (frameMargin * 2), imageHeight + (frameMargin * 2)]} /> 
        <meshStandardMaterial color="white" />
      </mesh>
      {/* The image (plane geometry) */}
        <mesh position={[0, 0, 0.01]} onClick={handleClick}  >
        <planeGeometry args={[imageWidth, imageHeight]} />
        <meshStandardMaterial map={selectedImage} />
        </mesh>
        {/* Top frame with light*/}
      <mesh position={[0, (imageHeight / 2) + (frameThickness / 2) + frameMargin, 0]}>
    
        <boxGeometry args={[imageWidth + (frameThickness * 2) + (frameMargin * 2), frameThickness, frameThickness]} />
        <meshStandardMaterial color={"black"} />
      </mesh>

      {/* Bottom frame */}
      <mesh position={[0, -(imageHeight / 2) - (frameThickness / 2) - frameMargin, 0]}>
        <boxGeometry args={[imageWidth + (frameThickness * 2) + (frameMargin * 2), frameThickness, frameThickness]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Left frame */}
      <mesh position={[-(imageWidth / 2) - (frameThickness / 2) - frameMargin, 0, 0]}>
      {!zoomed? false : <BackText />}
        <boxGeometry args={[frameThickness, imageHeight + (frameMargin * 2), frameThickness]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Right frame */}
      <mesh position={[(imageWidth / 2) + (frameThickness / 2) + frameMargin, 0, 0]}>
        <boxGeometry args={[frameThickness,imageHeight + (frameMargin * 2), frameThickness]} />
        <meshStandardMaterial color="black" />
      </mesh>
    
        </group>

        
      )
}