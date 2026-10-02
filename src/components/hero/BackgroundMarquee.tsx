'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BackgroundMarqueeProps {
  /**
   * Normalized horizontal cursor offset (-1 to 1) for subtle parallax response
   */
  mouseX?: MotionValue<number>;
  /**
   * Optional custom text to display
   */
  primaryText?: string;
  secondaryText?: string;
  className?: string;
}

const DEFAULT_PRIMARY = 'FULL-STACK DEVELOPER • SYSTEM ARCHITECT • AI INTEGRATOR • ';
const DEFAULT_SECONDARY = 'SCALABLE SYSTEMS • NEURAL INTERFACES • DISTRIBUTED COMPUTING • ';

export const BackgroundMarquee: React.FC<BackgroundMarqueeProps> = ({
  mouseX,
  primaryText = DEFAULT_PRIMARY,
  secondaryText = DEFAULT_SECONDARY,
  className = '',
}) => {
  // Parallax translation based on mouse movement
  // When mouse is not provided, defaults to 0
  const parallaxX1 = useTransform(mouseX ?? { get: () => 0 } as unknown as MotionValue<number>, [-1, 1], [-40, 40]);
  const parallaxX2 = useTransform(mouseX ?? { get: () => 0 } as unknown as MotionValue<number>, [-1, 1], [40, -40]);

  // Repeat text to ensure seamless looping without gaps
  const repeatedPrimary = Array(4).fill(primaryText).join(' ');
  const repeatedSecondary = Array(4).fill(secondaryText).join(' ');

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-center gap-6 sm:gap-10 select-none opacity-80 ${className}`}
    >
      {/* Top Track: Massive Outlined Brutalist Typography */}
      <motion.div
        style={{ x: parallaxX1 }}
        className="relative w-full overflow-hidden flex whitespace-nowrap will-change-transform"
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear',
          }}
          className="flex whitespace-nowrap font-display text-[14vw] sm:text-[11vw] lg:text-[9.5vw] font-black tracking-tighter uppercase leading-none will-change-transform"
        >
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.45)] transition-colors pr-8">
            {repeatedPrimary}
          </span>
          <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] pr-8">
            {repeatedPrimary}
          </span>
        </motion.div>
      </motion.div>

      {/* Subtle Divider / Grid Reference Line */}
      <div className="w-full flex items-center justify-between px-6 opacity-20">
        <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
          SYS // KINETIC_BUFFER_V2.0
        </span>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
          HZ: 144 • BUILT FOR SPEED
        </span>
      </div>

      {/* Bottom Track: Ghostly Semi-transparent Brutalist Typography in Reverse Direction */}
      <motion.div
        style={{ x: parallaxX2 }}
        className="relative w-full overflow-hidden flex whitespace-nowrap will-change-transform"
      >
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 34,
            ease: 'linear',
          }}
          className="flex whitespace-nowrap font-display text-[14vw] sm:text-[11vw] lg:text-[9.5vw] font-black tracking-tighter uppercase leading-none will-change-transform"
        >
          <span className="text-white/[0.045] pr-8">
            {repeatedSecondary}
          </span>
          <span className="text-white/[0.045] pr-8">
            {repeatedSecondary}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BackgroundMarquee;
