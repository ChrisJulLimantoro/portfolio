'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { getFlagship } from '@/lib/data';

/**
 * Dedicated AI × Automation flagship: the agentic AI Trader.
 * Signature = an interactive agent pipeline whose nodes pulse in sequence;
 * hover/focus a node to read what that stage does.
 */
export function AiFlagship() {
  const flagship = getFlagship();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Auto-advance the lit node unless the user is inspecting one.
  useEffect(() => {
    if (reduce || pinned) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % flagship.pipeline.length),
      1400
    );
    return () => clearInterval(id);
  }, [reduce, pinned, flagship.pipeline.length]);

  return (
    <section id="ai-trader" className="relative scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Head */}
        <div
          className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b pb-5"
          style={{ borderColor: 'var(--line)' }}
        >
          <div>
            <span className="kicker" style={{ color: 'var(--fuchsia)' }}>
              Flagship — AI × Automation
            </span>
            <h2 className="font-editorial mt-3 text-6xl text-[#ECECF2] sm:text-8xl">
              AI Trader
            </h2>
          </div>
          <span
            className="font-display text-2xl"
            style={{ color: 'var(--hush)' }}
          >
            an agent that knows when <em>not</em> to trade
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Left — narrative */}
          <div>
            <p className="text-lg leading-relaxed text-[#ECECF2]">
              {flagship.tagline}
            </p>

            <dl className="mt-8 flex flex-wrap gap-8">
              {flagship.stats.map((s) => (
                <div key={s.l}>
                  <dt className="font-editorial text-4xl text-[#ffb627]">
                    {s.v}
                  </dt>
                  <dd className="kicker mt-1" style={{ color: 'var(--hush)' }}>
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="mt-8 flex items-start gap-3 rounded-xl border p-4"
              style={{
                borderColor: 'var(--line)',
                background: 'rgba(52,224,224,0.05)',
              }}
            >
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#34e0e0]" />
              <p className="text-sm text-[#a9a9b6]">
                Paper-traded only. The decision gate has to{' '}
                <span className="text-[#34e0e0]">prove an edge</span> before the
                system is allowed to advance a single signal.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {flagship.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 font-sans text-xs text-[#a9a9b6]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={flagship.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff3d81] px-6 py-3 font-sans text-sm font-semibold text-[#0b0b12] transition-colors hover:bg-[#ffb627] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] focus-visible:ring-[#ffb627]"
            >
              <Github size={18} /> Read the source
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Right — interactive agent pipeline */}
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              borderColor: 'var(--line)',
              background:
                'radial-gradient(130% 90% at 80% 0%, rgba(255,61,129,0.10), transparent 55%), var(--ink-2)',
            }}
          >
            <span className="kicker" style={{ color: 'var(--hush)' }}>
              The agent pipeline — hover a stage
            </span>

            <ol className="mt-5 space-y-2">
              {flagship.pipeline.map((stage, i) => {
                const isOn = active === i;
                return (
                  <li key={stage.label}>
                    <button
                      onMouseEnter={() => {
                        setActive(i);
                        setPinned(true);
                      }}
                      onMouseLeave={() => setPinned(false)}
                      onFocus={() => {
                        setActive(i);
                        setPinned(true);
                      }}
                      onBlur={() => setPinned(false)}
                      className="flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3d81]"
                      style={{
                        borderColor: isOn ? 'var(--fuchsia)' : 'var(--line)',
                        background: isOn
                          ? 'rgba(255,61,129,0.08)'
                          : 'transparent',
                      }}
                    >
                      {/* Node */}
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ background: 'var(--fuchsia)' }}
                          animate={{
                            scale: isOn && !reduce ? [1, 1.8, 1] : 1,
                            opacity: isOn ? [0.5, 0, 0.5] : 0,
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: isOn && !reduce ? Infinity : 0,
                          }}
                        />
                        <span
                          className="relative h-3 w-3 rounded-full transition-colors"
                          style={{
                            background: isOn
                              ? 'var(--fuchsia)'
                              : 'var(--ink-3)',
                          }}
                        />
                      </span>

                      <span
                        className="font-editorial text-lg transition-colors"
                        style={{ color: isOn ? '#ECECF2' : 'var(--hush)' }}
                      >
                        <span className="mr-2 text-xs text-[#ffb627]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {stage.label}
                      </span>

                      {/* connector arrow */}
                      {i < flagship.pipeline.length - 1 && (
                        <span
                          className="ml-auto text-xs"
                          style={{ color: 'var(--ink-3)' }}
                        >
                          ↓
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Detail readout for the active stage */}
            <div
              className="mt-5 min-h-[3.5rem] rounded-xl border px-4 py-3"
              style={{ borderColor: 'var(--line)', background: 'var(--ink)' }}
            >
              <motion.p
                key={active}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-[#ECECF2]"
              >
                <span className="text-[#34e0e0]">
                  {flagship.pipeline[active].label}
                </span>{' '}
                — {flagship.pipeline[active].detail}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
