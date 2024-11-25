import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import React, { useState, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import SelectedImage from './FramedPicture';
import { TextureLoader } from 'three';
import PhotoLibrary from './PhotoLibrary';

extend({ Text });

export default function Gallery({ rearrangeMode, zoomed, setZoomed}) {
  const [imageData, setImageData] = useState(PhotoLibrary); // Data for the images
  const [textures, setTextures] = useState({}); // State to store loaded textures
  const [loading, setLoading] = useState(true); // State to track loading
  

  // Preload textures when component mounts
  useEffect(() => {
    const loader = new TextureLoader();
    const loadTextures = async () => {
      const loadedTextures = {};
      for (const [key, { src }] of Object.entries(imageData)) {
        try {
          const texture = await loader.loadAsync(src);
          loadedTextures[key] = texture;
          console.log(`Texture for ${key} loaded`);
        } catch (error) {
          console.error(`Failed to load texture: ${src}`, error);
        }
      }
      setTextures(loadedTextures);
      setLoading(false);
      console.log('All textures loaded');
    };

    loadTextures();
  }, [imageData]);

  // Handle zoom state changes
  const handleZoomChange = (key, isZoomed) => {
    if (isZoomed) {
      console.log(`Image ${key} is zoomed in`);
      setZoomed(key); // Set zoomed image key if zoomed in
     
  
    } else {
      console.log(`Image ${key} is zoomed out`);
      setZoomed(null); // Clear zoomed state if zoomed out
      
    }
  };

  // Render the images in the gallery
  const renderImages = () => {
    return Object.entries(imageData).map(([key, { position, rotation, frameThickness, frameMargin, scaleMultiplier }]) => {
      const texture = textures[key];
      if (!texture) return null; // Skip rendering if texture isn't loaded

      return (
        <SelectedImage
          key={key}
          selectedImage={texture}
          position={position}
          rotation={rotation}
          frameThickness={frameThickness}
          frameMargin={frameMargin}
          scaleMultiplier={scaleMultiplier}
          zoomed={zoomed === key} // Check if this image is zoomed
          onZoomChange={(isZoomed) => handleZoomChange(key, isZoomed)} // Pass zoom change handler
        />
      );
    });
  };

  if (loading) {
    return (
      <mesh>
        <Text fontSize={1} color="black" position={[0, 0, 0]}>
          Loading...
        </Text>
      </mesh>
    );
  }

  return (
    <group>
      {renderImages()}{/* Render images after textures are loaded */}
    </group>
  );
}
