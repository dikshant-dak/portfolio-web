'use client';

import { useScroll, useSpring, motion } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-600 via-emerald-400 to-green-300 z-100 origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
