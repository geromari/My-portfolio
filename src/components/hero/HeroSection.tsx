'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { BackgroundMarquee } from './BackgroundMarquee';
import { SegmentedPortrait } from './SegmentedPortrait';

export interface HeroSectionProps {
  name?: string;
  bioLine1?: string;
  bioLine2?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = 'ZAKARIYO QARSHIYEV',
  bioLine1 = 'Full-Stack developer, system programmer, and AI integration specialist.',
  bioLine2 = 'Building fast, scalable, and intelligent applications.',
  ctaText = 'GET IN TOUCH',
  onCtaClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates (-1 to 1) for GPU-accelerated animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Throttled mouse move tracking using requestAnimationFrame
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate normalized coordinate from -1 to 1 with center at 0
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        mouseX.set(Math.max(-1, Math.min(1, x)));
        mouseY.set(Math.max(-1, Math.min(1, y)));
      });
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    // Smooth reset toward center
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Smooth scroll handler for anchor links
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navAnchors = [
    { id: 'about', label: 'About', index: '01' },
    { id: 'skills', label: 'Skills', index: '02' },
    { id: 'work', label: 'Projects', index: '03' },
    { id: 'education', label: 'Experience', index: '04' },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-screen w-full relative overflow-hidden flex flex-col justify-between bg-black text-white selection:bg-white selection:text-black font-sans ${className}`}
    >
      {/* Editorial Grain Texture Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-screen z-20"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Layer 1: Background Kinetic Brutalist Marquee */}
      <BackgroundMarquee mouseX={mouseX} />

      {/* ========================================================
          1. Header / Top Navigation
          ======================================================== */}
      <header className="relative z-30 w-full pt-8 px-6 sm:px-10 md:px-14 flex items-center justify-between">
        {/* Left: Name / Monogram */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3.5 group cursor-default"
        >
          <div className="w-2.5 h-2.5 bg-white border border-neutral-700 rounded-none group-hover:rotate-45 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm tracking-[0.28em] uppercase font-mono text-neutral-400 group-hover:text-white transition-colors font-medium">
              {name}
            </span>
            <span className="font-mono text-[9px] text-neutral-600 tracking-widest hidden sm:inline-block">
              ENGINEERING // ARCHITECTURE // AI
            </span>
          </div>
        </motion.div>

        {/* Right: Bordered Pill Button with Hover Invert Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              if (onCtaClick) {
                e.preventDefault();
                onCtaClick();
              } else {
                e.preventDefault();
                scrollToAnchor('contact');
              }
            }}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 rounded-full border border-neutral-700 bg-black text-xs font-mono tracking-widest uppercase text-neutral-300 overflow-hidden transition-all duration-300 hover:text-black hover:border-white shadow-lg active:scale-95"
          >
            {/* Sliding Invert Background Pill */}
            <span className="absolute inset-0 w-full h-full bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            <span className="relative z-10 font-semibold">{ctaText}</span>
            <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-black transition-colors" />
          </a>
        </motion.div>
      </header>

      {/* ========================================================
          2. Central Interactive Portrait (The Slicing Helmet Animation)
          ======================================================== */}
      <main className="relative z-20 flex-1 flex items-center justify-center my-auto px-4">
        <SegmentedPortrait
          mouseX={mouseX}
          mouseY={mouseY}
          realImageSrc="/portrait-real.jpg"
          cyberImageSrc="/portrait-cyber.jpg"
          sliceCount={8}
        />
      </main>

      {/* ========================================================
          3. Bottom Area
          ======================================================== */}
      <footer className="relative z-30 w-full pb-8 sm:pb-10 px-6 sm:px-10 md:px-14 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-4">
        {/* Bottom-left: Compact 2-line Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md space-y-2"
        >
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
            <span className="w-1 h-1 bg-white inline-block" />
            <span>CORE SPECIFICATION</span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed tracking-tight">
            <span className="block text-white font-medium">{bioLine1}</span>
            <span className="block text-neutral-400">{bioLine2}</span>
          </p>

          <div className="pt-1 flex items-center gap-4 text-[10px] font-mono text-neutral-600">
            <span>SYS // TASHKENT</span>
            <span>•</span>
            <span className="text-neutral-400">STATUS: OPEN FOR COLLAB</span>
          </div>
        </motion.div>

        {/* Bottom-right: Minimal Vertical Navigation Anchors */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Hero navigation"
          className="flex flex-row md:flex-col items-start md:items-end gap-5 md:gap-2.5"
        >
          {navAnchors.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToAnchor(item.id)}
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200"
            >
              <span className="text-[9px] text-neutral-600 group-hover:text-neutral-300 transition-colors hidden md:inline-block">
                [{item.index}]
              </span>
              <span className="relative py-0.5">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
              </span>
            </button>
          ))}
        </motion.nav>
      </footer>
    </section>
  );
};

export default HeroSection;
