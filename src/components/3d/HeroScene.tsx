'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';

// --- Camera Rig for Cursor Tracking ---
function CameraRig() {
  useFrame((state) => {
    const { x, y } = state.pointer; // Normalized cursor coordinates [-1, 1]
    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 1.2 + 0.5, 0.05);
    state.camera.lookAt(0, 0.5, 0);
  });
  return null;
}

// --- Infinite Scrolling Grid Plane ---
function GridPlane() {
  const gridRef = useRef<THREE.GridHelper>(null!);
  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.elapsedTime;
    // Spacing of grid is size / divisions (30 / 30 = 1 unit).
    // Scroll along Z axis and wrap to create seamless infinite scrolling.
    gridRef.current.position.z = (t * 0.5) % 1;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#047857', '#18181b']}
      position={[0, -2.5, 0]}
    />
  );
}

// --- Floating Wireframe Nodes ---
interface NodeProps {
  position: [number, number, number];
  shape: 'icosahedron' | 'octahedron' | 'torus' | 'tetrahedron';
  rotationSpeed: [number, number, number];
  color: string;
  size: number;
}

function FloatingGeometry({ position, shape, rotationSpeed, color, size, isMobile }: NodeProps & { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const responsivePosition = useMemo((): [number, number, number] => {
    if (isMobile) {
      // Compress X values to keep floating nodes on screen on narrow mobile viewports
      return [position[0] * 0.45, position[1] * 0.8, position[2]];
    }
    return position;
  }, [position, isMobile]);

  const responsiveSize = isMobile ? size * 0.7 : size;

  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron': return new THREE.IcosahedronGeometry(responsiveSize, 0);
      case 'octahedron': return new THREE.OctahedronGeometry(responsiveSize, 0);
      case 'tetrahedron': return new THREE.TetrahedronGeometry(responsiveSize, 0);
      case 'torus': return new THREE.TorusGeometry(responsiveSize, responsiveSize * 0.25, 8, 16);
      default: return new THREE.IcosahedronGeometry(responsiveSize, 0);
    }
  }, [shape, responsiveSize]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += rotationSpeed[2] * 0.005;
    // Float gently up/down
    meshRef.current.position.y = responsivePosition[1] + Math.sin(t * 0.5 + responsivePosition[0] * 2) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={responsivePosition} geometry={geometry}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

// --- Star Particle Field ---
function ParticleField({ count = 1200, isMobile }: { count?: number; isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const particleCount = isMobile ? Math.floor(count * 0.5) : count;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    let seed = 42;
    const lcg = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3]     = (lcg() - 0.5) * (isMobile ? 18 : 35); // X
      arr[i * 3 + 1] = (lcg() - 0.5) * (isMobile ? 18 : 25); // Y
      arr[i * 3 + 2] = (lcg() - 0.5) * 25; // Z
    }
    return arr;
  }, [particleCount, isMobile]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.005;
    pointsRef.current.rotation.x = t * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#34d399"
        size={isMobile ? 0.03 : 0.04}
        sizeAttenuation
        transparent
        opacity={isMobile ? 0.25 : 0.35}
        depthWrite={false}
      />
    </points>
  );
}

// --- Central Distorted Orb (Scroll-Reactive) ---
function DistortedOrb({ scrollYProgress, isMobile }: { scrollYProgress: MotionValue<number>; isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = t * 0.1;

    // React to scroll progress: scale down, shift position right, and fade opacity
    const rawScroll = scrollYProgress.get(); // 0 (top) to 1 (scrolled)
    const scroll = typeof rawScroll === 'number' && !isNaN(rawScroll) ? rawScroll : 0;
    
    // Scale: smaller starting scale on mobile to avoid overwhelming narrow screens
    const startScale = isMobile ? 0.85 : 1.5;
    const endScale = isMobile ? 0.25 : 0.3;
    const scale = Math.max(startScale - scroll * (startScale - endScale), endScale);
    meshRef.current.scale.set(scale, scale, scale);

    // Position: Shift X and Y responsively
    if (isMobile) {
      meshRef.current.position.x = 0; // Keep centered on mobile to avoid clipping
      meshRef.current.position.y = -0.4 - scroll * 0.6; // Position lower down on screen
      meshRef.current.position.z = -scroll * 1.5;
    } else {
      meshRef.current.position.x = scroll * 4.5;
      meshRef.current.position.y = 0.5 - scroll * 1.2;
      meshRef.current.position.z = -scroll * 2.0;
    }

    // Fade out the material opacity
    const material = meshRef.current.material as THREE.Material;
    if (material) {
      const maxOpacity = isMobile ? 0.5 : 0.85;
      material.opacity = Math.max((1 - scroll) * maxOpacity, 0);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, isMobile ? -0.4 : 0.5, 0]}>
      <icosahedronGeometry args={[1, 2]} />
      <MeshDistortMaterial
        color="#10b981"
        attach="material"
        distort={isMobile ? 0.25 : 0.35}
        speed={1.8}
        roughness={0.15}
        metalness={0.85}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// --- Main 3D Hero Scene Canvas ---
export default function HeroScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-configured nodes positions and speeds
  const floatingNodes: NodeProps[] = [
    { position: [-4, 2, -3], shape: 'torus', rotationSpeed: [0.3, 0.5, 0.1], color: '#34d399', size: 0.5 },
    { position: [4, 1.5, -4], shape: 'icosahedron', rotationSpeed: [0.5, 0.2, 0.2], color: '#60a5fa', size: 0.6 },
    { position: [-3, -1, -2], shape: 'octahedron', rotationSpeed: [0.2, 0.4, 0.5], color: '#a78bfa', size: 0.4 },
    { position: [3, -1.2, -3], shape: 'tetrahedron', rotationSpeed: [0.4, 0.3, 0.3], color: '#f43f5e', size: 0.5 },
  ];

  const lightIntensityMultiplier = isMobile ? 0.6 : 1.0;

  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isMobile ? 0.5 : 0.4} />
        
        {/* Directional light to guarantee baseline physical shading brightness */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        
        {/* Colorful lighting to highlight 3D shapes */}
        <pointLight position={[-6, 4, 3]} intensity={5.0 * lightIntensityMultiplier} color="#10b981" decay={0} />
        <pointLight position={[6, -4, 3]} intensity={4.0 * lightIntensityMultiplier} color="#8b5cf6" decay={0} />
        <pointLight position={[0, 8, -2]} intensity={3.0 * lightIntensityMultiplier} color="#3b82f6" decay={0} />
        
        <CameraRig />
        <GridPlane />
        <ParticleField isMobile={isMobile} />
        
        {floatingNodes.map((node, i) => (
          <FloatingGeometry key={i} {...node} isMobile={isMobile} />
        ))}
        
        <DistortedOrb scrollYProgress={scrollYProgress} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
