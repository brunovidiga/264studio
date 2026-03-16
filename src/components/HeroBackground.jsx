import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroBackground() {
  const pointsRef = useRef();

  // Create an array of particles
  const particleCount = 2000;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20;

        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = Math.sin(theta) * radius;

        // Gradient from Green/Cyan to Purple
        color.setHSL(0.5 + Math.random() * 0.3, 0.8, 0.5); 
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
            attach="attributes-position" 
            count={particleCount} 
            array={positions} 
            itemSize={3} 
        />
        <bufferAttribute 
            attach="attributes-color" 
            count={particleCount} 
            array={colors} 
            itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
