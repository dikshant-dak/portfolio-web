'use client';

import AnimateIn from '@/components/animations/AnimateIn';

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  subtext?: string;
  delay?: number;
}

export default function SectionHeading({ eyebrow, heading, subtext, delay = 0 }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2 items-start max-w-2xl">
      <AnimateIn delay={delay} direction="left">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
          {eyebrow}
        </span>
      </AnimateIn>
      <AnimateIn delay={delay + 0.1} direction="up" distance={30}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
          {heading}
        </h2>
      </AnimateIn>
      {subtext && (
        <AnimateIn delay={delay + 0.2} direction="up" distance={20}>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
            {subtext}
          </p>
        </AnimateIn>
      )}
    </div>
  );
}
