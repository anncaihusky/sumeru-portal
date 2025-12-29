import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ten Realms as defined in the Logic Bible
const REALMS = [
  'Hell', 'HungryGhost', 'Animal', 'Asura', 'Human', 
  'Heaven', 'VoiceHearer', 'CauseAwakened', 'Bodhisattva', 'Buddha'
];

// Generate 3000 particle positions
// Calculation: 10 realms × 10 realms (mutual possession) × 3 realms of existence × 10 suchness = 3000
function generateParticlePositions(count = 3000, radius = 5) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Spherical distribution - particles flow outward from center
    const theta = Math.random() * Math.PI * 2; // Azimuth angle
    const phi = Math.acos(2 * Math.random() - 1); // Polar angle
    const r = radius * (0.5 + Math.random() * 1.5); // Varying distance
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    
    // Assign colors based on realm (cycle through 10 realms)
    const realmIndex = i % 10;
    const hue = (realmIndex / 10) * 360; // Distribute colors across spectrum
    const color = new THREE.Color().setHSL(hue / 360, 0.7, 0.6);
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  return { positions, colors };
}

// Central Sumeru Axis (Mt. Sumeru) - Geometric center point
function SumeruAxis() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation of the axis
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Mountain-like axis geometry - represents Mt. Sumeru */}
      <coneGeometry args={[0.3, 2, 8]} />
      <meshStandardMaterial 
        color="#d4af37" 
        emissive="#d4af37"
        emissiveIntensity={0.2}
        metalness={0.6}
        roughness={0.4}
      />
      
      {/* Central core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#f4d03f" 
          emissive="#f4d03f"
          emissiveIntensity={0.3}
        />
      </mesh>
    </mesh>
  );
}

// Particle system representing 3000 realms
function RealmParticles({ count = 3000 }) {
  const pointsRef = useRef();
  const { positions: initialPositions, colors: initialColors } = useMemo(() => generateParticlePositions(count, 8), [count]);
  
  // Store mutable positions and colors
  const positions = useRef(new Float32Array(initialPositions));
  const colors = useRef(new Float32Array(initialColors));
  
  // Store individual particle creation times for fade effect
  const particleTimes = useRef(new Float32Array(count));
  const particleVelocities = useRef(new Float32Array(count * 3));
  const initialized = useRef(false);
  
  // Initialize velocities based on initial positions
  if (!initialized.current) {
    for (let i = 0; i < count; i++) {
      const index = i * 3;
      // Each particle has outward velocity
      const direction = new THREE.Vector3(
        initialPositions[index],
        initialPositions[index + 1],
        initialPositions[index + 2]
      ).normalize();
      
      particleVelocities.current[index] = direction.x * (0.5 + Math.random() * 0.5);
      particleVelocities.current[index + 1] = direction.y * (0.5 + Math.random() * 0.5);
      particleVelocities.current[index + 2] = direction.z * (0.5 + Math.random() * 0.5);
      
      // Initialize creation times (staggered)
      particleTimes.current[i] = Math.random() * 2;
    }
    initialized.current = true;
  }
  
  useFrame((state) => {
    if (pointsRef.current && pointsRef.current.geometry) {
      const currentTime = state.clock.elapsedTime;
      const posArray = positions.current;
      const colArray = colors.current;
      const velocities = particleVelocities.current;
      const times = particleTimes.current;
      
      // Update particle positions and apply fade logic
      for (let i = 0; i < count; i++) {
        const index = i * 3;
        const age = currentTime - times[i];
        
        // Particles fade after 3 seconds with color shift (based on "无常" principle)
        if (age > 0) {
          // Move particles outward
          posArray[index] += velocities[index] * 0.01;
          posArray[index + 1] += velocities[index + 1] * 0.01;
          posArray[index + 2] += velocities[index + 2] * 0.01;
          
          // Fade color as particle ages (shift towards darker/more transparent)
          if (age > 2) {
            const fadeFactor = Math.max(0, 1 - (age - 2)); // Fade in last second
            colArray[index] *= fadeFactor;
            colArray[index + 1] *= fadeFactor;
            colArray[index + 2] *= fadeFactor;
          }
          
          // After 3 seconds, reset particle (fade and reposition)
          if (age > 3) {
            // Reset to new position near center
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1 + Math.random() * 2;
            
            posArray[index] = r * Math.sin(phi) * Math.cos(theta);
            posArray[index + 1] = r * Math.sin(phi) * Math.sin(theta);
            posArray[index + 2] = r * Math.cos(phi);
            
            // Reset color to original brightness
            const realmIndex = i % 10;
            const hue = (realmIndex / 10) * 360;
            const color = new THREE.Color().setHSL(hue / 360, 0.7, 0.6);
            colArray[index] = color.r;
            colArray[index + 1] = color.g;
            colArray[index + 2] = color.b;
            
            // Update velocity for new direction
            const direction = new THREE.Vector3(
              posArray[index],
              posArray[index + 1],
              posArray[index + 2]
            ).normalize();
            
            velocities[index] = direction.x * (0.5 + Math.random() * 0.5);
            velocities[index + 1] = direction.y * (0.5 + Math.random() * 0.5);
            velocities[index + 2] = direction.z * (0.5 + Math.random() * 0.5);
            
            times[i] = currentTime;
          }
        }
      }
      
      // Update geometry attributes (arrays are shared references, just mark as needing update)
      const positionAttr = pointsRef.current.geometry.attributes.position;
      const colorAttr = pointsRef.current.geometry.attributes.color;
      if (positionAttr) {
        positionAttr.needsUpdate = true;
      }
      if (colorAttr) {
        colorAttr.needsUpdate = true;
      }
    }
  });
  
  // Create geometry on mount
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.current, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors.current, 3));
    return geo;
  }, []);
  
  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Scene Component
export default function SumeruAxisScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      {/* Central Sumeru Axis */}
      <SumeruAxis />
      
      {/* 3000 Realm Particles */}
      <RealmParticles count={3000} />
    </>
  );
}

