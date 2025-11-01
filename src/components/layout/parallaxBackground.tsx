'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const circleRef = useRef<SVGCircleElement | null>(null);
  const radius = 100;

  // Track actual mouse position
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let lastTime = performance.now();
    const smoothing = 0.12; // how fast the circle "catches up" (lower = smoother)
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Linear interpolation
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * smoothing;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * smoothing;

      if (circleRef.current) {
        circleRef.current.setAttribute('cx', `${currentPos.current.x}`);
        // Adjust y position to stay aligned with scrolled SVG
        const scrollOffset = window.scrollY * 0.2; // matches roughly y1 parallax depth
        circleRef.current.setAttribute(
          'cy',
          `${currentPos.current.y + scrollOffset}`
        );
      }

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-[#0d1117]" />

      {/* Grid Pattern with Glow */}
      <motion.svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        <defs>
          {/* Base grid */}
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(6,182,212,0.05)"
              strokeWidth="1"
            />
          </pattern>

          {/* Highlight grid */}
          <pattern
            id="highlightGrid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(6,182,212,0.3)"
              strokeWidth="1.5"
            />
          </pattern>

          {/* Mouse-follow gradient mask */}
          <radialGradient id="mouseMaskGradient">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="mouseMask">
            <rect width="100%" height="100%" fill="black" />
            <circle ref={circleRef} r={radius} fill="url(#mouseMaskGradient)" />
          </mask>
        </defs>

        {/* Base grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Highlight grid (masked by mouse area) */}
        <rect
          width="100%"
          height="100%"
          fill="url(#highlightGrid)"
          mask="url(#mouseMask)"
        />
      </motion.svg>

      {/* Optional cyan gradient layer for motion depth */}
      <motion.div className="absolute inset-0 opacity-10" style={{ y: y2 }}>
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 via-emerald-400/5 to-transparent" />
      </motion.div>
    </div>
  );
}
