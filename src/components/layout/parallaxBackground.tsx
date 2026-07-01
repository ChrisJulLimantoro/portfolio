'use client';

import { useReducedMotion, motion, useScroll, useTransform } from 'framer-motion';

/**
 * Editorial ambient background — "The Issue".
 * Ink base + two restrained vivid color washes (fuchsia / gold) on a slow
 * parallax, faint editorial column rules, and a film-grain overlay for a
 * printed-page feel. Replaces the old cyan grid / particle field.
 */
export function ParallaxBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 1200], [0, reduce ? 0 : -160]);
  const yB = useTransform(scrollY, [0, 1200], [0, reduce ? 0 : -80]);

  return (
    <div className="grain fixed inset-0 -z-10 overflow-hidden bg-[#0b0b12]">
      {/* Vivid washes — multi-hue, deliberately not a single accent */}
      <motion.div
        style={{ y: yA }}
        className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-25 blur-[120px]"
      >
        <div className="h-full w-full bg-[#ff3d81]" />
      </motion.div>
      <motion.div
        style={{ y: yB }}
        className="absolute right-[-10rem] top-[30%] h-[34rem] w-[34rem] rounded-full opacity-[0.18] blur-[130px]"
      >
        <div className="h-full w-full bg-[#ffb627]" />
      </motion.div>
      <motion.div
        style={{ y: yA }}
        className="absolute bottom-[-12rem] left-[35%] h-[30rem] w-[30rem] rounded-full opacity-[0.12] blur-[130px]"
      >
        <div className="h-full w-full bg-[#34e0e0]" />
      </motion.div>

      {/* Faint editorial column rules */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '12.5% 100%',
        }}
      />
    </div>
  );
}
