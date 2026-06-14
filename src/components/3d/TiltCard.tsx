'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // degrees max tilt, default 12
}

export default function TiltCard({ children, className = '', intensity = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlowX = useMotionValue(50);
  const rawGlowY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 30 });

  const glowX = useSpring(rawGlowX, { stiffness: 200, damping: 25 });
  const glowY = useSpring(rawGlowY, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;  // 0..1

    // Rotate: center is 0, edges are ±intensity
    rawRotateY.set((x - 0.5) * intensity * 2);
    rawRotateX.set(-(y - 0.5) * intensity * 2);

    // Glow follows cursor in %
    rawGlowX.set(x * 100);
    rawGlowY.set(y * 100);
  }, [intensity, rawRotateX, rawRotateY, rawGlowX, rawGlowY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlowX.set(50);
    rawGlowY.set(50);
  }, [rawRotateX, rawRotateY, rawGlowX, rawGlowY]);

  // Glow spotlight as a radial gradient that follows the cursor
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(200px circle at ${x}% ${y}%, rgba(34, 197, 94, 0.07), transparent 70%)`
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Moving glow spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: glowBg,
          opacity: isHovered ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}
