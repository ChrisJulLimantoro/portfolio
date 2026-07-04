'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Wrench } from 'lucide-react';
import { getContents, getToolbox, type Accent } from '@/lib/data';

const ACCENT_HEX: Record<Accent, string> = {
  fuchsia: '#ff3d81',
  gold: '#ffb627',
  cyan: '#34e0e0',
  lime: '#c6f24e',
};

/**
 * "In this issue" — a magazine contents page. The three features jump to their
 * deep-dive sections on this page; the toolbox capstone links out to the repo.
 */
export function ProjectHighlight() {
  const contents = getContents();
  const toolbox = getToolbox();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      ref={ref}
      className="paper grain relative border-y px-5 py-24 sm:px-8"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Head */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b pb-5"
          style={{ borderColor: 'var(--line)' }}
        >
          <div>
            <span className="kicker" style={{ color: 'var(--fuchsia)' }}>
              Issue Nº01 — Contents
            </span>
            <h2 className="font-editorial mt-3 text-5xl sm:text-7xl">
              In this issue
            </h2>
          </div>
          <span className="font-display text-2xl" style={{ color: 'var(--hush)' }}>
            three builds &amp; a toolbox ↘
          </span>
        </motion.div>

        {/* Feature entries */}
        <ol>
          {contents.map((entry, i) => {
            const accent = ACCENT_HEX[entry.accent];
            return (
              <motion.li
                key={entry.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{ ['--accent' as string]: accent }}
              >
                <a
                  href={entry.href}
                  className="ink-bleed group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:grid-cols-[auto_1fr_auto] sm:gap-x-10"
                  style={{ borderColor: 'var(--line)', ['--bleed' as string]: accent }}
                >
                  {/* Folio number — oversized, CMYK misregistered */}
                  <span
                    className="reg font-editorial text-5xl leading-none transition-colors sm:text-7xl"
                    style={{ color: accent }}
                  >
                    {entry.no}
                  </span>

                  {/* Title + dek */}
                  <div className="min-w-0">
                    <h3
                      className="font-editorial text-4xl leading-[0.95] transition-colors duration-300 group-hover:text-[color:var(--accent)] sm:text-6xl"
                    >
                      {entry.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#57534e] sm:text-base">
                      {entry.dek}
                    </p>
                  </div>

                  {/* Right rail: meta + jump */}
                  <div className="col-start-2 mt-4 flex items-center gap-3 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-2">
                    <span className="kicker" style={{ color: 'var(--hush)' }}>
                      {entry.meta}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 font-sans text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                      style={{ color: accent }}
                    >
                      Jump <ArrowDownRight size={16} />
                    </span>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </ol>

        {/* Capstone — the toolbox */}
        <motion.a
          href={toolbox.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            ['--accent' as string]: ACCENT_HEX[toolbox.accent],
            background: 'var(--ink)',
          }}
          className="group mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden rounded-2xl p-6 text-[#ECECF2] shadow-[0_20px_60px_-30px_rgba(11,11,18,0.5)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:gap-8 sm:p-8"
        >
          {/* Glyph */}
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl sm:h-20 sm:w-20"
            style={{
              background: `radial-gradient(120% 120% at 30% 20%, ${ACCENT_HEX[toolbox.accent]}30, transparent 65%), var(--ink-3)`,
              color: ACCENT_HEX[toolbox.accent],
            }}
          >
            <Wrench size={28} />
          </span>

          {/* Copy */}
          <div className="min-w-0">
            <span className="kicker" style={{ color: ACCENT_HEX[toolbox.accent] }}>
              {toolbox.meta} · {toolbox.count}
            </span>
            <h3 className="font-editorial mt-2 text-3xl text-[#ECECF2] transition-colors duration-300 group-hover:text-[color:var(--accent)] sm:text-4xl">
              {toolbox.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#a9a9b6]">
              {toolbox.dek}
            </p>
          </div>

          {/* Open repo */}
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#0b0b12] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ background: ACCENT_HEX[toolbox.accent] }}
          >
            <ArrowUpRight size={20} />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
