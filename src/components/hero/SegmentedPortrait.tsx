'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

export interface SegmentedPortraitProps {
  realImageSrc?: string;
  cyberImageSrc?: string;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  sliceCount?: number;
  className?: string;
}

export const SegmentedPortrait: React.FC<SegmentedPortraitProps> = ({
  realImageSrc = '/portrait-real.jpg',
  cyberImageSrc = '/portrait-cyber.jpg',
  mouseX: externalMouseX,
  mouseY: externalMouseY,
  sliceCount = 8,
  className = '',
}) => {
  // Local fallback motion values if not passed from parent
  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  const activeMouseX = externalMouseX ?? localMouseX;
  const activeMouseY = externalMouseY ?? localMouseY;

  // Spring physics as explicitly required: stiffness: 100, damping: 15
  const springConfig = { stiffness: 100, damping: 15 };
  const smoothMouseX = useSpring(activeMouseX, springConfig);
  const smoothMouseY = useSpring(activeMouseY, springConfig);

  // 3D Perspective Tilt transforms
  const rotateX = useTransform(smoothMouseY, [-1, 1], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-12, 12]);

  // Breathing loop offset for when mouse is idle
  const [breathingOffset, setBreathingOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState<'hybrid' | 'cyber' | 'human'>('hybrid');

  // Automatic breathing oscillation
  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const loop = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      // Gentle sinusoidal breathing wave (period ~ 4 seconds)
      const wave = Math.sin(elapsed * 1.5) * 0.4;
      setBreathingOffset(wave);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Generate slice configuration
  const slices = useMemo(() => {
    return Array.from({ length: sliceCount }, (_, index) => {
      const topPercent = (index * 100) / sliceCount;
      const bottomPercent = 100 - ((index + 1) * 100) / sliceCount;
      const isEven = index % 2 === 0;
      // Direction factor (-1 or 1)
      const direction = isEven ? 1 : -1;
      // Progressive displacement intensity based on slice position
      const intensity = 14 + (index % 4) * 8;

      return {
        index,
        topPercent,
        bottomPercent,
        direction,
        intensity,
        clipPath: `inset(${topPercent}% 0% ${bottomPercent}% 0%)`,
      };
    });
  }, [sliceCount]);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ perspective: 1200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Tilted Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-[3/4] mx-auto rounded-sm overflow-visible will-change-transform group"
      >
        {/* Brutalist Frame Corner Markers */}
        <div aria-hidden="true" className="absolute -inset-3 pointer-events-none z-30">
          {/* Top-left */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/60" />
          {/* Top-right */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/60" />
          {/* Bottom-left */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/60" />
          {/* Bottom-right */}
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/60" />
        </div>

        {/* Technical HUD Floating Header */}
        <div className="absolute -top-7 left-0 right-0 flex items-center justify-between font-mono text-[9px] tracking-widest text-neutral-400 uppercase z-30 px-1">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            SUBJECT: Z.QARSHIYEV // DEV_01
          </span>
          <span className="text-neutral-500">
            SEC_COUNT: {sliceCount}
          </span>
        </div>

        {/* Technical HUD Floating Footer */}
        <div className="absolute -bottom-7 left-0 right-0 flex items-center justify-between font-mono text-[9px] tracking-widest text-neutral-400 uppercase z-30 px-1">
          <span>LAT: 41.2995° N // 69.2401° E</span>
          <span className="text-neutral-500">MODE: {activeMode.toUpperCase()}</span>
        </div>

        {/* Base Layer: Cyber-Visor Helmet Graphic */}
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden shadow-2xl">
          <img
            src={cyberImageSrc}
            alt="Zakariyo Qarshiyev - Cyber Visor Helmet"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95"
            draggable={false}
          />
          {/* Cyber Visor Overlay Matrix Lines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Sliced Overlay Layers: Animated Strips of the Real Portrait and Transitions */}
        {slices.map((slice) => {
          // Dynamic offset combining mouse spring and subtle breathing loop
          const xOffset = useTransform(
            smoothMouseX,
            [-1, 1],
            [
              slice.direction * slice.intensity + breathingOffset * 4,
              -slice.direction * slice.intensity - breathingOffset * 4,
            ]
          );

          const yOffset = useTransform(
            smoothMouseY,
            [-1, 1],
            [
              -slice.direction * (slice.intensity * 0.35),
              slice.direction * (slice.intensity * 0.35),
            ]
          );

          // Alternating opacity between real portrait and cyber layer based on mode & slice index
          const isCyberDominant =
            activeMode === 'cyber' ||
            (activeMode === 'hybrid' && (slice.index === 1 || slice.index === 2 || slice.index === 3));

          return (
            <motion.div
              key={slice.index}
              style={{
                clipPath: slice.clipPath,
                x: xOffset,
                y: yOffset,
                willChange: 'transform, clip-path',
              }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-transform duration-75"
            >
              {/* Developer Real Portrait Slice */}
              <div
                className={`relative w-full h-full overflow-hidden transition-opacity duration-300 ${
                  isCyberDominant ? 'opacity-20' : 'opacity-100'
                }`}
              >
                <img
                  src={realImageSrc}
                  alt={`Subject segment ${slice.index}`}
                  className="w-full h-full object-cover object-center grayscale contrast-110 brightness-100"
                  draggable={false}
                />
              </div>

              {/* Slicing Boundary Line / Technical Glitch Border */}
              <div
                style={{
                  top: `${slice.topPercent}%`,
                }}
                className="absolute left-0 right-0 h-px bg-white/20 z-20 pointer-events-none flex items-center justify-between px-2"
              >
                <span className="font-mono text-[7px] text-white/50 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  SL_{slice.index < 10 ? `0${slice.index}` : slice.index}
                </span>
                <span className="font-mono text-[7px] text-white/40 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  {slice.direction > 0 ? '+R' : '-L'}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* High-Tech Vertical Crosshair / Ruler Overlay */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-20">
          {/* Vertical central hairline */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10" />
          
          {/* Central Target Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
            <div className="w-full h-full border border-white/20 rounded-full scale-75" />
          </div>

          {/* Sweeping Glitch Scanline Bar */}
          <motion.div
            animate={{ top: ['0%', '100%'] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: 'easeInOut',
            }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"
          />
        </div>

        {/* Interactive Mode Toggle Bar on Card Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between bg-black/85 backdrop-blur-md border border-neutral-800 rounded px-2.5 py-1.5">
          <div className="flex items-center gap-1 font-mono text-[8px] tracking-wider text-neutral-400">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span>NEURAL_SYNC</span>
          </div>

          <div className="flex items-center gap-1">
            {(['human', 'hybrid', 'cyber'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMode(mode);
                }}
                className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider rounded transition-all duration-200 ${
                  activeMode === mode
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SegmentedPortrait;
