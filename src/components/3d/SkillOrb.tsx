'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Dispose the WebGL renderer on unmount to prevent context accumulation
// when multiple SkillOrb canvases are created/destroyed during SPA navigation.
function RendererDisposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      gl.dispose();
      const canvas = gl.domElement;
      const ext =
        canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context') ??
        canvas.getContext('webgl')?.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    };
  }, [gl]);
  return null;
}

// Individual floating skill orb matching the category
function SkillOrb({ shape, color }: { shape: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron': return new THREE.IcosahedronGeometry(0.7, 1);
      case 'octahedron': return new THREE.OctahedronGeometry(0.7, 0);
      case 'torus': return new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8);
      case 'sphere': return new THREE.SphereGeometry(0.6, 16, 16);
      case 'box': return new THREE.BoxGeometry(0.9, 0.9, 0.9);
      default: return new THREE.DodecahedronGeometry(0.6, 0);
    }
  }, [shape]);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.6;
    meshRef.current.rotation.x = t * 0.3;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe outer shell */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
      {/* Solid glowing core */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// Mini R3F canvas for each category card
export function SkillOrbCanvas({ shape, color }: { shape: string; color: string }) {
  return (
    <div className="w-full h-24" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
        }}
      >
        <RendererDisposer />
        <ambientLight intensity={0.4} color="#ffffff" />
        <pointLight position={[2, 2, 2]} intensity={1.0} color={color} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color={color} />
        <SkillOrb shape={shape} color={color} />
      </Canvas>
    </div>
  );
}
