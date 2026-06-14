'use client';

import { motion } from 'motion/react';
import { Cpu, Server, Smartphone, Layers } from 'lucide-react';
import { engineeringPillars } from '@/data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
  Server: <Server className="w-5 h-5 text-emerald-400" />,
  Smartphone: <Smartphone className="w-5 h-5 text-emerald-400" />,
  Layers: <Layers className="w-5 h-5 text-emerald-400" />,
};

export default function Stats() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } },
  };

  return (
    <div className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {engineeringPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="glow-card border border-zinc-800 bg-primary/40 backdrop-blur-sm p-6 rounded-2xl flex flex-col justify-between cursor-pointer min-h-55"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  {iconMap[pillar.icon] || <Cpu className="w-5 h-5 text-emerald-400" />}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Pillar 0{idx + 1}
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white tracking-tight mb-1">
                {pillar.title}
              </h3>
              <span className="text-xs font-mono text-emerald-400/90 block mb-3">
                {pillar.subtitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mt-2">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
