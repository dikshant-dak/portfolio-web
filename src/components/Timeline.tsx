'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'motion/react';
import { Briefcase, GraduationCap, Award, Globe } from 'lucide-react';
import { experienceTimeline } from '@/data/portfolioData';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animate the vertical connector line height as the user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ['0%', '100%']);

  const getIcon = (type: string) => {
    switch (type) {
      case 'employment':
        return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'freelance':
        return <Globe className="w-4 h-4 text-purple-400" />;
      default:
        return <Award className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'employment':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'education':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'freelance':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div ref={containerRef} className="relative ml-4 md:ml-6 space-y-10 py-2">
      {/* Scroll-animated connector line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900">
        <motion.div
          className="w-full bg-linear-to-b from-emerald-500 via-emerald-500/50 to-transparent"
          style={{ height: lineHeight }}
        />
      </div>

      {experienceTimeline.map((item, idx) => {
        // Alternate left/right entry directions based on index
        const fromLeft = idx % 2 === 0;
        const itemVariants: Variants = {
          hidden: { opacity: 0, x: fromLeft ? -40 : 40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 80, damping: 15, delay: 0.1 },
          },
        };

        return (
          <motion.div
            key={item.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={itemVariants}
            className="relative pl-8 md:pl-10 group"
          >
            {/* Timeline Node dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
              className="absolute -left-4.25 top-1.5 flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 bg-background z-10 group-hover:border-emerald-500/50 transition-colors duration-300"
            >
              {getIcon(item.type)}
            </motion.div>

            {/* Timeline content block */}
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glow-card border border-zinc-800/80 bg-primary/30 backdrop-blur-sm p-6 rounded-2xl cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border uppercase tracking-wider mb-2 ${getBadgeStyle(item.type)}`}>
                    {item.type}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-zinc-400 mt-0.5">
                    {item.company} &bull; <span className="text-zinc-500">{item.location}</span>
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800/60 px-3 py-1 rounded-full self-start sm:self-center">
                  {item.period}
                </span>
              </div>

              {/* Highlights List */}
              <ul className="space-y-2.5">
                {item.highlights.map((bullet, bIdx) => (
                  <motion.li
                    key={bIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: bIdx * 0.08 + 0.2 }}
                    className="text-sm text-zinc-400 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
