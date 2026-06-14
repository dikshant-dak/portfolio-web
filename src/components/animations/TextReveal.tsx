'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  split?: 'words' | 'chars';
  stagger?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  split = 'words',
  stagger = 0.07,
  tag = 'p',
}: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const tokens = split === 'words' ? text.split(' ') : text.split('');
  const separator = split === 'words' ? ' ' : '';

  const Wrapper = tag as 'p';

  return (
    <Wrapper ref={ref} className={`overflow-hidden ${className}`} aria-label={text}>
      {tokens.map((token, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.1]" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotateX: -30 }}
            animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : { y: '110%', opacity: 0, rotateX: -30 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 16,
              delay: delay + i * stagger,
            }}
            style={{ transformOrigin: 'bottom center', perspective: 800 }}
          >
            {token}
          </motion.span>
          {i < tokens.length - 1 && separator && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Wrapper>
  );
}
