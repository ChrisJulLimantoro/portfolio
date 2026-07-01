'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getFlagship } from '@/lib/data';

/** "agent" variant — the AI Trader pipeline as an interactive flow. */
export function AgentDetail({ accent = '#ff3d81' }: { accent?: string }) {
  const flagship = getFlagship();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (reduce || pinned) return;
    const id = setInterval(() => setActive((i) => (i + 1) % flagship.pipeline.length), 1400);
    return () => clearInterval(id);
  }, [reduce, pinned, flagship.pipeline.length]);

  return (
    <section className="mt-16">
      <div className="mb-6 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
        <span className="kicker" style={{ color: accent }}>How the agent thinks</span>
        <h2 className="font-editorial mt-2 text-4xl text-[#ECECF2]">The pipeline</h2>
      </div>

      <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--line)', background: `radial-gradient(130% 90% at 80% 0%, ${accent}1a, transparent 55%), var(--ink-2)` }}>
        <span className="kicker" style={{ color: 'var(--hush)' }}>Hover a stage</span>
        <ol className="mt-5 grid gap-2 sm:grid-cols-2">
          {flagship.pipeline.map((stage, i) => {
            const isOn = active === i;
            return (
              <li key={stage.label}>
                <button
                  onMouseEnter={() => { setActive(i); setPinned(true); }}
                  onMouseLeave={() => setPinned(false)}
                  onFocus={() => { setActive(i); setPinned(true); }}
                  onBlur={() => setPinned(false)}
                  className="flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2"
                  style={{ borderColor: isOn ? accent : 'var(--line)', background: isOn ? `${accent}14` : 'transparent' }}
                >
                  <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                    <motion.span className="absolute inset-0 rounded-full" style={{ background: accent }}
                      animate={{ scale: isOn && !reduce ? [1, 1.8, 1] : 1, opacity: isOn ? [0.5, 0, 0.5] : 0 }}
                      transition={{ duration: 1.4, repeat: isOn && !reduce ? Infinity : 0 }} />
                    <span className="relative h-3 w-3 rounded-full" style={{ background: isOn ? accent : 'var(--ink-3)' }} />
                  </span>
                  <span className="font-editorial text-lg" style={{ color: isOn ? '#ECECF2' : 'var(--hush)' }}>
                    <span className="mr-2 text-xs text-[#ffb627]">{String(i + 1).padStart(2, '0')}</span>
                    {stage.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 min-h-[3.5rem] rounded-xl border px-4 py-3" style={{ borderColor: 'var(--line)', background: 'var(--ink)' }}>
          <motion.p key={active} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="text-sm text-[#ECECF2]">
            <span style={{ color: accent }}>{flagship.pipeline[active].label}</span> — {flagship.pipeline[active].detail}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
