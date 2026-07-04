'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Counts a numeric value up from 0 when it scrolls into view — "data coming to
 * press". Parses a display string so it keeps decimals and suffixes intact
 * (`3.98`, `25+`, `100%`). Respects reduced-motion by rendering the final value.
 */
export function AnimatedNumber({
  value,
  duration = 900,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const match = /^([\d.]+)(.*)$/.exec(value.trim());
  const target = match ? parseFloat(match[1]) : NaN;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;

  const [display, setDisplay] = useState(
    reduce || isNaN(target) ? value : `0${decimals ? '.' + '0'.repeat(decimals) : ''}${suffix}`,
  );

  useEffect(() => {
    if (reduce || isNaN(target)) {
      setDisplay(value);
      return;
    }
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce, target, decimals, suffix, duration, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
