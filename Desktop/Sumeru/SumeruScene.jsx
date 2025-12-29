import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import SumeruAxisScene from './SumeruAxis';

export default function SumeruScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050505');
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
        />
        <SumeruAxisScene />
      </Canvas>
      
      {/* Title overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '10px 20px',
          borderRadius: '8px',
        }}
      >
        <div>SUMERU</div>
        <div>须弥</div>
        <div>One Thought</div>
        <div style={{ fontSize: '18px', fontWeight: 'normal', marginTop: '5px', opacity: 0.9 }}>One Thousand World</div>
      </div>
      
      {/* Info overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: '#ffffff',
          fontFamily: 'monospace',
          fontSize: '12px',
          opacity: 0.7,
          zIndex: 100,
        }}
      >
        <div>Particles: 3000</div>
        <div>10 Realms × 10 Mutual × 3 Existence × 10 Suchness</div>
        <div style={{ marginTop: '10px', fontSize: '10px' }}>
          Use mouse to rotate, scroll to zoom
        </div>
      </div>
    </div>
  );
}

