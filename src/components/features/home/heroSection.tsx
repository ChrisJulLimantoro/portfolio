'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const ROLES = ['AI agents', 'automations', 'full-stack systems', 'mobile apps'];

const TECH = [
  'AI Agents', 'Automation', 'AI Trader', 'NovelGit', 'RAG', 'Claude',
  'MCP', 'Python', 'TypeScript', 'Next.js', 'Supabase', 'Vector DBs',
];

/* Magnetic button — drifts toward the cursor, springs back on leave. */
function MagneticCTA() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href="/project"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center gap-3 rounded-full bg-[#ff3d81] px-7 py-4 font-sans text-base font-semibold text-[#0b0b12] transition-colors hover:bg-[#ffb627] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] focus-visible:ring-[#ffb627]"
    >
      See the work
      <ArrowDownRight
        size={20}
        className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />
    </motion.a>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);

  // Cursor parallax for the masthead
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 24);
      py.set((e.clientY / window.innerHeight - 0.5) * 16);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [px, py, reduce]);

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        {/* Top meta row */}
        <div
          className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b pb-5"
          style={{ borderColor: 'var(--line)' }}
        >
          <span className="kicker" style={{ color: 'var(--gold)' }}>
            AI Agent &amp; Automation Expert — Jakarta, ID
          </span>
          <span
            className="font-display text-2xl"
            style={{ color: 'var(--hush)' }}
          >
            just a kid navigating the tech world ✋🏼
          </span>
        </div>

        {/* Masthead */}
        <motion.div style={{ x: sx, y: sy }} className="relative">
          <h1 className="font-editorial text-[clamp(3.2rem,13vw,12rem)] text-[#ECECF2]">
            <span className="relative inline-block">
              {/* vivid color-block behind the surname */}
              <span
                aria-hidden
                className="absolute -inset-x-2 top-[14%] -z-0 h-[72%] -rotate-1 bg-[#ff3d81]"
              />
              <span className="relative z-10">Julius</span>
            </span>{' '}
            <span className="text-stroke">Limantoro</span>
          </h1>
        </motion.div>

        {/* Role cycler + intro */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="max-w-2xl text-xl leading-snug text-[#ECECF2] sm:text-2xl">
            I design &amp; ship{' '}
            <span className="relative inline-grid">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={reduce ? false : { y: '0.5em', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: '-0.5em', opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-editorial text-[#34e0e0]"
                  style={{ fontWeight: 700 }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            {' '}— and still chasing the spark that started it all.
          </p>

          <div className="flex flex-col items-start gap-6">
            <dl className="flex gap-8">
              {[
                { v: '3+', l: 'years building' },
                { v: '25+', l: 'projects shipped' },
                { v: '3.98', l: 'GPA, top grad' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-editorial text-3xl text-[#ffb627]">
                    {s.v}
                  </dt>
                  <dd className="kicker mt-1" style={{ color: 'var(--hush)' }}>
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
            <MagneticCTA />
          </div>
        </div>
      </div>

      {/* Marquee tech strip */}
      <div
        className="marquee mt-16 overflow-hidden border-y py-4"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="marquee-track">
          {[...TECH, ...TECH].map((t, i) => (
            <span
              key={i}
              className="kicker mx-6 inline-flex items-center gap-6"
              style={{ color: i % 3 === 0 ? 'var(--fuchsia)' : 'var(--hush)' }}
            >
              {t}
              <span style={{ color: 'var(--ink-3)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
