'use client';

import dynamic from 'next/dynamic';
import { MotionValue } from 'motion/react';

// R3F hero scene — needs scrollYProgress passed down from a client parent
export const HeroSceneDynamic = dynamic<{ scrollYProgress: MotionValue<number> }>(
  () => import('@/components/3d/HeroScene'),
  { ssr: false }
);

export const SkillOrbCanvasDynamic = dynamic<{ shape: string; color: string }>(
  () => import('@/components/3d/SkillOrb').then((m) => ({ default: m.SkillOrbCanvas })),
  { ssr: false }
);
