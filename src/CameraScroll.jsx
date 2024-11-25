// CameraScroll.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as holdEvent from "https://unpkg.com/hold-event@0.2.0/dist/hold-event.module.js";
import { useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';

// Install CameraControls with THREE
CameraControls.install({ THREE: THREE });

const CameraScroll = ({ zoomed }) => {
    const { camera, gl } = useThree(); // Access camera and renderer from three.js
    const cameraControls = useRef();
  
    useEffect(() => {
      // Initialize CameraControls with camera and renderer dom element
      cameraControls.current = new CameraControls(camera, gl.domElement);
      camera.position.set(0, 0, 5);
  
      const clock = new THREE.Clock();
  
      const KEYCODE = {
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
      };
  
      if (!zoomed) {
        // WASD Key Handlers
        const wKey = new holdEvent.KeyboardKeyHold(KEYCODE.W, 16.666);
        const aKey = new holdEvent.KeyboardKeyHold(KEYCODE.A, 16.666);
        const sKey = new holdEvent.KeyboardKeyHold(KEYCODE.S, 16.666);
        const dKey = new holdEvent.KeyboardKeyHold(KEYCODE.D, 16.666);
  
        aKey.addEventListener('holding', (event) => {
          cameraControls.current.truck(-0.01 * event.deltaTime, 0, false);
          console.log('Moving left');
        });
        dKey.addEventListener('holding', (event) => {
          cameraControls.current.truck(0.01 * event.deltaTime, 0, false);
          console.log('Moving right');
        });
        wKey.addEventListener('holding', (event) => {
          cameraControls.current.forward(0.01 * event.deltaTime, false);
          console.log('Moving forward');
        });
        sKey.addEventListener('holding', (event) => {
          cameraControls.current.forward(-0.01 * event.deltaTime, false);
          console.log('Moving backward');
        });
  
        // Arrow keys for rotation
        const leftKey = new holdEvent.KeyboardKeyHold(KEYCODE.ARROW_LEFT, 100);
        const rightKey = new holdEvent.KeyboardKeyHold(KEYCODE.ARROW_RIGHT, 100);
        const upKey = new holdEvent.KeyboardKeyHold(KEYCODE.ARROW_UP, 100);
        const downKey = new holdEvent.KeyboardKeyHold(KEYCODE.ARROW_DOWN, 100);
  
        leftKey.addEventListener('holding', (event) => {
          cameraControls.current.rotate(-0.1 * THREE.MathUtils.DEG2RAD * event.deltaTime, 0, true);
          console.log('Rotating left');
        });
        rightKey.addEventListener('holding', (event) => {
          cameraControls.current.rotate(0.1 * THREE.MathUtils.DEG2RAD * event.deltaTime, 0, true);
          console.log('Rotating right');
        });
        upKey.addEventListener('holding', (event) => {
          cameraControls.current.rotate(0, -0.05 * THREE.MathUtils.DEG2RAD * event.deltaTime, true);
          console.log('Rotating up');
        });
        downKey.addEventListener('holding', (event) => {
          cameraControls.current.rotate(0, 0.05 * THREE.MathUtils.DEG2RAD * event.deltaTime, true);
          console.log('Rotating down');
        });
      }
  
      // Handle mouse movement and apply rotation based on distance from center
      let mouseX = 0, mouseY = 0;
      const handleMouseMove = (event) => {
        const { innerWidth: width, innerHeight: height } = window;
        const centerX = width / 2;
        const centerY = height / 2;
  
        mouseX = event.clientX - centerX;
        mouseY = event.clientY - centerY;
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      // Render loop to update camera controls and apply mouse-based rotation
      const animate = () => {
        const delta = clock.getDelta();
        cameraControls.current.update(delta);
  
        const rotationSpeedX = mouseX * 0 * delta;
        const rotationSpeedY = mouseY * 0 * delta;
        cameraControls.current.rotate(rotationSpeedX, rotationSpeedY, true);
  
        requestAnimationFrame(animate);
      };
  
      if (!zoomed) {
        animate(); // Only start the animation loop if not zoomed in
      }
  
      // Cleanup on unmount
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, [camera, gl, zoomed]);
  
    return null;
  };

export default CameraScroll;
